type Gtag = (cmd: "event", name: string, params?: Record<string, unknown>) => void;

/** Sends a GA4 event if Analytics is loaded; silently does nothing otherwise. Never send personal data. */
export function track(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}
