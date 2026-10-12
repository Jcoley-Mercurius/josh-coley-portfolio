"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import {
  inquiryLimits,
  inquiryServices,
  normalizeInquiry,
  validateInquiry,
  type InquiryErrors,
  type InquiryField,
} from "../_lib/inquiry";

type Status = "idle" | "invalid" | "sending" | "accepted" | "rate-limited" | "unavailable";

const statusText: Record<Exclude<Status, "idle">, string> = {
  invalid: "Check the highlighted fields.",
  sending: "Sending your brief…",
  accepted:
    "Your brief was accepted for delivery. Replies will come to the email address you entered.",
  "rate-limited":
    "Too many requests from this connection. Wait a few minutes, then try again. Your brief is still here.",
  unavailable:
    "The inquiry service is unavailable right now. Your brief is still here, so you can try again shortly.",
};

const empty: Record<InquiryField, string> = { name: "", email: "", service: "", message: "" };
const fieldOrder: InquiryField[] = ["name", "email", "service", "message"];

const noop = () => () => {};

export default function ContactForm() {
  // False during server render and before hydration: the submit button stays
  // disabled, so a visitor without JavaScript never posts the form natively.
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const [values, setValues] = useState(empty);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const sending = useRef(false);
  // Retrying an unchanged brief reuses its key so the provider sends it at
  // most once; any edit produces a new key.
  const attempt = useRef<{ payload: string; key: string } | null>(null);

  const update = (field: InquiryField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  // Service links elsewhere on the page ("Discuss a website ↗") carry
  // data-inquiry-service; following one preselects that project type.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a[data-inquiry-service]") : null;
      const value = link?.getAttribute("data-inquiry-service");
      if (!value || !inquiryServices.some((service) => service.value === value)) return;
      setValues((current) => ({ ...current, service: value }));
      setErrors((current) => ({ ...current, service: undefined }));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const focusFirstError = (found: InquiryErrors) => {
    const first = fieldOrder.find((field) => found[field]);
    if (first) document.getElementById(`inquiry-${first}`)?.focus();
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;

    const inquiry = normalizeInquiry(values);
    const found = validateInquiry(inquiry);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("invalid");
      focusFirstError(found);
      return;
    }

    const payload = JSON.stringify({ ...inquiry, website: honeypot });
    if (attempt.current?.payload !== payload) {
      attempt.current = { payload, key: crypto.randomUUID() };
    }

    sending.current = true;
    setStatus("sending");
    let next: Status = "unavailable";
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": attempt.current.key,
        },
        body: payload,
      });
      if (response.status === 202) {
        next = "accepted";
      } else if (response.status === 429) {
        next = "rate-limited";
      } else if (response.status === 400) {
        const body = (await response.json().catch(() => ({}))) as { errors?: InquiryErrors };
        if (body.errors && Object.keys(body.errors).length > 0) {
          setErrors(body.errors);
          focusFirstError(body.errors);
          next = "invalid";
        }
      }
    } catch {
      // Network failure: reported as unavailable, input kept.
    }

    if (next === "accepted") {
      setValues(empty);
      setHoneypot("");
      attempt.current = null;
    }
    setStatus(next);
    sending.current = false;
  }

  const describedBy = (field: InquiryField, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : undefined].filter(Boolean).join(" ") || undefined;

  const fieldError = (field: InquiryField) =>
    errors[field] ? (
      <p id={`${field}-error`} className="inquiry-error">
        {errors[field]}
      </p>
    ) : null;

  const control = (field: InquiryField) => ({
    id: `inquiry-${field}`,
    name: field,
    value: values[field],
    "aria-invalid": errors[field] ? true : undefined,
    onChange: (event: { target: { value: string } }) => update(field, event.target.value),
  });

  return (
    <form
      className="inquiry-form"
      method="post"
      action="/api/contact"
      noValidate
      aria-labelledby="contact-title"
      onSubmit={submit}
    >
      <div className="inquiry-field">
        <label htmlFor="inquiry-name">Name</label>
        <input
          {...control("name")}
          autoComplete="name"
          required
          maxLength={inquiryLimits.name}
          aria-describedby={describedBy("name")}
        />
        {fieldError("name")}
      </div>

      <div className="inquiry-field">
        <label htmlFor="inquiry-email">Email</label>
        <input
          {...control("email")}
          type="email"
          autoComplete="email"
          required
          maxLength={inquiryLimits.email}
          aria-describedby={describedBy("email")}
        />
        {fieldError("email")}
      </div>

      <div className="inquiry-field">
        <label htmlFor="inquiry-service">
          Project type <span className="inquiry-optional">(optional)</span>
        </label>
        <select {...control("service")} aria-describedby={describedBy("service")}>
          <option value="">Choose a project type</option>
          {inquiryServices.map((service) => (
            <option key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </select>
        {fieldError("service")}
      </div>

      <div className="inquiry-field">
        <label htmlFor="inquiry-message">Project brief</label>
        <textarea
          {...control("message")}
          required
          minLength={inquiryLimits.messageMin}
          maxLength={inquiryLimits.messageMax}
          rows={6}
          aria-describedby={describedBy("message", "message-hint")}
        />
        <p id="message-hint" className="inquiry-hint">
          {inquiryLimits.messageMin}–{inquiryLimits.messageMax} characters.
        </p>
        {fieldError("message")}
      </div>

      {/* Honeypot: hidden from people and assistive technology. */}
      <div className="inquiry-trap" aria-hidden="true">
        <label htmlFor="inquiry-website">Leave this field empty</label>
        <input
          id="inquiry-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="a1-btn a1-btn-primary"
        disabled={!hydrated || status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send project brief"}
      </button>

      <p role="status" className="inquiry-status" data-status={status}>
        {status === "idle" ? "" : statusText[status]}
      </p>
      <p className="inquiry-status inquiry-nojs">The inquiry form needs JavaScript to send.</p>
    </form>
  );
}
