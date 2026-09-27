"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { submitForm } from "@/lib/forms";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** "Stay connected": a one-field sign-up for news of projects and ways to help. */
export function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "invalid" | "sending" | "sent" | "handoff" | "unavailable" | "error">("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email)) {
      setState("invalid");
      return;
    }
    setState("sending");
    const result = await submitForm("newsletter", "Newsletter sign-up", { email });
    setState(result.status);
  };

  if (state === "sent" || state === "handoff") {
    return (
      <p role="status" className="flex items-start gap-3">
        <Check aria-hidden className="mt-1 size-5 shrink-0 text-gold" />
        {state === "sent" ? "You're on the list. We'll be in touch with news of the work." : "Almost there: send the message that just opened to finish signing up."}
      </p>
    );
  }

  const message =
    state === "invalid"
      ? "Enter an email address like name@example.com."
      : state === "error"
        ? "That didn't go through. Check your connection and try again."
        : state === "unavailable"
          ? "Email updates aren't switched on yet. Please check back soon."
          : null;

  return (
    <form noValidate onSubmit={onSubmit}>
      <label htmlFor={`${id}-email`} className="text-sm text-[var(--muted)]">
        Email address
      </label>
      <div className="mt-2 flex items-center gap-2 rounded-full border border-[var(--hairline)] p-1.5 pl-5 transition-colors focus-within:border-gold focus-within:ring-1 focus-within:ring-gold">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "invalid") setState("idle");
          }}
          placeholder="you@example.com"
          aria-invalid={state === "invalid" || undefined}
          aria-describedby={message ? `${id}-msg` : undefined}
          className="min-w-0 flex-1 bg-transparent py-2 text-[1rem] text-[var(--fg)] outline-none placeholder:text-[var(--muted)]/70"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="group/sub inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-gold pl-5 pr-2 font-medium text-charcoal transition-colors hover:bg-ivory disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Subscribe"}
          <span className="grid size-7 place-items-center rounded-full bg-charcoal text-gold">
            <ArrowRight aria-hidden className="size-3.5 transition-transform duration-500 group-hover/sub:translate-x-0.5" />
          </span>
        </button>
      </div>
      <p id={`${id}-msg`} aria-live="polite" className="mt-2 min-h-5 text-sm text-[var(--muted)]">
        {message}
      </p>
    </form>
  );
}
