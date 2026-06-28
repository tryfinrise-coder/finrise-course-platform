// ─────────────────────────────────────────────────────────────────────────
// Candlestick Mastery — course manifest.
//
// Convention: every course is a self-contained folder under src/courses/<slug>/
// exporting its own content. To launch a NEW course later, copy this folder,
// change the slug/title, and provide its content modules — no shared code needs
// to change. The lesson UI reads `getSimpleContent(slug)` to render the
// beginner-friendly, bilingual explainer + FAQs.
// ─────────────────────────────────────────────────────────────────────────

import { SIMPLE, type SimpleLessonContent } from "./simplified";
import { SIMPLE_PATTERNS } from "./simplified-patterns";

export const COURSE_SLUG = "candlestick-mastery";
export const COURSE_TITLE = "Candlestick Mastery";

// foundations + hand-written + the full pattern set — every lesson is covered
const ALL_SIMPLE: Record<string, SimpleLessonContent> = { ...SIMPLE, ...SIMPLE_PATTERNS };

export { SIMPLE };
export type { SimpleLessonContent };

export function getSimpleContent(lessonSlug: string): SimpleLessonContent | undefined {
  return ALL_SIMPLE[lessonSlug];
}
