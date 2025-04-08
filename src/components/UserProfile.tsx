import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useStore } from '../store/useStore';

export const UserProfile = () => {
  const { user, setUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    postpartumDate: user?.postpartumDate || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUser({
      ...user,
      ...formData,
    });
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Postpartum Date
            </label>
            <input
              type="date"
              value={formData.postpartumDate}
              onChange={(e) =>
                setFormData({ ...formData, postpartumDate: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <User className="w-8 h-8 text-purple-600" />
            <div>
              <h2 className="text-lg font-semibold">{user.name || 'Anonymous'}</h2>
              <p className="text-sm text-gray-600">
                {user.postpartumDate
                  ? `Postpartum since: ${new Date(
                      user.postpartumDate
                    ).toLocaleDateString()}`
                  : 'Postpartum date not set'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-100 rounded-full hover:bg-purple-200"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};