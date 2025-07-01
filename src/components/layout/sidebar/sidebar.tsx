// src/components/shared/Sidebar/Sidebar.tsx

import { NavLink } from 'react-router-dom';
import { sidebarConfig } from './sidebarConfig';
import { useAppSelector } from '../../../hooks/useReduxTypedHooks';

const Sidebar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role || 'user'; // fallback

  const links = sidebarConfig[role] || [];

  return (
    <aside className="w-64 min-h-screen bg-white border-r p-4 shadow-sm">
      <div className="text-xl font-bold mb-6">🛒 Shoply</div>

      <nav className="flex flex-col gap-2">
        {links.map(({ label, icon, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium 
              ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`
            }
          >
            <span>{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
