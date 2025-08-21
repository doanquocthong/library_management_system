"use client";

import { useState, useEffect } from "react";
import { API_URL } from "../config";

export default function BorrowForm({
  bookId,
  userId,
  bookTitle = "",
  isOpen,
  onClose,
  onSuccess,
}) {
  const [form, setForm] = useState({
    fullName: "",
    contact: "",
    address: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setForm({ fullName: "", contact: "", address: "", email: "" });
      setErrors({});
      setMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Họ tên là bắt buộc";
    if (!form.contact.trim()) e.contact = "Số điện thoại là bắt buộc";
    if (!/^[0-9()+\-\s]+$/.test(form.contact))
      e.contact = "Số điện thoại không hợp lệ";
    if (!form.address.trim()) e.address = "Địa chỉ là bắt buộc";
    if (!form.email.trim()) e.email = "Email là bắt buộc";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email không hợp lệ";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  const payload = { ...form, userId, bookId };

  try {
    setLoading(true);
    setMessage("");

    const res = await fetch(`${API_URL}/borrow-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Gửi yêu cầu thất bại");

    setMessage("✅ Đăng ký mượn sách thành công!");

    // 👉 Tự động đóng modal sau 200ms
    setTimeout(() => {
      onClose?.();
      setLoading(false); // <-- chỉ enable lại nút sau khi modal đóng
    }, 1000);
  } catch (err) {
    setMessage("❌ Có lỗi xảy ra, vui lòng thử lại.");
    setLoading(false); // lỗi thì vẫn phải bật lại nút
  }};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Lớp nền mờ */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card Form */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-2xl shadow-2xl border w-full max-w-lg mx-4 p-8 z-10"
        role="dialog"
        aria-modal="true"
      >
        <h3 className="text-2xl font-bold text-center text-indigo-700 mb-2">
          Yêu cầu mượn sách
        </h3>
        <p className="text-center text-gray-600 mb-6">
          Sách: <strong>{bookTitle || "—"}</strong>
        </p>

        {/* Họ tên */}
        <label className="block mb-4">
          <span className="text-sm font-medium">Họ và tên</span>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.fullName && (
            <div className="text-xs text-red-500 mt-1">{errors.fullName}</div>
          )}
        </label>

        {/* Liên hệ */}
        <label className="block mb-4">
          <span className="text-sm font-medium">Liên hệ</span>
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.contact && (
            <div className="text-xs text-red-500 mt-1">{errors.contact}</div>
          )}
        </label>

        {/* Địa chỉ */}
        <label className="block mb-4">
          <span className="text-sm font-medium">Địa chỉ nơi ở</span>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.address && (
            <div className="text-xs text-red-500 mt-1">{errors.address}</div>
          )}
        </label>

        {/* Email */}
        <label className="block mb-4">
          <span className="text-sm font-medium">Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && (
            <div className="text-xs text-red-500 mt-1">{errors.email}</div>
          )}
        </label>

        {/* Thông báo */}
        {message && (
          <div className="text-center text-sm mb-4 font-medium text-indigo-600">
            {message}
          </div>
        )}

        {/* Nút hành động */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white font-medium transition 
              ${loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {loading ? "Đang gửi..." : "Đồng ý"}
          </button>
        </div>
      </form>
    </div>
  );
}
