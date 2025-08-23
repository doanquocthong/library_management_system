"use client";
import { Bell, User } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export function AdminHeader({ title = 'Quản trị hệ thống', subtitle = 'Quản lý và theo dõi hoạt động thư viện' }) {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    router.push('/');
  };

  return (
    <div className="flex justify-between items-center mb-4 bg-indigo-50 px-6 py-4 rounded-xl relative">
      <div>
        <h2 className="text-2xl font-bold text-indigo-900">{title}</h2>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        
        <div className="relative">
          <div
            className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer hover:ring-2 hover:ring-indigo-300"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <User className="w-4 h-4" />
          </div>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                {user?.name || 'Admin'}
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Overlay để đóng dropdown khi click bên ngoài */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
} 