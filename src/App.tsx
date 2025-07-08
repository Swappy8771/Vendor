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

import RoleProtectedProfile from './router/RoleProtectedProfile';
import ProfilePage from './features/user/componets/ProfilePage';
import AllUsers from './features/admin/component/AllUsers';
import AllSellers from './features/admin/component/AllSellers';

// Products
// import ProductList from './features/product/componets/ProductList';
// import ProductDetail from './features/product/componets/ProductDetails';
// import ProductForm from './features/product/componets/ProductForm';
// import MyProducts from './features/product/componets/MyProducts';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🔁 Default redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 🟢 Public Auth Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

     

        {/* 🧑 Buyer/User Routes */}
        <Route
          path="/user/home"
          element={
            <UserLayout>
              <UserHome />
            </UserLayout>
          }
        />
        <Route
          path="/user/profile"
          element={
            <UserLayout>
              <ProfilePage />
            </UserLayout>
          }
        />

        {/* 🛍️ Seller Routes */}
        <Route
          path="/seller/dashboard"
          element={
            <SellerLayout>
              <SellerDashboard />
            </SellerLayout>
          }
        />
        <Route
          path="/seller/profile"
          element={
            <SellerLayout>
              <ProfilePage />
            </SellerLayout>
          }
        />
       

        {/* 🛡️ Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <AdminLayout>
              <ProfilePage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <AllUsers />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/sellers"
          element={
            <AdminLayout>
              <AllSellers />
            </AdminLayout>
          }
        />

        {/* 👤 Dynamic Role-Protected Profile Route */}
        <Route path="/profile" element={<RoleProtectedProfile />} />

        {/* ❌ 404 Fallback */}
        <Route path="*" element={<div>404 | Page not found</div>} />
      </Routes>
    </Router>
  );
}
