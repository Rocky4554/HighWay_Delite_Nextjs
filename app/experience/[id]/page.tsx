// app/experience/[id]/page.tsx
import { notFound } from 'next/navigation';
import ExperienceClient from './ExperienceClient';
import { Experience as ExperienceType } from '@/lib/type';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ date?: string; time?: string }>;
}

async function getExperience(id: string): Promise<ExperienceType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/experiences/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function ExperiencePage({ params, searchParams }: Props) {
  const { id } = await params;
  const query = await searchParams;

  let experience: ExperienceType;
  try {
    experience = await getExperience(id);
  } catch {
    notFound();
  }

  return (
    <ExperienceClient
      experience={experience}
      initialDate={query.date || null}
    />
  );
}