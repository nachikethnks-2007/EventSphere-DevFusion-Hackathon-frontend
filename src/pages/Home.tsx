import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { EventCard } from "../components/EventCard";
import { Section } from "../components/Section";
import { events } from "../data";

export function Home() {
  const [category, setCategory] = useState("All");
  const [city, setCity] = useState("All");
  const [price, setPrice] = useState("All");
  const [date, setDate] = useState("");

  const filtered = useMemo(
    () =>
      events.filter((event) => {
        const matchesCategory = category === "All" || event.category === category;
        const matchesCity = city === "All" || event.city === city;
        const matchesPrice = price === "All" || (price === "Free" ? event.free : !event.free);
        const matchesDate = !date || event.date === date;
        return matchesCategory && matchesCity && matchesPrice && matchesDate;
      }),
    [category, city, price, date]
  );

  return (
    <div className="space-y-10">
      <section className="grid min-h-[72vh] items-center gap-8 py-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-7">
          <span className="inline-flex rounded-lg border border-mint/30 bg-mint/10 px-3 py-1 text-sm text-mint">
            Hackathon MVP • Firebase-ready
          </span>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">EventSphere</h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Discover events, buy tickets, manage QR check-ins, refunds, reviews, payouts, and AI-powered event planning from one demo-ready flow.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#browse" className="inline-flex items-center gap-2 rounded-lg bg-mint px-5 py-3 font-bold text-ink hover:bg-white">
              Browse events <ArrowRight size={18} />
            </a>
            <a href="/organizer" className="inline-flex rounded-lg border border-white/15 px-5 py-3 font-bold text-white hover:bg-white/10">
              Organizer demo
            </a>
          </div>
        </div>
        <div className="glass overflow-hidden rounded-lg">
          <img className="h-[28rem] w-full object-cover" src={events[0].banner} alt="" />
          <div className="grid grid-cols-3 gap-px bg-white/10 text-center">
            {[
              ["1.2k", "registrations"],
              ["₹8.4L", "revenue"],
              ["87%", "attendance"],
            ].map(([value, label]) => (
              <div key={label} className="bg-panel p-4">
                <strong className="block text-2xl text-mint">{value}</strong>
                <span className="text-xs text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section title="Featured Events">
        <div className="grid gap-4 md:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Section>

      <section id="browse" className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold">Browse Events</h2>
          <p className="mt-1 text-slate-400">Filter the live catalog demo by category, city, price, and date.</p>
        </div>
        <div className="glass grid gap-3 rounded-lg p-4 md:grid-cols-5">
          <label className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-3.5 text-slate-500" size={18} />
            <select className="field pl-10" value={category} onChange={(e) => setCategory(e.target.value)}>
              {["All", "Technology", "Design", "Business"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <select className="field" value={city} onChange={(e) => setCity(e.target.value)}>
            {["All", "Bengaluru", "Mumbai", "Delhi"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select className="field" value={price} onChange={(e) => setPrice(e.target.value)}>
            {["All", "Free", "Paid"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <input className="field" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
