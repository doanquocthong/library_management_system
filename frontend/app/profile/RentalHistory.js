'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Calendar, Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react';

export default function RentalHistory() {
  const [rentalData, setRentalData] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Demo data – bạn có thể thay bằng fetch API
    setRentalData([
      { 
        id: 1, 
        book: 'Lập trình C++ cơ bản', 
        author: 'Nguyễn Văn A',
        rentDate: '2025-01-15', 
        returnDate: '2025-02-15',
        status: 'returned',
        image: '/images/book1.jpg'
      },
      { 
        id: 2, 
        book: 'JavaScript nâng cao', 
        author: 'Trần Thị B',
        rentDate: '2025-01-20', 
        returnDate: '2025-02-20',
        status: 'renting',
        image: '/images/book2.jpg'
      },
      { 
        id: 3, 
        book: 'React.js từ cơ bản đến nâng cao', 
        author: 'Lê Văn C',
        rentDate: '2024-12-10', 
        returnDate: '2025-01-10',
        status: 'overdue',
        image: '/images/book3.jpg'
      },
    ]);
  }, []);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'returned':
        return { label: 'Đã trả', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle };
      case 'renting':
        return { label: 'Đang thuê', color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock };
      case 'overdue':
        return { label: 'Quá hạn', color: 'text-red-600', bg: 'bg-red-50', icon: AlertCircle };
      default:
        return { label: 'Không xác định', color: 'text-gray-600', bg: 'bg-gray-50', icon: AlertCircle };
    }
  };

  const filteredData = rentalData.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'all', label: 'Tất cả', count: rentalData.length },
          { key: 'renting', label: 'Đang thuê', count: rentalData.filter(item => item.status === 'renting').length },
          { key: 'returned', label: 'Đã trả', count: rentalData.filter(item => item.status === 'returned').length },
          { key: 'overdue', label: 'Quá hạn', count: rentalData.filter(item => item.status === 'overdue').length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              filter === tab.key
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
            <span className="ml-1 text-xs bg-gray-200 px-2 py-1 rounded-full">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Rental History List */}
      <div className="space-y-4">
        {filteredData.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              {filter === 'all' ? 'Chưa có lịch sử thuê sách' : 'Không có sách nào'}
            </h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? 'Bạn chưa thuê sách nào từ thư viện' 
                : `Không có sách nào trong danh mục "${filter === 'renting' ? 'Đang thuê' : filter === 'returned' ? 'Đã trả' : 'Quá hạn'}"`
              }
            </p>
          </div>
        ) : (
          filteredData.map((rental) => {
            const statusInfo = getStatusInfo(rental.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div key={rental.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  {/* Book Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={rental.image || '/images/default-book.jpg'}
                      alt={rental.book}
                      className="w-16 h-20 object-cover rounded border"
                    />
                  </div>

                  {/* Book Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {rental.book}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">Tác giả: {rental.author}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>Thuê: {formatDate(rental.rentDate)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>Trả: {formatDate(rental.returnDate)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex items-center space-x-3">
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusInfo.bg}`}>
                          <StatusIcon size={14} className={statusInfo.color} />
                          <span className={`text-sm font-medium ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                        
                        <button className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 text-sm font-medium">
                          <Eye size={14} />
                          <span>Chi tiết</span>
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {rental.status === 'renting' && (
                      <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-100">
                        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm">
                          Gia hạn
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm">
                          Trả sách
                        </button>
                      </div>
                    )}

                    {rental.status === 'overdue' && (
                      <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-100">
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm">
                          Trả sách ngay
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm">
                          Liên hệ thủ thư
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Summary Stats */}
      {rentalData.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Thống kê</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{rentalData.length}</div>
              <div className="text-sm text-gray-600">Tổng số sách đã thuê</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {rentalData.filter(item => item.status === 'renting').length}
              </div>
              <div className="text-sm text-gray-600">Đang thuê</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {rentalData.filter(item => item.status === 'returned').length}
              </div>
              <div className="text-sm text-gray-600">Đã trả</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {rentalData.filter(item => item.status === 'overdue').length}
              </div>
              <div className="text-sm text-gray-600">Quá hạn</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
