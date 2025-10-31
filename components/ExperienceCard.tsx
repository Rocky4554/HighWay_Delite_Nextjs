import Link from 'next/link';
import Image from 'next/image';
import { Experience } from '../lib/type';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  if (!experience || !experience._id) {
    return null;
  }

  return (
    <Link
      href={`/experience/${experience._id}`}
      className="block rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transform transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-48 w-full">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 bg-[rgb(240,240,240)]">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900">
            {experience.title}
          </h3>
          <span className="text-xs text-gray-600 bg-[rgba(214,214,214,1)] px-2 py-1 rounded">
            {experience.location}
          </span>
        </div>

        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {experience.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-gray-600">From </span>
            <span className="font-[700] text-[20px] leading-[24px] text-[rgba(22,22,22,1)] font-[Inter] tracking-[0%]">
              ₹{experience.price}
            </span>

          </div>
          <button className="bg-[rgba(255,214,67,1)] hover:bg-yellow-500 text-black text-sm font-medium px-4 py-2 rounded transition-colors">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
