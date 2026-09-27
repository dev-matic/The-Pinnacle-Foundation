"use client";

import { useEffect, useState } from "react";
import { contactReasons } from "@/content/site";
import { StaticForm, type FieldSpec } from "@/components/forms/StaticForm";

const fields: FieldSpec[] = [
  { name: "firstName", label: "First name", required: true, autoComplete: "given-name", half: true },
  { name: "lastName", label: "Last name", required: true, autoComplete: "family-name", half: true },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
  { name: "reason", label: "Reason for contact", type: "select", required: true, options: contactReasons },
  { name: "message", label: "Message", type: "textarea", required: true },
];

/** General enquiry form. Reads ?reason= from the URL so other pages can pre-select a topic. */
export function ContactForm() {
  const [preset, setPreset] = useState<Record<string, string> | undefined>();

  useEffect(() => {
    const reason = new URLSearchParams(window.location.search).get("reason");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (reason && contactReasons.some((r) => r.value === reason)) setPreset({ reason });
  }, []);

  return (
    <StaticForm
      kind="enquiry"
      fields={fields}
      preset={preset}
      submitLabel="Send message"
      subject={(v) => `${contactReasons.find((r) => r.value === v.reason)?.label ?? "Enquiry"} from ${v.firstName} ${v.lastName}`}
    />
  );
}
