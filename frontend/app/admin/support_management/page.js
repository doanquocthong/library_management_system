"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { API_URL } from "../../../config";

export default function SupportManagementPage() {
  const [supports, setSupports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSupports = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/supports`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await res.json();
      setSupports(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Lỗi khi load supports:", err);
    } finally {
      setLoading(false);
    }
  };

  const approveSupport = async (id) => {
    try {
      await fetch(`${API_URL}/supports/${id}/approve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchSupports(); // reload lại danh sách
    } catch (err) {
      console.error("❌ Lỗi khi duyệt support:", err);
    }
  };

  useEffect(() => {
    fetchSupports();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <AdminHeader />
        <h1 className="text-2xl font-bold mb-4">Quản lý hỗ trợ</h1>

        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-100 text-left">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Họ và tên</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Tiêu đề</th>
                  <th className="p-2 border">Nội dung</th>
                  <th className="p-2 border">Ngày gửi</th>
                  <th className="p-2 border">Trạng thái</th>
                  <th className="p-2 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {supports.map((sp) => (
                  <tr key={sp.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{sp.id}</td>
                    <td className="p-2 border">{sp.fullName}</td>
                    <td className="p-2 border">{sp.email}</td>
                    <td className="p-2 border">{sp.title}</td>
                    <td className="p-2 border">{sp.content}</td>
                    <td className="p-2 border">
                      {sp.createdDate
                        ? new Date(sp.createdDate).toLocaleDateString("vi-VN")
                        : ""}
                    </td>
                    <td className="p-2 border">
                      {sp.isApprove ? (
                        <span className="text-green-600 font-semibold">Đã duyệt</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Chưa duyệt</span>
                      )}
                    </td>
                    <td className="p-2 border">
                      {!sp.isApprove && (
                        <button
                          onClick={() => approveSupport(sp.id)}
                          className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
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
        )}
      </main>
    </div>
  );
}
