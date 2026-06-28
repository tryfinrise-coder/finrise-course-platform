import { NextResponse, type NextRequest } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { getCurrentUser } from "@/lib/auth";
import { getResource } from "@/lib/resources";
import { ownsProduct } from "@/lib/entitlements";
import { logDownload } from "@/lib/downloads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STORAGE_DIR = path.join(process.cwd(), "storage");

const TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".csv": "text/csv; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".zip": "application/zip",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

function safeJoin(rel: string): string | null {
  const safe = path.normalize(rel).replace(/^(\.\.(\/|\\|$))+/, "");
  const full = path.join(STORAGE_DIR, safe);
  if (!full.startsWith(STORAGE_DIR) || !fs.existsSync(full)) return null;
  return full;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const resource = await getResource(Number(params.id));
  if (!resource) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (user.role !== "admin" && !(await ownsProduct(user.id, resource.product_id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const wantImage = req.nextUrl.searchParams.get("image") === "1";
  const rel = wantImage ? resource.image_path : resource.file_path;
  if (!rel) return NextResponse.json({ error: "Missing" }, { status: 404 });

  const full = safeJoin(rel);
  if (!full) return NextResponse.json({ error: "File missing" }, { status: 404 });

  const data = fs.readFileSync(full);
  const ext = path.extname(full).toLowerCase();
  const type = TYPES[ext] || "application/octet-stream";

  if (wantImage) {
    return new NextResponse(data, {
      status: 200,
      headers: { "Content-Type": type, "Cache-Control": "private, max-age=300" },
    });
  }

  logDownload(user.id, resource.product_id).catch(() => {});
  const niceName = resource.title.replace(/[^\w.-]+/g, "-").toLowerCase() + ext;
  return new NextResponse(data, {
    status: 200,
    headers: {
      "Content-Type": type,
      "Content-Disposition": `attachment; filename="${niceName}"`,
      "Content-Length": String(data.length),
      "Cache-Control": "private, no-store",
    },
  });
}
