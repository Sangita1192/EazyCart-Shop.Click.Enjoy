import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-lg w-full">
        <h1 className="text-7xl font-bold text-red-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-6">Oops! Page Not Found</h2>
        <p className="text-gray-500 mt-4 text-lg">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block text-white bg-blue-600 hover:bg-blue-700 font-semibold text-lg py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Go back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
