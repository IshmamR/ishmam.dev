import { json } from "@tanstack/react-start";
import { createServerFileRoute, getEvent } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/visitor").methods({
  GET: async () => {
    const event = getEvent();
    const request = event.node.req;

    const ip = request.socket.remoteAddress;

    let geo = { ip };
    try {
      const res = await fetch(`http://ipwho.is/${ip}`);
      geo = await res.json();
    } catch {
      /* ignore lookup failure */
    }

    return json(geo);
  },
});
