import { Eye, Edit, Trash } from 'lucide-react';

export function BookList() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex space-x-4 mb-4">
        <button className="px-4 py-2 rounded-lg bg-white shadow border text-sm font-semibold">Danh sách sách</button>
        <button className="px-4 py-2 rounded-lg bg-transparent text-sm text-gray-500 hover:underline">Sách đang mượn</button>
        <button className="px-4 py-2 rounded-lg bg-transparent text-sm text-gray-500 hover:underline">Sinh viên</button>
        <button className="px-4 py-2 rounded-lg bg-transparent text-sm text-gray-500 hover:underline">Giao dịch</button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2 px-3">Mã sách</th>
              <th className="py-2 px-3">Tên sách</th>
              <th className="py-2 px-3">Tác giả</th>
              <th className="py-2 px-3">Thể loại</th>
              <th className="py-2 px-3">Số lượng</th>
              <th className="py-2 px-3">Trạng thái</th>
              <th className="py-2 px-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-3">BK001</td>
              <td className="py-2 px-3">Lập trình Java cơ bản</td>
              <td className="py-2 px-3">Nguyễn Văn A</td>
              <td className="py-2 px-3">Công nghệ thông tin</td>
              <td className="py-2 px-3">15</td>
              <td className="py-2 px-3">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Còn sẵn</span>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col gap-1 items-center">
                  <button className="bg-green-500 hover:bg-green-600 text-white p-1 rounded"><Eye size={16} /></button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded"><Edit size={16} /></button>
                  <button className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"><Trash size={16} /></button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3">BK002</td>
              <td className="py-2 px-3">Cơ học đất nền</td>
              <td className="py-2 px-3">Trần Thị B</td>
              <td className="py-2 px-3">Xây dựng</td>
              <td className="py-2 px-3">8</td>
              <td className="py-2 px-3">
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">Đang mượn</span>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col gap-1 items-center">
                  <button className="bg-green-500 hover:bg-green-600 text-white p-1 rounded"><Eye size={16} /></button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded"><Edit size={16} /></button>
                  <button className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"><Trash size={16} /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
