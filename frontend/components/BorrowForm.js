"use client";

import { useState, useEffect } from "react";

export default function BorrowForm({ bookTitle = "", isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      setForm({ fullName: "", phone: "", address: "", email: "", dob: "" });
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Họ tên là bắt buộc";
    if (!form.phone.trim()) e.phone = "Số điện thoại là bắt buộc";
    if (!/^[0-9()+\-\s]+$/.test(form.phone)) e.phone = "Số điện thoại không hợp lệ";
    if (!form.address.trim()) e.address = "Địa chỉ là bắt buộc";
    if (!form.email.trim()) e.email = "Email là bắt buộc";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email không hợp lệ";
    if (!form.dob) e.dob = "Ngày sinh là bắt buộc";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = { ...form, bookTitle };
    if (typeof onSubmit === "function") onSubmit(payload);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 z-10"
        role="dialog"
        aria-modal="true"
      >
        <h3 className="text-lg font-semibold mb-2">Yêu cầu mượn sách</h3>
        <p className="text-sm text-gray-600 mb-4">Sách: <strong>{bookTitle || "—"}</strong></p>

        <label className="block mb-2">
          <span className="text-sm">Họ và tên</span>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
          {errors.fullName && <div className="text-xs text-red-500 mt-1">{errors.fullName}</div>}
        </label>

        <label className="block mb-2">
          <span className="text-sm">Số điện thoại</span>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
          {errors.phone && <div className="text-xs text-red-500 mt-1">{errors.phone}</div>}
        </label>

        <label className="block mb-2">
          <span className="text-sm">Địa chỉ nơi ở</span>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
          {errors.address && <div className="text-xs text-red-500 mt-1">{errors.address}</div>}
        </label>

        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
          {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
        </label>

        <label className="block mb-4">
          <span className="text-sm">Ngày sinh</span>
          <input
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
          {errors.dob && <div className="text-xs text-red-500 mt-1">{errors.dob}</div>}
        </label>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Đồng ý
          </button>
        </div>
      </form>
    </div>
  );
}