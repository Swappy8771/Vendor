// src/features/admin/components/AllUsers.tsx

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxTypedHooks';
import { getAllUsers } from '../adminAPI';
import { setUsers, setLoading, setError } from '../adminSlice';
import type { User } from '../../user/userTypes'; // Global User type

const AllUsers = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.admin);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch(setLoading(true));
        const response: User[] = await getAllUsers();

        if (!Array.isArray(response)) {
          throw new Error('Invalid response format');
        }

        dispatch(setUsers(response));
      } catch (err: any) {
        dispatch(setError(err.message || 'Failed to fetch users'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUsers();
  }, [dispatch]);

  return (
    <section className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">👥 All Users</h2>

      {loading && <p className="text-gray-500">Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && users.length === 0 && <p>No users found.</p>}

      {!loading && users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">Name</th>
                <th className="px-3 py-2 border">Email</th>
                <th className="px-3 py-2 border">Role</th>
                <th className="px-3 py-2 border">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserRow key={user._id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

const UserRow = ({ user }: { user: User }) => {
  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '—';

  return (
    <tr className="text-center hover:bg-gray-50 transition">
      <td className="px-3 py-2 border">{user.name}</td>
      <td className="px-3 py-2 border">{user.email}</td>
      <td className="px-3 py-2 border capitalize">{user.role}</td>
      <td className="px-3 py-2 border">{formattedDate}</td>
    </tr>
  );
};

export default AllUsers;
