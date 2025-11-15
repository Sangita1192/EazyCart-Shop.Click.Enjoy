import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Components/NavBar/Header'
import SideBar from './Components/NavBar/SideBar';
import Footer from './Components/Footer/Footer';
import { useDispatch} from 'react-redux';
import { loadUserFromCookies } from './redux/slices/authSlice';
import { fetchActiveCategories } from './redux/slices/categorySlice';


export default function App() {
  const [isSideBarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("EazyCartUser");
    if (isUserLoggedIn) {
      dispatch(loadUserFromCookies());
    }
    dispatch(fetchActiveCategories());
  }, [dispatch]);


  const isNotFoundPage = location.pathname === '/404' || location.pathname === '*' || location.pathname.includes('/404');
  const hideLayout = location.pathname == '/payment-success' || !isNotFoundPage;

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout  && (
        <>
          <Header isSideBarOpen={isSideBarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <SideBar isSideBarOpen={isSideBarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </>
      )}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
    </div>
  )
}
