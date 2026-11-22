import { ReceptionMock } from "./mockups/Mockups";
import { DisplayScreen } from "./mockups/DisplayScreen";
import { ArrowRight, Check, Clipboard, Users, Steth, Monitor, Chart, Ticket } from "./icons";
import { Logo } from "./Logo";
import { site, solutions } from "@/lib/site";

function SectionHead({ index, label, title, intro, dark }: {
  index: string; label: string; title: React.ReactNode; intro?: React.ReactNode; dark?: boolean;
}) {
  return (
    <header className={`shead${dark ? " shead--dark" : ""}`} data-reveal>
      <p className="kicker"><span>{index}</span>{label}</p>
      <h2 className="h2">{title}</h2>
      {intro && <p className="shead__intro">{intro}</p>}
    </header>
  );
}

/* ── Hero ────────────────────────────────────────────────────── */

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="live-dot" aria-hidden="true" />
            Clinic &amp; hospital management software
          </p>
          <h1 id="hero-title" className="h1">
            One smart system.{" "}
            <br />
            <em>Complete</em> healthcare management.
          </h1>
          <p className="hero__lead">
            SEHATONE is a healthcare management system that connects patient registration, reception,
            doctor consultations, token queues and waiting-area displays on one platform — so a
            single-doctor clinic and a multi-department hospital can both run a calmer, more organised day.
          </p>
          <div className="actions">
            <a href="#demo" className="btn btn--primary">
              Book a free demo <ArrowRight size={17} />
            </a>
            <a href="#contact" className="btn btn--ghost">Contact us</a>
          </div>
          <ul className="hero__for" aria-label="Built for">
            <li><a href="/clinic-management-software">Private clinics</a></li>
            <li><a href="/hospital-management-software">Small to large hospitals</a></li>
            <li><a href="/hospital-management-software#multi-specialty">Multi-specialty facilities</a></li>
          </ul>
        </div>

        <div className="hero__visual" aria-label="Preview of the SEHATONE reception dashboard and waiting-area display" role="img">
          <div className="hero__dash"><ReceptionMock rows={6} compact /></div>
          <div className="hero__screen">
            <DisplayScreen />
            <span className="hero__stand" aria-hidden="true" />
          </div>
          <p className="caption">Interface preview · sample data</p>
        </div>
      </div>
    </section>
  );
}

/* ── Problems ────────────────────────────────────────────────── */

const problems = [
  ["Manual registration", "Patients stand at the desk while their details are written into a register by hand — and the same thing happens again on their next visit."],
  ["Paper-based records", "Files and slips get misplaced, are slow to search and are rarely where they are needed when the patient returns."],
  ["Long, uncertain waits", "Without a visible queue, patients cannot tell when their turn will come, so they crowd the reception counter to ask."],
  ["Overloaded reception", "Front-desk staff juggle registrations, appointments, walk-ins and doctor coordination by phone, paper and memory."],
] as const;

export function Problems() {
  return (
    <section className="section problems" aria-labelledby="problems-title">
      <div className="wrap problems__grid">
        <div className="problems__aside">
          <p className="kicker"><span>01</span>The problem</p>
          <h2 id="problems-title" className="h2" data-reveal>
            Most delays in a healthcare facility begin <em>before</em> the consultation does.
          </h2>
          <p className="muted-lg" data-reveal>
            Whether it is a neighbourhood clinic or a busy hospital OPD, the same operational gaps
            appear at the front desk — and patients feel every one of them.
          </p>
        </div>
        <ol className="problems__list">
          {problems.map(([t, d], n) => (
            <li key={t} data-reveal>
              <span className="problems__n mono">0{n + 1}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Solution (hub) ──────────────────────────────────────────── */

const nodes = [
  { x: 130, y: 70, label: "Registration desk", sub: "Patient details captured once", I: Clipboard },
  { x: 130, y: 330, label: "Reception", sub: "Live view of the day's queue", I: Users },
  { x: 770, y: 70, label: "Doctor cabins", sub: "Personal queues & records", I: Steth },
  { x: 770, y: 330, label: "Display screens", sub: "Now serving, on every floor", I: Monitor },
  { x: 450, y: 395, label: "Administration", sub: "Reports & oversight", I: Chart },
];

export function Solution() {
  return (
    <section className="section section--dark solution" aria-labelledby="solution-title">
      <div className="wrap">
        <div className="solution__top">
          <div>
            <p className="kicker kicker--dark"><span>02</span>Our solution</p>
            <h2 id="solution-title" className="h2" data-reveal>
              One system at the centre of every desk, cabin and screen.
            </h2>
          </div>
          <p className="solution__intro" data-reveal>
            SEHATONE replaces disconnected registers, spreadsheets and shouted names with a single
            platform. What is entered at registration is immediately available to reception, to the
            doctor, to the waiting-area screens and to management.
          </p>
        </div>

        <div className="hub" data-reveal>
          <svg viewBox="0 0 900 440" className="hub__svg" role="img" aria-label="Diagram: registration, reception, doctor cabins, display screens and administration all connected to the SEHATONE central system">
            <defs>
              <pattern id="dots" width="18" height="18" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,.07)" />
              </pattern>
            </defs>
            <rect width="900" height="440" fill="url(#dots)" />
            {nodes.map((n) => (
              <path key={n.label} className="hub__link" d={`M450 210 L${n.x} ${n.y}`} />
            ))}
            <g className="hub__core">
              <rect x="350" y="165" width="200" height="90" rx="4" />
              <text x="450" y="203" textAnchor="middle" className="hub__core-t">SEHATONE</text>
              <text x="450" y="228" textAnchor="middle" className="hub__core-s">Central system</text>
            </g>
            {nodes.map(({ x, y, label, sub }) => (
              <g key={label} className="hub__node">
                <rect x={x - 112} y={y - 30} width="224" height="60" rx="3" />
                <text x={x} y={y - 4} textAnchor="middle" className="hub__t">{label}</text>
                <text x={x} y={y + 16} textAnchor="middle" className="hub__s">{sub}</text>
              </g>
            ))}
          </svg>
          <ul className="hub__list">
            {nodes.map(({ label, sub, I }) => (
              <li key={label}><I size={18} /><div><b>{label}</b><span>{sub}</span></div></li>
            ))}
          </ul>
        </div>

        <div className="principles">
          {[
            ["Captured once", "Patient details are entered a single time and carried through the entire visit — and every visit after."],
            ["Shared instantly", "Reception, doctors and display screens all work from the same, current queue."],
            ["Managed centrally", "Desks, doctors, departments and screens are overseen from one place, at any scale."],
          ].map(([t, d]) => (
            <div key={t} data-reveal>
              <h3><Check size={18} /> {t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Who we serve ────────────────────────────────────────────── */

function Plan({ level }: { level: 1 | 2 | 3 }) {
  // Architectural floor-plan style schematics that grow with facility size
  const room = (x: number, y: number, w: number, h: number, k: string, label?: string) => (
    <g key={k}>
      <rect x={x} y={y} width={w} height={h} />
      {label && <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle">{label}</text>}
    </g>
  );
  return (
    <svg viewBox="0 0 260 150" className={`plan plan--${level}`} aria-hidden="true">
      {level === 1 && (
        <>
          {room(20, 20, 220, 110, "o")}
          {room(20, 20, 90, 55, "r", "Reception")}
          {room(150, 20, 90, 55, "d1", "Doctor")}
          {room(150, 75, 90, 55, "d2", "Doctor")}
          <text x="65" y="108" textAnchor="middle">Waiting</text>
          <rect className="scr" x="30" y="122" width="34" height="6" />
        </>
      )}
      {level === 2 && (
        <>
          {room(10, 10, 240, 62, "f2")}
          {room(10, 78, 240, 62, "f1")}
          {[0, 1, 2, 3, 4].map((n) => room(14 + n * 47, 14, 43, 30, `a${n}`, "OPD"))}
          {room(14, 82, 70, 26, "r1", "Counter")}
          {room(14, 110, 70, 26, "r2", "Counter")}
          {[0, 1, 2].map((n) => room(98 + n * 50, 82, 46, 30, `b${n}`, "OPD"))}
          <rect className="scr" x="110" y="58" width="34" height="6" />
          <rect className="scr" x="160" y="124" width="34" height="6" />
        </>
      )}
      {level === 3 && (
        <>
          {room(10, 10, 240, 130, "o")}
          {room(95, 55, 70, 40, "c", "Central")}
          {["Cardio", "Ortho", "Paeds", "ENT", "Derm", "Gen Med"].map((d, n) =>
            room(n < 3 ? 14 + n * 79 : 14 + (n - 3) * 79, n < 3 ? 14 : 100, 74, 36, d, d),
          )}
          {room(14, 55, 74, 40, "r", "Reception")}
          {room(172, 55, 74, 40, "a", "Admin")}
        </>
      )}
    </svg>
  );
}

const audiences = [
  {
    level: 1 as const,
    href: "/clinic-management-software",
    more: "Clinic management software",
    tag: "Clinics",
    title: "Private clinics & independent doctors",
    line: "Replace the register book without adding complexity.",
    setup: "One reception desk, one or a few consulting rooms, a single waiting area.",
    points: ["Digital patient records from the first day", "Token system that ends crowding at the counter", "A display screen for the waiting area", "Simple enough for a single receptionist"],
  },
  {
    level: 2 as const,
    href: "/hospital-management-software",
    more: "Hospital management software",
    tag: "Hospitals",
    title: "Small, medium & large hospitals",
    line: "Coordinate counters, departments and floors.",
    setup: "Several registration counters, departmental OPDs and waiting halls across floors.",
    points: ["Multiple reception desks on one system", "Separate queues per doctor and department", "Display screens on every floor", "Operational reports for administrators"],
  },
  {
    level: 3 as const,
    href: "/hospital-management-software#multi-specialty",
    more: "Multi-specialty hospitals",
    tag: "Multi-specialty",
    title: "Multi-specialty healthcare facilities",
    line: "Many specialists. One coordinated patient flow.",
    setup: "Many specialties, each with its own doctors and queues, under central administration.",
    points: ["A dedicated queue for every specialty", "One patient record across departments", "Centralised view for management", "Add departments and screens as you grow"],
  },
];

export function Audience() {
  return (
    <section id="who-we-serve" className="section audience" aria-labelledby="aud-title">
      <div className="wrap">
        <SectionHead
          index="04"
          label="Who we serve"
          title={<span id="aud-title">Built for the clinic down the street <em>and</em> the hospital across town.</span>}
          intro="The same platform adapts to the way your facility is organised — from one doctor and one desk to many departments, counters and floors."
        />
        <div className="aud">
          {audiences.map((a) => (
            <article className="aud__col" key={a.tag} data-reveal>
              <div className="aud__plan"><Plan level={a.level} /></div>
              <p className="aud__tag mono">{a.tag}</p>
              <h3>{a.title}</h3>
              <p className="aud__line">{a.line}</p>
              <p className="aud__setup"><span>Typical setup</span>{a.setup}</p>
              <ul className="ticks">
                {a.points.map((p) => <li key={p}><Check size={16} />{p}</li>)}
              </ul>
              <a href={a.href} className="aud__more">{a.more} <ArrowRight size={15} /></a>
            </article>
          ))}
        </div>
        <div className="scale" data-reveal>
          <span className="scale__l">Single clinic</span>
          <span className="scale__track" aria-hidden="true"><i /><i /><i /></span>
          <span className="scale__r">Multi-department hospital</span>
          <p>One platform across the range — no switching systems as you grow.</p>
        </div>
      </div>
    </section>
  );
}

/* ── How it works ────────────────────────────────────────────── */

const steps = [
  { t: "Registration", d: "The patient is registered digitally at the desk — as an appointment or a walk-in. Returning patients already have a record.", chip: "Registered", s: "neutral" },
  { t: "Token generated", d: "A token is issued instantly and the patient joins the correct doctor's or department's queue.", chip: "B-009 · Waiting", s: "waiting" },
  { t: "A visible wait", d: "Display screens in the waiting area show who is being served and who is next. No need to ask at the counter.", chip: "1 ahead", s: "waiting" },
  { t: "Consultation", d: "The doctor calls the next patient from their dashboard, with the patient's details and visit history in view.", chip: "Called · Room 4", s: "called" },
  { t: "Queue moves on", d: "Completing a consultation updates reception, every screen and the day's reports — automatically.", chip: "Completed", s: "done" },
] as const;

export function Journey() {
  return (
    <section id="how-it-works" className="section journey" aria-labelledby="how-title">
      <div className="wrap">
        <SectionHead
          index="05"
          label="How it works"
          title={<span id="how-title">One patient, one token, one connected journey.</span>}
          intro="Follow a single visit through SEHATONE. Every step updates everyone who needs to know."
        />
        <ol className="steps">
          {steps.map((s, n) => (
            <li key={s.t} data-reveal style={{ transitionDelay: `${n * 70}ms` }}>
              <div className="steps__marker">
                <span className="mono">{n + 1}</span>
              </div>
              <span className={`chip chip--${s.s}`}><Ticket size={13} /> {s.chip}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Why SEHATONE ────────────────────────────────────────────── */

const reasons = [
  ["Efficiency at the front desk", "Registration, token issue and queue updates happen in a few clicks instead of pages of writing and repeated phone calls."],
  ["Centralised management", "Every counter, doctor and screen runs on the same system, giving administrators one place to see and manage operations."],
  ["Less administrative workload", "Digital records and automatic queue updates remove repetitive paperwork, so staff can focus on patients."],
  ["A better patient experience", "Patients know their token, can see the queue moving and wait in calm, organised waiting areas."],
  ["Scales with your facility", "Start with a single clinic and extend to more desks, departments and display screens on the same platform."],
] as const;

export function Why() {
  return (
    <section id="why-sehatone" className="section why" aria-labelledby="why-title">
      <div className="wrap why__grid">
        <div className="why__aside">
          <p className="kicker"><span>06</span>Why SEHATONE</p>
          <h2 id="why-title" className="h2" data-reveal>
            Less paperwork. Shorter queues. <em>More time for care.</em>
          </h2>
          <a href="#demo" className="btn btn--dark" data-reveal>
            See it for your facility <ArrowRight size={17} />
          </a>
        </div>
        <dl className="why__list">
          {reasons.map(([t, d]) => (
            <div key={t} data-reveal>
              <dt>{t}</dt>
              <dd>{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────── */

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <Logo inverted />
          <p>Smart Healthcare Management System for clinics, hospitals and multi-specialty facilities.</p>
          <a href="/#demo" className="btn btn--primary btn--sm">Book a free demo <ArrowRight size={15} /></a>
        </div>
        <nav aria-label="Solutions">
          <p className="footer__h">Solutions</p>
          {solutions.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          <a href="/hospital-management-software#multi-specialty">Multi-specialty hospitals</a>
        </nav>
        <nav aria-label="Platform">
          <p className="footer__h">Platform</p>
          <a href="/#product">Platform overview</a>
          <a href="/#how-it-works">How it works</a>
          <a href="/#who-we-serve">Who we serve</a>
          <a href="/#why-sehatone">Why SEHATONE</a>
          <a href="/#faq">FAQ</a>
        </nav>
        <div>
          <p className="footer__h">Contact</p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {site.phone && <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>}
          <a href="/#contact">Send an inquiry</a>
        </div>
      </div>
      <div className="wrap footer__base">
        <p>© {year} SEHATONE. All rights reserved.</p>
        <a href="/privacy">Privacy policy</a>
      </div>
    </footer>
  );
}
