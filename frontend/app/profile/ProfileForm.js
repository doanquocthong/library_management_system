'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useEffect, useState } from 'react';
import { Camera, Save, X } from 'lucide-react';

export default function ProfileForm() {
  const { user, updateUser } = useAuth();
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

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || 'other',
        birthday: user.birthday || '',
        avatar: user.avatar || '/images/default-avatar.png',
        username: user.username || user.name || '',
        address: user.address || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, avatar: imageUrl });
      
      // Đồng bộ avatar ngay lập tức với context
      updateUser({ avatar: imageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Cập nhật thông tin user trong context
    updateUser({
      name: formData.name,
      gender: formData.gender,
      birthday: formData.birthday,
      address: formData.address,
      bio: formData.bio,
      avatar: formData.avatar,
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      alert('Đã lưu thông tin thành công!');
    }, 1000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || 'other',
        birthday: user.birthday || '',
        avatar: user.avatar || '/images/default-avatar.png',
        username: user.username || user.name || '',
        address: user.address || '',
        bio: user.bio || '',
      });
    }
  };

  if (!user) return null;

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
          <h3 className="text-lg font-semibold text-gray-800">{formData.name || formData.username}</h3>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <p className="text-xs text-gray-500 mt-1">Tên đăng nhập không thể thay đổi</p>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500' 
                  : 'border-gray-300 bg-gray-50'
              }`}
              placeholder="Nhập họ và tên"
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
            <p className="text-xs text-gray-500 mt-1">Email không thể thay đổi</p>
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
            <p className="text-xs text-gray-500 mt-1">Số điện thoại không thể thay đổi</p>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giới tính
            </label>
            <div className="flex space-x-6">
              {[
                { value: 'male', label: 'Nam' },
                { value: 'female', label: 'Nữ' },
                { value: 'other', label: 'Khác' }
              ].map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={formData.gender === option.value}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="mr-2 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Birthday */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày sinh
            </label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500' 
                  : 'border-gray-300 bg-gray-50'
              }`}
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg ${
                isEditing 
                  ? 'border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500' 
                  : 'border-gray-300 bg-gray-50'
              }`}
              placeholder="Nhập địa chỉ"
            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giới thiệu
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg resize-none ${
                isEditing 
                  ? 'border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500' 
                  : 'border-gray-300 bg-gray-50'
              }`}
              placeholder="Viết gì đó về bản thân..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              <X size={16} />
              <span>Hủy</span>
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
            >
              <Save size={16} />
              <span>{isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
