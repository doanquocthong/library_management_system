import Link from 'next/link';
import { BookOpen, Users, BarChart2, Settings, Bell, Calendar, AlertCircle, Database, Layers, User } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col h-screen sticky top-0 z-10">
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <img src="/images/logo-uth.png" alt="UTH Logo" className="w-20 h-14 object-contain" />
        <div>
          <h1 className="text-blue-700 font-bold text-lg leading-tight">UTH Library</h1>
          <p className="text-xs text-gray-500 leading-tight">University of Transport</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 overflow-y-auto text-sm">
        <div className="text-gray-400 font-semibold mb-1">QUẢN LÝ CHÍNH</div>
        <ul className="space-y-2">
          <li><Link href="/admin" className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-100"><Layers className="w-4" /> Tổng quan</Link></li>
          <li><Link href="/admin/user_management" className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-100"><Users className="w-4" /> Quản lý người dùng</Link></li>
          <li><Link href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-100"><BookOpen className="w-4" /> Quản lý sách</Link></li>
          {/* <li><Link href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-100"><Users className="w-4" /> Thông tin sinh viên</Link></li>
          <li><Link href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-100"><Bell className="w-4" /> Sách đã mượn</Link></li> */}
        </ul>

        {/* <div className="text-gray-400 font-semibold mt-6 mb-1">BÁO CÁO & THỐNG KÊ</div>
        <ul className="space-y-2">
          <li><Link href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-100"><BarChart2 className="w-4" /> Thống kê mượn trả</Link></li>
          <li><Link href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-100"><AlertCircle className="w-4" /> Sách quá hạn</Link></li>
          <li><Link href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-100"><Calendar className="w-4" /> Lịch sử giao dịch</Link></li>
        </ul>

        <div className="text-gray-400 font-semibold mt-6 mb-1">QUẢN TRỊ HỆ THỐNG</div>
        <ul className="space-y-2">
          <li><Link href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-100"><User className="w-4" /> Quản lý tài khoản</Link></li>
          <li><Link href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-100"><Settings className="w-4" /> Cài đặt hệ thống</Link></li>
          <li><Link href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-100"><Database className="w-4" /> Sao lưu dữ liệu</Link></li>
        </ul> */}
      </nav>
    </aside>
  );
}