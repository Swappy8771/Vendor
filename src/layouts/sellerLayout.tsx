// src/layout/SellerLayout.tsx
// src/layouts/SellerLayout.tsx

import Header from '../components/layout/Header';
import Footer from '../components/layout/footer/BuyerFooter'; // replace later with SellerFooter if needed
import Sidebar from '../components/layout/sidebar/sidebar';

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Header */}
      <Header />

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar (dynamic role-based, will show seller links) */}
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

export default SellerLayout;

