import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiChevronDown } from 'react-icons/fi';
import { useState } from 'react';
import LogoutButton from '../../features/auth/components/LogoutButton';

export default function Header() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const goToProfile = () => {
    setShowMenu(false);
    navigate(`/${user?.role}/profile`);
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative z-10">
      {/* 🛒 Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-700">
        🛒 Nilson
      </Link>

      {/* 📋 Nav Links */}
      <nav className="flex items-center gap-6">
        {user?.role === 'user' && (
          <>
            <Link to="/user/home" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/user/orders" className="text-gray-700 hover:text-blue-600">Orders</Link>
          </>
        )}

        {user?.role === 'seller' && (
          <>
            <Link to="/seller/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
            <Link to="/seller/products" className="text-gray-700 hover:text-blue-600">My Products</Link>
          </>
        )}

        {user?.role === 'admin' && (
          <>
            <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600">Admin</Link>
            <Link to="/admin/users" className="text-gray-700 hover:text-blue-600">Users</Link>
          </>
        )}

        {/* 👤 Avatar */}
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex items-center gap-2 text-sm font-medium focus:outline-none"
          >
            <img
              src={user?.avatar || '/default-avatar.png'}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border"
            />
            <FiChevronDown className="text-gray-500" />
          </button>

          {/* 🔽 Dropdown */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-20">
              <button
                onClick={goToProfile}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
              >
                <FiUser /> Profile
              </button>
              <LogoutButton />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
