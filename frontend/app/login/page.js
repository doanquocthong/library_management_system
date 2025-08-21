'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { API_URL } from "../../config";
export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();
  const {setUser} = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      
      if (data.role) {
        // lưu vào localStorage hoặc context
        const {id, username , role} = data;
        const userInfo = {id, username , role }; 
        localStorage.setItem('user', JSON.stringify(userInfo));
        setUser(userInfo);
        
        // chuyển hướng dựa trên vai trò
        if (role === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Lỗi máy chủ. Vui lòng thử lại.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/uth.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>

      <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-sm text-center z-10">
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32">
            <img
              src="/images/logo-uth.png"
              alt="Logo UTH"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <h2 className="text-lg text-gray-600 mb-4">Thư viện Trường ĐH GTVT HCM</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            type="text"
            placeholder="Tên đăng nhập"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Mật khẩu"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Đăng nhập
          </button>
          <a href="#" className="text-sm text-gray-500 hover:underline block">
            Quên mật khẩu?
          </a>
        </form>

        <div className="mt-6 text-sm text-gray-600">
          Bạn chưa có tài khoản?
          <Link
            href="/sign-up"
            className="text-pink-500 font-semibold ml-1 hover:underline"
          >
            Tạo tài khoản
          </Link>
        </div>
      </div>
    </div>
  );
}