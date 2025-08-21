'use client';

import { useEffect, useState } from 'react';
import { Camera, Save, X } from 'lucide-react';
import { API_URL } from "../../config";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'other',
    birthday: '',
    avatar: '/images/default-avatar.png',
    username: '',
    address: '',
    bio: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // ✅ Lấy user từ localStorage
  const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  let userId = null;

  if (user) {
    const parsedUser = JSON.parse(user);
    userId = parsedUser.id;
    console.log("userId:", userId);
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/users/${Number(userId)}`, {
                method: 'GET',
                headers: { 
                  'Content-Type': 'application/json', 
                  "ngrok-skip-browser-warning": "true",
                },
        });
        const data = await res.json();
        setFormData({
          name: data.fullname || '',
          email: data.email || '',
          phone: data.contact || '',
          gender: 'other', // API chưa có field này
          birthday: '', // API chưa có -> để trống
          avatar: 'https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png',
          username: data.userName || '',
          address: data.address || '',
          bio: '', // API chưa có -> để trống
        });
      } catch (error) {
        console.error("Lỗi khi fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, avatar: imageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Call API update user nếu cần
    console.log("Dữ liệu submit:", formData);

    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      alert("Đã lưu thông tin thành công!");
    }, 1000);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!formData.username) return <p>Đang tải...</p>;

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={formData.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-orange-100"
          />
          {isEditing && (
            <label className="absolute -bottom-1 -right-1 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition cursor-pointer">
              <Camera size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {formData.name || formData.username}
          </h3>
          <p className="text-sm text-gray-500">{formData.email}</p>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              Chỉnh sửa hồ sơ
            </button>
          )}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên đăng nhập
          </label>
          <input
            type="text"
            value={formData.username}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Họ và tên
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại
          </label>
          <input
            type="text"
            value={formData.phone}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Địa chỉ
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
      </form>
    </div>
  );
}
