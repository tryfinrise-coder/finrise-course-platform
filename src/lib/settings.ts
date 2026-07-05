import "server-only";
import { query, execute } from "./db";

// Small key/value store for editable bits of site content (e.g. the income-proof
// screenshot on the playbook landing page) that shouldn't require a code change.

export async function getSetting(name: string): Promise<string | null> {
  const rows = await query<{ value: string | null }>(
    "SELECT value FROM site_settings WHERE name = ?",
    [name]
  );
  return rows[0]?.value ?? null;
}

export async function setSetting(name: string, value: string | null): Promise<void> {
  await execute(
    `INSERT INTO site_settings (name, value) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE value = VALUES(value)`,
    [name, value]
  );
}

// Convenience: fetch several settings at once as a { name: value } map.
export async function getSettings(names: string[]): Promise<Record<string, string | null>> {
  if (names.length === 0) return {};
  const placeholders = names.map(() => "?").join(",");
  const rows = await query<{ name: string; value: string | null }>(
    `SELECT name, value FROM site_settings WHERE name IN (${placeholders})`,
    names
  );
  const out: Record<string, string | null> = {};
  for (const n of names) out[n] = null;
  for (const r of rows) out[r.name] = r.value;
  return out;
}
