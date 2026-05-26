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

export type UserRole = "attendee" | "organizer";

export type UserProfile = {
  uid: string;
  username?: string;
  email: string;
  role: UserRole;
};

export type EventFeedItem = {
  id: string;
  name: string;
  banner: string;
  date: string;
  location: string;
  price: number | string;
  theme?: string;
};
