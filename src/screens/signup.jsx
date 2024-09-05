
import React, { useState } from 'react';
import { doc } from 'firebase/firestore'; 
import { db,auth } from '../database/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const Signup = () => {
    const [fullName, setFullName] = useState('a');
    const [email, setEmail] = useState('s');
    const [password, setPassword] = useState('v');
 

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Full Name:', fullName, 'Email:', email, 'Password:', password);
      
        createUserWithEmailAndPassword(auth, email, password)
  .then((response) => {
    // Signed up 
    const user = response.user;
    alert(response.user)
  })
  .catch((error) => {
    // const errorCode = error.code;
    const errorMessage =  error.message;
    alert(error.message)
  });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                       Full Name
                        </label>
                        <input
                            type="text"
                        
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                        
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"

                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                        onClick={handleSubmit}
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-600  text-sm mt-6">
                Already have an account?<a href="/login" className="text-blue-500 hover:text-blue-700">log in</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
