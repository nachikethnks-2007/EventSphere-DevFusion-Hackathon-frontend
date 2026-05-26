import { Check, IndianRupee, Pencil, Plus, Users, X } from "lucide-react";
import { useState } from "react";

const attendeeRows = [
  ["Aditi Sharma", "VIP", "Paid", "Checked-in"],
  ["Rahul Nair", "General", "Paid", "Registered"],
  ["Sana Khan", "Early Bird", "Paid", "Registered"],
  ["Ishan Bose", "General", "Free", "Checked-in"],
];

export function OrganizerDashboard() {
  const [tiers, setTiers] = useState([
    { name: "General", price: 799, seats: 300 },
    { name: "VIP", price: 1999, seats: 80 },
    { name: "Early Bird", price: 499, seats: 100 },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Organizer Dashboard</h1>
        <p className="mt-1 text-slate-400">Create events, manage tickets, refunds, payouts, analytics, and attendees.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="Registrations" value="1,248" icon={<Users />} />
        <Metric label="Revenue" value="₹8.4L" icon={<IndianRupee />} />
        <Metric label="Attendance Rate" value="87%" icon={<Check />} />
        <Metric label="Checked-In" value="1,086" icon={<Users />} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_24rem]">
        <section className="glass rounded-lg p-5">
          <h2 className="flex items-center gap-2 text-2xl font-bold"><Plus /> Create / Edit Event</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input className="field" placeholder="Event title" defaultValue="AI Builders Summit" />
            <input className="field" placeholder="City" defaultValue="Bengaluru" />
            <input className="field" type="date" defaultValue="2026-06-18" />
            <input className="field" placeholder="Venue" defaultValue="Orion Convention Center" />
            <textarea className="field min-h-32 md:col-span-2" placeholder="Event description" defaultValue="Hands-on AI workshops, startup demos, and networking for builders." />
            <button className="inline-flex w-fit items-center gap-2 rounded-lg bg-mint px-5 py-3 font-bold text-ink"><Pencil size={18} /> Save Event</button>
          </div>
        </section>

        <section className="glass rounded-lg p-5">
          <h2 className="text-2xl font-bold">Payout Summary</h2>
          <div className="mt-4 space-y-3 text-sm">
            <Line label="Gross sales" value="₹8,42,300" />
            <Line label="Platform fee" value="₹42,115" />
            <Line label="Refund reserve" value="₹18,000" />
            <Line label="Next payout" value="₹7,82,185" strong />
          </div>
        </section>
      </div>

      <section className="glass rounded-lg p-5">
        <h2 className="text-2xl font-bold">Ticket Tier Management</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <div key={tier.name} className="rounded-lg bg-white/[0.04] p-4">
              <input className="field" value={tier.name} onChange={(e) => setTiers(updateTier(tiers, index, "name", e.target.value))} />
              <div className="mt-3 grid grid-cols-2 gap-3">
                <input className="field" type="number" value={tier.price} onChange={(e) => setTiers(updateTier(tiers, index, "price", Number(e.target.value)))} />
                <input className="field" type="number" value={tier.seats} onChange={(e) => setTiers(updateTier(tiers, index, "seats", Number(e.target.value)))} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="glass rounded-lg p-5">
          <h2 className="text-2xl font-bold">Refund Management</h2>
          {["Rahul Nair • General • ₹799", "Meera Joshi • VIP • ₹1999"].map((item) => (
            <div key={item} className="mt-3 flex items-center justify-between rounded-lg bg-white/[0.04] p-4">
              <span>{item}</span>
              <div className="flex gap-2">
                <button className="grid h-9 w-9 place-items-center rounded-lg bg-mint text-ink"><Check size={16} /></button>
                <button className="grid h-9 w-9 place-items-center rounded-lg bg-coral text-ink"><X size={16} /></button>
              </div>
            </div>
          ))}
        </section>
        <section className="glass overflow-hidden rounded-lg p-5">
          <h2 className="text-2xl font-bold">Attendee List</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[30rem] text-left text-sm">
              <thead className="text-slate-400">
                <tr><th className="py-2">Name</th><th>Tier</th><th>Payment</th><th>Status</th></tr>
              </thead>
              <tbody>
                {attendeeRows.map((row) => (
                  <tr key={row[0]} className="border-t border-white/10">
                    {row.map((cell) => <td key={cell} className="py-3">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function updateTier(tiers: { name: string; price: number; seats: number }[], index: number, key: "name" | "price" | "seats", value: string | number) {
  return tiers.map((tier, i) => (i === index ? { ...tier, [key]: value } : tier));
}

function Metric({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="glass rounded-lg p-4">
      <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-mint">{icon}</div>
      <strong className="text-3xl">{value}</strong>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}

function Line({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <div className={`flex justify-between ${strong ? "text-lg font-bold text-mint" : "text-slate-300"}`}><span>{label}</span><span>{value}</span></div>;
}
