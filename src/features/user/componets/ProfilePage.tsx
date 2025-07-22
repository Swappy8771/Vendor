import { useAppSelector } from '../../../hooks/useReduxTypedHooks';
import { Navigate } from 'react-router-dom';
import UpdateProfileForm from './ProfileForm';

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className=" bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-4">
      <div className=" mx-auto bg-white shadow-xl rounded-xl p-8 border border-blue-100">
        <div className="mb-6 border-b border-gray-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Your Profile</h1>
            <p className="text-sm text-gray-500 mt-1">
              You are logged in as <span className="font-semibold text-blue-700">{user.role}</span>
            </p>
          </div>
        </div>

        <UpdateProfileForm user={user} />
      </div>
    </div>
  );
}
