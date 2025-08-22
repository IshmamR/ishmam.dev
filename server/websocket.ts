/** biome-ignore-all lint/suspicious/noConsole: emni */
import { type ServerWebSocket, serve } from "bun";
import {
  type CountryAlpha2,
  countryIdFromAlpha2,
  type TIpWhoisResponse,
} from "../src/types";

type ClientId = number;
type WsData = {
  ipAddress: string;
  clientId: ClientId;
  countryCode: CountryAlpha2;
  createdAt: Date;
};

let clientIdCounter = 0;

const clientsMap = new Map<ClientId, ServerWebSocket<WsData>>();

const MSG_TYPE = {
  CLIENT_CONNECTED: 0,
  CLIENT_CURSOR: 1,
  CLIENT_DISCONNECTED: 2,
  CLIENT_MISC: 3,
} as const;
// const msgTypes = Object.values(MSG_TYPE);
// type TMsgType = (typeof msgTypes)[number];

serve<WsData, never>({
  port: process.env.WS_PORT ? parseInt(process.env.WS_PORT) : 9000,
  fetch: async (req, server) => {
    const ip = server.requestIP(req);
    if (!ip) return new Response("Upgrade failed", { status: 500 });

    try {
      const response = await fetch(`http://ipwho.is/${ip.address}`);
      const data = (await response.json()) as TIpWhoisResponse;
      console.log(data);
      const wsData: WsData = {
        ipAddress: ip.address,
        clientId: -1,
        countryCode: data.country_code as CountryAlpha2,
        createdAt: new Date(),
      };
      if (server.upgrade(req, { data: wsData })) return;

      return new Response("Upgrade failed", { status: 500 });
    } catch (_) {
      return new Response("Upgrade failed", { status: 500 });
    }
  },
  websocket: {
    open: (ws) => {
      ws.data.clientId = ++clientIdCounter;
      clientsMap.set(clientIdCounter, ws);
      console.log(`[WS] Client connected.`, ws.data);

      const castBuffer = Buffer.alloc(6);
      const castView = new DataView(castBuffer.buffer);
      castView.setUint8(0, MSG_TYPE.CLIENT_CONNECTED);
      castView.setUint32(1, ws.data.clientId, true);
      castView.setUint8(5, countryIdFromAlpha2(ws.data.countryCode) ?? 255);

      for (const [clientId, client] of clientsMap) {
        if (
          clientId !== ws.data.clientId &&
          client.readyState === WebSocket.OPEN
        ) {
          client.send(castBuffer);

          // send already connected clients to this client
          if (ws.readyState === WebSocket.OPEN) {
            castView.setUint32(1, client.data.clientId, true);
            castView.setUint8(
              5,
              countryIdFromAlpha2(client.data.countryCode) ?? 255,
            );
            ws.send(castBuffer);
          }
        }
      }
    },
    message: (ws, msg) => {
      if (!Buffer.isBuffer(msg)) {
        // log what was sent
        console.log("[WS] Unknown message received", msg);
        return;
      }

      // parse the buffer
      const dataView = new DataView(msg.buffer, msg.byteOffset, msg.byteLength);
      const msgType = dataView.getUint8(0);
      if (msgType !== MSG_TYPE.CLIENT_CURSOR) {
        return;
      }
      if (msg.byteLength !== 9) {
        return;
      }

      // let's get the cursor data from the buffer
      const x = dataView.getUint16(1, true);
      const y = dataView.getUint16(3, true);
      const w = dataView.getUint16(5, true);
      const h = dataView.getUint16(7, true);

      if (w === 0 || h === 0) return;

      // need to normalize the values to the client's viewport
      const xN = Math.max(0, Math.min(1, x / w));
      const yN = Math.max(0, Math.min(1, y / h));

      const castBuffer = Buffer.alloc(9);
      const castView = new DataView(castBuffer.buffer);
      castView.setUint8(0, MSG_TYPE.CLIENT_CURSOR);
      castView.setUint32(1, ws.data.clientId, true);
      castView.setFloat16(5, xN, true);
      castView.setFloat16(7, yN, true);

      // console.log(xN, yN);

      // broadcast to clients
      for (const [clientId, client] of clientsMap) {
        if (
          clientId !== ws.data.clientId &&
          client.readyState === WebSocket.OPEN
        ) {
          if (client.getBufferedAmount() < 65536) {
            // 64KB limit
            client.send(castBuffer);
          }
        }
      }
    },
    close: (ws) => {
      clientsMap.delete(ws.data.clientId);
      console.log("[WS] Client disconnected.", ws.data);

      const castBuffer = Buffer.alloc(5);
      const castView = new DataView(castBuffer.buffer);
      castView.setUint8(0, MSG_TYPE.CLIENT_DISCONNECTED);
      castView.setUint32(1, ws.data.clientId, true);

      for (const [clientId, client] of clientsMap) {
        if (
          clientId !== ws.data.clientId &&
          client.readyState === WebSocket.OPEN
        ) {
          client.send(castBuffer);
        }
      }
    },
  },
});
