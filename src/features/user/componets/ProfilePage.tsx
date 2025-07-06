// src/pages/Profile.tsx

import { useAppSelector } from '../../../hooks/useReduxTypedHooks';
import { Navigate } from 'react-router-dom';
import UpdateProfileForm from './ProfileForm'; // Assume this exists

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Update Profile ({user.role})</h2>
      <UpdateProfileForm user={user} />
    </div>
  );
}
