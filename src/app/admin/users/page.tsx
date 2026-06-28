import { listUsersByRole } from "@/lib/users";
import { listProducts } from "@/lib/products";
import { directEntitlementProducts } from "@/lib/entitlements";
import { getCurrentUser } from "@/lib/auth";
import { createUserAction } from "@/app/actions/admin";
import { Combobox } from "@/components/admin/Combobox";
import { PeopleTable, type Person } from "@/components/admin/PeopleTable";
import { Card } from "@/components/ui/card";
import { TextField, SubmitButton } from "@/components/admin/fields";

export const dynamic = "force-dynamic";

export default async function AdminStudents() {
  const [students, products, me] = await Promise.all([
    listUsersByRole("student"),
    listProducts(),
    getCurrentUser(),
  ]);
  const courseLists = await Promise.all(students.map((s) => directEntitlementProducts(s.id)));

  const people: Person[] = students.map((s, i) => ({
    id: s.id,
    name: s.name,
    email: s.email,
    role: "student",
    created_at: s.created_at,
    courses: courseLists[i].map((p) => ({ id: p.id, title: p.title })),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">Students</h2>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            {students.length} enrolled
          </span>
        </div>
      </div>

      <Card className="p-5">
        <h3 className="mb-1 font-display font-bold">Create student login</h3>
        <p className="mb-4 text-sm text-muted-foreground">Leave the password blank to auto-generate one. Optionally assign a course right away.</p>
        <form action={createUserAction} className="space-y-3">
          <input type="hidden" name="role" value="student" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <TextField label="Email" name="email" type="email" required />
            <TextField label="Name" name="name" />
            <TextField label="Password" name="password" placeholder="auto-generate" />
            <Combobox
              label="Assign course"
              name="grant_product_id"
              defaultValue="0"
              options={[
                { value: "0", label: "— none —" },
                ...products.map((p) => ({ value: String(p.id), label: p.title, hint: p.type })),
              ]}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <input type="checkbox" name="send_email" /> Email login credentials
            </label>
            <SubmitButton>Create student</SubmitButton>
          </div>
        </form>
      </Card>

      <PeopleTable people={people} products={products} mode="students" meId={me?.id ?? 0} />
    </div>
  );
}
