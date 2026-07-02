import { NextRequest, NextResponse } from "next/server";
import { execute } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { page, referrer, utm_source, utm_medium, utm_campaign, utm_content, session_id } = body;

    // Skip admin sessions
    if (typeof page === "string" && page.startsWith("/admin")) {
      return NextResponse.json({ ok: true });
    }

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : (req.headers.get("x-real-ip") ?? "unknown");

    const ua = (req.headers.get("user-agent") ?? "").slice(0, 500);

    await execute(
      `INSERT INTO page_views
         (ip, page, referrer, user_agent, utm_source, utm_medium, utm_campaign, utm_content, session_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ip,
        (page ?? "/").slice(0, 500),
        referrer ? referrer.slice(0, 1000) : null,
        ua,
        utm_source ?? null,
        utm_medium ?? null,
        utm_campaign ?? null,
        utm_content ?? null,
        session_id ?? null,
      ]
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
