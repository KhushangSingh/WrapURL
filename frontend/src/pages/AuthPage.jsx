import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {
    const [login, setLogin] = useState(true)

    return (
        <div className="flex items-center justify-center p-4" style={{ minHeight: 'calc(100vh - 5rem)' }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-6xl">
                <div className="text-center lg:text-left">
                    {login ? (
                        <>
                            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">Welcome Back!</h1>
                            <p className="text-lg text-gray-300">Log in to access your shortened URLs and manage your links.</p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">Join Us!</h1>
                            <p className="text-lg text-gray-300 mb-6">Register to unlock powerful features:</p>
                            <ul className="space-y-3 text-left inline-block">
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span className=" text-blue-400">Create custom, memorable short URLs.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span className=" text-blue-400">Access and manage all your previously created links.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span className=" text-blue-400">Track click analytics for your URLs.</span>
                                </li>
                            </ul>
                        </>
                    )}
                </div>
                <div className="relative z-10 w-full">
                    {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
                </div>
            </div>
        </div>
    )
}

export default AuthPage