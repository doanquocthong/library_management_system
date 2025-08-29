"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Users,
  Layers,
} from "lucide-react";
import { LifeBuoy } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Quản lý mượn sách", icon: Layers },
    { href: "/admin/user_management", label: "Quản lý người dùng", icon: Users },
    { href: "/admin/book_management", label: "Quản lý sách", icon: BookOpen },
    { href: "/admin/support_management", label: "Hỗ trợ người dùng", icon: LifeBuoy },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col h-screen sticky top-0 z-10">
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <img
          src="/images/logo-uth.png"
          alt="UTH Logo"
          className="w-20 h-14 object-contain"
        />
        <div>
          <h1 className="text-blue-700 font-bold text-lg leading-tight">
            UTH Library
          </h1>
          <p className="text-xs text-gray-500 leading-tight">
            University of Transport
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 overflow-y-auto text-sm">
        <div className="text-gray-400 font-semibold mb-1">QUẢN LÝ CHÍNH</div>
        <ul className="space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    active
                      ? "bg-indigo-200 font-semibold text-indigo-800"
                      : "hover:bg-indigo-100 text-gray-700"
                  }`}
                >
                  <Icon className="w-4" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
