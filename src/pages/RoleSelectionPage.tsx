import { CalendarDays, Users, UserRoundCog } from "lucide-react";
import { Link } from "react-router-dom";

export function RoleSelectionPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_50%_0%,rgba(67,230,164,0.16),transparent_28rem),#070A12] px-5 py-10 text-white">
      <section className="w-full max-w-3xl space-y-7">
        <Link to="/" className="mx-auto flex w-fit items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-mint text-ink">
            <CalendarDays size={22} />
          </span>
          <span className="text-xl font-bold">EventSphere</span>
        </Link>

        <div className="text-center">
          <h1 className="text-3xl font-black sm:text-4xl">Choose your account type</h1>
          <p className="mt-3 text-slate-400">Phase 1 is focused on attendee signup. Organizer signup is reserved for the next phase.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link className="glass group rounded-lg p-6 transition hover:-translate-y-1 hover:border-mint/50" to="/signup/attendee">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-mint text-ink">
              <Users size={24} />
            </span>
            <h2 className="mt-5 text-2xl font-bold">Attendee</h2>
            <p className="mt-2 text-slate-400">Create an account, discover events, and personalize your feed.</p>
            <span className="mt-6 inline-flex rounded-lg bg-white px-4 py-2 font-bold text-ink group-hover:bg-mint">Continue</span>
          </Link>

          <div className="glass rounded-lg p-6 opacity-75">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-white/10 text-slate-200">
              <UserRoundCog size={24} />
            </span>
            <h2 className="mt-5 text-2xl font-bold">Organizer</h2>
            <p className="mt-2 text-slate-400">Organizer onboarding and dashboard tools are not part of Phase 1.</p>
            <span className="mt-6 inline-flex rounded-lg border border-white/15 px-4 py-2 font-bold text-slate-300">Coming soon</span>
          </div>
        </div>
      </section>
    </main>
  );
}
