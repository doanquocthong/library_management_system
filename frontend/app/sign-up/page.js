'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from "../../config";

export default function Sign_upPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '', password: '', confirm: '',
    fullname: '', address: '', contact: '', email: '', mssv: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.username || !form.password) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Mật khẩu xác nhận chưa khớp.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "true",
         },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          roleId: 1, // user theo thuvien.sql (1='user', 2='admin')
          fullname: form.fullname,
          address: form.address,
          contact: form.contact,
          email: form.email,
          mssv: form.mssv,
          // Không gửi birthDate
        }),
      });

      const data = await res.json();
      if (res.ok && data.username) {
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        router.push('/login');
      } else {
        setError(typeof data === 'string' ? data : 'Đăng ký không thành công.');
      }
    } catch (err) {
      setError('Không thể kết nối máy chủ.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/uth.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>

      <div className="bg-white p-6 rounded-3xl shadow-md w-full max-w-sm z-10">
        <h2 className="text-xl font-bold text-center text-purple-600 mb-6">
          Tạo mới tài khoản của bạn
        </h2>
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            type="text"
            placeholder="Tên đăng nhập"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Mật khẩu"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            type="password"
            placeholder="Xác nhận lại mật khẩu"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            type="text"
            placeholder="Họ và tên"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            type="tel"
            placeholder="Số điện thoại"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            type="text"
            placeholder="Địa chỉ"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            name="mssv"
            value={form.mssv}
            onChange={handleChange}
            type="text"
            placeholder="MSSV (nếu có)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Tạo tài khoản
          </button>
        </form>
        <div className="mt-4 text-sm text-center text-gray-600">
          Bạn đã có tài khoản?
          <a href="/login" className="text-blue-600 font-semibold ml-1 hover:underline">
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
}
