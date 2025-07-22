import { NavLink } from 'react-router-dom';
import { sidebarConfig } from './sidebarConfig';
import { useAppSelector } from '../../../hooks/useReduxTypedHooks';

const Sidebar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role || 'user'; // fallback role

  const links = sidebarConfig[role] || [];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-xl px-5 py-6">
      {/* Title */}
      <h2 className="text-xl font-bold text-indigo-600 mb-8 tracking-wide">📂 Navigation</h2>

      {/* Navigation Links */}
      <nav className="space-y-2">
        {links.map(({ label, icon, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-[15px] font-medium transition-all duration-200
              ${
                isActive
                  ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
              }`
            }
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
