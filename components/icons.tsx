// One consistent icon family: 24px grid, 1.6 stroke, round joins.
type P = { size?: number; className?: string };

function Icon({ size = 18, className, children }: P & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: P) => (
  <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
);
export const Check = (p: P) => (
  <Icon {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></Icon>
);
export const Phone = (p: P) => (
  <Icon {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></Icon>
);
export const Mail = (p: P) => (
  <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Icon>
);
export const Menu = (p: P) => (
  <Icon {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>
);
export const Close = (p: P) => (
  <Icon {...p}><path d="M6 6l12 12M18 6L6 18" /></Icon>
);
export const Plus = (p: P) => (
  <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>
);
export const Users = (p: P) => (
  <Icon {...p}><circle cx="9" cy="8" r="3.2" /><path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5M16 5.2a3 3 0 010 5.6M18 14.4c1.6.7 2.6 2.3 3 4.6" /></Icon>
);
export const Monitor = (p: P) => (
  <Icon {...p}><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M9 20h6M12 16v4" /></Icon>
);
export const Chart = (p: P) => (
  <Icon {...p}><path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6" /></Icon>
);
export const Clipboard = (p: P) => (
  <Icon {...p}><rect x="5" y="4" width="14" height="17" rx="1.5" /><path d="M9 4h6v3H9zM8.5 12h7M8.5 16h5" /></Icon>
);
export const Steth = (p: P) => (
  <Icon {...p}><path d="M6 3v6a4 4 0 008 0V3M10 13v2a5 5 0 0010 0v-2" /><circle cx="20" cy="11" r="2" /></Icon>
);
export const Ticket = (p: P) => (
  <Icon {...p}><path d="M4 7a1 1 0 011-1h14a1 1 0 011 1v3a2 2 0 000 4v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3a2 2 0 000-4z" /><path d="M14 6v12" strokeDasharray="2 2" /></Icon>
);
export const Home = (p: P) => (
  <Icon {...p}><path d="M4 11l8-7 8 7v9H4z" /><path d="M10 20v-5h4v5" /></Icon>
);
