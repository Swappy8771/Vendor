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
    setIsEditing(false); // turn off edit mode
  };

  const handleCancel = () => {
    setName(user.name);
    setPhone(user.phone || '');
    setIsEditing(false);
  };

  return (
    <div className="bg-white max-w-md mx-auto p-6 rounded-xl shadow-md mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
        {!isEditing && (
          <Button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className={`w-full px-4 py-2 border rounded-md ${
              isEditing ? 'bg-white' : 'bg-gray-100'
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            className={`w-full px-4 py-2 border rounded-md ${
              isEditing ? 'bg-white' : 'bg-gray-100'
            }`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email (read-only)</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
            value={user.email}
            disabled
          />
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
              Save
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
