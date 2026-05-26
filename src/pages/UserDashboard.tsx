import { Download, Heart, QrCode, RotateCcw, Star } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { demoTickets, events } from "../data";

const tabs = ["My Tickets", "QR Codes", "Wishlist", "Refund Requests", "Past Events", "Reviews/Ratings"];

export function UserDashboard() {
  const [tab, setTab] = useState(tabs[0]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-black">User Dashboard</h1>
        <p className="mt-1 text-slate-400">Tickets, QR codes, refunds, wishlist, reviews, and community profile.</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((item) => (
          <button key={item} className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm ${tab === item ? "bg-mint text-ink" : "bg-white/10 text-slate-300"}`} onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </div>
      <section className="glass rounded-lg p-5">
        {tab === "My Tickets" && (
          <div className="grid gap-4 md:grid-cols-2">
            {demoTickets.map((ticket) => (
              <div key={ticket.qr} className="rounded-lg bg-white/[0.04] p-4">
                <h3 className="text-xl font-bold">{ticket.event}</h3>
                <p className="mt-1 text-slate-400">{ticket.ticket} • {ticket.status}</p>
                <div className="mt-4 flex gap-2">
                  <button className="inline-flex items-center gap-2 rounded-lg bg-mint px-4 py-2 font-bold text-ink"><Download size={16} /> Ticket</button>
                  <button className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2"><RotateCcw size={16} /> Refund</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "QR Codes" && <QrGrid />}
        {tab === "Wishlist" && <SimpleList icon={<Heart size={18} />} items={events.map((event) => event.title)} />}
        {tab === "Refund Requests" && <SimpleList icon={<RotateCcw size={18} />} items={["AI Builders Summit • Pending", "Founder Forum 2026 • Approved"]} />}
        {tab === "Past Events" && <SimpleList icon={<QrCode size={18} />} items={["Cloud Expo 2025", "Creator Brunch", "Startup Demo Day"]} />}
        {tab === "Reviews/Ratings" && <Reviews />}
      </section>
      <section className="glass grid gap-4 rounded-lg p-5 md:grid-cols-2">
        <label>
          <span className="mb-2 block text-sm text-slate-400">Networking opt-in</span>
          <select className="field"><option>Open to meet founders and builders</option><option>Not right now</option></select>
        </label>
        <label>
          <span className="mb-2 block text-sm text-slate-400">LinkedIn sharing field</span>
          <input className="field" placeholder="https://linkedin.com/in/your-profile" />
        </label>
      </section>
    </div>
  );
}

function QrGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {demoTickets.map((ticket) => (
        <div key={ticket.qr} className="rounded-lg bg-white/[0.04] p-4">
          <h3 className="font-bold">{ticket.event}</h3>
          <div className="mt-4 w-fit rounded-lg bg-white p-3"><QRCodeSVG value={ticket.qr} size={130} /></div>
        </div>
      ))}
    </div>
  );
}

function SimpleList({ items, icon }: { items: string[]; icon: React.ReactNode }) {
  return <div className="grid gap-3">{items.map((item) => <div key={item} className="flex items-center gap-3 rounded-lg bg-white/[0.04] p-4">{icon}{item}</div>)}</div>;
}

function Reviews() {
  return (
    <div className="space-y-4">
      <textarea className="field min-h-28" placeholder="Write a review for your last event..." />
      <div className="flex items-center gap-2 text-gold">{[1, 2, 3, 4, 5].map((item) => <Star key={item} fill="currentColor" size={22} />)}</div>
      <button className="rounded-lg bg-mint px-5 py-3 font-bold text-ink">Submit Review</button>
    </div>
  );
}
