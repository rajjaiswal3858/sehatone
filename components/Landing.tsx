import { Header } from "./Header";
import { Footer } from "./Sections";
import { Faq, type FaqItem } from "./Faq";
import { Reveal } from "./Reveal";
import { ArrowRight, Check } from "./icons";
import { JsonLd, breadcrumbLd, webPageLd, faqLd } from "@/lib/seo";
import { solutions } from "@/lib/site";

export interface LandingContent {
  path: string;
  seoTitle: string;
  seoDescription: string;
  crumb: string;
  eyebrow: string;
  h1: React.ReactNode;
  intro: string;
  visual: React.ReactNode;
  visualLabel: string;
  problemsTitle: string;
  problems: [string, string][];
  modulesTitle: string;
  modulesIntro: string;
  modules: { title: string; body: React.ReactNode; points: string[] }[];
  fitTitle: string;
  fit: { title: string; body: React.ReactNode; id?: string }[];
  faq: FaqItem[];
  ctaTitle: string;
}

/** Shared layout for solution landing pages: one H1, logical H2/H3 outline, breadcrumbs, FAQ, related links. */
export function Landing(c: LandingContent) {
  const related = solutions.filter((s) => s.href !== c.path);
  return (
    <>
      <JsonLd
        nodes={[
          webPageLd({ title: c.seoTitle, description: c.seoDescription, path: c.path }),
          breadcrumbLd([{ name: c.crumb, path: c.path }]),
          faqLd(c.faq),
        ]}
      />
      <Header />
      <main id="main">
        <section className="lp-hero" aria-labelledby="lp-title">
          <div className="wrap">
            <nav aria-label="Breadcrumb" className="crumbs">
              <ol>
                <li><a href="/">Home</a></li>
                <li aria-current="page">{c.crumb}</li>
              </ol>
            </nav>
            <div className="lp-hero__grid">
              <div>
                <p className="kicker">{c.eyebrow}</p>
                <h1 id="lp-title" className="h1 lp-hero__h1">{c.h1}</h1>
                <p className="hero__lead">{c.intro}</p>
                <div className="actions">
                  <a href="/#demo" className="btn btn--primary">Book a free demo <ArrowRight size={17} /></a>
                  <a href="/#contact" className="btn btn--ghost">Contact us</a>
                </div>
              </div>
              <div className="lp-hero__visual" role="img" aria-label={c.visualLabel}>
                {c.visual}
                <p className="caption">Interface preview · sample data</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section problems" aria-labelledby="lp-problems">
          <div className="wrap problems__grid">
            <div className="problems__aside">
              <p className="kicker"><span>01</span>The challenge</p>
              <h2 id="lp-problems" className="h2" data-reveal>{c.problemsTitle}</h2>
            </div>
            <ol className="problems__list">
              {c.problems.map(([t, d], n) => (
                <li key={t} data-reveal>
                  <span className="problems__n mono">0{n + 1}</span>
                  <div><h3>{t}</h3><p>{d}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section lp-modules" aria-labelledby="lp-modules">
          <div className="wrap">
            <header className="shead" data-reveal>
              <p className="kicker"><span>02</span>How SEHATONE helps</p>
              <h2 id="lp-modules" className="h2">{c.modulesTitle}</h2>
              <p className="shead__intro">{c.modulesIntro}</p>
            </header>
            <div className="lp-mods">
              {c.modules.map((m) => (
                <article key={m.title} data-reveal>
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                  <ul className="ticks">
                    {m.points.map((p) => <li key={p}><Check size={16} />{p}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            <p className="lp-more">
              See every module in detail on the <a href="/#product">SEHATONE platform overview</a>, or follow a
              patient visit step by step in <a href="/#how-it-works">how it works</a>.
            </p>
          </div>
        </section>

        <section className="section lp-fit" aria-labelledby="lp-fit">
          <div className="wrap">
            <header className="shead" data-reveal>
              <p className="kicker"><span>03</span>Fit</p>
              <h2 id="lp-fit" className="h2">{c.fitTitle}</h2>
            </header>
            <dl className="why__list lp-fit__list">
              {c.fit.map((f) => (
                <div key={f.title} id={f.id} data-reveal>
                  <dt>{f.title}</dt>
                  <dd>{f.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Faq items={c.faq} index="04" />

        <section className="section section--dark lp-cta" aria-labelledby="lp-cta">
          <div className="wrap lp-cta__grid">
            <div>
              <h2 id="lp-cta" className="h2">{c.ctaTitle}</h2>
              <p className="solution__intro" style={{ marginTop: 18 }}>
                Tell us about your facility and we&apos;ll arrange a guided demo built around your own desks,
                doctors and screens.
              </p>
            </div>
            <div className="lp-cta__side">
              <a href="/#demo" className="btn btn--primary">Book a free demo <ArrowRight size={17} /></a>
              <p className="lp-cta__h">Related solutions</p>
              {related.map((r) => (
                <a key={r.href} href={r.href} className="lp-cta__link">{r.label} <ArrowRight size={15} /></a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
