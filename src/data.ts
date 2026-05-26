import { EventItem } from "./types";

export const events: EventItem[] = [
  {
    id: "ai-summit",
    title: "AI Builders Summit",
    category: "Technology",
    city: "Bengaluru",
    date: "2026-06-18",
    venue: "Orion Convention Center",
    price: 799,
    free: false,
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80",
    description:
      "A high-energy builder summit with practical AI workshops, startup demos, product showcases, and networking for founders, engineers, and creators.",
    agenda: ["10:00 AM Opening keynote", "11:30 AM Agent workflows", "2:00 PM Startup demos", "4:30 PM Networking mixer"],
    speakers: ["Aarav Mehta", "Nisha Rao", "Kabir Shah"],
    tiers: [
      { name: "General", price: 799, perks: ["Main stage access", "Expo hall"] },
      { name: "VIP", price: 1999, perks: ["Front seating", "Speaker lounge", "Dinner invite"] },
      { name: "Early Bird", price: 499, perks: ["Limited launch price", "Main stage access"] },
    ],
  },
  {
    id: "design-night",
    title: "Design Night Live",
    category: "Design",
    city: "Mumbai",
    date: "2026-06-25",
    venue: "Studio Kala",
    price: 0,
    free: true,
    banner: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80",
    description:
      "An intimate evening of design critiques, creative talks, portfolio reviews, and community conversations for product designers.",
    agenda: ["6:00 PM Doors open", "6:45 PM Critique circle", "8:00 PM Portfolio jam", "9:00 PM Social hour"],
    speakers: ["Maya Iyer", "Dev Khanna"],
    tiers: [
      { name: "General", price: 0, perks: ["Community entry", "Open seating"] },
      { name: "VIP", price: 699, perks: ["Reserved seating", "Creator kit"] },
      { name: "Early Bird", price: 0, perks: ["Fast check-in", "Welcome drink"] },
    ],
  },
  {
    id: "founder-forum",
    title: "Founder Forum 2026",
    category: "Business",
    city: "Delhi",
    date: "2026-07-03",
    venue: "Capital Innovation Hub",
    price: 1199,
    free: false,
    banner: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
    description:
      "A practical startup forum covering fundraising, go-to-market motion, team building, and founder wellness.",
    agenda: ["9:30 AM Investor AMA", "12:00 PM GTM clinic", "3:00 PM Founder panels", "5:30 PM Deal room"],
    speakers: ["Rhea Kapoor", "Vikram Sethi", "Tara Menon"],
    tiers: [
      { name: "General", price: 1199, perks: ["Talk access", "Lunch"] },
      { name: "VIP", price: 2999, perks: ["Investor roundtable", "Priority seating"] },
      { name: "Early Bird", price: 899, perks: ["Discounted access", "Lunch"] },
    ],
  },
];

export const demoTickets = [
  { event: "AI Builders Summit", ticket: "VIP", status: "Paid", qr: "EVT-AI-VIP-2049" },
  { event: "Design Night Live", ticket: "General", status: "Free", qr: "EVT-DES-GEN-1180" },
];
