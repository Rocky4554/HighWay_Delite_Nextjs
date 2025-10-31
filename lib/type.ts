// lib/types.ts
export interface Slot {
  date: string;
  time: string;
  totalSlots: number;
  available: number;
  soldOut: boolean;
}

export interface Experience {
  _id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
  minAge: number;
  slots: Slot[];
  about: string;
}

export interface BookingData {
  experienceId: string;
  date: string;
  time: string;
  name: string;
  email: string;
  promoCode?: string;
}