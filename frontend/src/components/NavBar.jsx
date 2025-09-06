import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '../store/slice/authSlice';
import { logoutUser } from '../api/user.api';
import logoImage from '../public/favicon.png';

const UserCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white group-hover:text-[#5679FF] transition-colors duration-200" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
  </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      // Call logout API
      await logoutUser();
      // Clear React Query cache
      queryClient.clear();
      // Dispatch logout action to clear auth state
      dispatch(logout());
      // Close sidebar
      toggleSidebar();
      // Redirect to home page
      navigate({ to: '/' });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API fails, clear everything and redirect
      queryClient.clear();
      dispatch(logout());
      toggleSidebar();
      navigate({ to: '/' });
    }
  };

  return (
    <>
      <header className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-700 shadow-lg sticky top-0 z-10 h-20">
        <nav className="mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center">
              <img src={logoImage} alt="WarpURL logo" className="h-12 w-auto mr-3"/>
              <a href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight">
                WarpURL
              </a>
            </div>
            
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar} 
                className="group p-2 rounded-full hover:bg-gray-700/50 transition-colors"
                aria-label="Open user menu"
              >
                <UserCircleIcon/>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ease-in-out ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
        aria-hidden="true"
      ></div>

      <aside 
        className={`fixed top-0 right-0 h-full w-72 bg-gray-900/90 backdrop-blur-lg border-l border-gray-700 shadow-2xl z-30 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Profile</h2>
                <button onClick={toggleSidebar} className="p-2 rounded-full text-gray-400 hover:bg-gray-700/50 hover:text-white transition-colors">
                    <CloseIcon />
                </button>
            </div>

            <div className="flex-grow p-4">
                {/* You can add more profile-related links or info here */}
            </div>

            <div className="p-4 border-t border-gray-700">
                <div className="flex justify-center">
                  <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center bg-red-600/50 hover:bg-red-600/80 border border-red-500/50 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500"
                  >
                      <LogoutIcon />
                      Logout
                  </button>
                </div>
            </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;

