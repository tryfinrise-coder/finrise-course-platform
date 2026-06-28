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
    redirect(searchParams.next || (user.role === "admin" ? "/admin" : "/dashboard"));
  }
  return <StudentLogin next={searchParams.next} />;
}
