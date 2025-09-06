import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import {useDispatch, useSelector} from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    console.log(auth)

    const handleSubmit = async () => {
        // Validate required fields
        if (!email.trim() || !password.trim()) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await loginUser(password, email);
            dispatch(login(data.user))
            navigate({to:"/dashboard"})
            setLoading(false);
            console.log("signin success")
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-2xl rounded-xl px-8 py-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Login
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 rounded-md text-center">
                        {error}
                    </div>
                )}

                <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 text-white bg-gray-900/50 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        id="email"
                        type="email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 text-white bg-gray-900/50 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        id="password"
                        type="password"
                        placeholder="**************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex items-center justify-center mt-8">
                    <button
                        className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-5 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </div>

                <div className="text-center mt-6">
                    <p className="cursor-pointer text-sm text-gray-400">
                        Don't have an account? <span onClick={() => state(false)} className="font-semibold text-blue-400 hover:text-blue-300">Register</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;