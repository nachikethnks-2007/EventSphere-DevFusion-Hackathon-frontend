import { Calendar, MapPin, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { EventItem } from "../types";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="glass overflow-hidden rounded-lg transition hover:-translate-y-1 hover:border-mint/40">
      <img className="h-44 w-full object-cover" src={event.banner} alt="" />
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-mint">{event.category}</p>
            <h3 className="mt-1 text-xl font-bold">{event.title}</h3>
          </div>
          <span className="rounded-md bg-white/10 px-2.5 py-1 text-sm">{event.free ? "Free" : `₹${event.price}`}</span>
        </div>
        <div className="grid gap-2 text-sm text-slate-300">
          <span className="flex items-center gap-2">
            <Calendar size={16} /> {new Date(event.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={16} /> {event.venue}, {event.city}
          </span>
        </div>
        <Link
          to={`/events/${event.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-mint px-4 py-3 font-semibold text-ink transition hover:bg-white"
        >
          <Ticket size={18} /> Register
        </Link>
      </div>
    </article>
  );
}
