import React from 'react'

import { Outlet } from '@tanstack/react-router'
import Navbar from './components/NavBar'

const RootLayout = () => {
  return (
    <div className="bg-gray-900">
      <Navbar/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default RootLayout