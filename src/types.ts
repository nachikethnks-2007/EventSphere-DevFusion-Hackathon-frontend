export type TicketTier = {
  name: string;
  price: number;
  perks: string[];
};

export type EventItem = {
  id: string;
  title: string;
  category: string;
  city: string;
  date: string;
  venue: string;
  price: number;
  free: boolean;
  banner: string;
  description: string;
  agenda: string[];
  speakers: string[];
  tiers: TicketTier[];
};
