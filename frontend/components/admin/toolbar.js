import { Search, Plus } from 'lucide-react';

export function Toolbar() {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md mt-4">
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-md">
        <Search className="w-4 h-4 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Tìm kiếm sách, tài liệu, sinh viên..."
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>
      <button className="ml-4 flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:opacity-90">
        <Plus className="w-4 h-4" />
        Thêm mới
      </button>
    </div>
  );
}