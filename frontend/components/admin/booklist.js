"use client";

import React, { useState, useEffect } from 'react';
import { API_URL } from "../../config";

export function BookList() {
  const [borrowDetails, setBorrowDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterDate, setFilterDate] = useState('ALL');
  const [customDate, setCustomDate] = useState('');
  const [searchEmail, setSearchEmail] = useState(''); // ✅ thêm state

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
        let data = await res.json();

        data.sort((a, b) => new Date(b.dateBorrowBook) - new Date(a.dateBorrowBook));
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
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'BORROWED': return 'bg-green-100 text-green-700';
      case 'RETURNED': return 'bg-blue-100 text-blue-700';
      case 'CANCELLED': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${API_URL}/borrow-details/${id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',"ngrok-skip-browser-warning": "true", },
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

  const handleReturnBook = async (id) => {
    try {
      const res = await fetch(`${API_URL}/borrow-details/${id}/return`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',"ngrok-skip-browser-warning": "true", },
      });
      if (!res.ok) throw new Error('Duyệt trả thất bại');
      const updated = await res.json();
      setBorrowDetails(prev =>
        prev.map(item => item.id === updated.id ? updated : item)
      );
    } catch (error) {
      console.error(error);
      alert('Duyệt trả thất bại');
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  

  const filterByDate = (itemDate) => {
    if (!itemDate) return false;
    const d = new Date(itemDate);
    const today = new Date();
    const yest = new Date();
    yest.setDate(today.getDate() - 1);

    const onlyDate = (dt) => dt.toISOString().split("T")[0];

    switch (filterDate) {
      case "TODAY": return onlyDate(d) === onlyDate(today);
      case "YESTERDAY": return onlyDate(d) === onlyDate(yest);
      case "CUSTOM": return customDate && onlyDate(d) === customDate;
      default: return true;
    }
  };

  const filteredData = borrowDetails.filter(item => {
    const statusOk = filterStatus === 'ALL' ? true : item.status === filterStatus;
    const dateOk = filterByDate(item.dateBorrowBook);
    const emailOk = searchEmail === '' 
      ? true 
      : (item.email || item.userEmail || '').toLowerCase().includes(searchEmail.toLowerCase());
    return statusOk && dateOk && emailOk;
  });

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* Thanh lọc trạng thái + lọc ngày + tìm kiếm */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        
        {/* Lọc trạng thái */}
        <div className="flex space-x-3">
          {['ALL','PENDING','BORROWED','RETURNED'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                filterStatus === status 
                ? 'bg-white shadow border' 
                : 'bg-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {status === 'ALL' ? 'Tất cả' : 
              status === 'PENDING' ? 'Chờ duyệt' : 
              status === 'BORROWED' ? 'Đang mượn' : 
              'Đã trả'}
            </button>
          ))}
        </div>

        {/* Ô tìm kiếm email */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Tìm theo email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="border px-3 py-2 rounded-lg text-sm w-64"
          />
        </div>

        {/* Lọc ngày */}
        <div className="flex space-x-3 items-center">
          <button
            onClick={() => setFilterDate("TODAY")}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${filterDate === "TODAY" ? "bg-white shadow border" : "text-gray-500 hover:text-gray-700"}`}
          >
            Hôm nay
          </button>
          <button
            onClick={() => setFilterDate("YESTERDAY")}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${filterDate === "YESTERDAY" ? "bg-white shadow border" : "text-gray-500 hover:text-gray-700"}`}
          >
            Hôm qua
          </button>
          <input
            type="date"
            value={customDate}
            onChange={(e) => {
              setCustomDate(e.target.value);
              setFilterDate("CUSTOM");
            }}
            className="border px-2 py-1 rounded text-sm"
          />
        </div>
      </div>

      {/* Bảng danh sách */}
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
              <th className="py-2 px-3">Ngày mượn</th>
              <th className="py-2 px-3">Ngày trả</th>
              <th className="py-2 px-3">Trạng thái</th>
              <th className="py-2 px-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
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
                <td className="py-2 px-3">{formatDate(item.dateBorrowBook)}</td>
                <td className="py-2 px-3">{formatDate(item.dateReturnBook)}</td>
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
                  {item.status === 'BORROWED' && (
                    <button
                      onClick={() => handleReturnBook(item.id)}
                      className="whitespace-nowrap px-3 py-1 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
                    > Trả sách
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
