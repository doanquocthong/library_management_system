'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Hồ sơ cá nhân', path: '/profile' },
  { name: 'Lịch sử thuê sách', path: '/profile/history' },
];

export default function ProfileMenu() {
  const pathname = usePathname();

  return (
    <div className="w-full sm:w-1/4 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Tài khoản của tôi</h2>
      <ul className="space-y-2">
        {menuItems.map(item => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`block px-4 py-2 rounded hover:bg-gray-100 ${
                pathname === item.path ? 'bg-gray-100 font-medium text-orange-500' : ''
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
