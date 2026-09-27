"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { volunteerAreas, volunteerSteps } from "@/content/involvement";
import { RevealText } from "@/components/motion/RevealText";
import { StaticForm, type FieldSpec } from "@/components/forms/StaticForm";
import { cn } from "@/lib/cn";

const availability = [
  { value: "weekends", label: "Weekends" },
  { value: "weekdays", label: "Weekdays" },
  { value: "evenings", label: "Evenings" },
  { value: "occasional", label: "Occasionally, for specific projects" },
  { value: "remote", label: "Remotely, with my skills" },
];

/** "Give something money can't buy." Choosing an area here pre-fills the form below. */
export function VolunteerSection() {
  const [area, setArea] = useState("");
  const preset = useMemo(() => ({ area }), [area]);

  const fields: FieldSpec[] = [
    { name: "firstName", label: "First name", required: true, autoComplete: "given-name", half: true },
    { name: "lastName", label: "Last name", required: true, autoComplete: "family-name", half: true },
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
    { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
    { name: "location", label: "Town or city", autoComplete: "address-level2", half: true },
    { name: "area", label: "Area of interest", type: "select", required: true, half: true, options: volunteerAreas.map((a) => ({ value: a.title, label: a.title })) },
    { name: "skills", label: "Skills you'd like to offer", hint: "For example: driving, photography, accounting, nursing, event planning." },
    { name: "availability", label: "Availability", type: "select", options: availability },
    { name: "message", label: "Anything else we should know?", type: "textarea" },
  ];

  return (
    <section id="serve" data-scroll-tone="terracotta" aria-labelledby="serve-title" className="scroll-mt-20 py-24 lg:py-40">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <RevealText id="serve-title" lines={["Give something", "money can't buy."]} className="display fs-xl lg:col-span-8" mode="words" />
          <p className="lede max-w-[34ch] lg:col-span-4">Your time, skills and willingness to serve can make a meaningful difference.</p>
        </div>

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="text-sm text-[var(--muted)]">Where you could serve</h3>
            <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">Choose one to add it to your enquiry.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {volunteerAreas.map((a) => {
                const on = area === a.title;
                return (
                  <li key={a.title}>
                    <button
                      type="button"
                      aria-pressed={on}
                      title={a.description}
                      onClick={() => setArea(on ? "" : a.title)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.95rem] transition-all duration-300",
                        on ? "border-transparent bg-ivory text-charcoal" : "border-[var(--hairline)] hover:border-[var(--fg)]",
                      )}
                    >
                      {on && <Check aria-hidden className="size-4" />}
                      {a.title}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 min-h-[3.5rem] max-w-sm text-[var(--muted)]" aria-live="polite">
              {area ? volunteerAreas.find((a) => a.title === area)?.description : "Not sure yet? Leave it open and we'll help you find a fit."}
            </p>

            <h3 className="mt-14 text-sm text-[var(--muted)]">How it works</h3>
            <ol className="mt-6 space-y-6">
              {volunteerSteps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4">
                  <span aria-hidden className="display text-4xl text-[var(--accent)]">
                    {i + 1}
                  </span>
                  <span>
                    <span className="display block text-2xl">{s.title}</span>
                    <span className="mt-1 block text-[var(--muted)]">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="display text-4xl">Become a volunteer</h3>
            <StaticForm
              kind="volunteer"
              fields={fields}
              preset={preset}
              submitLabel="Send volunteer enquiry"
              subject={(v) => `Volunteer enquiry: ${v.firstName} ${v.lastName}${v.area ? ` (${v.area})` : ""}`}
              className="mt-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
