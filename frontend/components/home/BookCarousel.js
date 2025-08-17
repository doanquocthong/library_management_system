"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function BookCarousel({ title }) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/books",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const text = await res.text();
        try {
          const data = JSON.parse(text);
          console.log("📚 API Response:", data);
          setBooks(data);
        } catch {
          console.error("❌ API không trả JSON, nội dung:", text);
          setError("Dữ liệu trả về không hợp lệ.");
        }
      } catch (err) {
        console.error("❌ Lỗi khi fetch API:", err);
        setError("Không thể kết nối tới máy chủ.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

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