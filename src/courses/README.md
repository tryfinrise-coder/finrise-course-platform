# Courses

Each course is a self-contained folder here: `src/courses/<course-slug>/`.
This keeps course-specific content separate so new courses can be launched
without touching shared platform code.

## Folder shape

```
src/courses/<slug>/
  index.ts        course manifest — slug, title, and content getters
  simplified.ts   beginner-friendly, bilingual (EN/हिन्दी) explainers + FAQs,
                  keyed by lesson slug
```

## Adding a new course

1. Create `src/courses/<new-slug>/` (copy `candlestick-mastery` as a template).
2. Set `COURSE_SLUG` / `COURSE_TITLE` and fill in `simplified.ts`.
3. Seed its product + lessons (see `src/lib/bootstrap.ts` for the pattern).

The lesson page calls `getSimpleContent(lessonSlug)` to render the "In simple
words" card (with the Hindi toggle) and the learning FAQs whenever content
exists for that lesson — so partially-authored courses degrade gracefully.

> Note: the candlestick **chart/animation data** (OHLC series, callouts) still
> lives in `src/data/patterns.ts` because it powers the shared Pattern Player.
> Per-course *teaching* content lives here under `src/courses/`.
