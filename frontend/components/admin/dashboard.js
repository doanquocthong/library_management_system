export function Dashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">Tổng số sách</p>
            <h3 className="text-2xl font-bold text-indigo-700">15,847</h3>
            <p className="text-green-500 text-sm">+234 so với tháng trước</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">Sinh viên đăng ký</p>
            <h3 className="text-2xl font-bold text-indigo-700">3,245</h3>
            <p className="text-green-500 text-sm">+89 tháng này</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">Sách đang mượn</p>
            <h3 className="text-2xl font-bold text-indigo-700">529</h3>
            <p className="text-yellow-500 text-sm">+12 đang xử lý</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">Sách quá hạn</p>
            <h3 className="text-2xl font-bold text-indigo-700">23</h3>
            <p className="text-red-500 text-sm">+5 mới tuần này</p>
          </div>
        </div>
    );
  }