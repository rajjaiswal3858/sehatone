// Illustrative sample data for interface previews. Not real patients.
export type Status = "waiting" | "called" | "consult" | "done";

export const STATUS_LABEL: Record<Status, string> = {
  waiting: "Waiting",
  called: "Called",
  consult: "In consultation",
  done: "Completed",
};

export const doctors = {
  mehta: { name: "Dr. S. Mehta", dept: "General Medicine", room: "Room 2" },
  rao: { name: "Dr. P. Rao", dept: "Paediatrics", room: "Room 4" },
  khan: { name: "Dr. A. Khan", dept: "Orthopaedics", room: "Room 5" },
} as const;

export type DoctorId = keyof typeof doctors;

export const queue: {
  token: string;
  name: string;
  doctor: DoctorId;
  type: "Appointment" | "Walk-in";
  time: string;
  status: Status;
}[] = [
  { token: "A-021", name: "Ritu Sharma", doctor: "mehta", type: "Appointment", time: "10:05", status: "done" },
  { token: "A-022", name: "Mohammed Arif", doctor: "mehta", type: "Walk-in", time: "10:12", status: "done" },
  { token: "B-008", name: "Kavya Nair", doctor: "rao", type: "Appointment", time: "10:20", status: "consult" },
  { token: "A-023", name: "Harpreet Singh", doctor: "mehta", type: "Walk-in", time: "10:42", status: "called" },
  { token: "B-009", name: "Ananya Iyer", doctor: "rao", type: "Appointment", time: "10:48", status: "waiting" },
  { token: "A-024", name: "Suresh Patil", doctor: "mehta", type: "Walk-in", time: "10:55", status: "waiting" },
  { token: "C-014", name: "Fatima Shaikh", doctor: "khan", type: "Appointment", time: "11:02", status: "waiting" },
];

// Rotation used by the animated display screen
export const displaySequence = [
  { token: "A-023", room: "Room 2", doctor: "Dr. S. Mehta" },
  { token: "B-009", room: "Room 4", doctor: "Dr. P. Rao" },
  { token: "C-014", room: "Room 5", doctor: "Dr. A. Khan" },
  { token: "A-024", room: "Room 2", doctor: "Dr. S. Mehta" },
  { token: "B-010", room: "Room 4", doctor: "Dr. P. Rao" },
  { token: "A-025", room: "Room 2", doctor: "Dr. S. Mehta" },
  { token: "C-015", room: "Room 5", doctor: "Dr. A. Khan" },
];
