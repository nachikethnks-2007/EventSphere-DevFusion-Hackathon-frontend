import { collection, getDocs, query, where, type QueryConstraint } from "firebase/firestore";
import { requireFirebase } from "../lib/firebase";
import { EventFeedItem } from "../types";

export async function fetchEvents(filters: { location?: string; theme?: string }) {
  const { db } = requireFirebase();
  const constraints: QueryConstraint[] = [];

  if (filters.location) {
    constraints.push(where("location", "==", filters.location));
  }

  if (filters.theme) {
    constraints.push(where("theme", "==", filters.theme));
  }

  const eventsQuery = constraints.length ? query(collection(db, "events"), ...constraints) : collection(db, "events");
  const snapshot = await getDocs(eventsQuery);

  return snapshot.docs.map((eventDoc) => {
    const data = eventDoc.data();
    return {
      id: eventDoc.id,
      name: String(data.name ?? data.title ?? "Untitled event"),
      banner: String(data.banner ?? data.bannerUrl ?? data.imageUrl ?? ""),
      date: String(data.date ?? ""),
      location: String(data.location ?? data.city ?? data.venue ?? ""),
      price: data.price ?? "Free",
      theme: data.theme ?? data.category,
    } satisfies EventFeedItem;
  });
}
