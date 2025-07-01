// routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../router/protectedRoutes';
import AdminLayout from '../layouts/adminLayout';
import SellerLayout from '../layouts/sellerLayout';
import UserLayout from '../layouts/userLayout';

import AdminDashboard from '../pages/Admin/Dashboard';
import SellerDashboard from '../pages/Seller/Dashboard';
import UserHome from '../pages/Buyer/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/*"
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <SellerLayout>
              <SellerDashboard />
            </SellerLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/*"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserLayout>
              <UserHome />
            </UserLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
