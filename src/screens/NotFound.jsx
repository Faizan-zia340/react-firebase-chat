import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
            <h1 className="text-9xl font-bold">404</h1>
            <p className="text-2xl mt-4 mb-8">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/home" className="text-lg text-white bg-blue-700 hover:text-blue-300">
                Go back to Home
            </Link>
        </div>
    );
}

export default NotFound;
