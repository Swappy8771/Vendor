import { useAppSelector } from './useReduxTypedHooks';

export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth); // Adjust if your slice is named differently

  return {
    user: auth.user,
    role: auth.user?.role || 'guest', // fallback role if unauthenticated
    isAuthenticated: !!auth.user,
  };
};
