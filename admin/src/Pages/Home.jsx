import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import { useState } from "react";
import { SideBar } from "../Components/SideBar";

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="flex flex-col h-screen">
      <Header setShowSidebar={setShowSidebar} />
      <div className="flex flex-1 overflow-hidden relative bg-[#EBE9E9]">
        <div
          className={`
            bg-[#f1f1f1] transition-all duration-300 z-40 overflow-y-auto
            ${showSidebar ? "block" : "hidden"} lg:static fixed 
          `}
        >
          <SideBar />
        </div>
        <main className="flex-1 overflow-y-auto p-4 bg-[#f9f9f9]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Home;
