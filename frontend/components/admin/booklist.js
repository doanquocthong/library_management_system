"use client";

import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash } from 'lucide-react';
import { API_URL } from "../../config";

export function BookList() {
  const [borrowDetails, setBorrowDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL'); // ALL, PENDING, BORROWED, RETURNED

  useEffect(() => {
    async function fetchBorrowDetails() {
      try {
        const res = await fetch(`${API_URL}/borrow-details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setBorrowDetails(data);
      } catch (error) {
        console.error('Error fetching borrow details:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBorrowDetails();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'BORROWED':
        return 'bg-green-100 text-green-700';
      case 'RETURNED':
        return 'bg-blue-100 text-blue-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Hàm duyệt mượn (PENDING -> BORROWED)
  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${API_URL}/borrow-details/${id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Duyệt thất bại');
      const updated = await res.json();
      setBorrowDetails(prev =>
        prev.map(item => item.id === updated.id ? updated : item)
      );
    } catch (error) {
      console.error(error);
      alert('Duyệt thất bại');
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  // Lọc danh sách dựa trên filterStatus
  const filteredData = borrowDetails.filter(item =>
    filterStatus === 'ALL' ? true : item.status === filterStatus
  );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setFilterStatus('ALL')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${filterStatus === 'ALL' ? 'bg-white shadow border' : 'bg-transparent text-gray-500 hover:underline'}`}
        >
          Tất cả
        </button>
        <button
          onClick={() => setFilterStatus('PENDING')}
          className={`px-4 py-2 rounded-lg text-sm ${filterStatus === 'PENDING' ? 'bg-white shadow border font-semibold' : 'bg-transparent text-gray-500 hover:underline'}`}
        >
          Sách chờ duyệt
        </button>
        <button
          onClick={() => setFilterStatus('BORROWED')}
          className={`px-4 py-2 rounded-lg text-sm ${filterStatus === 'BORROWED' ? 'bg-white shadow border font-semibold' : 'bg-transparent text-gray-500 hover:underline'}`}
        >
          Sách đã duyệt (đang mượn)
        </button>
        <button
          onClick={() => setFilterStatus('RETURNED')}
          className={`px-4 py-2 rounded-lg text-sm ${filterStatus === 'RETURNED' ? 'bg-white shadow border font-semibold' : 'bg-transparent text-gray-500 hover:underline'}`}
        >
          Sách đã trả
        </button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2 px-3">Ảnh sách</th>
              <th className="py-2 px-3">Tên sách</th>
              <th className="py-2 px-3">Tác giả</th>
              <th className="py-2 px-3">Người mượn</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Địa chỉ</th>
              <th className="py-2 px-3">Trạng thái</th>
              <th className="py-2 px-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2 px-3">
                  {item.bookImage && (
                    <img src={item.bookImage} alt={item.bookTitle} className="w-16 h-20 object-cover rounded" />
                  )}
                </td>
                <td className="py-2 px-3">{item.bookTitle}</td>
                <td className="py-2 px-3">{item.bookAuthor}</td>
                <td className="py-2 px-3">{item.fullName || item.userName}</td>
                <td className="py-2 px-3">{item.email || item.userEmail}</td>
                <td className="py-2 px-3">{item.address || item.userAddress}</td>
                <td className="py-2 px-3">
                  <span className={`${getStatusColor(item.status)} px-2 py-1 rounded text-xs`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-2 px-3 items-center">
                  {item.status === 'PENDING' && (
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm "
                      onClick={() => handleApprove(item.id)}
                    >
                      Duyệt
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
