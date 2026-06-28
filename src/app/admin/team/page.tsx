import { listUsersByRole } from "@/lib/users";
import { getCurrentUser } from "@/lib/auth";
import { createTeamMemberAction } from "@/app/actions/adminx";
import { PeopleTable, type Person } from "@/components/admin/PeopleTable";
import { Card } from "@/components/ui/card";
import { TextField, SubmitButton } from "@/components/admin/fields";

export const dynamic = "force-dynamic";

export default async function AdminTeam() {
  const [admins, me] = await Promise.all([listUsersByRole("admin"), getCurrentUser()]);

  const people: Person[] = admins.map((a) => ({
    id: a.id,
    name: a.name,
    email: a.email,
    role: "admin",
    created_at: a.created_at,
    courses: [],
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">Team</h2>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            {admins.length} admin{admins.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <Card className="p-5">
        <h3 className="mb-1 font-display font-bold">Add an admin / employee</h3>
        <p className="mb-4 text-sm text-muted-foreground">They&apos;ll get full management access. Leave the password blank to auto-generate one.</p>
        <form action={createTeamMemberAction} className="space-y-3">
          <input type="hidden" name="role" value="admin" />
          <div className="grid gap-3 sm:grid-cols-3">
            <TextField label="Email" name="email" type="email" required />
            <TextField label="Name" name="name" />
            <TextField label="Password" name="password" placeholder="auto-generate" />
          </div>
          <SubmitButton>Add admin</SubmitButton>
        </form>
      </Card>

      <PeopleTable people={people} products={[]} mode="admins" meId={me?.id ?? 0} />
    </div>
  );
}
