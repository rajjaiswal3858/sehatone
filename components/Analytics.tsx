"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Google Analytics 4. Loads only when NEXT_PUBLIC_GA_ID is set, after the page is interactive,
 * so it never blocks rendering. Also records contact intent clicks (phone, email, demo CTAs).
 */
export function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:")) track("contact_click", { method: "phone" });
      else if (href.startsWith("mailto:")) track("contact_click", { method: "email" });
      else if (href.endsWith("#demo")) track("demo_cta_click", { cta_text: a.textContent?.trim().slice(0, 60) });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
