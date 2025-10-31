import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import { Experience, Booking } from '../../../../lib/model';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } 
) {
  const params = await context.params;
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    await connectDB();

    const experience = await Experience.findById(id);
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    const bookings = await Booking.aggregate([
      { $match: { experienceId: experience._id } },
      { $group: { _id: { date: '$date', time: '$time' }, count: { $sum: 1 } } }
    ]);

    const bookedMap: Record<string, number> = {};
    bookings.forEach((b: any) => {
      bookedMap[`${b._id.date}-${b._id.time}`] = b.count;
    });

    const slots = experience.slots.map((slot: any) => {
      const key = `${slot.date}-${slot.time}`;
      const booked = bookedMap[key] || 0;
      const available = slot.totalSlots - booked;
      return {
        ...slot.toObject(),
        available,
        soldOut: available <= 0,
      };
    });

    return NextResponse.json({ ...experience.toObject(), slots });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}