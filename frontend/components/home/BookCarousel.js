"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL } from "../../config";
export function BookCarousel({ title, filterPopular = false, category = null }) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        let url = `${API_URL}/books`;
        if (category) {
          url = `${API_URL}/books/category/${encodeURIComponent(category)}`;
        }

        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });

        const data = await res.json();
        console.log("📚 API Response:", data);

        // Lọc sách nếu filterPopular = true
        const filtered = filterPopular
          ? data.filter((book) => book.isPopular)
          : data;

        setBooks(filtered);
      } catch (err) {
        console.error("❌ Lỗi khi fetch API:", err);
        setError("Không thể kết nối tới máy chủ hoặc dữ liệu không hợp lệ.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [filterPopular, category]); // fetch lại mỗi khi filterPopular hoặc category thay đổi

  if (loading) {
    return (
      <section className="py-10 text-center">
        <p>Đang tải sách...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 text-center text-red-500">
        <p>{error}</p>
      </section>
    );
  }

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
                alt={book.bookName}
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
