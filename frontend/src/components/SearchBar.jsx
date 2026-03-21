import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch(query)}
        placeholder="Search research papers..."
        className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={() => onSearch(query)}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold transition"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;