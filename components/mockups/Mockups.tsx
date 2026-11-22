import { queue, doctors, STATUS_LABEL, type Status, type DoctorId } from "./data";
import { DisplayScreen } from "./DisplayScreen";
import { Home, Users, Ticket, Monitor, Chart, Plus, Clipboard } from "../icons";

/* ── Shared pieces ───────────────────────────────────────────── */

export function Frame({
  title,
  meta,
  children,
  className = "",
}: {
  title: string;
  meta?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`frame ${className}`} data-nosnippet="">
      <div className="frame__bar">
        <span className="frame__dots" aria-hidden="true">
          <i /><i /><i />
        </span>
        <span className="frame__title">{title}</span>
        {meta && <span className="frame__meta">{meta}</span>}
      </div>
      <div className="frame__body">{children}</div>
    </div>
  );
}

export const Pill = ({ s }: { s: Status }) => <span className={`pill pill--${s}`}>{STATUS_LABEL[s]}</span>;

function Rail({ active }: { active: number }) {
  const items = [Home, Users, Ticket, Monitor, Chart];
  return (
    <nav className="rail" aria-hidden="true">
      <span className="rail__mark" />
      {items.map((I, n) => (
        <span key={n} className={n === active ? "is-active" : undefined}>
          <I size={15} />
        </span>
      ))}
    </nav>
  );
}

const count = (s: Status) => queue.filter((q) => q.status === s).length;

/* ── Reception dashboard ─────────────────────────────────────── */

export function ReceptionMock({ rows = 7, compact = false }: { rows?: number; compact?: boolean }) {
  return (
    <Frame title="Reception · Front desk 1" meta="Tue, 17 Nov · 11:04">
      <div className="app">
        <Rail active={1} />
        <div className="app__main">
          <div className="app__head">
            <div>
              <p className="app__kicker">Today</p>
              <p className="app__h">Patient queue</p>
            </div>
            <span className="mbtn mbtn--primary"><Plus size={13} /> New registration</span>
          </div>
          <div className="stats">
            <div><b>{count("waiting")}</b><span>Waiting</span></div>
            <div><b>{count("called") + count("consult")}</b><span>With doctor</span></div>
            <div><b>{count("done")}</b><span>Completed</span></div>
            <div><b>{queue.filter((q) => q.type === "Walk-in").length}</b><span>Walk-ins</span></div>
          </div>
          <table className="mtable">
            <thead>
              <tr><th>Token</th><th>Patient</th><th className="hide-sm">Doctor</th>{!compact && <th className="hide-sm">Visit</th>}<th>Status</th></tr>
            </thead>
            <tbody>
              {queue.slice(0, rows).map((q) => (
                <tr key={q.token} className={q.status === "called" ? "is-hl" : undefined}>
                  <td className="mono">{q.token}</td>
                  <td>{q.name}<small>{q.time}</small></td>
                  <td className="hide-sm">{doctors[q.doctor].name}</td>
                  {!compact && <td className="hide-sm">{q.type}</td>}
                  <td><Pill s={q.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Frame>
  );
}

/* ── Registration ────────────────────────────────────────────── */

export function RegistrationMock() {
  const F = ({ l, v, w }: { l: string; v: string; w?: string }) => (
    <label className="mfield" style={w ? { gridColumn: w } : undefined}>
      <span>{l}</span>
      <b>{v}</b>
    </label>
  );
  return (
    <Frame title="New patient registration" meta="Front desk 1">
      <div className="reg">
        <div className="reg__form">
          <F l="Full name" v="Ananya Iyer" w="1 / -1" />
          <F l="Mobile" v="+91 98•••• ••821" />
          <F l="Age / Sex" v="29 · Female" />
          <div className="mfield" style={{ gridColumn: "1 / -1" }}>
            <span>Visit type</span>
            <div className="seg"><i className="is-on">Appointment</i><i>Walk-in</i></div>
          </div>
          <F l="Department" v="Paediatrics (with child)" />
          <F l="Doctor" v="Dr. P. Rao · Room 4" />
          <span className="mbtn mbtn--primary reg__cta"><Ticket size={13} /> Save &amp; generate token</span>
        </div>
        <div className="slip" aria-hidden="true">
          <span className="slip__brand">SEHAT<b>ONE</b></span>
          <span className="slip__label">Your token</span>
          <span className="slip__token">B-009</span>
          <dl>
            <dt>Doctor</dt><dd>Dr. P. Rao</dd>
            <dt>Room</dt><dd>4</dd>
            <dt>Ahead of you</dt><dd>1</dd>
          </dl>
          <span className="slip__foot">Please watch the display screen</span>
        </div>
      </div>
    </Frame>
  );
}

/* ── Doctor dashboard ────────────────────────────────────────── */

export function DoctorMock() {
  const mine = queue.filter((q) => q.doctor === "mehta" && q.status !== "done");
  return (
    <Frame title="Dr. S. Mehta · Room 2" meta="General Medicine">
      <div className="doc">
        <div className="doc__current">
          <p className="app__kicker">Current patient</p>
          <div className="doc__patient">
            <span className="doc__token mono">A-023</span>
            <div>
              <p className="app__h">Harpreet Singh</p>
              <p className="muted">46 · Male · Walk-in · Registered 10:42</p>
            </div>
          </div>
          <p className="app__kicker" style={{ marginTop: 18 }}>Visit history</p>
          <ul className="hist">
            <li><span className="mono">12 Aug 2026</span> General consultation</li>
            <li><span className="mono">03 Mar 2026</span> Follow-up visit</li>
            <li><span className="mono">19 Jan 2026</span> First visit · registered</li>
          </ul>
          <div className="doc__actions">
            <span className="mbtn mbtn--primary">Mark consultation complete</span>
            <span className="mbtn">Call next</span>
          </div>
        </div>
        <div className="doc__queue">
          <p className="app__kicker">My queue · {mine.length - 1} waiting</p>
          <ul>
            {mine.map((q) => (
              <li key={q.token} className={q.status === "called" ? "is-hl" : undefined}>
                <span className="mono">{q.token}</span>
                <span>{q.name}</span>
                <Pill s={q.status === "called" ? "consult" : q.status} />
              </li>
            ))}
            <li><span className="mono">A-025</span><span>Deepa Menon</span><Pill s="waiting" /></li>
          </ul>
        </div>
      </div>
    </Frame>
  );
}

/* ── Queue board ─────────────────────────────────────────────── */

export function QueueMock() {
  const lanes: { id: DoctorId; now: string; next: string[] }[] = [
    { id: "mehta", now: "A-023", next: ["A-024", "A-025", "A-026"] },
    { id: "rao", now: "B-008", next: ["B-009", "B-010"] },
    { id: "khan", now: "C-013", next: ["C-014", "C-015", "C-016", "C-017"] },
  ];
  return (
    <Frame title="Queue board · All departments" meta="Live">
      <div className="lanes">
        {lanes.map((l) => (
          <div className="lane" key={l.id}>
            <p className="lane__doc">{doctors[l.id].name}</p>
            <p className="muted">{doctors[l.id].dept} · {doctors[l.id].room}</p>
            <div className="lane__now">
              <span className="app__kicker">In consultation</span>
              <b className="mono">{l.now}</b>
            </div>
            <ol className="lane__list">
              {l.next.map((t, n) => (
                <li key={t}><span className="mono">{t}</span><em>{n === 0 ? "Next" : `#${n + 1}`}</em></li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <div className="legend" aria-hidden="true">
        {(["waiting", "called", "consult", "done"] as Status[]).map((s) => <Pill key={s} s={s} />)}
      </div>
    </Frame>
  );
}

/* ── Multiple display screens ────────────────────────────────── */

export function ScreensMock() {
  return (
    <div className="screens">
      <div className="screens__row">
        <figure>
          <DisplayScreen size="sm" location="Waiting hall · Ground floor" start={0} />
          <figcaption>Waiting hall · Ground floor</figcaption>
        </figure>
        <figure>
          <DisplayScreen size="sm" location="OPD · First floor" start={2} />
          <figcaption>OPD · First floor</figcaption>
        </figure>
      </div>
      <svg className="screens__links" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M100 0 V30 H300 V0 M200 30 V60" />
      </svg>
      <div className="screens__hub">
        <Clipboard size={15} /> One central system · reception, doctors &amp; displays in sync
      </div>
    </div>
  );
}

/* ── Reports ─────────────────────────────────────────────────── */

export function AnalyticsMock() {
  const hours = [
    ["9", 14, 6], ["10", 22, 11], ["11", 26, 14], ["12", 19, 9], ["13", 8, 4],
    ["14", 12, 7], ["15", 18, 10], ["16", 21, 12], ["17", 15, 8], ["18", 9, 5],
  ] as const;
  const max = 42;
  const depts = [["General Medicine", 0.92], ["Paediatrics", 0.64], ["Orthopaedics", 0.48], ["Dermatology", 0.36]] as const;
  return (
    <Frame title="Reports · Patient flow" meta="This week">
      <div className="rep">
        <div className="rep__chart">
          <div className="rep__legend">
            <span><i className="k1" /> Appointments</span>
            <span><i className="k2" /> Walk-ins</span>
          </div>
          <svg viewBox="0 0 300 130" role="img" aria-label="Sample chart: registrations by hour of day">
            {[0, 1, 2, 3].map((g) => (
              <line key={g} x1="0" x2="300" y1={10 + g * 33} y2={10 + g * 33} className="grid" />
            ))}
            {hours.map(([h, a, w], n) => {
              const x = 8 + n * 29.5;
              const ha = (a / max) * 100;
              const hw = (w / max) * 100;
              return (
                <g key={h}>
                  <rect x={x} y={109 - ha - hw} width="16" height={hw} className="b2" rx="1.5" />
                  <rect x={x} y={109 - ha} width="16" height={ha} className="b1" rx="1.5" />
                  <text x={x + 8} y="125" textAnchor="middle">{h}</text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="rep__side">
          <p className="app__kicker">Consultations by department</p>
          {depts.map(([d, v]) => (
            <div className="hbar" key={d}>
              <span>{d}</span>
              <i style={{ width: `${v * 100}%` }} />
            </div>
          ))}
          <p className="app__kicker" style={{ marginTop: 16 }}>Busiest hour</p>
          <p className="rep__big mono">11:00 – 12:00</p>
        </div>
      </div>
    </Frame>
  );
}
