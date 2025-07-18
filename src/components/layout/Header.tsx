import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiChevronDown } from 'react-icons/fi';
import { useState } from 'react';
import LogoutButton from '../../features/auth/components/LogoutButton';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user, role, isAuthenticated } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu(prev => !prev);
  const goToProfile = () => {
    setShowMenu(false);
    navigate(`/${role}/profile`);
  };

  return (
    <header className="bg-white shadow-lg px-8 py-4 flex justify-between items-center z-50">
      {/* 🔷 Logo */}
      <Link to="/" className="text-3xl font-semibold text-indigo-600 hover:opacity-90 transition-all">
        🛒 Nilson
      </Link>


      {/* 🔗 Navigation */}
      <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
        {role === 'user' && (
          <>
            <Link to="/user/home" className="hover:text-indigo-600 transition-colors">Home</Link>
            <Link to="/user/orders" className="hover:text-indigo-600 transition-colors">Orders</Link>
          </>
        )}

        {role === 'seller' && (
          <>
            <Link to="/seller/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
            <Link to="/seller/products" className="hover:text-indigo-600 transition-colors">My Products</Link>
          </>
        )}

        {role === 'admin' && (
          <>
            <Link to="/admin/dashboard" className="hover:text-indigo-600 transition-colors">Admin</Link>
            <Link to="/admin/users" className="hover:text-indigo-600 transition-colors">Users</Link>
          </>
        )}

        {role === 'guest' && (
          <>
            <Link to="/login" className="hover:text-indigo-600 transition-colors">Login</Link>
            <Link to="/register" className="hover:text-indigo-600 transition-colors">Register</Link>
          </>
        )}

        {/* 👤 Avatar */}
        {isAuthenticated && (
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 group"
            >
              <img
                src={user?.avatar || '/default-avatar.png'}
                onError={(e) => e.currentTarget.src = '/default-avatar.png'}
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover border-2 border-indigo-200 transition-transform group-hover:scale-105"
              />
              <FiChevronDown className="text-gray-500 group-hover:text-indigo-500 transition-colors" />
            </button>

            {/* Dropdown */}
            {showMenu && (
              <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
                <button
                  onClick={goToProfile}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
                >
                  <FiUser /> Profile
                </button>
                <LogoutButton />
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
