import { InquiryForm } from "./InquiryForm";
import { Mail, Phone } from "./icons";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="demo" className="section section--dark contact" aria-labelledby="demo-title">
      <div className="wrap contact__grid">
        <div className="contact__copy">
          <p className="kicker kicker--dark"><span>07</span>Book a free demo</p>
          <h2 id="demo-title" className="h2" data-reveal>
            See SEHATONE working the way <em>your</em> facility works.
          </h2>
          <p className="contact__lead" data-reveal>
            Tell us a little about your clinic or hospital. We&apos;ll walk you through the platform
            using a setup that reflects your own desks, doctors and screens.
          </p>
          <ol className="next">
            <li><span className="mono">1</span><div><b>Share a few details</b>Takes under a minute.</div></li>
            <li><span className="mono">2</span><div><b>We call you</b>To understand your workflow and requirements.</div></li>
            <li><span className="mono">3</span><div><b>Live, guided demo</b>For you and your team — online or on-site.</div></li>
          </ol>
          <div id="contact" className="direct">
            <p className="direct__h">Prefer to reach us directly?</p>
            <a href={`mailto:${site.email}`}><Mail size={18} /> {site.email}</a>
            {site.phone && (
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}><Phone size={18} /> {site.phone}</a>
            )}
          </div>
        </div>
        <div className="contact__card">
          <h3 className="contact__card-h">Demo &amp; inquiry form</h3>
          <p className="contact__card-s">Fields marked * are required.</p>
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
