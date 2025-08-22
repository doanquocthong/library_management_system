"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { API_URL } from "../../../config";


export default function BookManagementPage() {
    function formatPrice(price) {
        return new Intl.NumberFormat("vi-VN").format(price);
    }
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // confirm dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  // Fetch books
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/books`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/books/${id}`, {
        method: "DELETE",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (res.status === 204 || res.ok) {
        setStatus("success");
        setMessage("✅ Xóa sách thành công!");
        fetchBooks();
      } else if (res.status === 404) {
        setStatus("error");
        setMessage("❌ Không tìm thấy sách!");
      } else {
        const msg = await res.text();
        setStatus("error");
        setMessage(msg || "❌ Xóa thất bại!");
      }
    } catch (err) {
      console.error("Error deleting book:", err);
      setStatus("error");
      setMessage("❌ Có lỗi mạng khi xóa sách!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <AdminHeader />
        <h1 className="text-2xl font-bold mb-4">Quản lý sách</h1>

        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-100 text-left">
                  <th className="p-2 border">Ảnh</th>
                  <th className="p-2 border">Tên sách</th>
                  <th className="p-2 border">Tác giả</th>
                  <th className="p-2 border">Thể loại</th>
                  <th className="p-2 border">Giá</th>
                  <th className="p-2 border">Số lượng</th>
                  <th className="p-2 border">Nổi bật</th>
                  <th className="p-2 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="p-2 border">
                      <img
                        src={book.bookImage}
                        alt={book.bookName}
                        className="w-16 h-20 object-cover rounded"
                      />
                    </td>
                    <td className="p-2 border">{book.bookName}</td>
                    <td className="p-2 border">{book.author}</td>
                    <td className="p-2 border">{book.categoryName}</td>
                    <td className="p-2 border">{formatPrice(book.price)}đ</td>
                    <td className="p-2 border">{book.quantity}</td>
                    <td className="p-2 border">
                      {book.isPopular ? "⭐Có" : "❌Không"}
                    </td>
                    <td className="p-2 border">
                      <div className="flex justify-center gap-2">
                        <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 w-20">
                          Sửa
                        </button>
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-20"
                          onClick={() => {
                            setSelectedBookId(book.id);
                            setMessage("");
                            setStatus("idle");
                            setConfirmOpen(true);
                          }}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Dialog confirm */}
        {confirmOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
              <h2 className="text-xl font-bold mb-4">Xác nhận xóa</h2>

              {status === "idle" && (
                <>
                  <p className="mb-6">Bạn có chắc chắn muốn xóa sách này?</p>
                  <div className="flex justify-center gap-4">
                    <button
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => setConfirmOpen(false)}
                    >
                      Hủy
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(selectedBookId)}
                    >
                      Xóa
                    </button>
                  </div>
                </>
              )}

              {status !== "idle" && (
                <>
                  <p
                    className={`mb-6 font-semibold ${
                      status === "success" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {message}
                  </p>
                  <button
                    className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                    onClick={() => setConfirmOpen(false)}
                  >
                    Đóng
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
