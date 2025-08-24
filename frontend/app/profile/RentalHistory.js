'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { API_URL } from "../../config";

export default function RentalHistory() {
  const [rentalData, setRentalData] = useState([]);
  const [filter, setFilter] = useState('all');
  const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  let userId = null;

  if (user) {
    const parsedUser = JSON.parse(user);
    userId = parsedUser.id;
    console.log("userId:", userId);
  }

  // Fetch lịch sử mượn
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/borrow-details/${userId}`, {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        setRentalData(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error('Error fetching rental history:', err);
      }
    };
    fetchData();
  }, [userId]);

  // Gọi API trả sách
  // const handleReturnBook = async (id) => {
  //   try {
  //     const res = await fetch(`${API_URL}/borrow-details/${id}/return`, {
  //       method: 'PUT', // hoặc 'PUT' tùy backend
  //       headers: { 
  //         'Content-Type': 'application/json',
  //         "ngrok-skip-browser-warning": "true",
  //       },
  //     });
  //     if (!res.ok) throw new Error('Return failed');
      
  //     // Cập nhật lại UI
  //     setRentalData(prev =>
  //       prev.map(item =>
  //         item.id === id ? { ...item, status: 'RETURNED' } : item
  //       )
  //     );
  //   } catch (err) {
  //     console.error('Error returning book:', err);
  //   }
  // };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'RETURNED':
        return { label: 'Đã trả', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle };
      case 'BORROWED':
        return { label: 'Đang mượn', color: 'text-orange-600', bg: 'bg-orange-50', icon: Clock };
      case 'PENDING':
        return { label: 'Chờ phê duyệt', color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock };
      case 'OVERDUE':
        return { label: 'Quá hạn', color: 'text-red-600', bg: 'bg-red-50', icon: AlertCircle };
      default:
        return { label: status, color: 'text-gray-600', bg: 'bg-gray-50', icon: AlertCircle };
    }
  };

  const filteredData = rentalData.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter.toUpperCase();
  });

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'all', label: 'Tất cả', count: rentalData.length },
          { key: 'PENDING', label: 'Chờ phê duyệt', count: rentalData.filter(item => item.status === 'PENDING').length },
          { key: 'BORROWED', label: 'Đang mượn', count: rentalData.filter(item => item.status === 'BORROWED').length },
          { key: 'RETURNED', label: 'Đã trả', count: rentalData.filter(item => item.status === 'RETURNED').length },
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
              {filter === 'all' ? 'Chưa có lịch sử mượn sách' : 'Không có sách nào'}
            </h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? 'Bạn chưa mượn sách nào từ thư viện' 
                : `Không có sách nào trong danh mục "${filter}"`}
            </p>
          </div>
        ) : (
          filteredData.map((rental, idx) => {
            const statusInfo = getStatusInfo(rental.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  {/* Book Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={rental.bookImage || '/images/default-book.jpg'}
                      alt={rental.bookTitle}
                      className="w-16 h-20 object-cover rounded border"
                    />
                  </div>

                  {/* Borrow Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          Người mượn: {rental.fullName}
                        </h3>
                        <p className="text-sm text-gray-500 mb-1">Email: {rental.email}</p>
                        <p className="text-sm text-gray-700 font-medium">
                          Sách: {rental.bookTitle} - {rental.bookAuthor}
                        </p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-600 mt-2">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>Mượn: {formatDate(rental.dateBorrowBook)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>Trả: {formatDate(rental.dateReturnBook)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status + Return Button */}
                      <div className="flex items-center space-x-3">
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusInfo.bg}`}>
                          <StatusIcon size={14} className={statusInfo.color} />
                          <span className={`text-sm font-medium ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>

                        {/* {rental.status === 'BORROWED' && (
                          <button
                            onClick={() => handleReturnBook(rental.id)}
                            className="px-3 py-1 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
                          >
                            Trả sách
                          </button>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
