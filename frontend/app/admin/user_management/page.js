"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { API_URL } from "../../../config";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // gọi API hide/unhide
  const handleToggleHide = async (user) => {
    try {
      const action = user.isHide ? "unhide" : "hide";
      const res = await fetch(`${API_URL}/users/${user.userId}/${action}`, {
        method: "PUT",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
        console.log(user)

      if (res.ok) {
        setStatus("success");
        setMessage(
          user.isHide
            ? `✅ Đã bỏ chặn user ${user.userName}`
            : `✅ Đã chặn user ${user.userName}`
        );
        fetchUsers();
      } else if (res.status === 404) {
        setStatus("error");
        setMessage("❌ Không tìm thấy người dùng!");
      } else {
        const msg = await res.text();
        setStatus("error");
        setMessage(msg || "❌ Có lỗi xảy ra!");
      }
    } catch (err) {
      console.error("Error toggle hide/unhide:", err);
      setStatus("error");
      setMessage("❌ Lỗi mạng!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <AdminHeader />
        <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>

        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-100 text-left">
                  <th className="p-2 border">Tên đăng nhập</th>
                  <th className="p-2 border">Vai trò</th>
                  <th className="p-2 border">MSSV</th>
                  <th className="p-2 border">Họ và tên</th>
                  <th className="p-2 border">Địa chỉ</th>
                  <th className="p-2 border">Liên hệ</th>
                  <th className="p-2 border">Ngày tạo</th>
                  <th className="p-2 border">Trạng thái</th>
                  <th className="p-2 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.userId} className="hover:bg-gray-50">
                    <td className="p-2 border">{user.userName}</td>
                    <td className="p-2 border">{user.roleName}</td>
                    <td className="p-2 border">{user.mssv}</td>
                    <td className="p-2 border">{user.fullname}</td>
                    <td className="p-2 border">{user.address}</td>
                    <td className="p-2 border">{user.contact}</td>
                    <td className="p-2 border">
                      {user.createdDate
                        ? new Date(user.createdDate).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="p-2 border text-center">
                      {user.isHide ? (
                        <span className="text-red-500 font-semibold">Đang bị chặn</span>
                      ) : (
                        <span className="text-green-600 font-semibold">Hoạt động</span>
                      )}
                    </td>
                    <td className="p-2 border">
                      <div className="flex justify-center">
                        <button
                          className={`px-2 py-1 rounded w-24 ${
                            user.isHide
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                          } text-white`}
                          onClick={() => {
                            setSelectedUser(user);
                            setMessage("");
                            setStatus("idle");
                            setConfirmOpen(true);
                          }}
                        >
                          {user.isHide ? "Bỏ chặn" : "Chặn"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Dialog confirm */}
        {confirmOpen && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
              <h2 className="text-xl font-bold mb-4">Xác nhận</h2>

              {status === "idle" && (
                <>
                  <p className="mb-6">
                    {selectedUser.isHide
                      ? "Bạn có chắc chắn muốn bỏ chặn người dùng này?"
                      : "Bạn có chắc chắn muốn chặn người dùng này?"}
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => setConfirmOpen(false)}
                    >
                      Hủy
                    </button>
                    <button
                      className={`px-4 py-2 text-white rounded ${
                        selectedUser.isHide
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      onClick={() => handleToggleHide(selectedUser)}
                    >
                      {selectedUser.isHide ? "Bỏ chặn" : "Chặn"}
                    </button>
                  </div>
                </>
              )}

              {status !== "idle" && (
                <>
                  <p
                    className={`mb-6 font-semibold ${
                      status === "success" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {message}
                  </p>
                  <button
                    className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                    onClick={() => setConfirmOpen(false)}
                  >
                    Đóng
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
