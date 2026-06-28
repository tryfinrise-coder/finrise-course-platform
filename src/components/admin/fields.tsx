import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Compact, modern form fields used across the admin panel. Native <input>/
// <select> under the hood (so they submit with server-action forms), but
// fully restyled — no browser-default "black" borders. ~36px tall.

const base =
  "h-9 w-full rounded-lg border border-input bg-card px-3 text-[13px] font-medium text-foreground outline-none transition-all " +
  "placeholder:font-normal placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/50";

export function Field({
  label,
  className,
  children,
}: {
  label?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      {label && (
        <span className="mb-1 block text-xs font-semibold text-muted-foreground">{label}</span>
      )}
      {children}
    </label>
  );
}

export function TextField({
  label,
  className,
  ...props
}: { label?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Field label={label} className={className}>
      <input className={base} {...props} />
    </Field>
  );
}

export function SelectField({
  label,
  className,
  children,
  ...props
}: { label?: string; className?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Field label={label} className={className}>
      <div className="relative">
        <select className={cn(base, "cursor-pointer appearance-none pr-9")} {...props}>
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </Field>
  );
}

export function DateField({
  label,
  className,
  ...props
}: { label?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Field label={label} className={className}>
      <input type="date" className={cn(base, "cursor-pointer [color-scheme:light]")} {...props} />
    </Field>
  );
}

export function TextArea({
  label,
  className,
  ...props
}: { label?: string; className?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Field label={label} className={className}>
      <textarea
        className={cn(base, "h-auto min-h-[72px] resize-y py-2 leading-relaxed")}
        {...props}
      />
    </Field>
  );
}

// Submit button matching the field scale.
export function SubmitButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={cn(
        "inline-flex h-9 items-center rounded-lg bg-gradient-to-br from-brandblue to-primary px-4 text-[13px] font-semibold text-white shadow-[0_8px_22px_-8px_rgba(37,99,235,0.6)] transition-all hover:brightness-105 active:scale-[0.98]",
        className
      )}
    >
      {children}
    </button>
  );
}
