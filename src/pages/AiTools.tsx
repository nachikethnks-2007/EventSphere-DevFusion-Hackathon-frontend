import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

export function AiTools() {
  const [sessions, setSessions] = useState("Opening keynote\nHands-on AI workshop\nStartup demos\nNetworking session");
  const [bullets, setBullets] = useState("AI workshops\nstartup demos\nfounder networking\nhands-on product building");

  const schedule = useMemo(() => {
    const rows = sessions.split("\n").map((item) => item.trim()).filter(Boolean);
    const networking = rows.filter((row) => row.toLowerCase().includes("network"));
    const rest = rows.filter((row) => !row.toLowerCase().includes("network"));
    return [...rest, ...networking];
  }, [sessions]);

  const description = useMemo(() => {
    const items = bullets.split("\n").map((item) => item.trim()).filter(Boolean);
    if (!items.length) return "Add bullet points to generate a polished event description.";
    return `Join EventSphere for a thoughtfully curated experience featuring ${items.slice(0, -1).join(", ")}${items.length > 1 ? `, and ${items[items.length - 1]}` : items[0]}. Expect practical sessions, community energy, and clear takeaways designed for people who want to learn, connect, and build momentum.`;
  }, [bullets]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-black"><Sparkles /> AI Features</h1>
        <p className="mt-1 text-slate-400">Demo-ready smart schedule builder and description generator.</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="glass rounded-lg p-5">
          <h2 className="text-2xl font-bold">Smart Schedule Builder</h2>
          <textarea className="field mt-4 min-h-44" value={sessions} onChange={(e) => setSessions(e.target.value)} />
          <div className="mt-4 space-y-3">
            {schedule.map((item, index) => (
              <div key={`${item}-${index}`} className="flex items-center gap-3 rounded-lg bg-white/[0.04] p-4">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-mint text-sm font-bold text-ink">{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </section>
        <section className="glass rounded-lg p-5">
          <h2 className="text-2xl font-bold">AI Event Description</h2>
          <textarea className="field mt-4 min-h-44" value={bullets} onChange={(e) => setBullets(e.target.value)} />
          <div className="mt-4 rounded-lg bg-white/[0.04] p-4 leading-7 text-slate-200">{description}</div>
          <button className="mt-4 rounded-lg bg-mint px-5 py-3 font-bold text-ink">Use Description</button>
        </section>
      </div>
    </div>
  );
}
