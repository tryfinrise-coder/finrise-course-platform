import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getLessons } from "@/lib/products";
import { listResources } from "@/lib/resources";
import { formatPrice } from "@/lib/types";
import { updateProductAction, deleteProductAction, uploadFileAction, setHeroMediaAction } from "@/app/actions/admin";
import { deleteResourceAction } from "@/app/actions/adminx";
import BonusResourceForm from "@/components/admin/BonusResourceForm";
import { Card } from "@/components/ui/card";
import { TextField, SelectField, TextArea, SubmitButton } from "@/components/admin/fields";

export const dynamic = "force-dynamic";

const TYPES = ["course", "pdf", "video", "bundle"];

export default async function AdminProductDetail({ params }: { params: { id: string } }) {
  const product = await getProductById(Number(params.id));
  if (!product) notFound();

  const lessons = product.type === "course" ? await getLessons(product.id) : [];
  const resources = await listResources(product.id);

  return (
    <div className="space-y-6">
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
        ← All products
      </Link>

      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight">{product.title}</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            /{product.slug} · <span className="capitalize">{product.type}</span> · {formatPrice(product.price)} ·{" "}
            {product.published ? "Published" : "Hidden"}
          </p>
        </div>
        <form action={deleteProductAction}>
          <input type="hidden" name="id" value={product.id} />
          <input type="hidden" name="redirect" value="list" />
          <button
            type="submit"
            className="inline-flex h-9 items-center rounded-lg border border-destructive/30 bg-destructive/5 px-4 text-[13px] font-semibold text-destructive transition-colors hover:bg-destructive/10"
          >
            Delete product
          </button>
        </form>
      </div>

      {/* edit details */}
      <Card className="p-5">
        <h3 className="mb-4 font-display font-bold">Edit details</h3>
        <form action={updateProductAction} className="space-y-3">
          <input type="hidden" name="id" value={product.id} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <TextField label="Title" name="title" defaultValue={product.title} />
            <TextField label="Slug" name="slug" defaultValue={product.slug} />
            <SelectField label="Type" name="type" defaultValue={product.type}>
              {TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </SelectField>
            <TextField label="Price (₹)" name="price" type="number" min="0" defaultValue={product.price / 100} />
          </div>
          <TextArea label="Description" name="description" defaultValue={product.description ?? ""} />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <input type="checkbox" name="published" defaultChecked={product.published === 1} /> Published
            </label>
            <SubmitButton>Save changes</SubmitButton>
          </div>
        </form>
      </Card>

      {/* landing hero media */}
      <Card className="p-5">
        <h3 className="mb-1 font-display font-bold">Landing hero media</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Upload a thumbnail image shown beside the headline, or paste a video URL (YouTube / MP4) for the hero slot.
        </p>
        <form action={setHeroMediaAction} encType="multipart/form-data" className="space-y-4">
          <input type="hidden" name="id" value={product.id} />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-medium text-muted-foreground">
              Thumbnail image (shown beside the headline)
              <input
                type="file"
                name="image"
                accept="image/*"
                className="mt-1 block w-full text-xs file:mr-2 file:cursor-pointer file:rounded file:border-0 file:bg-secondary file:px-2 file:py-1 file:text-xs file:font-semibold"
              />
            </label>
            <label className="text-xs font-medium text-muted-foreground">
              Or video URL (YouTube / MP4)
              <input
                type="text"
                name="hero_video"
                defaultValue={product.hero_video ?? ""}
                placeholder="https://youtube.com/watch?v=... or https://example.com/video.mp4"
                className="mt-1 block w-full h-9 rounded-lg border border-input bg-card px-3 text-[13px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>
          {product.cover && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Current image:</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.cover} alt="Hero thumbnail" className="h-20 rounded object-cover border border-border" />
            </div>
          )}
          <SubmitButton>Save hero media</SubmitButton>
        </form>
      </Card>

      {/* downloadable file for pdf / video products */}
      {(product.type === "pdf" || product.type === "video") && (
        <Card className="p-5">
          <h3 className="mb-3 font-display font-bold">Downloadable file</h3>
          <form action={uploadFileAction} className="flex flex-wrap items-center gap-3">
            <input type="hidden" name="id" value={product.id} />
            <input
              type="file"
              name="file"
              className="text-sm file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-foreground hover:file:bg-accent"
            />
            <SubmitButton>Upload file</SubmitButton>
            {product.file_path && <span className="text-xs text-muted-foreground">current: {product.file_path}</span>}
          </form>
        </Card>
      )}

      {/* bonuses & downloadable resources */}
      <Card className="p-5">
        <h3 className="mb-1 font-display font-bold">Bonuses &amp; downloadable resources</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Each item is a sub-section in the course: upload a PDF (screener, indicator guide, AI-prompt sheet…) and write an
          HTML description shown above its download button. Students with access see these on the course page.
        </p>

        {resources.length > 0 && (
          <div className="mb-5 space-y-2">
            {resources.map((r) => (
              <details key={r.id} className="rounded-lg border border-border bg-card">
                <summary className="flex cursor-pointer list-none items-center gap-3 p-3">
                  {r.image_path ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`/download/resource/${r.id}?image=1`} alt="" className="h-10 w-10 shrink-0 rounded object-cover" />
                  ) : (
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-secondary text-[10px] font-bold uppercase text-muted-foreground">
                      {r.kind}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold">{r.title}</span>
                      {r.badge && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">{r.badge}</span>
                      )}
                      {r.description_html && (
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">HTML</span>
                      )}
                      <span className="text-[10px] text-muted-foreground">#{r.sort_order}</span>
                    </div>
                    {r.summary && <div className="truncate text-xs text-muted-foreground">{r.summary}</div>}
                  </div>
                  <span className="text-xs font-semibold text-primary">Edit ▾</span>
                  <form action={deleteResourceAction}>
                    <input type="hidden" name="id" value={r.id} />
                    <button type="submit" className="rounded-md border border-destructive/30 bg-destructive/5 px-2 py-1 text-[11px] font-semibold text-destructive hover:bg-destructive/10">
                      ✕
                    </button>
                  </form>
                </summary>
                <div className="border-t border-border p-3">
                  <BonusResourceForm productId={product.id} mode="edit" resource={r} />
                </div>
              </details>
            ))}
          </div>
        )}

        <div className="rounded-lg border border-dashed border-border p-4">
          <div className="mb-3 text-sm font-semibold">Add a new bonus / resource</div>
          <BonusResourceForm productId={product.id} mode="create" />
        </div>
      </Card>

      {/* lessons (course) — read-only overview */}
      {product.type === "course" && lessons.length > 0 && (
        <Card className="p-5">
          <h3 className="mb-3 font-display font-bold">Lessons ({lessons.length})</h3>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {lessons.map((l, i) => (
              <div key={l.id} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-secondary text-[11px] font-bold text-muted-foreground">
                  {i + 1}
                </span>
                <span className="truncate font-medium">{l.title}</span>
                {!l.pattern_key && (
                  <span className="ml-auto shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
                    Foundation
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Lessons are generated from the course content. To change them, edit the course data and restart.
          </p>
        </Card>
      )}
    </div>
  );
}
