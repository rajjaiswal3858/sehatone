import { Landing, type LandingContent } from "@/components/Landing";
import { ReceptionMock } from "@/components/mockups/Mockups";
import { pageMetadata } from "@/lib/seo";

const content: LandingContent = {
  path: "/clinic-management-software",
  seoTitle: "Clinic Management Software for Private Clinics | SEHATONE",
  seoDescription:
    "Clinic management software for doctors and private clinics in India: digital patient registration, token queues, a waiting-room display and simple reports.",
  crumb: "Clinic management software",
  eyebrow: "For private clinics & independent doctors",
  h1: <>Clinic management software that keeps your <em>front desk</em> calm.</>,
  intro:
    "SEHATONE replaces the register book, paper slips and verbal calling at your clinic with one simple system — patients are registered digitally, receive a token, and watch the queue move on a waiting-room screen while the doctor sees exactly who is next.",
  visual: <ReceptionMock rows={6} compact />,
  visualLabel: "Preview of the SEHATONE reception dashboard showing a clinic's patient queue",
  problemsTitle: "Where a busy clinic day usually goes wrong.",
  problems: [
    ["The register book", "Every patient's details are written by hand, every visit — slow for the receptionist and hard to read or search later."],
    ["Crowding at the counter", "Without tokens or a visible queue, patients keep coming to the desk to ask how long it will be."],
    ["Appointments and walk-ins collide", "Booked patients and walk-ins end up in one unclear line, and the order is disputed."],
    ["No picture of the day", "At closing time there is no reliable record of how many patients came, when, and for which doctor."],
  ],
  modulesTitle: "Everything a clinic front desk needs — nothing it doesn't.",
  modulesIntro:
    "SEHATONE is designed so a single receptionist can run it from day one, and it grows with you if you add doctors or rooms.",
  modules: [
    {
      title: "Digital patient registration",
      body: "Register patients in a structured form instead of a register book. Their record is stored centrally, so returning patients don't start from scratch.",
      points: ["Digital patient records", "Appointments and walk-ins in one flow", "Token issued on save"],
    },
    {
      title: "Token & queue management",
      body: "Each patient receives a token and joins the right doctor's queue. The queue moves forward automatically as consultations finish.",
      points: ["Fair, visible order", "Separate queue per doctor", "Clear patient status"],
    },
    {
      title: "Waiting-room display screen",
      body: <>A screen in the waiting area shows the token being served and who is next, so patients wait calmly instead of asking at the desk. More on our <a href="/patient-queue-management-system">token display system</a>.</>,
      points: ["Now serving & up next", "Updates when the doctor calls", "Works on a standard screen"],
    },
    {
      title: "Doctor dashboard & reports",
      body: "Doctors see their own queue and the current patient's details and visit history. Simple reports show how each day actually went.",
      points: ["Personal patient queue", "Visit history at hand", "Daily operational reports"],
    },
  ],
  fitTitle: "Is SEHATONE right for your clinic?",
  fit: [
    { title: "Single-doctor clinics", body: "One desk, one doctor, one waiting area — replace paper with a token system and a display screen without adding complexity." },
    { title: "Clinics with several doctors", body: "Run separate queues for each doctor or room from the same reception desk, with each doctor working from their own dashboard." },
    { title: "Growing practices", body: <>Add doctors, rooms, counters and screens on the same platform. If you grow into a hospital setup, see our <a href="/hospital-management-software">hospital management software</a>.</> },
  ],
  faq: [
    { q: "What is clinic management software?", a: "Clinic management software digitises the day-to-day operations of a clinic — patient registration, appointments and walk-ins, the patient queue and records — so staff spend less time on paperwork and patients spend less time waiting. SEHATONE focuses on registration, reception, doctor dashboards, token queues, display screens and reports." },
    { q: "Can SEHATONE handle both appointments and walk-in patients?", a: "Yes. Appointments and walk-ins are registered in the same flow, each receives a token, and both appear in the doctor's queue with their visit type clearly shown." },
    { q: "Do we need a display screen to use SEHATONE?", a: "No. The display screen is recommended for the waiting area, but registration, tokens, the reception dashboard, the doctor dashboard and reports all work without it." },
    { q: "Is it suitable for a clinic with only one receptionist?", a: "Yes. SEHATONE is designed so a single receptionist can register patients, issue tokens and manage the day's queue from one screen." },
    { q: "How do we get a demo or pricing?", a: "Book a free demo using the form on our website. We'll understand your clinic's setup — doctors, desks and screens — and share details that fit it." },
  ],
  ctaTitle: "See how SEHATONE would run your clinic.",
};

export const metadata = pageMetadata({ title: content.seoTitle, description: content.seoDescription, path: content.path });

export default function Page() {
  return <Landing {...content} />;
}
