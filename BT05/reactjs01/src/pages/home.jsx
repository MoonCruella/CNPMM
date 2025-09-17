import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/context/auth.context";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="w-full h-screen">
      {/* Hero Section */}
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-green-600 via-emerald-600 to-green-800 text-white">
        <div className="text-center px-6 lg:px-12">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              User Management System
            </span>
          </h1>

          <div className="flex flex-wrap gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-200"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                to="/user"
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Manage Users
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
