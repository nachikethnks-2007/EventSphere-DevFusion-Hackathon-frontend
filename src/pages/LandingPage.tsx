import { CalendarDays, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_18%_18%,rgba(67,230,164,0.16),transparent_28rem),radial-gradient(circle_at_86%_8%,rgba(255,122,100,0.16),transparent_26rem),#070A12] px-5 text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between py-5">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-mint text-ink">
            <CalendarDays size={22} />
          </span>
          <span className="text-lg font-bold">EventSphere</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10" to="/login">
            <LogIn size={17} /> Login
          </Link>
          <Link className="inline-flex items-center gap-2 rounded-lg bg-mint px-4 py-2 text-sm font-bold text-ink hover:bg-white" to="/signup">
            <UserPlus size={17} /> Sign Up
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-7">
          <span className="inline-flex rounded-lg border border-mint/30 bg-mint/10 px-3 py-1 text-sm text-mint">
            Events, discovery, and access in one place
          </span>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">EventSphere</h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Find events that match your city, mood, and schedule with a fast attendee-first experience.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="inline-flex items-center gap-2 rounded-lg bg-mint px-5 py-3 font-bold text-ink hover:bg-white" to="/signup">
              Start exploring
              <UserPlus size={18} />
            </Link>
            <Link className="inline-flex rounded-lg border border-white/15 px-5 py-3 font-bold text-white hover:bg-white/10" to="/login">
              I already have an account
            </Link>
          </div>
        </div>

        <div className="glass overflow-hidden rounded-lg">
          <img
            className="h-[29rem] w-full object-cover"
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=80"
            alt="Crowd at a live event"
          />
          <div className="grid grid-cols-3 gap-px bg-white/10 text-center">
            {[
              ["Live", "events"],
              ["Smart", "filters"],
              ["Fast", "signup"],
            ].map(([value, label]) => (
              <div key={label} className="bg-panel p-4">
                <strong className="block text-xl text-mint">{value}</strong>
                <span className="text-xs text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
