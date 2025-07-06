// src/features/auth/components/LogoutButton.tsx

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useReduxTypedHooks';
import { logout } from '../authSlice';
import { Button } from '../../../components/ui/Button';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); 
    // If you want to go to landing page instead of login:
    // navigate('/');
  };

  return (
    <Button
      onClick={handleLogout}
      variant="text"
      icon={<LogOut size={16} />}
      className="w-full justify-start px-4 py-2 text-red-600 hover:bg-red-50"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
