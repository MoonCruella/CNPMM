import React from "react";
import { useAuth } from "../context/auth.context";
import defaultAvatar from "../../assets/image.png";
const UserTable = ({
  users,
  isAuthenticated,
  canEditUser,
  onEdit,
  onDelete,
  onToggleStatus,
  onChangeRole,
}) => {
  const { user: currentUser } = useAuth();
  const isAdmin = currentUser?.role === "admin";

  if (!Array.isArray(users) || users.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="flex flex-col items-center">
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-6a2 2 0 00-2 2v3a2 2 0 01-2 2H8a2 2 0 01-2-2v-3a2 2 0 00-2-2H4"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No users found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      </div>
    );
  }

  // Badge cho role
  const getRoleBadge = (role) => {
    const isAdminRole = role === "admin";
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          isAdminRole
            ? "bg-blue-100 text-blue-800"
            : "bg-purple-100 text-green-800"
        }`}
      >
        {isAdminRole ? "Admin" : "User"}
      </span>
    );
  };

  // Badge cho status
  const getStatusBadge = (isActive) => {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          isActive
            ? "bg-cyan-100 text-cyan-800"
            : "bg-orange-100 text-orange-800"
        }`}
      >
        {isActive ? " Active" : " Inactive"}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            {isAuthenticated && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr
              key={user._id}
              className={`hover:bg-gray-50 transition-colors ${
                user.isActive === false ? "opacity-60" : ""
              }`}
            >
              {/* User Info */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    {/* Avatar image thay vì chữ */}
                    <img
                      src={defaultAvatar}
                      alt="avatar"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {user.username || "Unknown"}
                    </div>
                    <div className="text-sm text-gray-500">ID: {user._id}</div>
                  </div>
                </div>
              </td>

              {/* Email */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {user.email || "No email"}
                </div>
              </td>

              {/* Role */}
              <td className="px-6 py-4 whitespace-nowrap">
                {getRoleBadge(user.role)}
              </td>

              {/* Status */}
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(user.isActive !== false)}
              </td>

              {/* Created At */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Unknown"}
                </div>
              </td>

              {/* Actions */}
              {isAuthenticated && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2 flex-wrap">
                    {/* Edit */}
                    {canEditUser(user) && (
                      <button
                        onClick={() => onEdit(user)}
                        className="inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded text-green-700 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                        title="Edit User"
                      >
                        Edit
                      </button>
                    )}

                    {/* Delete */}
                    {isAdmin && user._id !== currentUser._id && (
                      <button
                        onClick={() => onDelete(user._id)}
                        className="inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded text-rose-700 bg-rose-100 hover:bg-rose-200 transition-colors"
                        title="Delete User"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
