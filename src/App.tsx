import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './features/auth/components/LoginForm';
import RegisterForm from './features/auth/components/RegisterForm';

// Role-based layouts
import UserLayout from './layouts/userLayout';
import SellerLayout from './layouts/sellerLayout';
import AdminLayout from './layouts/adminLayout';

// Pages
import UserHome from './pages/Buyer/Home';
import SellerDashboard from './pages/Seller/Dashboard';
import AdminDashboard from './pages/Admin/Dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🔁 Default redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 🟢 Auth Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* 🧑 Buyer/User Layout & Routes */}
        <Route
          path="/user/home"
          element={
            <UserLayout>
              <UserHome />
            </UserLayout>
          }
        />

        {/* 🛍️ Seller Layout & Routes */}
        <Route
          path="/seller/dashboard"
          element={
            <SellerLayout>
              <SellerDashboard />
            </SellerLayout>
          }
        />

        {/* 🛡️ Admin Layout & Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />

        {/* 🔴 404 fallback */}
        <Route path="*" element={<div>404 | Page not found</div>} />
      </Routes>
    </Router>
  );
}
