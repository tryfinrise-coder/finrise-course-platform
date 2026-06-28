import "server-only";
import { query, queryOne, execute } from "./db";
import type { Progress } from "./types";

export async function getProgressForProduct(
  userId: number,
  productId: number
): Promise<Record<number, Progress>> {
  const rows = await query<Progress>(
    `SELECT pr.* FROM progress pr
     JOIN lessons l ON l.id = pr.lesson_id
     WHERE pr.user_id = ? AND l.product_id = ?`,
    [userId, productId]
  );
  const map: Record<number, Progress> = {};
  for (const r of rows) map[r.lesson_id] = r;
  return map;
}

// Mark a lesson complete. Returns `firstTime: true` only when this completion
// is new (so callers can award XP exactly once).
export async function markLessonComplete(
  userId: number,
  lessonId: number
): Promise<{ firstTime: boolean }> {
  const existing = await queryOne<Progress>(
    "SELECT * FROM progress WHERE user_id = ? AND lesson_id = ?",
    [userId, lessonId]
  );
  const firstTime = !existing || existing.status !== "completed";

  await execute(
    `INSERT INTO progress (user_id, lesson_id, status, completed_at)
     VALUES (?, ?, 'completed', NOW())
     ON DUPLICATE KEY UPDATE status = 'completed', completed_at = NOW()`,
    [userId, lessonId]
  );
  return { firstTime };
}

export async function countCompleted(
  userId: number,
  productId: number
): Promise<number> {
  const row = await queryOne<{ n: number }>(
    `SELECT COUNT(*) AS n FROM progress pr
     JOIN lessons l ON l.id = pr.lesson_id
     WHERE pr.user_id = ? AND l.product_id = ? AND pr.status = 'completed'`,
    [userId, productId]
  );
  return row?.n ?? 0;
}

// Total completed lessons across all products (used for gamification badges).
export async function countCompletedAll(userId: number): Promise<number> {
  const row = await queryOne<{ n: number }>(
    "SELECT COUNT(*) AS n FROM progress WHERE user_id = ? AND status = 'completed'",
    [userId]
  );
  return row?.n ?? 0;
}
