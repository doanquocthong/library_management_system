'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function GenreMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const genres = [
    'Khoa học',
    'Văn học',
    'Lịch sử',
    'Công nghệ',
    'Tâm lý',
    'Thiếu nhi',
  ];

  // Tự động đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Nút menu – click để toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm text-black px-3 py-1 rounded hover:bg-gray-200 hover:text-indigo-700 transition flex items-center gap-1"
      >
        Thể loại
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Menu xổ dọc */}
      {isOpen && (
        <div className="absolute left-0 top-full w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <ul className="py-1">
            {genres.map((genre, index) => (
              <li key={index}>
                <Link
                  href={`/the-loai/${genre.toLowerCase().replace(/\s/g, '-')}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                  onClick={() => setIsOpen(false)} // tự đóng menu sau khi chọn
                >
                  {genre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
