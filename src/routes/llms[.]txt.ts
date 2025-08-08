import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/llms.txt").methods({
  GET: async () => {
    const txt = `# ishmam.dev

> A minimal portfolio, to showcase my work as a Software Engineer.
`;
    return new Response(txt);
  },
});
