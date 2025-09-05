#!/usr/bin/env bun
/**
 * Ghost Cursor Reader - Read session recordings for client-side playback
 * Usage: bun server/ghost-reader.ts [filename]
 */
/** biome-ignore-all lint/suspicious/noConsole: CLI utility */

import { readdir } from "fs/promises";
import { join } from "path";

type GhostCursorPoint = {
  sessionTime: number; // milliseconds since session start
  clientId: number;
  x: number; // normalized 0-1
  y: number; // normalized 0-1
};

type GhostSession = {
  clientId: number;
  countryCode: string;
  ipAddress: string;
  sessionStart: Date;
  totalPoints: number;
  movements: GhostCursorPoint[];
};

async function readGhostSession(filepath: string): Promise<GhostSession> {
  const file = Bun.file(filepath);
  const buffer = await file.arrayBuffer();
  const view = new DataView(buffer);

  // Read header (64 bytes)
  const magic = new TextDecoder().decode(buffer.slice(0, 4));
  if (magic !== "CJRN") {
    throw new Error(`Invalid magic bytes: ${magic}`);
  }

  const clientId = view.getUint32(8, true);
  const totalPoints = view.getUint32(12, true);
  const sessionStart = new Date(Number(view.getBigUint64(16, true)));
  const countryCode = new TextDecoder()
    .decode(buffer.slice(24, 32))
    .replace(/\0/g, "");
  const ipAddress = new TextDecoder()
    .decode(buffer.slice(32, 64))
    .replace(/\0/g, "");

  // Read movements (13 bytes each: 4 session timer + 9 cursor packet)
  const movements: GhostCursorPoint[] = [];
  let offset = 64;

  for (let i = 0; i < totalPoints; i++) {
    const sessionTime = view.getUint32(offset, true);

    // Parse cursor packet (9 bytes): msgType + clientId + x + y
    const packetOffset = offset + 4;
    // Skip msgType (byte 0)
    const packetClientId = view.getUint32(packetOffset + 1, true);
    const x = view.getFloat16(packetOffset + 5, true);
    const y = view.getFloat16(packetOffset + 7, true);

    movements.push({ sessionTime, clientId: packetClientId, x, y });
    offset += 13;
  }

  return {
    clientId,
    countryCode,
    ipAddress,
    sessionStart,
    totalPoints,
    movements,
  };
}

// Export for client-side use
export { readGhostSession, type GhostSession, type GhostCursorPoint };

async function main() {
  const filename = process.argv[2];
  const recordingsDir = join(process.cwd(), "recordings");

  if (filename) {
    // Read specific session for ghost playback
    const filepath = join(recordingsDir, filename);
    try {
      const session = await readGhostSession(filepath);

      console.log("=== Ghost Session Data ===");
      console.log(`Client: ${session.clientId} (${session.countryCode})`);
      console.log(`Session: ${session.sessionStart.toISOString()}`);
      console.log(`Total movements: ${session.totalPoints}`);

      if (session.movements.length > 0) {
        const lastMovement = session.movements[session.movements.length - 1];
        const duration = lastMovement.sessionTime / 1000;
        console.log(`Duration: ${duration.toFixed(1)}s`);

        console.log("\\n=== Sample for Client Integration ===");
        console.log("// Use this data to create ghost cursor:");
        console.log(
          `const ghostData = ${JSON.stringify(session.movements.slice(0, 5), null, 2)};`,
        );
      }
    } catch (error) {
      console.error(`Error reading session: ${error}`);
    }
  } else {
    // List available sessions
    try {
      const files = await readdir(recordingsDir);
      const sessionFiles = files.filter(
        (f) => f.startsWith("journey_") && f.endsWith(".bin"),
      );

      console.log("=== Available Ghost Sessions ===");

      for (const file of sessionFiles.slice(0, 10)) {
        // Show only recent 10
        const filepath = join(recordingsDir, file);
        try {
          const session = await readGhostSession(filepath);
          const lastTime =
            session.movements.length > 0
              ? session.movements[session.movements.length - 1].sessionTime /
                1000
              : 0;

          console.log(
            `${file}: ${session.totalPoints} movements over ${lastTime.toFixed(1)}s`,
          );
        } catch (error) {
          console.log(`${file}: Error - ${error}`);
        }
      }

      if (sessionFiles.length === 0) {
        console.log(
          "No session files found. Start the WebSocket server and connect clients to generate recordings.",
        );
      } else {
        console.log(
          `\\nTo read a specific session: bun server/ghost-reader.ts <filename>`,
        );
      }
    } catch (error) {
      console.error(`Error reading recordings: ${error}`);
    }
  }
}

// Only run main if this file is executed directly
if (import.meta.main) {
  main().catch(console.error);
}
