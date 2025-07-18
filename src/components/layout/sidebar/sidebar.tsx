import { NavLink } from 'react-router-dom';
import { sidebarConfig } from './sidebarConfig';
import { useAppSelector } from '../../../hooks/useReduxTypedHooks';

const Sidebar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role || 'user'; // fallback role

  const links = sidebarConfig[role] || [];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-md px-4 py-6">
      <h2 className="text-lg font-semibold text-indigo-600 mb-6 px-2">📂 Navigation</h2>

      <nav className="flex flex-col gap-2">
        {links.map(({ label, icon, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all
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
