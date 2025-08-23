'use client';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // gọi callback mỗi khi gõ
  };

  return (
    <div className="flex justify-center my-6">
      <input
        type="text"
        placeholder="Tìm kiếm sách..."
        value={query}
        onChange={handleChange}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
    </div>
  );
}
