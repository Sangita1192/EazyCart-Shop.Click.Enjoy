import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from './Components/NavBar/Header'
import SideBar from './Components/NavBar/SideBar';
import Footer from './Components/Footer/Footer';


export default function App() {
  const [isSideBarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <Header isSideBarOpen={isSideBarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
      <SideBar isSideBarOpen={isSideBarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* <Footer /> */}
      <Footer/>
    </div>
  )
}
