import { Landing, type LandingContent } from "@/components/Landing";
import { ScreensMock } from "@/components/mockups/Mockups";
import { pageMetadata } from "@/lib/seo";

const content: LandingContent = {
  path: "/patient-queue-management-system",
  seoTitle: "Patient Queue Management & Token Display System | SEHATONE",
  seoDescription:
    "Patient queue management system with automatic tokens and live display screens for clinics and hospitals. Shorter crowds at reception and a calmer waiting area.",
  crumb: "Patient queue management system",
  eyebrow: "Token system & live display screens",
  h1: <>Patient queue management with live <em>token display</em> screens.</>,
  intro:
    "SEHATONE issues a token to every patient at registration, keeps a separate queue for each doctor or department, and shows who is being served on display screens in your waiting areas — all updated the moment a doctor calls the next patient.",
  visual: <ScreensMock />,
  visualLabel: "Preview of two SEHATONE waiting-area display screens connected to one central system",
  problemsTitle: "Why waiting rooms get crowded and tense.",
  problems: [
    ["Nobody knows their position", "Without a token number, patients can't tell how many people are ahead of them."],
    ["Names called across the room", "Verbal calling is easy to miss, especially in large or noisy waiting halls."],
    ["Reception becomes the queue", "Patients repeatedly ask the front desk about their turn, interrupting registrations."],
    ["Disputes over order", "When appointments and walk-ins share an unclear line, the order of patients is questioned."],
  ],
  modulesTitle: "A complete token and queue system, connected to your front desk.",
  modulesIntro:
    "The queue isn't a separate gadget — it's part of the same system reception and doctors already use, so tokens, screens and dashboards are always in sync.",
  modules: [
    {
      title: "Automatic token generation",
      body: "A token is generated the moment a patient is registered, for both appointments and walk-ins.",
      points: ["No manual numbering", "Token per doctor or department", "Given to the patient at registration"],
    },
    {
      title: "Live display screens",
      body: "Waiting-area screens show the token currently being served, the room, and the tokens coming up next.",
      points: ["Now serving & up next", "Room and doctor shown", "Multiple screens supported"],
    },
    {
      title: "Doctor-controlled calling",
      body: "Doctors call the next patient from their dashboard, which updates the screens and the reception view instantly.",
      points: ["Call next from the cabin", "Mark consultation complete", "Reception sees status live"],
    },
    {
      title: "Clear queue statuses",
      body: "Every token moves through clear states, so reception always knows where each patient is in their visit.",
      points: ["Waiting", "Called / in consultation", "Completed"],
    },
  ],
  fitTitle: "One queue system for clinics and hospitals.",
  fit: [
    { title: "Clinics", body: <>A single waiting-room screen and token system replace calling out names and the crowd at the counter. Read more about our <a href="/clinic-management-software">clinic management software</a>.</> },
    { title: "Hospitals & OPDs", body: <>Department-wise queues and display screens on every floor, all controlled from one central system. Read more about our <a href="/hospital-management-software">hospital management software</a>.</> },
    { title: "Multi-specialty facilities", body: "Separate queues per specialty with screens in each waiting area, overseen centrally by administration." },
  ],
  faq: [
    { q: "What is a patient queue management system?", a: "A patient queue management system organises patients into a fair, visible order using tokens. Patients receive a token at registration, a display screen shows which token is being served, and doctors call the next patient from their dashboard." },
    { q: "How does the token display system work?", a: "When a doctor calls the next patient, SEHATONE updates the display screens in the waiting area with the token number, room and doctor, along with the next tokens in line." },
    { q: "Can we use more than one display screen?", a: "Yes. Multiple display screens across floors, wings or departments can be connected to the same central system." },
    { q: "Does the queue work for both appointments and walk-ins?", a: "Yes. Both are registered in the same flow and receive tokens, and the visit type is visible to reception and the doctor." },
    { q: "Is the queue system separate from the rest of SEHATONE?", a: "No. Tokens and queues are part of the same platform as patient registration, the receptionist and doctor dashboards and reports, so everything stays in sync." },
  ],
  ctaTitle: "See the token and display system in action.",
};

export const metadata = pageMetadata({ title: content.seoTitle, description: content.seoDescription, path: content.path });

export default function Page() {
  return <Landing {...content} />;
}
