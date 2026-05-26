import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

export function OrganizerPlaceholderPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#070A12] px-5 text-white">
      <section className="glass max-w-lg rounded-lg p-7 text-center">
        <Link to="/" className="mx-auto mb-6 flex w-fit items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-mint text-ink">
            <CalendarDays size={22} />
          </span>
          <span className="text-xl font-bold">EventSphere</span>
        </Link>
        <h1 className="text-3xl font-black">Organizer Dashboard</h1>
        <p className="mt-3 text-slate-400">Organizer dashboard work is intentionally reserved for the next phase.</p>
      </section>
    </main>
  );
}
