// benchmark.ts
const CLIENTS = 1000;
const DURATION_MS = 30000; // 30 second test

let connected = 0;
let messagesSent = 0;
let messagesReceived = 0;

console.log(
  `Starting benchmark with ${CLIENTS} clients for ${DURATION_MS / 1000}s`,
);

const startTime = Date.now();
const clients: WebSocket[] = []; // Track all clients for cleanup

// Create clients
for (let i = 0; i < CLIENTS; i++) {
  const ws = new WebSocket("ws://localhost:8000");
  clients.push(ws); // Store reference for cleanup

  ws.onopen = () => {
    connected++;

    const buffer = new ArrayBuffer(9);
    const view = new DataView(buffer);

    // Send cursor updates at 60fps
    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        view.setUint8(0, 1); // CLIENT_CURSOR
        view.setUint16(1, Math.random() * 1920, true);
        view.setUint16(3, Math.random() * 1080, true);
        view.setUint16(5, 1920, true);
        view.setUint16(7, 1080, true);

        ws.send(buffer);
        messagesSent++;
      } else {
        clearInterval(interval);
      }
    }, 33); // ~60fps

    setTimeout(() => clearInterval(interval), DURATION_MS);
  };

  ws.onmessage = () => {
    messagesReceived++;
  };

  ws.onerror = (err) => {
    console.error(`WebSocket error:`, err);
  };

  ws.onclose = () => {
    connected--;
  };
}

// Log results every 5 seconds
const logInterval = setInterval(() => {
  const elapsed = (Date.now() - startTime) / 1000;
  console.log(
    `${elapsed.toFixed(1)}s - Connected: ${connected}, Sent: ${messagesSent}, Received: ${messagesReceived}`,
  );
}, 5000);

setTimeout(() => {
  clearInterval(logInterval);

  // Close all connections
  console.log("Closing all connections...");
  clients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.close();
    }
  });

  // Wait a bit for cleanup, then show final results
  setTimeout(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    console.log(`
FINAL RESULTS:
Duration: ${elapsed.toFixed(1)}s
Max Connected: ${clients.length}
Final Connected: ${connected}
Total Sent: ${messagesSent}
Total Received: ${messagesReceived}
Avg Send Rate: ${(messagesSent / elapsed).toFixed(1)} msg/s
Avg Receive Rate: ${(messagesReceived / elapsed).toFixed(1)} msg/s
    `);

    process.exit(0); // Clean exit
  }, 2000);
}, DURATION_MS + 1000);
