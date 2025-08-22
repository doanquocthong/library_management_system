import { Sidebar } from '@/components/admin/sidebar';
import { Dashboard } from '@/components/admin/dashboard';
import { BookList } from '@/components/admin/booklist';
import { Toolbar } from '@/components/admin/toolbar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-200">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <AdminHeader />
        <div className="mt-6">
          <BookList />
        </div>
      </main>
    </div>
  );
}