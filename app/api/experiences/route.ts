import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import { Experience } from '../../../lib/model';

export async function GET() {
  try {
    await connectDB();
    const experiences = await Experience.find().select('-slots').lean();
    
    // Convert MongoDB documents to plain objects and ensure _id is a string
    const serializedExperiences = experiences.map((exp: any) => ({
      ...exp,
      _id: exp._id.toString(),
    }));
    
    return NextResponse.json(serializedExperiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}