function Icon({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">{children}</svg>; }

export function ChatIcon() { return <Icon><path d="M4 5h16v12H9l-5 4V5Z" /><path d="M9 11h6" /></Icon>; }
export function PeopleIcon() { return <Icon><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2 20v-2a6 6 0 0 1 12 0v2M14 15a5 5 0 0 1 7 5" /></Icon>; }
export function GlobeIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.3 3 14.7 0 18M12 3c-3 3.3-3 14.7 0 18" /></Icon>; }
export function PersonIcon() { return <Icon><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></Icon>; }
export function ClockIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>; }
export function BellIcon() { return <Icon><path d="M6 17h12l-1.5-2V10a4.5 4.5 0 0 0-9 0v5L6 17Z" /><path d="M10 20h4" /></Icon>; }
export function ShieldIcon() { return <Icon><path d="M12 3 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6Z" /><path d="m9 12 2 2 4-4" /></Icon>; }
export function HeartIcon() { return <Icon><path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-7.8a5.2 5.2 0 0 0 0-7.4Z" /></Icon>; }
export function MoonIcon() { return <Icon><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" /></Icon>; }
export function MailIcon() { return <Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></Icon>; }
export function RequestIcon() { return <Icon><path d="M5 3h14v18H5Z" /><path d="M8 7h8M8 11h8M8 15h5" /></Icon>; }
export function MaskIcon() { return <Icon><path d="M3 8c2-1.5 5-2 9-2s7 .5 9 2l-1 7c-.4 3-3 5-6 5l-2-2-2 2c-3 0-5.6-2-6-5Z" /><circle cx="8" cy="12" r="2" /><circle cx="16" cy="12" r="2" /></Icon>; }
export function DatabaseIcon() { return <Icon><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></Icon>; }
export function WarningIcon() { return <Icon><path d="M12 3 2 21h20Z" /><path d="M12 9v5M12 18h.01" /></Icon>; }
export function LockIcon() { return <Icon><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></Icon>; }
export function PhoneIcon() { return <Icon><path d="M7 3 4 5c0 8 7 15 15 15l2-3-5-3-2 2c-3-1-5-3-6-6l2-2Z" /></Icon>; }
export function SparkIcon() { return <Icon><path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8ZM5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8Z" /></Icon>; }
export function RefreshIcon() { return <Icon><path d="M20 7v5h-5M4 17v-5h5" /><path d="M18 10a7 7 0 0 0-12-3l-2 2M6 14a7 7 0 0 0 12 3l2-2" /></Icon>; }
export function SignOutIcon() { return <Icon><path d="M10 5H5v14h5M14 8l4 4-4 4m4-4H9" /></Icon>; }
export function CheckIcon() { return <Icon><path d="m5 12 4 4L19 6" /></Icon>; }
export function ScaleIcon() { return <Icon><path d="M12 3v18M5 6h14M7 6l-4 7h8L7 6Zm10 0-4 7h8l-4-7ZM8 21h8" /></Icon>; }
