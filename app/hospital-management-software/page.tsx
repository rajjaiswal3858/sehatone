import { Landing, type LandingContent } from "@/components/Landing";
import { QueueMock } from "@/components/mockups/Mockups";
import { pageMetadata } from "@/lib/seo";

const content: LandingContent = {
  path: "/hospital-management-software",
  seoTitle: "Hospital Management Software for OPD & Reception | SEHATONE",
  seoDescription:
    "Hospital management software for OPD and front-desk operations: multi-counter registration, department token queues, display screens on every floor, reports.",
  crumb: "Hospital management software",
  eyebrow: "For small, medium & large hospitals and multi-specialty facilities",
  h1: <>Hospital management software for busy <em>OPDs</em>, counters and floors.</>,
  intro:
    "SEHATONE connects every registration counter, department, consulting room and waiting-hall screen in your hospital to one central system — so patient flow through the OPD is organised, visible and measurable.",
  visual: <QueueMock />,
  visualLabel: "Preview of the SEHATONE queue board showing department-wise patient queues",
  problemsTitle: "Hospital OPDs lose time between the counter and the consulting room.",
  problems: [
    ["Disconnected counters", "Each registration counter works on its own register or spreadsheet, so no one sees the whole OPD at once."],
    ["Department queues managed by voice", "Patients are called by name across crowded corridors, and those who miss the call lose their turn."],
    ["Waiting halls without information", "Patients on different floors have no way to know which token is being served, so they crowd doors and desks."],
    ["Little operational visibility", "Administrators can't easily see patient volumes by hour, department or doctor to plan staffing."],
  ],
  modulesTitle: "One system for every counter, department and screen.",
  modulesIntro:
    "SEHATONE is focused on OPD and front-desk operations: registration, reception, doctor queues, token display and operational reporting, managed centrally.",
  modules: [
    {
      title: "Multi-counter registration",
      body: "Several reception and registration desks work on the same system at the same time, with patient records stored centrally.",
      points: ["Shared central patient records", "Appointments and walk-ins", "Tokens issued per department or doctor"],
    },
    {
      title: "Department-wise queues",
      body: "Each department and doctor has their own queue. Doctors call patients from their dashboard and the queue updates everywhere.",
      points: ["Queue per doctor or department", "Doctor dashboards", "Live status for reception"],
    },
    {
      title: "Display screens on every floor",
      body: <>Waiting halls on different floors or wings each have a display screen, all connected to the same central system. See the <a href="/patient-queue-management-system">patient queue management system</a>.</>,
      points: ["Multiple screens, one system", "Now serving & up next", "Updates as soon as a doctor calls"],
    },
    {
      title: "Reports for administrators",
      body: "Operational reports on registrations, patient flow, visit types and doctor workload support staffing and planning decisions.",
      points: ["Patient flow by hour", "Department and doctor view", "Appointment vs walk-in mix"],
    },
  ],
  fitTitle: "Built for hospitals of different sizes.",
  fit: [
    { title: "Small hospitals", body: "A few departments and one or two registration counters — move the OPD off paper with tokens, doctor dashboards and a waiting-hall display." },
    { title: "Medium & large hospitals", body: "Several counters, many doctors and waiting halls across floors — coordinate them centrally, with screens wherever patients wait." },
    { id: "multi-specialty", title: "Multi-specialty facilities", body: "Many specialties, each with their own doctors and queues — keep one patient record across departments and a single view for management." },
  ],
  faq: [
    { q: "What does SEHATONE cover in a hospital?", a: "SEHATONE focuses on OPD and front-desk operations: digital patient registration and records, appointment and walk-in management, receptionist and doctor dashboards, token and queue management, live display screens and operational reports." },
    { q: "Can multiple registration counters use SEHATONE at the same time?", a: "Yes. All counters, doctor dashboards and display screens are connected to one centralised system, so everyone works from the same, current patient queue." },
    { q: "Can each department have its own queue and display screen?", a: "Yes. Queues can be kept per doctor or department, and multiple display screens across floors or wings can show the relevant tokens." },
    { q: "Is SEHATONE suitable for multi-specialty hospitals?", a: "Yes. Multi-specialty facilities can run a dedicated queue for each specialty while keeping a single patient record and a central view for administration." },
    { q: "How do we start?", a: "Book a free demo. We'll review your counters, departments and waiting areas and walk your team through a setup that reflects them." },
  ],
  ctaTitle: "See SEHATONE mapped to your hospital's OPD.",
};

export const metadata = pageMetadata({ title: content.seoTitle, description: content.seoDescription, path: content.path });

export default function Page() {
  return <Landing {...content} />;
}
