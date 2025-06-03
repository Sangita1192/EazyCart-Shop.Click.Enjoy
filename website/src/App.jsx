import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Components/NavBar/Header'
import SideBar from './Components/NavBar/SideBar';
import Footer from './Components/Footer/Footer';
import { useDispatch} from 'react-redux';
import { loadUserFromCookies } from './redux/slices/authSlice';


export default function App() {
  const [isSideBarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("EazyCartUser");
    if (isUserLoggedIn) {
      dispatch(loadUserFromCookies());
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header isSideBarOpen={isSideBarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <SideBar isSideBarOpen={isSideBarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* <Footer /> */}
      <Footer />
    </div>
  )
}
