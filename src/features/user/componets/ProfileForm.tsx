import { useState } from 'react';
import { useAppDispatch } from '../../../hooks/useReduxTypedHooks';
import { updateProfile } from '../userSlice';
import { Button } from '../../../components/ui/Button';

export default function ProfileForm({ user }: { user: any }) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateProfile({ name, phone }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(user.name);
    setPhone(user.phone || '');
    setIsEditing(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-blue-100 rounded-xl shadow-lg">
      <div className="px-6 py-4 border-b border-blue-200 flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-bold text-blue-800">Profile Information</h2>
        {!isEditing && (
          <Button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded"
          >
            Edit
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md transition ${
              isEditing
                ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                : 'bg-gray-100 text-gray-700 cursor-not-allowed'
            }`}
            placeholder="Enter your name"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md transition ${
              isEditing
                ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                : 'bg-gray-100 text-gray-700 cursor-not-allowed'
            }`}
            placeholder="Enter phone number"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Buttons */}
        {isEditing && (
          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
