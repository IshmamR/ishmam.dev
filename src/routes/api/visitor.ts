import { json } from "@tanstack/react-start";
import { createServerFileRoute, getEvent } from "@tanstack/react-start/server";
import postgres from "postgres";

type TIpWhoIsResponseSuccess = {
  success: true;
  country: string;
  country_code: string;
  city: string;
  latitude: number;
  longitude: number;
  flag: {
    img: string;
    emoji: string;
    emoji_unicode: string;
  };
};
type TIpWhoIsResponseFailure = {
  success: false;
};
type TIpWhoIsResponse = (TIpWhoIsResponseSuccess | TIpWhoIsResponseFailure) & {
  ip: string;
};

export const ServerRoute = createServerFileRoute("/api/visitor").methods({
  GET: async () => {
    const event = getEvent();
    const request = event.node.req;

    const ip = request.socket.remoteAddress;

    if (!ip) return json({ message: "Failed to retrieve." }, { status: 400 });

    const connectionString = process.env.DATABASE_URL!;
    console.log(connectionString);
    const sql = postgres({
      host: "db.pjsdqbvoeuvqxyfvzimj.supabase.co",
      port: 5432,
      database: "postgres",
      user: "postgres.pjsdqbvoeuvqxyfvzimj",
      password: "CQ9BYd7?h%@utF_",
    });

    try {
      const res = await fetch(`http://ipwho.is/${ip}`);
      const geo: TIpWhoIsResponse = await res.json();
      console.log(geo);
      if (!geo.success) {
        await sql.end({ timeout: 5 });
        return json({ message: "Failed to retrieve." }, { status: 400 });
      }

      const ipAddress = geo.ip || ip;
      const country_code = geo.country_code;
      const flag_emoji = geo.flag.emoji;

      const result = await sql`
        insert into Visitor
          (ip, country_code, flag_emoji)
        values
          (${ipAddress}, ${country_code}, ${flag_emoji})
        returning ip
      `;

      console.log(result);
      await sql.end({ timeout: 5 });
      return json(geo);
    } catch (error) {
      console.error(error);
      await sql.end({ timeout: 5 });
      return json({ message: "Failed to retrieve." }, { status: 400 });
    }
  },
});
