'use client';
import Link from "next/link";
import { useAuth } from '@/app/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  BookOpen, 
  ChevronRight,
  Camera
} from 'lucide-react';
import ProfileForm from './ProfileForm';
import RentalHistory from './RentalHistory';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  
  if (!user) return null;

  const menuItems = [
    { id: 'profile', label: 'Hồ sơ', icon: User, description: 'Thông tin tài khoản' },
    { id: 'history', label: 'Lịch sử thuê sách', icon: BookOpen, description: 'Sách đã thuê' },
  ];
  return (
    
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/logo-uth.png"
              alt="Logo UTH"
              className="h-24 w-auto"
            />
            <span className="text-2xl font-bold text-indigo-600">Thư Viện UTH</span>
          </Link>
            <h1 className="text-2xl font-semibold text-gray-800">Tài khoản của tôi</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Xin chào,</span>
              <span className="font-medium text-orange-600">{user.name || user.username}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Fixed */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-sm border">
                {/* User Info Card */}
                <div className="p-6 border-b">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={user.avatar || 'https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png'}
                        alt="avatar"
                        className="w-16 h-16 rounded-full object-cover border-2 border-orange-100"
                        key={user.avatar} // Force re-render when avatar changes
                      />
                      <button className="absolute -bottom-1 -right-1 bg-orange-500 text-white p-1 rounded-full hover:bg-orange-600 transition">
                        <Camera size={12} />
                      </button>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{user.name || user.username}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <div className="flex items-center mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          Đang hoạt động
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                          activeTab === item.id
                            ? 'bg-orange-50 text-orange-600 border border-orange-200'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                        onClick={() => setActiveTab(item.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent size={20} />
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Scrollable */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Tab Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {menuItems.find(item => item.id === activeTab)?.label}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {menuItems.find(item => item.id === activeTab)?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'profile' && <ProfileForm user={user} />}
                {activeTab === 'history' && <RentalHistory user={user} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
