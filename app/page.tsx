import { Header } from "@/components/Header";
import { Hero, Problems, Solution, Audience, Journey, Why, Footer } from "@/components/Sections";
import { Features } from "@/components/Features";
import { Contact } from "@/components/Contact";
import { Faq, type FaqItem } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { JsonLd, pageMetadata, webPageLd, faqLd } from "@/lib/seo";

const seo = {
  title: "Clinic & Hospital Management Software | SEHATONE",
  description:
    "Clinic and hospital management software for India: digital patient registration, reception and doctor dashboards, token queues, display screens and reports.",
  path: "/",
};

export const metadata = pageMetadata(seo);

const faq: FaqItem[] = [
  {
    q: "What is SEHATONE?",
    a: "SEHATONE is a smart healthcare management system for clinics and hospitals. It brings digital patient registration and records, appointment and walk-in management, receptionist and doctor dashboards, token and queue management, live display screens and operational reports into one centralised platform.",
  },
  {
    q: "Is SEHATONE for clinics or for hospitals?",
    a: "Both. The same platform works for an independent doctor's clinic with one reception desk and for small, medium and large hospitals or multi-specialty facilities with many counters, departments and waiting areas.",
  },
  {
    q: "How is SEHATONE different from a full hospital information system?",
    a: "SEHATONE focuses on patient flow and front-desk operations: registration, reception, doctor queues, token display screens and operational reporting. It is designed to make those everyday operations faster and more organised.",
  },
  {
    q: "Can several reception desks and display screens work together?",
    a: "Yes. Multiple reception desks, doctor dashboards and display screens are connected to one central system, so everyone sees the same, current queue.",
  },
  {
    q: "What reports does SEHATONE provide?",
    a: "Operational reports cover registrations, patient flow by hour and department, appointment and walk-in mix, and doctor workload, helping administrators plan staff and spot bottlenecks.",
  },
  {
    q: "How can we see SEHATONE before deciding?",
    a: "Book a free demo through the form on this page. We'll contact you to understand your facility and walk you and your team through the platform.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd nodes={[webPageLd(seo), faqLd(faq)]} />
      <Header />
      <main id="main">
        <Hero />
        <Problems />
        <Solution />
        <Features />
        <Audience />
        <Journey />
        <Why />
        <Faq items={faq} title="Questions about SEHATONE" />
        <Contact />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
