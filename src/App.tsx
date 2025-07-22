import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 🔐 Auth
import LoginForm from './features/auth/components/LoginForm';
import RegisterForm from './features/auth/components/RegisterForm';

// 🧱 Layouts
import UserLayout from './layouts/userLayout';
import SellerLayout from './layouts/sellerLayout';
import AdminLayout from './layouts/adminLayout';

// 👤 Profile
import RoleProtectedProfile from './router/RoleProtectedProfile';
import ProfilePage from './features/user/componets/ProfilePage';

// 🛡️ Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import AllUsers from './features/admin/component/AllUsers';
import AllSellers from './features/admin/component/AllSellers';

// 🛍️ Seller Pages
import SellerDashboard from './pages/Seller/Dashboard';
import MyProducts from './features/product/components/MyProducts';

// 👨‍💻 Buyer Pages
import UserHome from './pages/Buyer/Home';
import WishlistPage from './features/wishlist/componets/WishlistPage';

// 📦 Shared Product Pages
import ProductList from './features/product/components/ProductList';
import ProductForm from './features/product/components/ProductForm';
import ProductDetail from './features/product/components/ProductDetails'; // future
import AddToCart from './features/wishlist/componets/AddToCart';
import BulkProductUploader from './features/product/components/BulkProductUploader';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🔁 Redirect root */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 🔓 Public Auth */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* 🛡️ Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/profile" element={<AdminLayout><ProfilePage /></AdminLayout>} />
        <Route path="/admin/users" element={<AdminLayout><AllUsers /></AdminLayout>} />
        <Route path="/admin/sellers" element={<AdminLayout><AllSellers /></AdminLayout>} />
        <Route path="/admin/products" element={<AdminLayout><ProductList /></AdminLayout>} />
        <Route path="/admin/products/:id" element={<AdminLayout><ProductDetail /></AdminLayout>} />

        {/* 🛍️ Seller Routes */}
        <Route path="/seller/dashboard" element={<SellerLayout><SellerDashboard /></SellerLayout>} />
        <Route path="/seller/profile" element={<SellerLayout><ProfilePage /></SellerLayout>} />
        <Route path="/seller/products" element={<SellerLayout><ProductList /></SellerLayout>} />
        <Route path="/seller/products/create" element={<SellerLayout><ProductForm /></SellerLayout>} />
        <Route path="/seller/products/edit/:id" element={<SellerLayout><ProductForm /></SellerLayout>} />
        <Route path="/seller/products/:id" element={<SellerLayout><ProductDetail /></SellerLayout>} />
        <Route path="/seller/products/mine" element={<SellerLayout><MyProducts /></SellerLayout>} />
        <Route path="/seller/products/bulk-upload" element={<SellerLayout><BulkProductUploader /></SellerLayout>} />



        {/* 👨‍💻 Buyer/User Routes */}
        <Route path="/user/home" element={<UserLayout><UserHome /></UserLayout>} />
        <Route path="/user/profile" element={<UserLayout><ProfilePage /></UserLayout>} />
        <Route path="/user/products" element={<UserLayout><ProductList /></UserLayout>} />
        <Route path="/user/products/:id" element={<UserLayout><ProductDetail /></UserLayout>} />
        <Route path="/user/wishlist" element={<UserLayout><WishlistPage /></UserLayout>} />
        <Route path="/user/add-to-cart" element={<UserLayout><AddToCart /></UserLayout>} />

        {/* 👥 Shared Profile */}
        <Route path="/profile" element={<RoleProtectedProfile />} />

        {/* ❌ 404 Page */}
        <Route path="*" element={<div>404 | Page not found</div>} />
      </Routes>
    </Router>
  );
}