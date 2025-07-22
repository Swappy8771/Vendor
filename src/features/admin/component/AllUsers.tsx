import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxTypedHooks';
import { fetchUsers } from '../adminSlice';
import type { User } from '../../user/userTypes';

const USERS_PER_PAGE = 10;

const AllUsers = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.admin);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const startIdx = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = users.slice(startIdx, startIdx + USERS_PER_PAGE);
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  return (
    <section className="p-6 bg-white shadow-md shadow-gray-200 rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 bg-gray-100 py-2 px-4 rounded-md mb-6">
        👥 All Users
      </h2>

      {loading && <p className="text-gray-500">Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && users.length === 0 && <p className="text-gray-600">No users found.</p>}

      {!loading && users.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-md shadow-sm">
            <table className="w-full table-auto text-sm text-left text-gray-700 bg-white">
              <thead className="bg-gray-50 text-gray-700 font-semibold text-sm">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <UserRow key={user._id} user={user} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-600 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
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
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-3">{user.name}</td>
      <td className="px-4 py-3">{user.email}</td>
      <td className="px-4 py-3 capitalize">{user.role}</td>
      <td className="px-4 py-3">{formattedDate}</td>
    </tr>
  );
};

export default AllUsers;
