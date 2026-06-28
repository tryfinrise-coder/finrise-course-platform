import { NextResponse, type NextRequest } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { getCurrentUser } from "@/lib/auth";
import { getProductBySlug } from "@/lib/products";
import { ownsProduct } from "@/lib/entitlements";
import { logDownload } from "@/lib/downloads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STORAGE_DIR = path.join(process.cwd(), "storage");

const CONTENT_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".zip": "application/zip",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: { product: string } }
) {
  // Must be logged in (middleware also enforces this).
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const product = await getProductBySlug(params.product);
  if (!product || !product.file_path) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Entitlement check — a valid link without ownership is denied, so links can't leak.
  if (user.role !== "admin" && !(await ownsProduct(user.id, product.id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Resolve safely inside the storage dir (no path traversal).
  const safe = path
    .normalize(product.file_path)
    .replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(STORAGE_DIR, safe);
  if (!filePath.startsWith(STORAGE_DIR) || !fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File missing" }, { status: 404 });
  }

  const data = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const type = CONTENT_TYPES[ext] || "application/octet-stream";
  const downloadName = `${product.slug}${ext}`;

  // analytics: record the download (best-effort, never blocks the stream)
  logDownload(user.id, product.id).catch(() => {});

  return new NextResponse(data, {
    status: 200,
    headers: {
      "Content-Type": type,
      "Content-Disposition": `attachment; filename="${downloadName}"`,
      "Content-Length": String(data.length),
      "Cache-Control": "private, no-store",
    },
  });
}
