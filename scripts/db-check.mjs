// Quick MySQL connection check. Run with Node 24's built-in env loader:
//   node --env-file=.env.local scripts/db-check.mjs
// (or:  npm.cmd run db:check)
//
// Verifies the MYSQL_* settings in .env.local can actually connect, and prints
// a friendly diagnosis when they can't — so you can fix credentials before
// starting the dev server.

import mysql from "mysql2/promise";

const url = process.env.MYSQL_URL || process.env.DATABASE_URL;
const cfg = url
  ? { uri: url }
  : {
      host: process.env.MYSQL_HOST || "127.0.0.1",
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "finnora",
    };

const shown = url
  ? `MYSQL_URL=${url.replace(/:[^:@/]*@/, ":****@")}`
  : `host=${cfg.host} port=${cfg.port} user=${cfg.user} database=${cfg.database} password=${
      cfg.password ? "(set)" : "(EMPTY)"
    }`;

console.log("Connecting with:", shown);

try {
  const conn = url
    ? await mysql.createConnection(url)
    : await mysql.createConnection(cfg);
  const [rows] = await conn.query("SELECT VERSION() AS v");
  console.log(`✅ Connected. MySQL version: ${rows[0].v}`);
  await conn.end();
  process.exit(0);
} catch (err) {
  console.error(`\n❌ Connection failed: ${err.message}\n`);
  const code = err.code || "";
  if (code === "ER_ACCESS_DENIED_ERROR") {
    if (/using password: NO/i.test(err.message)) {
      console.error(
        "→ No password was sent. Set MYSQL_PASSWORD in .env.local (it's currently empty),\n" +
          "  then re-run. Remember to restart the dev server after editing .env.local."
      );
    } else {
      console.error("→ Wrong user or password. Double-check MYSQL_USER / MYSQL_PASSWORD.");
    }
  } else if (code === "ER_BAD_DB_ERROR") {
    console.error(
      `→ The database doesn't exist yet. Create it:  CREATE DATABASE ${cfg.database || "finnora"};`
    );
  } else if (code === "ECONNREFUSED") {
    console.error(
      "→ Nothing is listening on that host/port. Is the MySQL server running, and are MYSQL_HOST/MYSQL_PORT correct?"
    );
  }
  process.exit(1);
}
