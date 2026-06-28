"use client";

import { useState } from "react";
import { X, Pencil, Trash2, ShieldCheck, GraduationCap } from "lucide-react";
import { editUserAction, deleteUserAction, changeRoleAction, setUserPasswordAction } from "@/app/actions/adminx";
import { grantAccessAction, revokeAccessAction } from "@/app/actions/admin";
import { Combobox } from "./Combobox";

export interface Person {
  id: number;
  name: string | null;
  email: string;
  role: "student" | "admin";
  created_at: string;
  courses: { id: number; title: string }[];
}
export interface ProductLite {
  id: number;
  title: string;
  type: string;
}

function fmt(value: string) {
  if (!value) return "—";
  const [y, m, d] = value.split(" ")[0].split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function PeopleTable({
  people,
  products,
  mode,
  meId,
}: {
  people: Person[];
  products: ProductLite[];
  mode: "students" | "admins";
  meId: number;
}) {
  const [editing, setEditing] = useState<number | null>(null);
  const person = people.find((p) => p.id === editing) || null;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.08)]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-left text-[11px] uppercase tracking-wider text-slate-500">
              <th className="px-5 py-3 font-semibold">{mode === "admins" ? "Member" : "Student"}</th>
              <th className="px-5 py-3 font-semibold">Email</th>
              {mode === "students" && <th className="px-5 py-3 font-semibold">Courses</th>}
              <th className="px-5 py-3 font-semibold">{mode === "admins" ? "Role" : "Status"}</th>
              <th className="px-5 py-3 font-semibold">Joined</th>
              <th className="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {people.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-slate-400">
                  No {mode} yet.
                </td>
              </tr>
            )}
            {people.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-slate-50/70">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-sm font-bold text-slate-600">
                      {(p.name || p.email).charAt(0).toUpperCase()}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {p.name || p.email.split("@")[0]}
                      {p.id === meId && <span className="ml-1.5 text-[11px] font-normal text-slate-400">(you)</span>}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 text-slate-600">{p.email}</td>
                {mode === "students" && (
                  <td className="px-5 py-3">
                    {p.courses.length === 0 ? (
                      <span className="text-xs text-slate-400">No access</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {p.courses.slice(0, 2).map((c) => (
                          <span key={c.id} className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                            {c.title.length > 18 ? c.title.slice(0, 18) + "…" : c.title}
                          </span>
                        ))}
                        {p.courses.length > 2 && (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                            +{p.courses.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                )}
                <td className="px-5 py-3">
                  {p.role === "admin" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-2.5 py-0.5 text-[11px] font-bold text-pink-700">
                      <ShieldCheck className="h-3 w-3" /> Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                      <GraduationCap className="h-3 w-3" /> Student
                    </span>
                  )}
                </td>
                <td className="px-5 py-3 text-slate-500">{fmt(p.created_at)}</td>
                <td className="px-5 py-3">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setEditing(p.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Manage
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {person && (
        <ManageModal person={person} products={products} mode={mode} isMe={person.id === meId} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}

function ManageModal({
  person,
  products,
  mode,
  isMe,
  onClose,
}: {
  person: Person;
  products: ProductLite[];
  mode: "students" | "admins";
  isMe: boolean;
  onClose: () => void;
}) {
  const ownedIds = new Set(person.courses.map((c) => c.id));
  const grantable = products.filter((p) => !ownedIds.has(p.id));

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-bold text-white">
              {(person.name || person.email).charAt(0).toUpperCase()}
            </span>
            <div>
              <div className="text-sm font-bold text-slate-900">{person.name || person.email.split("@")[0]}</div>
              <div className="text-xs text-slate-400">{person.email}</div>
            </div>
          </div>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          {/* edit details */}
          <form action={editUserAction} className="grid gap-3 sm:grid-cols-2">
            <input type="hidden" name="id" value={person.id} />
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-500">Email</span>
              <input name="email" type="email" defaultValue={person.email} required className="h-9 w-full rounded-lg border border-slate-200 px-3 text-[13px] outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-500">Name</span>
              <input name="name" defaultValue={person.name ?? ""} className="h-9 w-full rounded-lg border border-slate-200 px-3 text-[13px] outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" />
            </label>
            <input type="hidden" name="role" value={person.role} />
            <div className="sm:col-span-2">
              <button type="submit" className="inline-flex h-9 items-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 px-4 text-[13px] font-semibold text-white shadow-sm transition hover:brightness-105">
                Save details
              </button>
            </div>
          </form>

          {/* set / reset password */}
          <div className="border-t border-slate-100 pt-4">
            <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Password</div>
            <form action={setUserPasswordAction} className="flex items-end gap-2">
              <input type="hidden" name="id" value={person.id} />
              <label className="block flex-1">
                <span className="mb-1 block text-xs font-semibold text-slate-500">Set a new password</span>
                <input
                  name="password"
                  type="text"
                  minLength={4}
                  required
                  placeholder="New password"
                  className="h-9 w-full rounded-lg border border-slate-200 px-3 text-[13px] outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </label>
              <button type="submit" className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-700 transition hover:bg-slate-50">
                Update
              </button>
            </form>
            <p className="mt-1.5 text-[11px] text-slate-400">The user can sign in with this immediately (min 4 characters).</p>
          </div>

          {/* course access (students) */}
          {mode === "students" && (
            <div className="border-t border-slate-100 pt-4">
              <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Course access</div>
              <div className="mb-3 flex flex-wrap gap-2">
                {person.courses.length === 0 && <span className="text-xs text-slate-400">No courses assigned.</span>}
                {person.courses.map((c) => (
                  <form key={c.id} action={revokeAccessAction} className="inline">
                    <input type="hidden" name="user_id" value={person.id} />
                    <input type="hidden" name="product_id" value={c.id} />
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {c.title}
                      <button type="submit" title="Revoke" className="text-emerald-400 hover:text-rose-500">✕</button>
                    </span>
                  </form>
                ))}
              </div>
              {grantable.length > 0 && (
                <form action={grantAccessAction} className="flex items-end gap-2">
                  <input type="hidden" name="user_id" value={person.id} />
                  <Combobox
                    name="product_id"
                    placeholder="Assign a course / product"
                    className="flex-1"
                    options={grantable.map((p) => ({ value: String(p.id), label: p.title, hint: p.type }))}
                  />
                  <button type="submit" className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-700 transition hover:bg-slate-50">
                    Assign
                  </button>
                </form>
              )}
            </div>
          )}

          {/* role + delete */}
          <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
            {person.role === "admin" ? (
              <form action={changeRoleAction}>
                <input type="hidden" name="id" value={person.id} />
                <input type="hidden" name="role" value="student" />
                <button type="submit" disabled={isMe} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40">
                  Demote to student
                </button>
              </form>
            ) : (
              <form action={changeRoleAction}>
                <input type="hidden" name="id" value={person.id} />
                <input type="hidden" name="role" value="admin" />
                <button type="submit" className="rounded-lg border border-pink-200 bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-700 hover:bg-pink-100">
                  Promote to admin
                </button>
              </form>
            )}
            <form action={deleteUserAction} className="ml-auto">
              <input type="hidden" name="id" value={person.id} />
              <button type="submit" disabled={isMe} className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100 disabled:opacity-40">
                <Trash2 className="h-3.5 w-3.5" /> Delete user
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
