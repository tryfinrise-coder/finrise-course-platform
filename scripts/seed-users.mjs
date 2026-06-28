// Create / reset login accounts with known credentials.
//
//   node --env-file=.env.local scripts/seed-users.mjs
//   (or:  npm.cmd run seed:users)
//
// With no args it creates a demo admin + student (and grants the student the
// candlestick course + cheat sheet so their library/dashboard is populated).
// Pass args to make a specific account:
//   node --env-file=.env.local scripts/seed-users.mjs <email> <password> [role] [name]
//
// Re-running is safe — it upserts and resets the password.

import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

function makeConn() {
  const url = process.env.MYSQL_URL || process.env.DATABASE_URL;
  if (url) return mysql.createConnection(url);
  return mysql.createConnection({
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "finnora",
  });
}

const GRANT_SLUGS = ["candlestick-mastery", "candlestick-cheat-sheet"];

async function upsertUser(conn, { email, password, role, name }) {
  const hash = bcrypt.hashSync(password, 10);
  email = email.trim().toLowerCase();
  await conn.query(
    `INSERT INTO users (email, password_hash, name, role)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash),
       role = VALUES(role), name = VALUES(name)`,
    [email, hash, name ?? null, role]
  );
  const [rows] = await conn.query("SELECT id FROM users WHERE email = ?", [email]);
  return rows[0].id;
}

async function grantCourse(conn, userId) {
  for (const slug of GRANT_SLUGS) {
    const [p] = await conn.query("SELECT id FROM products WHERE slug = ?", [slug]);
    if (p[0]) {
      await conn.query(
        "INSERT IGNORE INTO entitlements (user_id, product_id, source) VALUES (?, ?, 'manual')",
        [userId, p[0].id]
      );
    }
  }
}

async function main() {
  const [, , email, password, role, name] = process.argv;
  const conn = await makeConn();

  try {
    const created = [];

    if (email && password) {
      const id = await upsertUser(conn, {
        email,
        password,
        role: role === "admin" ? "admin" : "student",
        name: name || null,
      });
      if ((role || "student") !== "admin") await grantCourse(conn, id);
      created.push({ email: email.toLowerCase(), password, role: role || "student" });
    } else {
      // default demo accounts
      const admin = { email: "admin@tryfinrise.com", password: "admin1234", role: "admin", name: "Finrise Admin" };
      const student = { email: "student@tryfinrise.com", password: "student1234", role: "student", name: "Demo Student" };
      const aId = await upsertUser(conn, admin);
      await grantCourse(conn, aId);
      const sId = await upsertUser(conn, student);
      await grantCourse(conn, sId);
      created.push(admin, student);
    }

    console.log("\n✅ Accounts ready:\n");
    for (const c of created) {
      console.log(`  ${c.role.toUpperCase().padEnd(7)}  ${c.email.padEnd(26)}  password: ${c.password}`);
    }
    console.log("\nLog in at /login (or http://courses.localhost:3000).\n");
  } catch (err) {
    if (err.code === "ER_NO_SUCH_TABLE") {
      console.error(
        "\n❌ Tables don't exist yet. Start the app once (npm.cmd run dev) and load any page so the schema is created, then re-run this.\n"
      );
    } else {
      console.error(`\n❌ ${err.message}\n`);
    }
    process.exitCode = 1;
  } finally {
    await conn.end();
  }
}

main();
