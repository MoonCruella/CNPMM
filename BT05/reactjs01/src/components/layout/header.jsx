import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                MunApp
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4 lg:space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-green-600 px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 hover:bg-green-50"
            >
              Home
            </Link>
            <Link
              to="/users"
              className="text-gray-700 hover:text-green-600 px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 hover:bg-green-50"
            >
              Users
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3 lg:space-x-6">
                <div className="flex items-center space-x-2 lg:space-x-3 bg-green-50 px-3 lg:px-4 py-2 rounded-lg">
                  <div className="hidden sm:flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs lg:text-sm font-semibold text-gray-800">
                        {user?.username}
                      </span>
                      {user?.role === "admin" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Admin
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{user?.email}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-4 lg:px-6 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 lg:space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-600 px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 hover:bg-green-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 lg:px-6 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
