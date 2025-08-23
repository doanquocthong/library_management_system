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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hiển thị form thêm
  const [showForm, setShowForm] = useState(false);

  // State cho form thêm sách
  const [newBook, setNewBook] = useState({
    bookName: "",
    author: "",
    categoryName: "",
    description: "",
    price: "",
    quantity: "",
    isPopular: false,
  });
  const [imageFile, setImageFile] = useState(null);

  // Trạng thái xử lý
  const [submitting, setSubmitting] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

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

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: "GET",
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  // Toggle hide/unhide handler
  const handleToggleHide = async (book) => {
    if (togglingId) return;

    setTogglingId(book.id);
    try {
      const action = book.isHide ? "unhide" : "hide";
      const res = await fetch(`${API_URL}/books/${book.id}/${action}`, {
        method: "PUT",
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      if (res.ok) {
        fetchBooks();
      } else {
        alert("❌ Thao tác thất bại!");
      }
    } catch (err) {
      console.error("Error updating book:", err);
      alert("❌ Lỗi mạng!");
    } finally {
      setTogglingId(null);
    }
  };

  // Submit thêm sách
  const handleAddBook = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    const formData = new FormData();
    formData.append(
      "book",
      new Blob([JSON.stringify(newBook)], { type: "application/json" })
    );
    if (imageFile) formData.append("imageFile", imageFile);

    try {
      const response = await fetch(`${API_URL}/books/add`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        await response.json();
        alert("✅ Thêm sách thành công!");
        fetchBooks();
        setShowForm(false);

        // ✅ Reset form
        setNewBook({
          bookName: "",
          author: "",
          categoryName: "",
          description: "",
          price: "",
          quantity: "",
          isPopular: false,
        });
        setImageFile(null);
      } else {
        alert("❌ Thêm sách thất bại!");
      }
    } catch (err) {
      console.error("Request error:", err);
      alert("❌ Không thể kết nối server!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <AdminHeader />
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Quản lý sách</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            {showForm ? "Đóng form" : "➕ Thêm sách"}
          </button>
        </div>

        {/* Form thêm sách */}
        {showForm && (
          <form
            className="bg-white p-4 shadow-md rounded-lg mb-6 grid grid-cols-2 gap-4"
            onSubmit={handleAddBook}
          >
            <input
              type="text"
              placeholder="Tên sách"
              value={newBook.bookName}
              onChange={(e) =>
                setNewBook({ ...newBook, bookName: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Tác giả"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
              className="border p-2 rounded"
              required
            />

            {/* Dropdown chọn category */}
            <select
              value={newBook.categoryName}
              onChange={(e) =>
                setNewBook({ ...newBook, categoryName: e.target.value })
              }
              className="border p-2 rounded"
              required
            >
              <option value="">-- Chọn thể loại --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.categoryName}>
                  {c.categoryName}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Giá"
              value={newBook.price}
              onChange={(e) =>
                setNewBook({ ...newBook, price: e.target.value })
              }
              className="border p-2 rounded"
              required
            />

            <input
              type="number"
              placeholder="Số lượng"
              value={newBook.quantity}
              onChange={(e) =>
                setNewBook({ ...newBook, quantity: e.target.value })
              }
              className="border p-2 rounded"
              required
            />

            <textarea
              placeholder="Mô tả"
              value={newBook.description}
              onChange={(e) =>
                setNewBook({ ...newBook, description: e.target.value })
              }
              className="border p-2 rounded col-span-2"
            />
            <div className="flex items-center gap-2 col-span-2">
              <input
                type="checkbox"
                checked={newBook.isPopular}
                onChange={(e) =>
                  setNewBook({ ...newBook, isPopular: e.target.checked })
                }
              />
              <label>Nổi bật</label>
            </div>
            {/* Input chọn file ẩn */}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImageFile(e.target.files[0]);
                }
              }}
            />

            {/* Nút chọn file */}
            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 text-center"
            >
              {imageFile ? `📂 ${imageFile.name}` : "Chọn ảnh bìa"}
            </label>


            <button
              type="submit"
              disabled={submitting}
              className={`px-4 py-2 rounded col-span-2 text-white ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600"
              }`}
            >
              {submitting ? "Đang lưu..." : "Lưu sách"}
            </button>
          </form>
        )}

        {/* Bảng sách */}
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-indigo-100 text-left">
                  <th className="p-2 border text-center w-20">Ảnh</th>
                  <th className="p-2 border">Tên sách</th>
                  <th className="p-2 border">Tác giả</th>
                  <th className="p-2 border">Thể loại</th>
                  <th className="p-2 border text-center w-24">Giá</th>
                  <th className="p-2 border text-center w-20">SL</th>
                  <th className="p-2 border text-center w-24">Nổi bật</th>
                  <th className="p-2 border text-center w-28">Trạng thái</th>
                  <th className="p-2 border text-center w-28">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="p-2 border text-center">
                      <img
                        src={book.bookImage}
                        alt={book.bookName}
                        className="w-16 h-20 object-cover rounded mx-auto"
                      />
                    </td>
                    <td className="p-2 border">{book.bookName}</td>
                    <td className="p-2 border">{book.author}</td>
                    <td className="p-2 border">{book.categoryName}</td>
                    <td className="p-2 border text-center">
                      {formatPrice(book.price)}đ
                    </td>
                    <td className="p-2 border text-center">{book.quantity}</td>
                    <td className="p-2 border text-center">
                      {book.isPopular ? "⭐ Có" : "❌ Không"}
                    </td>
                    <td className="p-2 border text-center">
                      {book.isHide ? "🔒 Ẩn" : "👁️ Hiển thị"}
                    </td>
                    <td className="p-2 border text-center">
                      <button
                        disabled={togglingId === book.id}
                        className={`px-3 py-1 text-sm rounded w-20 text-white ${
                          togglingId === book.id
                            ? "bg-gray-400 cursor-not-allowed"
                            : book.isHide
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                        onClick={() => handleToggleHide(book)}
                      >
                        {togglingId === book.id
                          ? "Đang xử lý..."
                          : book.isHide
                          ? "Hiện"
                          : "Ẩn"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
