"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { submitForm, type SubmitResult } from "@/lib/forms";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { TLink } from "@/components/ui/TLink";

export interface FieldSpec {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  autoComplete?: string;
  options?: Array<{ value: string; label: string }>;
  half?: boolean;
  hint?: string;
}

interface Props {
  kind: "enquiry" | "volunteer";
  fields: FieldSpec[];
  subject: (values: Record<string, string>) => string;
  submitLabel: string;
  /** Values to pre-fill (and update when they change), e.g. a reason from the URL. */
  preset?: Record<string, string>;
  className?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Accessible form for a static site. Validates in the browser, then sends via
 * the configured form service or hands off to email/WhatsApp (see lib/forms.ts).
 */
export function StaticForm({ kind, fields, subject, submitLabel, preset, className }: Props) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(fields.map((f) => [f.name, preset?.[f.name] ?? ""])));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | SubmitResult["status"]>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!preset) return;
    // Sync externally chosen values (e.g. a volunteer area picked elsewhere on the page).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues((v) => ({ ...v, ...Object.fromEntries(Object.entries(preset).filter(([, val]) => val)) }));
  }, [preset]);

  const validate = (name: string, value: string) => {
    const f = fields.find((x) => x.name === name)!;
    if (f.required && !value.trim()) return `Enter your ${f.label.toLowerCase()}.`;
    if (f.type === "email" && value && !EMAIL.test(value)) return "Enter an email address like name@example.com.";
    if (f.type === "tel" && value && value.replace(/[^\d]/g, "").length < 9) return "Enter a phone number with at least 9 digits.";
    return "";
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    for (const f of fields) {
      const err = validate(f.name, values[f.name] ?? "");
      if (err) next[f.name] = err;
    }
    setErrors(next);
    const firstBad = fields.find((f) => next[f.name]);
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad.name}"]`)?.focus();
      return;
    }
    setState("sending");
    const result = await submitForm(kind, subject(values), values);
    setState(result.status);
    if (result.status === "error") setMessage(result.message);
  };

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: validate(name, value) }));
  };

  if (state === "sent" || state === "handoff") {
    return (
      <div role="status" className={cn("rounded-[1.75rem] border border-[var(--hairline)] p-8 lg:p-12", className)}>
        <span className="grid size-14 place-items-center rounded-full bg-[var(--cta-bg)] text-[var(--cta-fg)]">
          <Check aria-hidden className="size-6" />
        </span>
        <p className="display mt-6 text-4xl">{state === "sent" ? "Message sent." : "Almost there."}</p>
        <p className="mt-3 max-w-md text-[var(--muted)]">
          {state === "sent"
            ? "Thank you for reaching out. Someone from the Foundation will reply as soon as they can."
            : "Your message is ready in your email or WhatsApp app. Press send there to reach the Foundation."}
        </p>
        <button type="button" onClick={() => setState("idle")} className="u-link-static mt-6 font-medium">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className={cn("grid gap-x-6 gap-y-7 sm:grid-cols-2", className)}>
      {fields.map((f) => {
        const id = `${uid}-${f.name}`;
        const err = errors[f.name];
        const describedBy = [err ? `${id}-err` : "", f.hint ? `${id}-hint` : ""].filter(Boolean).join(" ") || undefined;
        const common = {
          id,
          name: f.name,
          required: f.required,
          "aria-required": f.required || undefined,
          "aria-invalid": err ? true : undefined,
          "aria-describedby": describedBy,
          autoComplete: f.autoComplete,
          value: values[f.name] ?? "",
          onBlur: () => setErrors((er) => ({ ...er, [f.name]: validate(f.name, values[f.name] ?? "") })),
          className: cn(
            "peer block w-full rounded-none border-0 border-b bg-transparent px-0 pb-3 pt-7 text-[1.08rem] text-[var(--fg)] outline-none transition-colors duration-300 placeholder:text-transparent focus:border-[var(--accent)] focus:shadow-[0_1px_0_0_var(--accent)]",
            err ? "border-[#b3261e]" : "border-[var(--hairline)] hover:border-[var(--muted)]",
          ),
        };
        return (
          <div key={f.name} className={cn("relative", !f.half && "sm:col-span-2")}>
            {f.type === "textarea" ? (
              <textarea {...common} rows={5} placeholder=" " onChange={(e) => set(f.name, e.target.value)} className={cn(common.className, "resize-y")} />
            ) : f.type === "select" ? (
              <>
                <select {...common} onChange={(e) => set(f.name, e.target.value)} className={cn(common.className, "cursor-pointer appearance-none pr-8")}>
                  <option value="" disabled hidden />
                  {f.options!.map((o) => (
                    <option key={o.value} value={o.value} className="text-charcoal">
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden className="pointer-events-none absolute bottom-4 right-0 size-4 text-[var(--muted)]" />
              </>
            ) : (
              <input {...common} type={f.type ?? "text"} placeholder=" " onChange={(e) => set(f.name, e.target.value)} />
            )}
            <label
              htmlFor={id}
              className={cn(
                "pointer-events-none absolute left-0 origin-left text-[1.08rem] text-[var(--muted)] transition-all duration-300 ease-[var(--ease-out-expo)]",
                "peer-focus:top-0 peer-focus:scale-[0.8] peer-focus:text-[var(--fg)]",
                // A select has no placeholder to key off, so it floats its label whenever it holds a value
                // (including values chosen elsewhere on the page); only one position class applies at a time.
                f.type === "select"
                  ? values[f.name]
                    ? "top-0 scale-[0.8]"
                    : "top-7"
                  : "top-7 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.8]",
              )}
            >
              {f.label}
              {f.required ? <span aria-hidden> *</span> : <span className="ml-1.5 text-[0.85em] opacity-70">(optional)</span>}
            </label>
            {f.hint && !err && (
              <p id={`${id}-hint`} className="mt-2 text-sm text-[var(--muted)]">
                {f.hint}
              </p>
            )}
            <AnimatePresence>
              {err && (
                <motion.p
                  id={`${id}-err`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 text-sm font-medium text-[#b3261e] [[data-tone=charcoal]_&]:text-[#f2b8b5] [[data-tone=olive]_&]:text-[#f2b8b5] [[data-tone=terracotta]_&]:text-ivory"
                >
                  {err}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm text-[var(--muted)]">Fields marked * are required. We only use your details to reply to you.</p>
        <button
          type="submit"
          disabled={state === "sending"}
          className="group/s relative isolate inline-flex h-14 shrink-0 items-center gap-3 self-start overflow-hidden whitespace-nowrap rounded-full bg-[var(--cta-bg)] pl-7 pr-2 font-medium text-[var(--cta-fg)] transition-colors duration-500 hover:text-[var(--cta-hover-fg)] disabled:opacity-60"
        >
          <span aria-hidden className="absolute inset-0 -z-10 translate-y-full rounded-full bg-[var(--cta-hover)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/s:translate-y-0" />
          {state === "sending" ? "Sending…" : submitLabel}
          <span className="grid size-10 place-items-center rounded-full bg-[var(--cta-fg)] text-[var(--cta-bg)]">
            <ArrowRight aria-hidden className="size-4 transition-transform duration-500 group-hover/s:translate-x-1" />
          </span>
        </button>
      </div>

      <div aria-live="polite" className="sm:col-span-2">
        {state === "error" && <p className="rounded-2xl border border-[#b3261e]/40 p-4 text-[0.95rem]">{message}</p>}
        {state === "unavailable" && (
          <p className="rounded-2xl border border-dashed border-[var(--hairline)] p-5 text-[0.95rem]">
            Online messages aren&apos;t connected yet, so this form can&apos;t send. Please try again soon
            {site.contact.phone ? `, or call ${site.contact.phone}` : ""}. You can also{" "}
            <TLink href="/get-involved" className="u-link-static">
              explore ways to get involved
            </TLink>
            .
          </p>
        )}
      </div>
    </form>
  );
}
