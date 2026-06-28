import "server-only";
import { query, queryOne, execute } from "./db";

// Log a protected-file download (called from the download route).
export async function logDownload(userId: number, productId: number): Promise<void> {
  await execute(
    "INSERT INTO downloads (user_id, product_id) VALUES (?, ?)",
    [userId, productId]
  );
}

export async function totalDownloads(): Promise<number> {
  const r = await queryOne<{ n: number }>("SELECT COUNT(*) AS n FROM downloads");
  return r?.n ?? 0;
}

export interface DownloadByProduct {
  product_id: number;
  title: string | null;
  downloads: number;
}

export async function downloadsByProduct(): Promise<DownloadByProduct[]> {
  return query<DownloadByProduct>(
    `SELECT d.product_id, p.title, COUNT(*) AS downloads
     FROM downloads d
     LEFT JOIN products p ON p.id = d.product_id
     GROUP BY d.product_id, p.title
     ORDER BY downloads DESC`
  );
}
