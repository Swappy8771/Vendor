// layout/Header.tsx
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-white">
      <h1 className="text-xl font-bold">🛒 EcomApp</h1>
      <nav className="space-x-4">
        {user?.role === 'user' && (
          <>
            <a href="/user/home">Home</a>
            <a href="/user/orders">Orders</a>
          </>
        )}
        {user?.role === 'seller' && (
          <>
            <a href="/seller/dashboard">Dashboard</a>
            <a href="/seller/products">My Products</a>
          </>
        )}
        {user?.role === 'admin' && (
          <>
            <a href="/admin/dashboard">Admin</a>
            <a href="/admin/users">Users</a>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
