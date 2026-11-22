"use client";

import { useEffect, useRef, useState } from "react";
import {
  COUNTRY_CODES, FACILITY_TYPES, LIMITS, validateInquiry,
  type FieldErrors, type InquiryInput,
} from "@/lib/validation";
import { ArrowRight, Check } from "./icons";
import { track } from "@/lib/analytics";
import { site } from "@/lib/site";

type State = "idle" | "submitting" | "success" | "error";

const empty: InquiryInput = {
  fullName: "", countryCode: "+91", phone: "", email: "", organization: "", facilityType: "", message: "",
};

/** Pre-filled email, offered when the request couldn't be delivered. */
const mailtoLink = (v: InquiryInput) => {
  const body = [
    `Name: ${v.fullName}`,
    `Mobile: ${v.countryCode} ${v.phone}`,
    `Email: ${v.email}`,
    `Clinic / hospital: ${v.organization}`,
    `Facility type: ${v.facilityType}`,
    "",
    v.message,
  ].join("\r\n");
  return `mailto:${site.email}?subject=${encodeURIComponent("SEHATONE demo request")}&body=${encodeURIComponent(body)}`;
};

const newKey = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;

export function InquiryForm() {
  const [v, setV] = useState<InquiryInput>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof InquiryInput, boolean>>>({});
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");
  const [honey, setHoney] = useState("");
  const [offerEmail, setOfferEmail] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const startedAt = useRef(0);
  const key = useRef("");
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    key.current = newKey();
  }, []);

  const set = (k: keyof InquiryInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...v, [k]: e.target.value };
    setV(next);
    if (touched[k]) {
      const r = validateInquiry(next);
      setErrors((prev) => ({ ...prev, [k]: r.ok ? undefined : r.errors[k] }));
    }
  };

  const blur = (k: keyof InquiryInput) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    const r = validateInquiry(v);
    setErrors((prev) => ({ ...prev, [k]: r.ok ? undefined : r.errors[k] }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;

    const r = validateInquiry(v);
    if (!r.ok) {
      setErrors(r.errors);
      setTouched({ fullName: true, phone: true, email: true, countryCode: true, organization: true, message: true, facilityType: true });
      const first = Object.keys(r.errors)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }

    setState("submitting");
    setMsg("");
    setOfferEmail(false);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...r.data, website: honey, startedAt: startedAt.current, submissionKey: key.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setState("success");
        setMsg(data.message);
        setConfirmed(data.confirmationSent === true);
        // GA4 recommended conversion event (no personal data sent)
        if (!data.duplicate) track("generate_lead", { form: "demo_inquiry", facility_type: r.data.facilityType || "unspecified" });
      } else {
        if (data.errors) setErrors(data.errors);
        track("form_error", { form: "demo_inquiry", status: res.status });
        setState("error");
        setOfferEmail(res.status >= 500 || res.status === 429);
        setMsg(data.message || "We could not send your request. Please try again.");
      }
    } catch {
      setState("error");
      setOfferEmail(true);
      setMsg("Network error — please check your connection and try again.");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const reset = () => {
    setV(empty);
    setErrors({});
    setTouched({});
    setState("idle");
    setMsg("");
    key.current = newKey();
    startedAt.current = Date.now();
  };

  if (state === "success") {
    return (
      <div className="form-done" role="status" tabIndex={-1} ref={statusRef}>
        <span className="form-done__icon"><Check size={22} /></span>
        <h3>Request received</h3>
        <p>{msg}</p>
        {confirmed && (
          <p className="muted">A confirmation has been sent to <b>{v.email}</b>. If you don&apos;t see it, please check your spam folder.</p>
        )}
        <button type="button" className="btn btn--ghost btn--sm" onClick={reset}>Send another inquiry</button>
      </div>
    );
  }

  const field = (k: keyof InquiryInput) => ({
    id: `f-${k}`,
    name: k,
    value: v[k],
    onChange: set(k),
    onBlur: blur(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
  });
  const err = (k: keyof InquiryInput) =>
    errors[k] ? <span className="ferr" id={`e-${k}`}>{errors[k]}</span> : null;

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-describedby="form-note">
      <div className="form__row">
        <div className="ff">
          <label htmlFor="f-fullName">Full name <abbr title="required">*</abbr></label>
          <input {...field("fullName")} autoComplete="name" maxLength={LIMITS.name} required />
          {err("fullName")}
        </div>
      </div>

      <div className="form__row form__row--2">
        <div className="ff">
          <label htmlFor="f-phone">Mobile number <abbr title="required">*</abbr></label>
          <div className={`phone${errors.phone || errors.countryCode ? " is-err" : ""}`}>
            <select {...field("countryCode")} aria-label="Country code" autoComplete="tel-country-code">
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code} title={c.label}>{c.iso} {c.code}</option>
              ))}
            </select>
            <input {...field("phone")} type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210" maxLength={18} required />
          </div>
          {err("phone") || err("countryCode")}
        </div>
        <div className="ff">
          <label htmlFor="f-email">Email address <abbr title="required">*</abbr></label>
          <input {...field("email")} type="email" autoComplete="email" maxLength={LIMITS.email} required />
          {err("email")}
        </div>
      </div>

      <div className="form__row form__row--2">
        <div className="ff">
          <label htmlFor="f-organization">Clinic / hospital name</label>
          <input {...field("organization")} autoComplete="organization" maxLength={LIMITS.org} />
          {err("organization")}
        </div>
        <div className="ff">
          <label htmlFor="f-facilityType">Facility type</label>
          <select {...field("facilityType")}>
            <option value="">Select…</option>
            {FACILITY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {err("facilityType")}
        </div>
      </div>

      <div className="ff">
        <label htmlFor="f-message">Message or requirements</label>
        <textarea
          {...field("message")}
          rows={4}
          maxLength={LIMITS.message}
          placeholder="e.g. number of doctors, reception counters or display screens, and what you'd like to see in the demo"
        />
        {err("message")}
      </div>

      {/* Honeypot — hidden from people and assistive tech, attractive to bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
      </div>

      <div className="form__foot">
        <button className="btn btn--primary btn--block" type="submit" disabled={state === "submitting"} aria-busy={state === "submitting"}>
          {state === "submitting" ? (<><span className="spinner" aria-hidden="true" /> Sending…</>) : (<>Request my free demo <ArrowRight size={17} /></>)}
        </button>
        <p id="form-note" className="form__note">
          By submitting, you agree to be contacted about SEHATONE. See our <a href="/privacy">privacy policy</a>.
        </p>
      </div>

      <div ref={statusRef} tabIndex={-1} role="alert" aria-live="assertive" className={state === "error" ? "form-err" : "sr-only"}>
        {state === "error" ? msg : ""}
        {state === "error" && offerEmail && (
          <>
            {" "}
            <a href={mailtoLink(v)} style={{ textDecoration: "underline" }}>Email your request to {site.email}</a>
          </>
        )}
      </div>
    </form>
  );
}
