import Link from "next/link";

interface NavLesson {
  id: number;
  slug: string;
  title: string;
  pattern_key: string | null;
}

// Left-hand course-modules navigator shown on every lesson page so students can
// jump between modules and see where they are.
export default function LessonModulesNav({
  lessons,
  currentSlug,
  courseSlug,
}: {
  lessons: NavLesson[];
  currentSlug: string;
  courseSlug: string;
}) {
  const foundations = lessons.filter((l) => !l.pattern_key);
  const patterns = lessons.filter((l) => l.pattern_key);

  const item = (l: NavLesson, n: number) => (
    <Link
      key={l.id}
      href={`/courses/${courseSlug}/${l.slug}`}
      className={`lnav-item${l.slug === currentSlug ? " active" : ""}`}
    >
      <span className="lnav-num">{n}</span>
      <span className="lnav-title">{l.title}</span>
    </Link>
  );

  return (
    <nav className="lnav" aria-label="Course modules">
      <div className="lnav-head">
        <span className="lnav-head-title">Course modules</span>
        <span className="lnav-head-count">{lessons.length}</span>
      </div>
      <Link href={`/courses/${courseSlug}`} className="lnav-back">
        ← Course home
      </Link>
      {foundations.length > 0 && (
        <>
          <div className="lnav-group">Foundations</div>
          {foundations.map((l, i) => item(l, i + 1))}
        </>
      )}
      <div className="lnav-group">Patterns</div>
      {patterns.map((l, i) => item(l, i + 1))}
    </nav>
  );
}
