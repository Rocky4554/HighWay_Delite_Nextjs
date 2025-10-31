"use client";

import { useSearch } from '../context/SearchContext';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const { query, setQuery } = useSearch();

  return (
    <div className="relative flex items-center gap-2">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search experiences..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
        />
      </div>
      <button
        type="button"
        onClick={() => setQuery(query)}
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2"
        aria-label="Search"
      >
        <Search size={18} />
        Search
      </button>
    </div>
  );
}
