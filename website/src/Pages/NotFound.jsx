import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2">Sorry, the page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="mt-4 inline-block bg-blue-600 text-white py-2 px-6 rounded-md text-lg hover:bg-blue-700">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
