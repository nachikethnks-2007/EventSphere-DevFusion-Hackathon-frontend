import { Heart, MapPinned, Share2, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { events } from "../data";

export function EventDetails() {
  const { id } = useParams();
  const event = events.find((item) => item.id === id) ?? events[0];

  return (
    <div className="space-y-8">
      <section className="glass overflow-hidden rounded-lg">
        <img className="h-72 w-full object-cover md:h-96" src={event.banner} alt="" />
        <div className="grid gap-6 p-5 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-4">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">{event.category}</span>
            <h1 className="text-4xl font-black">{event.title}</h1>
            <p className="text-lg leading-8 text-slate-300">{event.description}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <Info label="Date" value={new Date(event.date).toLocaleDateString("en-IN", { dateStyle: "medium" })} />
              <Info label="Venue" value={event.venue} />
              <Info label="City" value={event.city} />
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 font-semibold hover:bg-white/10">
                <Heart size={18} /> Wishlist
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 font-semibold hover:bg-white/10">
                <Share2 size={18} /> LinkedIn share
              </button>
              <Link to={`/checkout/${event.id}`} className="rounded-lg bg-mint px-5 py-3 font-bold text-ink hover:bg-white">
                Register / Buy Ticket
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            {event.tiers.map((tier) => (
              <div key={tier.name} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">{tier.name}</h3>
                  <strong className="text-mint">{tier.price === 0 ? "Free" : `₹${tier.price}`}</strong>
                </div>
                <p className="mt-2 text-sm text-slate-400">{tier.perks.join(" • ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
        <section className="glass rounded-lg p-5">
          <h2 className="text-2xl font-bold">Agenda</h2>
          <div className="mt-4 space-y-3">
            {event.agenda.map((item) => (
              <div key={item} className="rounded-lg bg-white/[0.04] p-4 text-slate-200">{item}</div>
            ))}
          </div>
        </section>
        <section className="glass rounded-lg p-5">
          <h2 className="text-2xl font-bold">Speakers</h2>
          <div className="mt-4 space-y-3">
            {event.speakers.map((speaker) => (
              <div key={speaker} className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-coral font-bold text-ink">{speaker[0]}</span>
                <span>{speaker}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="glass min-h-72 rounded-lg p-5">
          <h2 className="flex items-center gap-2 text-2xl font-bold"><MapPinned /> Venue</h2>
          <div className="mt-4 grid h-52 place-items-center rounded-lg border border-dashed border-white/20 bg-white/[0.04] text-slate-400">
            Map placeholder for {event.venue}
          </div>
        </section>
        <section className="glass rounded-lg p-5">
          <h2 className="text-2xl font-bold">FAQ</h2>
          {["Can I request a refund?", "Will I get a QR ticket?", "Can I opt into networking?"].map((q) => (
            <details key={q} className="mt-3 rounded-lg bg-white/[0.04] p-4">
              <summary className="cursor-pointer font-semibold">{q}</summary>
              <p className="mt-2 text-sm text-slate-400">Yes. This MVP includes the demo workflow for it.</p>
            </details>
          ))}
          <div className="mt-4 flex items-center gap-2 text-gold"><Star size={18} /> 4.8 average rating</div>
        </section>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/[0.04] p-3">
      <span className="block text-xs text-slate-500">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
