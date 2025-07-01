import Header from '../components/layout/Header';
import Footer from '../components/layout/footer/BuyerFooter';
// src/layouts/UserLayout.tsx

import Sidebar from '../components/layout/sidebar/sidebar';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />

      {/* Sidebar + Main */}
      <div className="flex flex-1">
        {/* Sidebar (dynamic for user role) */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
