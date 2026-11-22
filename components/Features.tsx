"use client";

import { useRef, useState } from "react";
import { RegistrationMock, ReceptionMock, DoctorMock, QueueMock, ScreensMock, AnalyticsMock } from "./mockups/Mockups";
import { Check } from "./icons";

const features = [
  {
    id: "registration",
    name: "Patient registration",
    title: "Register once. Recognise them every visit after.",
    body: "Patient details are captured digitally at the front desk in a structured form and stored centrally, so returning patients are never re-registered on paper.",
    points: ["Structured digital patient records", "Appointments and walk-ins in the same flow", "Token issued the moment registration is saved"],
    Mock: RegistrationMock,
  },
  {
    id: "reception",
    name: "Receptionist dashboard",
    title: "The whole front desk on one screen.",
    body: "Reception sees every patient in the day's queue — who is waiting, who is with a doctor and who is done — and can register, assign and update from one place.",
    points: ["Live view of today's patients", "Appointments and walk-ins side by side", "Clear status for every token"],
    Mock: ReceptionMock,
  },
  {
    id: "doctor",
    name: "Doctor dashboard",
    title: "A focused view for the consulting room.",
    body: "Each doctor sees their own queue and the patient in front of them, with previous visit records at hand. Calling the next patient updates reception and the screens at once.",
    points: ["Personal patient queue", "Patient details and visit history", "Call next and complete consultations"],
    Mock: DoctorMock,
  },
  {
    id: "queue",
    name: "Token & queue management",
    title: "Orderly queues, without the crowd at the counter.",
    body: "Every patient receives a token on registration. Queues are kept per doctor or department and move forward automatically as consultations are completed.",
    points: ["Automatic token generation", "Separate queues per doctor or department", "Waiting, called, in consultation, completed"],
    Mock: QueueMock,
  },
  {
    id: "displays",
    name: "Live display screens",
    title: "Every waiting area knows who is next.",
    body: "Display screens show the token being served and the tokens coming up. Multiple screens across floors or departments run from the same central system.",
    points: ["Now-serving and up-next tokens", "Multiple screens, one system", "Updates as soon as a doctor calls"],
    Mock: ScreensMock,
  },
  {
    id: "reports",
    name: "Reports & analytics",
    title: "See how the day actually ran.",
    body: "Operational reports on registrations, patient flow, visit types and doctor workload help administrators plan staff and spot bottlenecks.",
    points: ["Daily and periodic operational reports", "Patient flow by hour and department", "Appointment and walk-in mix"],
    Mock: AnalyticsMock,
  },
];

export function Features() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const map: Record<string, number> = {
      ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: features.length - 1,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = (map[e.key] + features.length) % features.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="product" className="section features" aria-labelledby="features-title">
      <div className="wrap">
        <header className="shead" data-reveal>
          <p className="kicker"><span>03</span>The platform</p>
          <h2 id="features-title" className="h2">Six connected modules. <em>One</em> patient flow.</h2>
          <p className="shead__intro">
            Each part of SEHATONE is useful on its own — together they keep every desk, cabin and
            screen in your facility working from the same information.
          </p>
        </header>

        <div className="feat">
          <div className="feat__tabs" role="tablist" aria-label="Platform modules" aria-orientation="vertical">
            {features.map((f, i) => (
              <button
                key={f.id}
                ref={(el) => { tabs.current[i] = el; }}
                role="tab"
                id={`tab-${f.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${f.id}`}
                tabIndex={active === i ? 0 : -1}
                className="feat__tab"
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <span className="mono">0{i + 1}</span>
                {f.name}
              </button>
            ))}
          </div>

          {features.map((f, i) => (
            <div
              key={f.id}
              role="tabpanel"
              id={`panel-${f.id}`}
              aria-labelledby={`tab-${f.id}`}
              hidden={active !== i}
              className="feat__panel"
            >
              <div className="feat__text">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
                <ul className="ticks">
                  {f.points.map((p) => <li key={p}><Check size={16} />{p}</li>)}
                </ul>
              </div>
              <div className="feat__visual">
                <f.Mock />
                <p className="caption">Interface preview · sample data</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
