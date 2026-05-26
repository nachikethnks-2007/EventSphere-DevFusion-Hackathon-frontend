import { Minus, Plus, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { events } from "../data";

export function Checkout() {
  const { id } = useParams();
  const event = events.find((item) => item.id === id) ?? events[0];
  const [quantities, setQuantities] = useState<Record<string, number>>({ General: 1, VIP: 0, "Early Bird": 0 });
  const total = useMemo(
    () => event.tiers.reduce((sum, tier) => sum + tier.price * (quantities[tier.name] ?? 0), 0),
    [event.tiers, quantities]
  );
  const count = Object.values(quantities).reduce((sum, value) => sum + value, 0);

  function change(name: string, delta: number) {
    setQuantities((current) => ({ ...current, [name]: Math.max(0, (current[name] ?? 0) + delta) }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_24rem]">
      <section className="glass rounded-lg p-5">
        <h1 className="text-3xl font-black">Checkout</h1>
        <p className="mt-2 text-slate-400">{event.title}</p>
        <div className="mt-6 space-y-3">
          {event.tiers.map((tier) => (
            <div key={tier.name} className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-bold">{tier.name}</h3>
                <p className="text-sm text-slate-400">{tier.perks.join(" • ")}</p>
                <strong className="mt-2 block text-mint">{tier.price === 0 ? "Free" : `₹${tier.price}`}</strong>
              </div>
              <div className="flex h-11 w-36 items-center justify-between rounded-lg bg-ink px-2">
                <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-white/10" onClick={() => change(tier.name, -1)} aria-label="decrease">
                  <Minus size={16} />
                </button>
                <strong>{quantities[tier.name] ?? 0}</strong>
                <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-white/10" onClick={() => change(tier.name, 1)} aria-label="increase">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="glass h-fit rounded-lg p-5">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <div className="mt-4 space-y-3">
          {event.tiers.map((tier) => (
            <div key={tier.name} className="flex justify-between text-sm text-slate-300">
              <span>{tier.name} x {quantities[tier.name] ?? 0}</span>
              <span>₹{tier.price * (quantities[tier.name] ?? 0)}</span>
            </div>
          ))}
        </div>
        <div className="my-5 border-t border-white/10" />
        <div className="flex items-center justify-between text-xl font-black">
          <span>Total</span>
          <span className="text-mint">₹{total}</span>
        </div>
        <Link
          to={`/success/${event.id}?tickets=${count}&amount=${total}`}
          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-bold ${
            count ? "bg-mint text-ink hover:bg-white" : "pointer-events-none bg-white/10 text-slate-500"
          }`}
        >
          <ShieldCheck size={18} /> Sandbox Pay
        </Link>
        <p className="mt-3 text-center text-xs text-slate-500">Demo payment only. Firebase hooks can drop in later.</p>
      </aside>
    </div>
  );
}
