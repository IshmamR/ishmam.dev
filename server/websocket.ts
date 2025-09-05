/** biome-ignore-all lint/suspicious/noConsole: emni */
import { type ServerWebSocket, serve } from "bun";
import { existsSync } from "fs";
import { join } from "path";
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

// Ghost cursor types
type GhostCursorPoint = {
  sessionTime: number; // milliseconds since session start
  clientId: number;
  x: number; // normalized 0-1
  y: number; // normalized 0-1
};

let clientIdCounter = 0;

const clientsMap = new Map<ClientId, ServerWebSocket<WsData>>();

// Ensure recordings directory exists
const recordingsDir = join(process.cwd(), "recordings");

const MSG_TYPE = {
  CLIENT_CONNECTED: 0,
  CLIENT_CURSOR: 1,
  CLIENT_DISCONNECTED: 2,
  CLIENT_MISC: 3,
} as const;

// Ghost cursor functions
async function loadGhostJourney(): Promise<GhostCursorPoint[]> {
  const ghostFilePath = join(recordingsDir, "ghost_journey.bin");

  if (!existsSync(ghostFilePath)) {
    console.log("[GHOST] No ghost_journey.bin found, skipping ghost cursor");
    return [];
  }

  try {
    const file = Bun.file(ghostFilePath);
    const buffer = await file.arrayBuffer();
    const view = new DataView(buffer);

    // Read header
    const magic = new TextDecoder().decode(buffer.slice(0, 4));
    if (magic !== "CJRN") {
      console.log("[GHOST] Invalid ghost_journey.bin format");
      return [];
    }

    const totalPoints = view.getUint32(12, true);
    const movements: GhostCursorPoint[] = [];
    let offset = 64; // Start after header

    for (let i = 0; i < Math.min(totalPoints, 2000); i++) {
      const sessionTime = view.getUint32(offset, true);

      // Parse cursor packet (9 bytes)
      const packetOffset = offset + 4;
      const clientId = view.getUint32(packetOffset + 1, true);
      const x = view.getFloat16(packetOffset + 5, true);
      const y = view.getFloat16(packetOffset + 7, true);
      if (i < 100) console.log(clientId, x, y);

      movements.push({ sessionTime, clientId: 9999, x, y });
      offset += 13;
    }

    console.log(`[GHOST] Loaded ${movements.length} ghost cursor movements`);
    return movements;
  } catch (error) {
    console.log(`[GHOST] Error loading ghost_journey.bin: ${error}`);
    return [];
  }
}

const ghostPlaybacks = new Map<
  ClientId,
  { running: boolean; timeouts: NodeJS.Timeout[] }
>();

function startGhostPlayback(
  clientId: ClientId,
  ws: ServerWebSocket<WsData>,
  movements: GhostCursorPoint[],
) {
  if (movements.length === 0) return;

  const pb = ghostPlaybacks.get(clientId);

  if (!pb) {
    ghostPlaybacks.set(clientId, { running: true, timeouts: [] });
  }

  console.log(
    `[GHOST] Started playback of ${movements.length} movements for client ${clientId}`,
  );

  const timeouts: NodeJS.Timeout[] = [];

  // Schedule all movements at once with their original timing
  movements.forEach((movement, index) => {
    const timeout = setTimeout(() => {
      if (clientsMap.has(clientId) && ws.readyState === WebSocket.OPEN) {
        // Create ghost cursor packet
        const ghostBuffer = Buffer.alloc(9);
        const ghostView = new DataView(ghostBuffer.buffer);
        ghostView.setUint8(0, MSG_TYPE.CLIENT_CURSOR);
        ghostView.setUint32(1, movement.clientId, true);
        ghostView.setFloat16(5, movement.x, true);
        ghostView.setFloat16(7, movement.y, true);

        ws.send(ghostBuffer);
      }

      // If this is the last movement, restart the loop
      if (index === movements.length - 1) {
        console.log(
          `[GHOST] Completed one loop for client ${clientId}, starting next...`,
        );
        // Add a small delay before restarting
        setTimeout(() => {
          const playback = ghostPlaybacks.get(clientId);
          if (
            playback?.running &&
            clientsMap.has(clientId) &&
            ws.readyState === WebSocket.OPEN
          ) {
            playback.timeouts.forEach((t) => clearTimeout(t));
            startGhostPlayback(clientId, ws, movements);
          }
        }, 1000);
      }
    }, movement.sessionTime * 1.5);

    timeouts.push(timeout);
  });

  // Store timeouts for cleanup
  const playback = ghostPlaybacks.get(clientId);
  if (playback) {
    // Clear any existing timeouts first
    playback.timeouts.forEach((t) => clearTimeout(t));
    playback.timeouts = timeouts;
  }
}

function stopGhostPlayback(clientId: ClientId) {
  const pb = ghostPlaybacks.get(clientId);
  if (pb) {
    // Clear all timeouts
    pb.timeouts.forEach((timeout) => clearTimeout(timeout));
    // Delete the playback entry entirely
    ghostPlaybacks.delete(clientId);
    console.log(`[GHOST] Stopped playback for client ${clientId}`);
  }
}

// const msgTypes = Object.values(MSG_TYPE);
// type TMsgType = (typeof msgTypes)[number];

const getRealIP = (req: Request, server: Bun.Server) => {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  const xRealIP = req.headers.get("x-real-ip");
  const cfConnectingIP = req.headers.get("cf-connecting-ip"); // Cloudflare

  if (cfConnectingIP) return cfConnectingIP;
  if (xRealIP) return xRealIP;
  if (xForwardedFor) {
    // X-Forwarded-For can be a comma-separated list, take the first (original client)
    return xForwardedFor.split(",")[0].trim();
  }

  const ip = server.requestIP(req);
  return ip?.address || "unknown";
};

serve<WsData, never>({
  port: process.env.WS_PORT ? parseInt(process.env.WS_PORT) : 9000,
  fetch: async (req, server) => {
    const origin = req.headers.get("origin");
    const allowedOrigins = [
      "http://localhost:3000",
      "https://ishmam.dev",
      "https://www.ishmam.dev",
    ];

    if (origin && !allowedOrigins.includes(origin)) {
      return new Response("Forbidden - Invalid origin", { status: 403 });
    }

    const clientIP = getRealIP(req, server);
    console.log("Real client IP:", clientIP);

    try {
      const response = await fetch(`http://ipwho.is/${clientIP}`);
      const data = (await response.json()) as TIpWhoisResponse;
      const wsData: WsData = {
        ipAddress: clientIP,
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

      // Initialize journey recorder for this client
      // journeyRecorders.set(ws.data.clientId, createJourneyRecorder());

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

      // ghost
      const ghostBuffer = Buffer.alloc(6);
      const ghostView = new DataView(ghostBuffer.buffer);
      ghostView.setUint8(0, MSG_TYPE.CLIENT_CONNECTED);
      ghostView.setUint32(1, 9999, true);
      ghostView.setUint8(5, 255);
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(ghostBuffer);
      }

      // Start ghost cursor playback for this client
      loadGhostJourney().then((movements) => {
        if (movements.length > 0) {
          startGhostPlayback(ws.data.clientId, ws, movements);
        }
      });
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

      // Record this cursor packet in the client's journey
      // const recorder = journeyRecorders.get(ws.data.clientId);
      // if (recorder) {
      // recordCursorPacket(recorder, castBuffer);
      // }

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
    close: async (ws) => {
      // Stop ghost playback for this client
      stopGhostPlayback(ws.data.clientId);

      // Save journey before cleanup
      // await saveJourney(ws.data.clientId, ws.data);

      // Cleanup
      clientsMap.delete(ws.data.clientId);
      // journeyRecorders.delete(ws.data.clientId);
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
