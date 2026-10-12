// Project inquiry contract, shared by the contact form and /api/contact.
// The server re-validates everything; the client copy only gives earlier,
// field-level feedback.

export const inquiryServices = [
  { value: "website", label: "Business website" },
  { value: "booking", label: "Booking experience" },
  { value: "saas", label: "SaaS or portal" },
  { value: "marketplace", label: "Marketplace" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export type InquiryService = (typeof inquiryServices)[number]["value"];

export const inquiryLimits = {
  name: 100,
  email: 254,
  messageMin: 20,
  messageMax: 3000,
} as const;

export interface Inquiry {
  name: string;
  email: string;
  service: InquiryService | "";
  message: string;
}

export type InquiryField = keyof Inquiry;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

// Fields the endpoint accepts. `website` is the honeypot: hidden from people,
// so anything in it marks the request as automated.
export const inquiryKeys = ["name", "email", "service", "message", "website"] as const;

const emailPattern = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const controlChars = /[\u0000-\u001f\u007f]/;
// Same, but allowing line breaks and tabs in the free-text brief.
const messageControlChars = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

export function validateInquiry(input: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {};

  if (!input.name) errors.name = "Enter your name.";
  else if (input.name.length > inquiryLimits.name)
    errors.name = `Use ${inquiryLimits.name} characters or fewer.`;
  else if (controlChars.test(input.name)) errors.name = "Remove unsupported characters.";

  if (!input.email) errors.email = "Enter your email address.";
  else if (input.email.length > inquiryLimits.email || !emailPattern.test(input.email))
    errors.email = "Enter an email address like name@example.com.";

  if (input.service && !inquiryServices.some((s) => s.value === input.service))
    errors.service = "Choose one of the listed project types.";

  if (input.message.length < inquiryLimits.messageMin)
    errors.message = `Describe the project in at least ${inquiryLimits.messageMin} characters.`;
  else if (input.message.length > inquiryLimits.messageMax)
    errors.message = `Keep the brief to ${inquiryLimits.messageMax} characters or fewer.`;
  else if (messageControlChars.test(input.message))
    errors.message = "Remove unsupported characters.";

  return errors;
}

export function normalizeInquiry(input: Record<InquiryField, string>): Inquiry {
  return {
    name: input.name.trim(),
    email: input.email.trim(),
    service: input.service.trim() as Inquiry["service"],
    message: input.message.replace(/\r\n?/g, "\n").trim(),
  };
}

export function serviceLabel(value: Inquiry["service"]): string {
  return inquiryServices.find((s) => s.value === value)?.label ?? "Not given";
}

// Outcomes the endpoint reports and the form renders. "accepted" means the
// mail provider accepted the message, not that it was delivered.
export type InquiryOutcome = "accepted" | "invalid" | "rate-limited" | "unavailable";
