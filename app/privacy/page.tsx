import { Header } from "@/components/Header";
import { Footer } from "@/components/Sections";
import { site } from "@/lib/site";
import { JsonLd, pageMetadata, breadcrumbLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy — How We Handle Your Data | SEHATONE",
  description: "How SEHATONE collects, uses and protects the information you share through this website, including demo requests and website analytics.",
  path: "/privacy",
});

export default function Privacy() {
  return (
    <>
      <JsonLd nodes={[breadcrumbLd([{ name: "Privacy policy", path: "/privacy" }])]} />
      <Header />
      <main id="main" className="legal">
        <div className="wrap">
          <p className="kicker"><span>Legal</span>Last updated 17 November 2026</p>
          <h1 className="h2">Privacy policy</h1>
          <p>
            This policy explains how SEHATONE (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles information you
            share with us through this website. It covers the website only — data processed inside the
            SEHATONE platform for healthcare facilities is governed by the agreement with each facility.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>Details you submit in our demo and inquiry form: name, mobile number, email address, clinic or hospital name, facility type and your message.</li>
            <li>Basic technical information needed to protect the form from abuse, such as a one-way hashed (non-reversible) version of your IP address and your browser type.</li>
            <li>Website usage statistics through Google Analytics, such as pages visited, device type and approximate region, and whether a demo request was completed. This uses cookies and does not include the contents of the form.</li>
          </ul>
          <p>We do not use advertising trackers on this website. You can block analytics cookies in your browser settings or with Google&apos;s opt-out browser add-on.</p>

          <h2>How we use it</h2>
          <ul>
            <li>To respond to your inquiry, arrange a demo and contact you by phone, WhatsApp or email about SEHATONE.</li>
            <li>To send you a confirmation that we received your request.</li>
            <li>To prevent spam and duplicate submissions.</li>
          </ul>
          <p>We do not sell your information or share it with third parties for their own marketing.</p>

          <h2>Service providers</h2>
          <p>
            We use trusted providers to run this website: hosting, a managed database that stores
            inquiries, an email delivery service that sends notifications and confirmations, and Google
            Analytics for aggregate website statistics. They
            process data only on our instructions.
          </p>

          <h2>Retention and security</h2>
          <p>
            Inquiry records are kept for as long as needed to follow up with you and for reasonable
            business records, after which they are deleted. Data is transmitted over encrypted
            (HTTPS) connections and access is restricted to authorised team members.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us to access, correct or delete the information you submitted, or to stop
            contacting you, at any time by writing to <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2>Changes</h2>
          <p>We may update this policy from time to time. The date at the top of this page shows the latest revision.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
