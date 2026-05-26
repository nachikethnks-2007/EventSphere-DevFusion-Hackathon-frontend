import { Download, Home, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { events } from "../data";

export function Success() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const event = events.find((item) => item.id === id) ?? events[0];
  const qrValue = `EventSphere:${event.id}:${Date.now()}:paid`;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="glass rounded-lg p-6 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-mint text-ink">
          <QrCode size={28} />
        </span>
        <h1 className="mt-4 text-3xl font-black">Payment Successful</h1>
        <p className="mt-2 text-slate-400">
          {params.get("tickets") ?? 1} ticket(s) confirmed for {event.title}. Amount paid: ₹{params.get("amount") ?? event.price}.
        </p>
        <div className="mx-auto mt-6 w-fit rounded-lg bg-white p-4">
          <QRCodeSVG value={qrValue} size={180} />
        </div>
        <p className="mt-3 text-sm text-slate-500">{qrValue}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-mint px-5 py-3 font-bold text-ink hover:bg-white">
            <Download size={18} /> View Ticket
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 font-bold hover:bg-white/10">
            <Home size={18} /> Back Home
          </Link>
        </div>
      </section>
    </div>
  );
}
