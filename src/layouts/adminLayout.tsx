// src/layout/AdminLayout.tsx
import Header from '../components/layout/Header';
// import Footer from './Footer';
import Sidebar from '../components/layout/sidebar/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar (Admin-specific) */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>

      
    </div>
  );
}