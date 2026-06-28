import "server-only";
import { query, queryOne } from "./db";

export interface AdminKpis {
  students: number;
  admins: number;
  products: number;
  paidOrders: number;
  revenue: number; // paise
  totalDownloads: number;
  completedLessons: number;
  completionRate: number; // 0..100 — avg % of enrolled course completed
}

export async function getAdminKpis(): Promise<AdminKpis> {
  const one = async (sql: string, p: unknown[] = []) =>
    (await queryOne<{ n: number }>(sql, p))?.n ?? 0;

  const [students, admins, products, paidOrders, revenue, totalDownloads, completedLessons] =
    await Promise.all([
      one("SELECT COUNT(*) AS n FROM users WHERE role = 'student'"),
      one("SELECT COUNT(*) AS n FROM users WHERE role = 'admin'"),
      one("SELECT COUNT(*) AS n FROM products"),
      one("SELECT COUNT(*) AS n FROM orders WHERE status = 'paid'"),
      one("SELECT COALESCE(SUM(amount),0) AS n FROM orders WHERE status = 'paid'"),
      one("SELECT COUNT(*) AS n FROM downloads"),
      one("SELECT COUNT(*) AS n FROM progress WHERE status = 'completed'"),
    ]);

  // average completion across students enrolled in any course
  const rateRow = await queryOne<{ rate: number | null }>(
    `SELECT AVG(per.done / per.total) * 100 AS rate FROM (
       SELECT e.user_id,
              COUNT(DISTINCT l.id) AS total,
              COUNT(DISTINCT CASE WHEN pr.status='completed' THEN pr.lesson_id END) AS done
       FROM entitlements e
       JOIN products p ON p.id = e.product_id AND p.type = 'course'
       JOIN lessons l ON l.product_id = p.id
       LEFT JOIN progress pr ON pr.user_id = e.user_id AND pr.lesson_id = l.id
       GROUP BY e.user_id
       HAVING total > 0
     ) per`
  );

  return {
    students,
    admins,
    products,
    paidOrders,
    revenue,
    totalDownloads,
    completedLessons,
    completionRate: Math.round(rateRow?.rate ?? 0),
  };
}

export interface RecentStudent {
  id: number;
  email: string;
  name: string | null;
  created_at: string;
}

export async function recentStudents(limit = 6): Promise<RecentStudent[]> {
  return query<RecentStudent>(
    "SELECT id, email, name, created_at FROM users WHERE role = 'student' ORDER BY created_at DESC LIMIT ?",
    [limit]
  );
}
