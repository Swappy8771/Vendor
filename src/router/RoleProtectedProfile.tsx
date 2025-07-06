import { useAppSelector } from '../hooks/useReduxTypedHooks';
import { Navigate } from 'react-router-dom';
import UserLayout from '../layouts/userLayout';
import SellerLayout from '../layouts/sellerLayout';
import AdminLayout from '../layouts/adminLayout';
import ProfilePage from '../features/user/componets/ProfilePage';
import type { JSX } from 'react';

const RoleProtectedProfile = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  const layouts: Record<string, JSX.Element> = {
    user: <UserLayout><ProfilePage /></UserLayout>,
    seller: <SellerLayout><ProfilePage /></SellerLayout>,
    admin: <AdminLayout><ProfilePage /></AdminLayout>
  };

  return layouts[user.role] || <Navigate to="/login" />;
};

export default RoleProtectedProfile;
