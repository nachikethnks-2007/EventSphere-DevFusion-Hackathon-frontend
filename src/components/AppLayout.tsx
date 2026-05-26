import { CalendarDays, QrCode, Sparkles, UserRoundCog } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const nav = [
  { to: "/", label: "Events" },
  { to: "/dashboard", label: "My Dashboard" },
  { to: "/organizer", label: "Organizer" },
  { to: "/check-in", label: "Check-In" },
  { to: "/ai", label: "AI Tools" },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(67,230,164,0.12),transparent_32rem),radial-gradient(circle_at_80%_0%,rgba(255,122,100,0.12),transparent_26rem),#070A12]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-mint text-ink">
              <CalendarDays size={22} />
            </span>
            <span>
              <span className="block text-lg font-bold leading-5">EventSphere</span>
              <span className="text-xs text-slate-400">discover, book, check in</span>
            </span>
          </Link>
          <nav className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-lg px-3 py-2 text-sm transition ${
                    isActive ? "bg-white text-ink" : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8">{children}</main>
      <div className="fixed bottom-4 right-4 hidden gap-2 md:flex">
        <Link className="grid h-11 w-11 place-items-center rounded-lg bg-white text-ink shadow-glow" to="/dashboard" title="Tickets">
          <QrCode size={20} />
        </Link>
        <Link className="grid h-11 w-11 place-items-center rounded-lg bg-mint text-ink shadow-glow" to="/ai" title="AI tools">
          <Sparkles size={20} />
        </Link>
        <Link className="grid h-11 w-11 place-items-center rounded-lg bg-coral text-ink shadow-glow" to="/organizer" title="Organizer">
          <UserRoundCog size={20} />
        </Link>
      </div>
    </div>
  );
}
