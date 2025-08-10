'use client';
import { useState } from 'react';
import { Search } from 'lucide-react'; // Biểu tượng kính lúp bên trong thanh tìm kiếm

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-6 mx-auto flex items-center bg-white rounded-full shadow-md px-4 py-2 w-full max-w-md"
    >
      <input
        type="text"
        placeholder="Bạn muốn tìm gì?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow bg-transparent outline-none text-black placeholder-gray-500"
      />
      <button type="submit">
        <Search className="w-5 h-5 text-gray-700 hover:text-blue-600" />
      </button>
    </form>
  );
}
