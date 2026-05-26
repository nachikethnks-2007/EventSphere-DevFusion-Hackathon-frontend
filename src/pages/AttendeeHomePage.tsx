import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Compass, Home, MapPin, Search, Sparkles, User, WalletCards } from "lucide-react";
import { fetchEvents } from "../services/eventService";
import { EventFeedItem } from "../types";

const sidebarItems = [
  { label: "Home", icon: Home },
  { label: "Recommendations", icon: Sparkles },
  { label: "AI Discovery", icon: Compass },
  { label: "Profile", icon: User },
];

export function AttendeeHomePage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [theme, setTheme] = useState("");
  const [events, setEvents] = useState<EventFeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError("");

    fetchEvents({ location: location || undefined, theme: theme || undefined })
      .then((items) => {
        if (isMounted) {
          setEvents(items);
        }
      })
      .catch((fetchError) => {
        if (isMounted) {
          setEvents([]);
          setError(fetchError instanceof Error ? fetchError.message : "Unable to load events.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [location, theme]);

  const visibleEvents = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      return events;
    }

    return events.filter((event) => [event.name, event.location, event.theme].filter(Boolean).join(" ").toLowerCase().includes(term));
  }, [events, search]);

  const locations = useMemo(() => uniqueValues(events.map((event) => event.location)), [events]);
  const themes = useMemo(() => uniqueValues(events.map((event) => event.theme ?? "")), [events]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_12%_0%,rgba(67,230,164,0.14),transparent_28rem),radial-gradient(circle_at_94%_10%,rgba(255,122,100,0.12),transparent_24rem),#070A12] text-white">
      <div className="grid min-h-screen lg:grid-cols-[17rem_1fr]">
        <aside className="border-b border-white/10 bg-ink/80 p-5 backdrop-blur-xl lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-mint text-ink">
              <CalendarDays size={22} />
            </span>
            <span className="text-lg font-bold">EventSphere</span>
          </div>

          <nav className="mt-8 grid grid-cols-2 gap-2 lg:grid-cols-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.label} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold transition ${item.label === "Home" ? "bg-white text-ink" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 space-y-3">
            <label className="block space-y-2 text-sm font-semibold text-slate-200">
              <span>Location</span>
              <select className="field" value={location} onChange={(event) => setLocation(event.target.value)}>
                <option value="">All locations</option>
                {locations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="block space-y-2 text-sm font-semibold text-slate-200">
              <span>Theme</span>
              <select className="field" value={theme} onChange={(event) => setTheme(event.target.value)}>
                <option value="">All themes</option>
                {themes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </aside>

        <section className="px-5 py-5 lg:px-8">
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-black">Attendee Home</h1>
              <p className="mt-1 text-slate-400">Browse events from the live database.</p>
            </div>
            <label className="relative w-full md:max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-3.5 text-slate-500" size={18} />
              <input className="field pl-10" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search events" />
            </label>
          </header>

          {error ? <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p> : null}

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {isLoading ? <EventSkeletons /> : null}
            {!isLoading && visibleEvents.map((event) => <AttendeeEventCard key={event.id} event={event} />)}
          </div>

          {!isLoading && !error && visibleEvents.length === 0 ? (
            <div className="glass mt-7 rounded-lg p-8 text-center">
              <p className="text-lg font-bold">No events found</p>
              <p className="mt-2 text-slate-400">Try another location, theme, or search term.</p>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}

function AttendeeEventCard({ event }: { event: EventFeedItem }) {
  return (
    <article className="glass overflow-hidden rounded-lg">
      <div className="h-44 bg-white/5">
        {event.banner ? <img className="h-full w-full object-cover" src={event.banner} alt="" /> : <div className="grid h-full place-items-center text-slate-500">Event banner</div>}
      </div>
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            {event.theme ? <p className="text-xs uppercase tracking-[0.18em] text-mint">{event.theme}</p> : null}
            <h2 className="mt-1 text-xl font-bold">{event.name}</h2>
          </div>
          <span className="rounded-md bg-white/10 px-2.5 py-1 text-sm">{formatPrice(event.price)}</span>
        </div>
        <div className="grid gap-2 text-sm text-slate-300">
          <span className="flex items-center gap-2">
            <CalendarDays size={16} /> {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={16} /> {event.location || "Location TBA"}
          </span>
          <span className="flex items-center gap-2">
            <WalletCards size={16} /> {formatPrice(event.price)}
          </span>
        </div>
      </div>
    </article>
  );
}

function EventSkeletons() {
  return (
    <>
      {[0, 1, 2].map((item) => (
        <div key={item} className="glass h-80 animate-pulse rounded-lg bg-white/5" />
      ))}
    </>
  );
}

function uniqueValues(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((first, second) => first.localeCompare(second));
}

function formatPrice(price: number | string) {
  if (typeof price === "number") {
    return price === 0 ? "Free" : `₹${price}`;
  }

  return price || "Free";
}

function formatDate(date: string) {
  if (!date) {
    return "Date TBA";
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
}
