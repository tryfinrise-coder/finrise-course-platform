import { NextRequest, NextResponse } from "next/server";
import { execute } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { page, event, value, session_id } = body;

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : (req.headers.get("x-real-ip") ?? "unknown");

    await execute(
      `INSERT INTO page_events (session_id, ip, page, event, value)
       VALUES (?, ?, ?, ?, ?)`,
      [
        session_id ?? null,
        ip,
        (page ?? "/").slice(0, 500),
        (event ?? "unknown").slice(0, 100),
        value ? String(value).slice(0, 500) : null,
      ]
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
