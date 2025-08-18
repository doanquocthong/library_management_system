"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null); // user đang sửa
  const [formData, setFormData] = useState({
    userName: "",
    role: "",
    mssv: "",
    fullName: "",
    address: "",
    contact: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  };

  // Xóa user
  const handleDelete = (userName) => {
    if (!confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;

    fetch(`http://localhost:8080/api/users/${userName}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Xóa thành công!");
        fetchUsers();
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  // Bắt đầu sửa
  const handleEdit = (user) => {
    setEditingUser(user.userName);
    setFormData({ ...user });
  };

  // Lưu sau khi sửa
  const handleSave = () => {
    fetch(`http://localhost:8080/api/users/${editingUser}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        alert("Cập nhật thành công!");
        setEditingUser(null);
        fetchUsers();
      })
      .catch((err) => console.error("Error updating user:", err));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-200">
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
                  <th className="p-2 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2 border">{user.userName}</td>
                    <td className="p-2 border">{user.role}</td>
                    <td className="p-2 border">{user.mssv}</td>
                    <td className="p-2 border">{user.fullName}</td>
                    <td className="p-2 border">{user.address}</td>
                    <td className="p-2 border">{user.contact}</td>
                    <td className="p-2 border">
                      {user.createdDate
                        ? new Date(user.createdDate).toLocaleString()
                        : ""}
                    </td>
                    <td className="p-2 border space-x-2">
                      <button
                        className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                        onClick={() => handleEdit(user)}
                      >
                        Sửa
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(user.userName)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Form sửa */}
            {editingUser && (
              <div className="mt-6 p-4 border rounded bg-gray-50">
                <h2 className="text-lg font-bold mb-2">Sửa thông tin</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(formData).map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium mb-1">
                        {field}
                      </label>
                      <input
                        type="text"
                        value={formData[field] || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, [field]: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-x-2">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleSave}
                  >
                    Lưu
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
                    onClick={() => setEditingUser(null)}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
