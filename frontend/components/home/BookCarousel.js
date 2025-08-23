"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL } from "../../config";

export function BookCarousel({ title, filterPopular = false, category = "" }) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        // Nếu category có, gọi API theo category, ngược lại lấy tất cả
        const url = category
          ? `${API_URL}/books/category/${encodeURIComponent(category)}`
          : `${API_URL}/books`;

        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });

        const data = await res.json();
        console.log("📚 API Response:", data);

        // Bước 1: lọc bỏ sách bị ẩn
        let visibleBooks = data.filter((book) => !book.isHide);

        // Bước 2: nếu filterPopular = true thì chỉ lấy sách nổi bật
        if (filterPopular) {
          visibleBooks = visibleBooks.filter((book) => book.isPopular);
        }

        setBooks(visibleBooks);
      } catch (err) {
        console.error("❌ Lỗi khi fetch API:", err);
        setError("Không thể kết nối tới máy chủ hoặc dữ liệu không hợp lệ.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [filterPopular, category]); // dependency array

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
                className="w-full h-56 object-cover rounded-lg mb-2 shadow hover:scale-105 transition-transform"
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
