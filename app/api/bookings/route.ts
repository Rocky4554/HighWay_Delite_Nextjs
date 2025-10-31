// app/api/bookings/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Experience, Booking } from '../../../lib/model';
import { isValidObjectId } from 'mongoose';

const PROMOS = {
  SAVE10: { type: 'percent', value: 10 },
  FLAT100: { type: 'flat', value: 100 },
};

export async function POST(request: Request) {
  await connectDB();
  const { experienceId, date, time, name, email, promoCode } = await request.json();

  // Validate ObjectId
  if (!experienceId || !isValidObjectId(experienceId)) {
    return NextResponse.json({ error: 'Invalid experience ID' }, { status: 400 });
  }

  const experience = await Experience.findById(experienceId);
  if (!experience) {
    return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
  }

  const slot = experience.slots.find((s: any) => s.date === date && s.time === time);
  if (!slot) {
    return NextResponse.json({ error: 'Invalid slot' }, { status: 400 });
  }

  const bookedCount = await Booking.countDocuments({ experienceId, date, time });
  if (bookedCount >= slot.totalSlots) {
    return NextResponse.json({ error: 'Slot sold out' }, { status: 400 });
  }

  const subtotal = experience.price;
  let discount = 0;
  if (promoCode && PROMOS[promoCode as keyof typeof PROMOS]) {
    const p = PROMOS[promoCode as keyof typeof PROMOS];
    discount = p.type === 'percent' ? subtotal * (p.value / 100) : p.value;
  }

  const tax = 59;
  const total = subtotal - discount + tax;

  const booking = await Booking.create({
    experienceId,
    date,
    time,
    name,
    email,
    promoCode: promoCode || null,
    subtotal,
    tax,
    total,
  });

  return NextResponse.json({ success: true, bookingId: booking._id });
}