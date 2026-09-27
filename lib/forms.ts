import { site } from "@/content/site";

export type SubmitResult =
  | { status: "sent" }
  | { status: "handoff"; channel: "email" | "whatsapp" }
  | { status: "unavailable" }
  | { status: "error"; message: string };

/**
 * Sends a form without any server of our own.
 * 1. A configured form service endpoint (JSON POST).
 * 2. Otherwise hands off to the visitor's email app with the message pre-filled.
 * 3. Otherwise hands off to WhatsApp.
 * 4. Otherwise reports that online enquiries aren't connected yet.
 */
export async function submitForm(
  kind: "enquiry" | "volunteer" | "newsletter",
  subject: string,
  data: Record<string, string>,
): Promise<SubmitResult> {
  const endpoint =
    (kind === "volunteer" && site.forms.volunteerEndpoint) || (kind === "newsletter" && site.forms.newsletterEndpoint) || site.forms.endpoint;

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: subject, form: kind, ...data }),
      });
      if (!res.ok) throw new Error(String(res.status));
      return { status: "sent" };
    } catch {
      return {
        status: "error",
        message: "Your message didn't send. Check your connection and try again.",
      };
    }
  }

  const body = Object.entries(data)
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${labelFor(k)}: ${v}`)
    .join("\n");

  if (site.contact.email) {
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return { status: "handoff", channel: "email" };
  }

  if (site.contact.whatsapp) {
    window.open(`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`, "_blank", "noopener");
    return { status: "handoff", channel: "whatsapp" };
  }

  return { status: "unavailable" };
}

function labelFor(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}
