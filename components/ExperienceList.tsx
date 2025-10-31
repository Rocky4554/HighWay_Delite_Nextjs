"use client";

import { useSearch } from '../context/SearchContext';
import { Experience } from '../lib/type';
import ExperienceCard from './ExperienceCard';

interface ExperienceListProps {
  experiences: Experience[];
}

export default function ExperienceList({ experiences }: ExperienceListProps) {
  const { query } = useSearch();

  // Filter experiences based on search query
  const filteredExperiences = experiences.filter((exp) => {
    if (!query) return true;
    const searchTerm = query.toLowerCase();
    return (
      exp.title.toLowerCase().includes(searchTerm) ||
      exp.location.toLowerCase().includes(searchTerm) ||
      exp.description.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredExperiences && filteredExperiences.length > 0 ? (
        filteredExperiences.map((exp) => (
          <ExperienceCard key={exp._id} experience={exp} />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-lg">
            {query ? `No experiences found for "${query}"` : 'No experiences available.'}
          </p>
        </div>
      )}
    </div>
  );
}

