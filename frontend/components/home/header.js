import Link from "next/link";
import GenreMenu from "./GenreMenu";
import { useAuth } from "@/app/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser?.username) {
            setUsername(parsedUser.username);
          }
        } catch (err) {
          console.error("Lỗi parse user từ localStorage:", err);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    router.push("/");
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/logo-uth.png"
              alt="Logo UTH"
              className="h-24 w-auto"
            />
            <span className="text-2xl font-bold text-indigo-600">Thư Viện UTH</span>
          </Link>
        </div>

        {/* Menu + Auth */}
        <div className="flex items-center gap-10">
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link
              href="/documents"
              className="text-sm text-black px-3 py-1 rounded hover:bg-gray-200 hover:text-indigo-700 transition"
            >
              Tài liệu
            </Link>
            <Link
              href="/introduce"
              className="text-sm text-black px-3 py-1 rounded hover:bg-gray-200 hover:text-indigo-700 transition"
            >
              Giới thiệu
            </Link>
            <Link
              href="/contact"
              className="text-sm text-black px-3 py-1 rounded hover:bg-gray-200 hover:text-indigo-700 transition"
            >
              Liên hệ
            </Link>
          </nav>

          {user ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  src={
                    user.avatar ||
                    "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"
                  }
                  alt="avatar"
                  className="w-9 h-9 rounded-full border border-gray-300 object-cover"
                />
                <span className="text-sm font-medium text-gray-700">
                  {username || "Họ và tên"}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <div className="font-medium">{username}</div>
                    <div className="text-gray-500 text-xs">
                      {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                    </div>
                  </div>

                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      Quản trị
                    </Link>
                  )}

                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setShowDropdown(false)}
                  >
                    Hồ sơ cá nhân
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-x-3">
              <Link
                href="/login"
                className="text-sm font-medium text-indigo-700 hover:underline"
              >
                Đăng nhập
              </Link>
              <Link
                href="/sign-up"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-1.5 px-4 rounded-lg transition"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>

      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  );
}
