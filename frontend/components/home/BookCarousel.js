"use client"; // Nếu bạn dùng Next.js 13+ (App Router) thì cần dòng này

import { useEffect, useState } from "react";
import Link from "next/link";

export function BookCarousel({ title }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/books");
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        
        console.log("📚 API Response:", data); // Xuất JSON ra console

        setBooks(data); // Giả sử API trả về mảng sách
      } catch (err) {
        console.error("❌ Lỗi khi fetch API:", err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-semibold text-indigo-700 mb-4">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {books.map((book) => (
            <Link
              key={book.id}
              href={`/book/${book.id}`}
              className="bg-white rounded-lg shadow p-2 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img
                src={book.bookImage}
                alt={book.title}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <div className="text-sm font-semibold text-gray-800 truncate">
                {book.bookName}
              </div>
              <div className="text-xs text-gray-500 truncate">{book.author}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
