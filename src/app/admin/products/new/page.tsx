import Link from "next/link";
import { createProductAction } from "@/app/actions/admin";
import { Card } from "@/components/ui/card";
import { TextField, SelectField, TextArea, SubmitButton } from "@/components/admin/fields";

export const dynamic = "force-dynamic";

const TYPES = ["course", "pdf", "video", "bundle"];

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
        ← All products
      </Link>

      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight">New product</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Create the product, then add files, resources and pricing on its editor.
        </p>
      </div>

      <Card className="p-6">
        <form action={createProductAction} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Title" name="title" placeholder="Candlestick Mastery" required />
            <TextField label="Slug (URL)" name="slug" placeholder="candlestick-mastery" required />
            <SelectField label="Type" name="type" defaultValue="course">
              {TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </SelectField>
            <TextField label="Price (₹)" name="price" type="number" min="0" step="1" defaultValue={0} />
          </div>
          <TextArea label="Description" name="description" placeholder="What the student gets…" />
          <div className="flex items-center justify-between border-t border-border pt-4">
            <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <input type="checkbox" name="published" defaultChecked /> Publish immediately
            </label>
            <div className="flex items-center gap-2">
              <Link
                href="/admin/products"
                className="inline-flex h-9 items-center rounded-lg border border-input bg-card px-4 text-[13px] font-semibold transition-colors hover:bg-accent"
              >
                Cancel
              </Link>
              <SubmitButton>Create product</SubmitButton>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
