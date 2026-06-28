import "server-only";
import { query, queryOne, execute } from "./db";

export interface CourseResource {
  id: number;
  product_id: number;
  title: string;
  summary: string | null;
  description_html: string | null;
  badge: string | null;
  sort_order: number;
  file_path: string;
  image_path: string | null;
  kind: string | null;
  created_at: string;
}

export async function listResources(productId: number): Promise<CourseResource[]> {
  return query<CourseResource>(
    "SELECT * FROM course_resources WHERE product_id = ? ORDER BY sort_order ASC, created_at DESC",
    [productId]
  );
}

export async function getResource(id: number): Promise<CourseResource | undefined> {
  return queryOne<CourseResource>("SELECT * FROM course_resources WHERE id = ?", [id]);
}

export async function createResource(input: {
  product_id: number;
  title: string;
  summary: string | null;
  description_html?: string | null;
  badge?: string | null;
  sort_order?: number;
  file_path: string;
  image_path: string | null;
  kind: string | null;
}): Promise<void> {
  await execute(
    `INSERT INTO course_resources
       (product_id, title, summary, description_html, badge, sort_order, file_path, image_path, kind)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.product_id,
      input.title,
      input.summary,
      input.description_html ?? null,
      input.badge ?? null,
      input.sort_order ?? 0,
      input.file_path,
      input.image_path,
      input.kind,
    ]
  );
}

// Update the editable fields of a resource. File / image / kind are only
// changed when a replacement is supplied (undefined = leave as-is).
export async function updateResource(input: {
  id: number;
  title: string;
  summary: string | null;
  description_html: string | null;
  badge: string | null;
  sort_order: number;
  file_path?: string;
  image_path?: string;
  kind?: string;
}): Promise<void> {
  const sets = [
    "title = ?",
    "summary = ?",
    "description_html = ?",
    "badge = ?",
    "sort_order = ?",
  ];
  const params: (string | number | null)[] = [
    input.title,
    input.summary,
    input.description_html,
    input.badge,
    input.sort_order,
  ];
  if (input.file_path !== undefined) {
    sets.push("file_path = ?", "kind = ?");
    params.push(input.file_path, input.kind ?? null);
  }
  if (input.image_path !== undefined) {
    sets.push("image_path = ?");
    params.push(input.image_path);
  }
  params.push(input.id);
  await execute(`UPDATE course_resources SET ${sets.join(", ")} WHERE id = ?`, params);
}

export async function deleteResource(id: number): Promise<void> {
  await execute("DELETE FROM course_resources WHERE id = ?", [id]);
}

// Map a filename's extension to a friendly kind label.
export function resourceKind(filename: string): string {
  const ext = (filename.split(".").pop() || "").toLowerCase();
  if (ext === "pdf") return "pdf";
  if (ext === "doc" || ext === "docx") return "docx";
  if (ext === "xls" || ext === "xlsx" || ext === "csv") return "xlsx";
  if (ext === "txt" || ext === "md" || ext === "rtf") return "txt";
  return "file";
}
