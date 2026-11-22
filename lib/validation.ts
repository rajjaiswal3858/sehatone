// Shared validation — imported by both the client form and the API route,
// so the rules can never drift apart.

export const FACILITY_TYPES = ["Clinic", "Hospital", "Multi-specialty Hospital", "Other"] as const;
export type FacilityType = (typeof FACILITY_TYPES)[number];

export const COUNTRY_CODES = [
  { code: "+91", label: "India", iso: "IN" },
  { code: "+971", label: "UAE", iso: "AE" },
  { code: "+966", label: "Saudi Arabia", iso: "SA" },
  { code: "+974", label: "Qatar", iso: "QA" },
  { code: "+968", label: "Oman", iso: "OM" },
  { code: "+965", label: "Kuwait", iso: "KW" },
  { code: "+973", label: "Bahrain", iso: "BH" },
  { code: "+977", label: "Nepal", iso: "NP" },
  { code: "+880", label: "Bangladesh", iso: "BD" },
  { code: "+94", label: "Sri Lanka", iso: "LK" },
  { code: "+65", label: "Singapore", iso: "SG" },
  { code: "+60", label: "Malaysia", iso: "MY" },
  { code: "+254", label: "Kenya", iso: "KE" },
  { code: "+234", label: "Nigeria", iso: "NG" },
  { code: "+27", label: "South Africa", iso: "ZA" },
  { code: "+44", label: "United Kingdom", iso: "GB" },
  { code: "+1", label: "USA / Canada", iso: "US" },
  { code: "+61", label: "Australia", iso: "AU" },
] as const;

export const LIMITS = { name: 80, org: 120, message: 2000, email: 254 } as const;

export interface InquiryInput {
  fullName: string;
  countryCode: string;
  phone: string;
  email: string;
  organization: string;
  facilityType: FacilityType | "";
  message: string;
}

export type FieldErrors = Partial<Record<keyof InquiryInput, string>>;

export type ValidationResult =
  | { ok: true; data: InquiryInput }
  | { ok: false; errors: FieldErrors };

const str = (v: unknown) => (typeof v === "string" ? v : "");
const clean = (v: unknown) => str(v).replace(/\s+/g, " ").trim();

const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const URL_RE = /https?:\/\/|www\./gi;

export function normalizePhone(v: string) {
  return v.replace(/[\s\-().]/g, "");
}

export function validateInquiry(raw: unknown): ValidationResult {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const data: InquiryInput = {
    fullName: clean(r.fullName),
    countryCode: clean(r.countryCode),
    phone: normalizePhone(clean(r.phone)),
    email: clean(r.email).toLowerCase(),
    organization: clean(r.organization),
    facilityType: clean(r.facilityType) as InquiryInput["facilityType"],
    // keep line breaks in the message, but trim it
    message: str(r.message).replace(/\r\n/g, "\n").trim(),
  };
  const errors: FieldErrors = {};

  if (!data.fullName) errors.fullName = "Please enter your full name.";
  else if (data.fullName.length < 2 || data.fullName.length > LIMITS.name)
    errors.fullName = `Name should be between 2 and ${LIMITS.name} characters.`;
  else if (!NAME_RE.test(data.fullName)) errors.fullName = "Please use letters only for your name.";

  if (!COUNTRY_CODES.some((c) => c.code === data.countryCode))
    errors.countryCode = "Please choose a country code.";

  if (!data.phone) errors.phone = "Please enter your mobile number.";
  else if (!/^\d+$/.test(data.phone)) errors.phone = "Use digits only.";
  else if (data.countryCode === "+91" && !/^[6-9]\d{9}$/.test(data.phone))
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  else if (data.phone.length < 6 || data.phone.length > 14)
    errors.phone = "Enter a valid mobile number.";

  if (!data.email) errors.email = "Please enter your email address.";
  else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email))
    errors.email = "Enter a valid email address.";

  if (data.organization.length > LIMITS.org)
    errors.organization = `Keep this under ${LIMITS.org} characters.`;

  if (data.facilityType && !FACILITY_TYPES.includes(data.facilityType as FacilityType))
    errors.facilityType = "Please choose a facility type.";

  if (data.message.length > LIMITS.message)
    errors.message = `Keep your message under ${LIMITS.message} characters.`;
  else if ((data.message.match(URL_RE) ?? []).length > 2)
    errors.message = "Please remove links from your message.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
