// lib/models.ts
import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  date: String,
  time: String,
  totalSlots: { type: Number, default: 10 },
});

const experienceSchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  image: String,
  description: String,
  minAge: { type: Number, default: 10 },
  slots: [slotSchema],
});

const bookingSchema = new mongoose.Schema({
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience' },
  date: String,
  time: String,
  name: String,
  email: String,
  promoCode: String,
  subtotal: Number,
  tax: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

export const Experience = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);