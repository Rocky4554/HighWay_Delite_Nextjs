import Link from 'next/link';
import Image from 'next/image';
import { Experience } from '../lib/type';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  // Safety check: return null if experience is undefined or missing _id
  if (!experience || !experience._id) {
    return null;
  }

  return (
    <Link
      href={`/experience/${experience._id}`}
      className="block rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full">
        <Image 
          src={experience.image} 
          alt={experience.title} 
          fill 
          className="object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="p-4">
        {/* Title and Location Row */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900">
            {experience.title}
          </h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {experience.location}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {experience.description}
        </p>

        {/* Price and Button Row */}
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-gray-600">From </span>
            <span className="font-bold text-gray-900">₹{experience.price}</span>
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium px-4 py-2 rounded transition-colors">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}