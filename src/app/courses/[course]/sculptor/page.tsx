import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/shell/AppShell";
import { requireUser } from "@/lib/auth";
import { getProductBySlug } from "@/lib/products";
import { ownsProduct } from "@/lib/entitlements";
import CandleSculptor from "@/components/chart/CandleSculptor";

export const dynamic = "force-dynamic";

export default async function SculptorPage({
  params,
}: {
  params: { course: string };
}) {
  const user = await requireUser(`/courses/${params.course}/sculptor`);
  const product = await getProductBySlug(params.course);
  if (!product || product.type !== "course") notFound();
  if (user.role !== "admin" && !(await ownsProduct(user.id, product.id))) notFound();

  return (
    <AppShell active="sculptor" title="Candle Sculptor" narrow>
      <Link href={`/courses/${product.slug}`} className="faint" style={{ fontSize: 13 }}>
        ← {product.title}
      </Link>
      <h1 style={{ fontSize: 26, marginTop: 8 }}>The Candle Sculptor</h1>
      <p style={{ marginTop: 0, maxWidth: 680 }}>
        Drag the open, high, low, and close. The candle reshapes live and the app names the
        pattern in real time — the fastest way to build hands-on intuition.
      </p>
      <div style={{ marginTop: 16 }}>
        <CandleSculptor />
      </div>
    </AppShell>
  );
}
