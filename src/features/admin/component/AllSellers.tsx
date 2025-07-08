// src/features/admin/components/AllSellers.tsx

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxTypedHooks';
import { getAllSellers, verifySeller } from '../adminAPI';
import { setError, setLoading } from '../adminSlice';
import type { User } from '../../user/userTypes';

export default function AllSellers() {
  const dispatch = useAppDispatch();
  const { sellers, loading, error } = useAppSelector((state) => state.admin);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        dispatch(setLoading(true));
        const response: User[] = await getAllSellers();
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

      dispatch({
        type: 'admin/fetchSellers/fulfilled',
        payload: updatedSellers,
      });
    } catch (err: any) {
      dispatch(setError(err.message || 'Failed to verify seller'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const verified = sellers.filter((s) => s.sellerInfo?.verified);
  const unverified = sellers.filter((s) => !s.sellerInfo?.verified);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">🛍️ Sellers Management</h2>

      {loading && <p className="text-gray-500">Loading sellers...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* ✅ Verified Sellers */}
      <section className="mb-8">
        <h3 className="text-lg font-bold mb-2 text-green-600">✅ Verified Sellers</h3>
        <SellerTable sellers={verified} showVerifyButton={false} onVerify={handleVerify} />
      </section>

      {/* ❌ Unverified Sellers */}
      <section>
        <h3 className="text-lg font-bold mb-2 text-yellow-600">❌ Unverified Sellers</h3>
        <SellerTable sellers={unverified} showVerifyButton={true} onVerify={handleVerify} />
      </section>
    </div>
  );
}

function SellerTable({
  sellers,
  showVerifyButton,
  onVerify,
}: {
  sellers: User[];
  showVerifyButton: boolean;
  onVerify: (id: string) => void;
}) {
  if (sellers.length === 0) {
    return <p className="text-gray-500">No sellers found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 border">Name</th>
            <th className="px-3 py-2 border">Email</th>
            <th className="px-3 py-2 border">Verified</th>
            <th className="px-3 py-2 border">Joined</th>
            {showVerifyButton && <th className="px-3 py-2 border">Action</th>}
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller._id} className="text-center hover:bg-gray-50 transition">
              <td className="px-3 py-2 border">{seller.name}</td>
              <td className="px-3 py-2 border">{seller.email}</td>
              <td className="px-3 py-2 border">
                {seller.sellerInfo?.verified ? '✅' : '❌'}
              </td>
              <td className="px-3 py-2 border">
                {seller.createdAt
                  ? new Date(seller.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : '—'}
              </td>
              {showVerifyButton && (
                <td className="px-3 py-2 border">
                  <button
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => onVerify(seller._id)}
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
