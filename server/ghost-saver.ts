/** biome-ignore-all lint/suspicious/noConsole: lagbe */
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import type { CountryAlpha2 } from "../src/types";

// Binary journey recording
type JourneyRecorder = {
  buffer: Buffer;
  offset: number;
  pointCount: number;
  sessionStart: number; // timestamp when recording started
};

type WsData = {
  ipAddress: string;
  clientId: ClientId;
  countryCode: CountryAlpha2;
  createdAt: Date;
};

// Journey recording functions
const INITIAL_BUFFER_SIZE = 64 * 1024; // 64KB initial buffer per client
const PACKET_SIZE = 13; // 4 bytes session timer + 9 bytes cursor packet

type ClientId = number;
const journeyRecorders = new Map<ClientId, JourneyRecorder>();

const recordingsDir = join(process.cwd(), "recordings");
if (!existsSync(recordingsDir)) {
  mkdirSync(recordingsDir, { recursive: true });
}

export function createJourneyRecorder(): JourneyRecorder {
  return {
    buffer: Buffer.alloc(INITIAL_BUFFER_SIZE),
    offset: 0,
    pointCount: 0,
    sessionStart: Date.now(),
  };
}

export function recordCursorPacket(
  recorder: JourneyRecorder,
  cursorPacket: Buffer,
) {
  // Calculate session-relative time in milliseconds
  const sessionTime = Date.now() - recorder.sessionStart;

  // Expand buffer if needed
  if (recorder.offset + PACKET_SIZE > recorder.buffer.length) {
    const newSize = recorder.buffer.length * 2;
    const newBuffer = Buffer.alloc(newSize);
    recorder.buffer.copy(newBuffer);
    recorder.buffer = newBuffer;
  }

  // Write session time (4 bytes) + cursor packet (9 bytes)
  const view = new DataView(
    recorder.buffer.buffer,
    recorder.buffer.byteOffset + recorder.offset,
  );
  view.setUint32(0, sessionTime, true); // session time in ms
  cursorPacket.copy(recorder.buffer, recorder.offset + 4);

  recorder.offset += PACKET_SIZE;
  recorder.pointCount++;
}

export async function saveJourney(clientId: ClientId, wsData: WsData) {
  const recorder = journeyRecorders.get(clientId);
  if (!recorder || recorder.pointCount === 0) return;

  const filename = `journey_${clientId}_${wsData.countryCode}_${Date.now()}.bin`;
  const filepath = join(recordingsDir, filename);

  // Create header: magic bytes + version + client info + point count
  const headerSize = 64;
  const header = Buffer.alloc(headerSize);
  const headerView = new DataView(header.buffer);

  // Magic bytes "CJRN" (Cursor Journey Recording)
  header.write("CJRN", 0, "ascii");
  headerView.setUint32(4, 1, true); // version
  headerView.setUint32(8, clientId, true);
  headerView.setUint32(12, recorder.pointCount, true);
  headerView.setBigUint64(16, BigInt(wsData.createdAt.getTime()), true);
  header.write(wsData.countryCode, 24, "ascii");
  header.write(wsData.ipAddress, 32, "ascii");

  // Combine header + data
  const dataSize = recorder.pointCount * PACKET_SIZE;
  const fileData = Buffer.concat([
    header,
    recorder.buffer.subarray(0, dataSize),
  ]);

  await Bun.write(filepath, fileData);
  console.log(
    `[JOURNEY] Saved ${recorder.pointCount} points for client ${clientId} to ${filename}`,
  );
}
