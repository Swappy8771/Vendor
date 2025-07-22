import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxTypedHooks';
import { getAllSellers, verifySeller } from '../adminAPI';
import { setError, setLoading } from '../adminSlice';
import type { AdminSeller } from '../adminType';

export default function AllSellers() {
  const dispatch = useAppDispatch();
  const { sellers, loading, error } = useAppSelector((state) => state.admin);
  const [activeTab, setActiveTab] = useState<'verified' | 'unverified'>('verified');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getAllSellers();
        dispatch({ type: 'admin/fetchSellers/fulfilled', payload: response });
      } catch (err: any) {
        dispatch(setError(err.message || 'Failed to fetch sellers'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchSellers();
  }, [dispatch]);

  const handleVerify = async (sellerId: string) => {
    try {
      dispatch(setLoading(true));
      const updatedSeller = await verifySeller(sellerId);
      const updatedSellers = sellers.map((s) =>
        s._id === updatedSeller._id ? updatedSeller : s
      );
      dispatch({ type: 'admin/fetchSellers/fulfilled', payload: updatedSellers });
    } catch (err: any) {
      dispatch(setError(err.message || 'Failed to verify seller'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const verified = sellers.filter((s) => s.sellerInfo?.verified);
  const unverified = sellers.filter((s) => !s.sellerInfo?.verified);
  const displayedSellers = activeTab === 'verified' ? verified : unverified;

  // Pagination logic
  const totalPages = Math.ceil(displayedSellers.length / itemsPerPage);
  const paginatedSellers = displayedSellers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset to page 1 if tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">🛍️ Sellers Management</h2>

      {loading && <p className="text-gray-500 mb-4">Loading sellers...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('verified')}
          className={`px-4 py-2 font-medium border-b-2 ${
            activeTab === 'verified'
              ? 'text-green-600 border-green-600'
              : 'text-gray-500 border-transparent hover:text-green-600'
          }`}
        >
          ✅ Verified Sellers ({verified.length})
        </button>
        <button
          onClick={() => setActiveTab('unverified')}
          className={`px-4 py-2 font-medium border-b-2 ${
            activeTab === 'unverified'
              ? 'text-yellow-600 border-yellow-600'
              : 'text-gray-500 border-transparent hover:text-yellow-600'
          }`}
        >
          ❌ Unverified Sellers ({unverified.length})
        </button>
      </div>

      {/* Table */}
      <SellerTable
        sellers={paginatedSellers}
        showVerifyButton={activeTab === 'unverified'}
        onVerify={handleVerify}
      />

      {/* Pagination Controls */}
      {displayedSellers.length > itemsPerPage && (
        <div className="mt-6 flex justify-center items-center space-x-2 text-sm">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            ⬅ Prev
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}

function SellerTable({
  sellers,
  showVerifyButton,
  onVerify,
}: {
  sellers: AdminSeller[];
  showVerifyButton: boolean;
  onVerify: (id: string) => void;
}) {
  if (sellers.length === 0) {
    return <p className="text-gray-500 text-sm">No sellers found in this tab.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-md shadow-md bg-white">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-blue-50 text-gray-800 shadow-sm">
          <tr>
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Email</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Joined</th>
            {showVerifyButton && <th className="px-4 py-3 font-semibold text-center">Action</th>}
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller._id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2">{seller.name}</td>
              <td className="px-4 py-2">{seller.email}</td>
              <td className="px-4 py-2">
                {seller.sellerInfo?.verified ? (
                  <span className="text-green-600 font-medium">Verified</span>
                ) : (
                  <span className="text-yellow-600 font-medium">Pending</span>
                )}
              </td>
              <td className="px-4 py-2">
                {seller.createdAt
                  ? new Date(seller.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : '—'}
              </td>
              {showVerifyButton && (
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => onVerify(seller._id)}
                    className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                  >
                    Verify
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
