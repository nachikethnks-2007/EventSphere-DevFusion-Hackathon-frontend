import { CheckCircle2, ScanLine } from "lucide-react";
import { useState } from "react";

export function CheckIn() {
  const [code, setCode] = useState("EVT-AI-VIP-2049");
  const [checkedIn, setCheckedIn] = useState(1086);
  const [message, setMessage] = useState("Ready to scan or enter a ticket code.");

  function mark() {
    if (!code.trim()) {
      setMessage("Enter a QR or ticket code first.");
      return;
    }
    setCheckedIn((value) => value + 1);
    setMessage(`${code} marked checked-in.`);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_24rem]">
      <section className="glass rounded-lg p-6">
        <h1 className="flex items-center gap-3 text-3xl font-black"><ScanLine /> Check-In Panel</h1>
        <p className="mt-2 text-slate-400">Manual QR and ticket entry for door staff.</p>
        <div className="mt-6 space-y-4">
          <input className="field text-lg" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Scan QR or enter ticket code" />
          <button className="inline-flex items-center gap-2 rounded-lg bg-mint px-5 py-3 font-bold text-ink hover:bg-white" onClick={mark}>
            <CheckCircle2 size={19} /> Mark Checked-In
          </button>
          <div className="rounded-lg bg-white/[0.04] p-4 text-mint">{message}</div>
        </div>
      </section>
      <aside className="glass h-fit rounded-lg p-5">
        <h2 className="text-2xl font-bold">Live Stats</h2>
        <div className="mt-4 grid gap-3">
          <Stat label="Registered" value="1,248" />
          <Stat label="Checked-In" value={checkedIn.toLocaleString("en-IN")} />
          <Stat label="Remaining" value={(1248 - checkedIn).toLocaleString("en-IN")} />
        </div>
      </aside>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/[0.04] p-4">
      <strong className="text-3xl text-mint">{value}</strong>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}
