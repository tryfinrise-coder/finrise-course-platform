import "server-only";
import mysql, { type Pool, type RowDataPacket, type ResultSetHeader } from "mysql2/promise";

// ---------------------------------------------------------------------------
// MySQL connection (pooled, singleton) via mysql2/promise.
//
// Configure with either a single connection URL (MYSQL_URL / DATABASE_URL) or
// the discrete MYSQL_HOST / MYSQL_PORT / MYSQL_USER / MYSQL_PASSWORD /
// MYSQL_DATABASE variables (see .env.example). The pool is cached on
// globalThis so Next.js dev hot-reloads don't open a new pool every time.
//
// Helpers below (query / queryOne / execute) are the only surface the rest of
// the app touches, so the driver stays isolated in this one file.
// ---------------------------------------------------------------------------

declare global {
  // eslint-disable-next-line no-var
  var __finnoraPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __finnoraSchemaReady: Promise<void> | undefined;
}

function createPool(): Pool {
  const url = process.env.MYSQL_URL || process.env.DATABASE_URL;
  if (url) {
    // dateStrings: return DATE/DATETIME as strings (matches our row types and
    // avoids React "Objects are not valid as a child (Date)" errors).
    return mysql.createPool({ uri: url, connectionLimit: 10, dateStrings: true });
  }
  return mysql.createPool({
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "finnora",
    waitForConnections: true,
    connectionLimit: 10,
    namedPlaceholders: false,
    dateStrings: true,
    charset: "utf8mb4_general_ci",
  });
}

export function getPool(): Pool {
  if (!global.__finnoraPool) {
    global.__finnoraPool = createPool();
  }
  return global.__finnoraPool;
}

// --- query helpers ----------------------------------------------------------

// SELECT returning many rows.
export async function query<T = RowDataPacket>(
  sql: string,
  params: unknown[] = []
): Promise<T[]> {
  await ensureSchema();
  const [rows] = await getPool().query<RowDataPacket[]>(sql, params);
  return rows as unknown as T[];
}

// SELECT returning a single row (or undefined).
export async function queryOne<T = RowDataPacket>(
  sql: string,
  params: unknown[] = []
): Promise<T | undefined> {
  const rows = await query<T>(sql, params);
  return rows[0];
}

// INSERT / UPDATE / DELETE. Returns insertId + affectedRows.
export async function execute(
  sql: string,
  params: unknown[] = []
): Promise<{ insertId: number; affectedRows: number }> {
  await ensureSchema();
  const [res] = await getPool().query<ResultSetHeader>(sql, params);
  return { insertId: res.insertId, affectedRows: res.affectedRows };
}

// ---------------------------------------------------------------------------
// Schema. Designed so new product types ("course" | "pdf" | "video" | "bundle")
// slot in without table changes — type lives on the products row. Runs once per
// process; the promise is memoized so concurrent first requests share one run.
// ---------------------------------------------------------------------------

const SCHEMA: string[] = [
  `CREATE TABLE IF NOT EXISTS users (
     id            INT AUTO_INCREMENT PRIMARY KEY,
     email         VARCHAR(255) NOT NULL UNIQUE,
     password_hash VARCHAR(255) NOT NULL,
     name          VARCHAR(255),
     role          VARCHAR(16) NOT NULL DEFAULT 'student',
     created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS products (
     id          INT AUTO_INCREMENT PRIMARY KEY,
     slug        VARCHAR(191) NOT NULL UNIQUE,
     title       VARCHAR(255) NOT NULL,
     type        VARCHAR(16) NOT NULL,
     price       INT NOT NULL DEFAULT 0,
     description TEXT,
     file_path   VARCHAR(512),
     cover       VARCHAR(512),
     published   TINYINT NOT NULL DEFAULT 1,
     created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS bundle_items (
     bundle_id INT NOT NULL,
     child_id  INT NOT NULL,
     PRIMARY KEY (bundle_id, child_id),
     FOREIGN KEY (bundle_id) REFERENCES products(id) ON DELETE CASCADE,
     FOREIGN KEY (child_id)  REFERENCES products(id) ON DELETE CASCADE
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS entitlements (
     id         INT AUTO_INCREMENT PRIMARY KEY,
     user_id    INT NOT NULL,
     product_id INT NOT NULL,
     source     VARCHAR(16) NOT NULL DEFAULT 'manual',
     created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     UNIQUE KEY uniq_user_product (user_id, product_id),
     FOREIGN KEY (user_id)    REFERENCES users(id) ON DELETE CASCADE,
     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS orders (
     id                  INT AUTO_INCREMENT PRIMARY KEY,
     razorpay_order_id   VARCHAR(64),
     razorpay_payment_id VARCHAR(64),
     user_id             INT,
     product_id          INT,
     email               VARCHAR(255),
     status              VARCHAR(16) NOT NULL DEFAULT 'created',
     amount              INT NOT NULL DEFAULT 0,
     created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id)    REFERENCES users(id) ON DELETE SET NULL,
     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS lessons (
     id          INT AUTO_INCREMENT PRIMARY KEY,
     product_id  INT NOT NULL,
     slug        VARCHAR(191) NOT NULL,
     title       VARCHAR(255) NOT NULL,
     sort_order  INT NOT NULL DEFAULT 0,
     pattern_key VARCHAR(64),
     body        TEXT,
     UNIQUE KEY uniq_product_slug (product_id, slug),
     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS progress (
     id           INT AUTO_INCREMENT PRIMARY KEY,
     user_id      INT NOT NULL,
     lesson_id    INT NOT NULL,
     status       VARCHAR(16) NOT NULL DEFAULT 'in_progress',
     completed_at DATETIME,
     UNIQUE KEY uniq_user_lesson (user_id, lesson_id),
     FOREIGN KEY (user_id)   REFERENCES users(id) ON DELETE CASCADE,
     FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  // ---- gamification ----
  `CREATE TABLE IF NOT EXISTS user_stats (
     user_id        INT PRIMARY KEY,
     xp             INT NOT NULL DEFAULT 0,
     current_streak INT NOT NULL DEFAULT 0,
     longest_streak INT NOT NULL DEFAULT 0,
     last_active    DATE,
     daily_goal     INT NOT NULL DEFAULT 1,
     daily_count    INT NOT NULL DEFAULT 0,
     daily_date     DATE,
     updated_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS user_badges (
     user_id     INT NOT NULL,
     badge_key   VARCHAR(48) NOT NULL,
     unlocked_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     PRIMARY KEY (user_id, badge_key),
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS xp_events (
     id         INT AUTO_INCREMENT PRIMARY KEY,
     user_id    INT NOT NULL,
     amount     INT NOT NULL,
     reason     VARCHAR(64) NOT NULL,
     created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     KEY idx_xp_user (user_id),
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  // ---- commerce: discount codes ----
  `CREATE TABLE IF NOT EXISTS discount_codes (
     id          INT AUTO_INCREMENT PRIMARY KEY,
     code        VARCHAR(48) NOT NULL UNIQUE,
     kind        VARCHAR(12) NOT NULL DEFAULT 'percent',   -- 'percent' | 'fixed'
     value       INT NOT NULL DEFAULT 0,                   -- percent (0-100) or paise
     max_uses    INT,                                      -- NULL = unlimited
     used_count  INT NOT NULL DEFAULT 0,
     active      TINYINT NOT NULL DEFAULT 1,
     expires_at  DATE,
     created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  // ---- analytics: file downloads ----
  `CREATE TABLE IF NOT EXISTS downloads (
     id         INT AUTO_INCREMENT PRIMARY KEY,
     user_id    INT,
     product_id INT,
     created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     KEY idx_dl_product (product_id),
     KEY idx_dl_user (user_id),
     FOREIGN KEY (user_id)    REFERENCES users(id) ON DELETE SET NULL,
     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  // ---- downloadable course resources (PDF / DOCX / XLSX / TXT + image) ----
  `CREATE TABLE IF NOT EXISTS course_resources (
     id          INT AUTO_INCREMENT PRIMARY KEY,
     product_id  INT NOT NULL,
     title       VARCHAR(255) NOT NULL,
     summary     TEXT,
     file_path   VARCHAR(512) NOT NULL,
     image_path  VARCHAR(512),
     kind        VARCHAR(16),
     created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     KEY idx_res_product (product_id),
     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  // additive migrations (re-runs fail harmlessly — runSchema swallows errors)
  `ALTER TABLE discount_codes ADD COLUMN starts_at DATE NULL`,
  `ALTER TABLE discount_codes ADD COLUMN min_order INT NULL`,
  `ALTER TABLE discount_codes ADD COLUMN auto_apply TINYINT NOT NULL DEFAULT 0`,
  `ALTER TABLE products ADD COLUMN hero_video VARCHAR(512) NULL`,
  `ALTER TABLE course_resources ADD COLUMN description_html MEDIUMTEXT NULL`,
  `ALTER TABLE course_resources ADD COLUMN badge VARCHAR(64) NULL`,
  `ALTER TABLE course_resources ADD COLUMN sort_order INT NOT NULL DEFAULT 0`,

  `CREATE INDEX idx_entitlements_user ON entitlements(user_id)`,
  `CREATE INDEX idx_lessons_product ON lessons(product_id)`,
  `CREATE INDEX idx_orders_user ON orders(user_id)`,

  // ---- commerce: course purchases (guest-friendly, discount-aware) ----
  `CREATE TABLE IF NOT EXISTS course_purchases (
     id            INT AUTO_INCREMENT PRIMARY KEY,
     product_id    INT,
     email         VARCHAR(255) NOT NULL,
     name          VARCHAR(255),
     phone         VARCHAR(32),
     amount        INT NOT NULL,
     discount_code VARCHAR(48),
     rp_order_id   VARCHAR(64),
     rp_payment_id VARCHAR(64),
     status        VARCHAR(16) NOT NULL DEFAULT 'created',
     created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     KEY idx_pur_status (status),
     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
];

async function runSchema(): Promise<void> {
  const pool = getPool();
  for (const stmt of SCHEMA) {
    try {
      await pool.query(stmt);
    } catch (err) {
      // CREATE INDEX has no "IF NOT EXISTS" in older MySQL; ignore "duplicate
      // key name" so re-runs stay idempotent. Re-throw anything else.
      const code = (err as { code?: string }).code;
      // CREATE INDEX / ALTER ADD COLUMN have no "IF NOT EXISTS" in older MySQL;
      // ignore "already exists" errors so additive migrations stay idempotent.
      if (code === "ER_DUP_KEYNAME" || code === "ER_DUP_FIELDNAME") continue;
      throw err;
    }
  }
}

// Memoized so the schema is ensured exactly once per process. If it fails
// (e.g. a transient connection error on first boot), the cached promise is
// cleared so the next call retries instead of caching the rejection forever.
export function ensureSchema(): Promise<void> {
  if (!global.__finnoraSchemaReady) {
    global.__finnoraSchemaReady = runSchema().catch((err) => {
      global.__finnoraSchemaReady = undefined;
      throw err;
    });
  }
  return global.__finnoraSchemaReady;
}
