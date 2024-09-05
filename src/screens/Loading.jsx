import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Loading = () => {
 const navigate = useNavigate()
useEffect(()=>{
    checkUser()
},[])

const checkUser = async () => {
    const userId = await localStorage.getItem('userId');
   
        if (userId !== null) navigate("/home")
            else navigate("/login")
          }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <svg
                    className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 24c-4.418 0-8-3.582-8-8h-4c0 6.627 5.373 12 12 12v-4z"
                    ></path>
                </svg>
                <p className="text-lg text-gray-700">Loading, please wait...</p>
            </div>
        </div>
    );
};

export default Loading;
