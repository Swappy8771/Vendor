// src/hooks/useAuth.ts
import { useAppSelector } from './useReduxTypedHooks';

export const useAuth = () => {
  const auth = useAppSelector(state => state.auth);

  return {
    user: auth.user,
    role: auth.user?.role || 'guest',
    isAuthenticated: !!auth.user,
  };
};
