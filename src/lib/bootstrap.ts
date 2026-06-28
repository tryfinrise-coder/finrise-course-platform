import "server-only";
import { execute, ensureSchema } from "./db";
import { findUserByEmail, createUser } from "./users";
import { getProductBySlug, createProduct } from "./products";
import { grantEntitlement } from "./entitlements";
import { PATTERN_ORDER, PATTERNS } from "@/data/patterns";
import { FOUNDATIONS } from "@/data/courseContent";

// Idempotent first-run setup: schema, default admin, the flagship candlestick
// course with one lesson per pattern, and a sample PDF product. The promise is
// memoized so it runs once per server process even though it's awaited from the
// root layout on every request.

let ready: Promise<void> | undefined;

export function ensureBootstrapped(): Promise<void> {
  if (!ready) ready = bootstrap();
  return ready;
}

async function bootstrap(): Promise<void> {
  // Don't touch the DB during `next build` — seeding/schema happen lazily on the
  // first real request, so the build never needs a live MySQL connection.
  if (process.env.NEXT_PHASE === "phase-production-build") return;

  try {
    await ensureSchema();
    await seedAdmin();
    await seedCandlestickCourse();
    await seedSamplePdf();
  } catch (err) {
    // Reset so a later request can retry (e.g. transient connection issues on
    // first boot before MySQL is reachable).
    ready = undefined;
    console.warn("[bootstrap] deferred:", (err as Error).message);
  }
}

async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL || "admin@tryfinrise.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "admin1234";
  if (!(await findUserByEmail(email))) {
    await createUser({ email, password, name: "Finrise Admin", role: "admin" });
    console.log(`[bootstrap] created admin account: ${email}`);
  }
}

async function seedCandlestickCourse() {
  let course = await getProductBySlug("candlestick-mastery");
  if (!course) {
    course = await createProduct({
      slug: "candlestick-mastery",
      title: "Candlestick Mastery — Interactive Pattern Course",
      type: "course",
      price: 299900, // ₹2,999
      description:
        "Learn candlestick patterns the way they actually happen — as living, tick-by-tick price action. Watch each candle form, feel the bull-vs-bear pressure, and sculpt candles with your own hands.",
    });
  }

  // Foundations first (text lessons, no pattern_key), then the patterns.
  for (let i = 0; i < FOUNDATIONS.length; i++) {
    const f = FOUNDATIONS[i];
    await execute(
      `INSERT INTO lessons (product_id, slug, title, sort_order, pattern_key, body)
       VALUES (?, ?, ?, ?, NULL, ?)
       ON DUPLICATE KEY UPDATE
         title = VALUES(title), sort_order = VALUES(sort_order),
         pattern_key = NULL, body = VALUES(body)`,
      [course.id, f.slug, f.title, i, f.tagline]
    );
  }

  const offset = FOUNDATIONS.length;
  for (let i = 0; i < PATTERN_ORDER.length; i++) {
    const key = PATTERN_ORDER[i];
    const p = PATTERNS[key];
    await execute(
      `INSERT INTO lessons (product_id, slug, title, sort_order, pattern_key, body)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         title = VALUES(title),
         sort_order = VALUES(sort_order),
         pattern_key = VALUES(pattern_key),
         body = VALUES(body)`,
      [course.id, key, p.name, offset + i, key, p.description]
    );
  }

  await grantAdminAccess(course.id);
}

async function seedSamplePdf() {
  let pdf = await getProductBySlug("candlestick-cheat-sheet");
  if (!pdf) {
    pdf = await createProduct({
      slug: "candlestick-cheat-sheet",
      title: "Candlestick Cheat Sheet (PDF)",
      type: "pdf",
      price: 49900, // ₹499
      description:
        "A one-page printable reference of the eight launch patterns and what each one signals.",
      file_path: "candlestick-cheat-sheet.txt",
    });
  }
  await grantAdminAccess(pdf.id);
}

async function grantAdminAccess(productId: number) {
  const admin = await findUserByEmail(
    (process.env.ADMIN_EMAIL || "admin@tryfinrise.com").toLowerCase()
  );
  if (admin) await grantEntitlement(admin.id, productId, "manual");
}
