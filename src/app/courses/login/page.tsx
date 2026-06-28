import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import StudentLogin from "@/app/login/StudentLogin";

export const dynamic = "force-dynamic";

// Student-friendly login URL: /courses/login (alias of the student login).
export default async function CoursesLoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const user = await getCurrentUser();
  if (user) {
    // /courses/login always lands on the student dashboard — never the admin panel.
    // Admin users who click the student email link should reach /dashboard, not /admin.
    redirect(searchParams.next || "/dashboard");
  }
  return <StudentLogin next={searchParams.next} />;
}
