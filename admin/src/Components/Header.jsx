import Button from "@mui/material/Button";
import { HiMenuAlt1 } from "react-icons/hi";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaExpeditedssl } from "react-icons/fa";
import Badge from "@mui/material/Badge";
import user from "./../../public/Images/profile.jpg";
import logo from "./../../public/Images/logo.png";
import { useState } from "react";

const Header = ({ setShowSidebar }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="w-full py-2 shadow-md flex items-center justify-between px-4 bg-white z-10 relative">
      <div className="flex gap-2 items-center ">
      <img src={logo} alt="logo" className="w-[210px] h-[60px]"/>
        <Button
          className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px]"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          <HiMenuAlt1 size={28} className="text-[dimgray]" />
        </Button>
      </div>

      <div className="flex items-center gap-[25px]">
        <Badge badgeContent={4} color="primary" className="cursor-pointer">
          <FaRegBell size={24} className="text-[dimgray]" />
        </Badge>

        <FaRegUser size={20} className="text-[dimgray] cursor-pointer" />

        <div className="h-[30px] w-[30px] cursor-pointer rounded-full relative">
          <img
            src={user}
            alt=""
            onClick={() => setDropdown(!dropdown)}
            className="h-full w-full object-contain rounded-full"
          />

          {/* Dropdown */}
          <ul
            className={`w-[200px] absolute top-[110%] right-[-10px] bg-white shadow-md rounded-md z-[99] border border-slate-300 
              transition-all duration-300 ease-in-out transform
              ${
                dropdown
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
          >
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-slate-200 flex items-center gap-[15px]">
              <MdManageAccounts size={20} />
              My Account
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-slate-200 flex items-center gap-[15px]">
              <FaExpeditedssl size={20} />
              Reset Password
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-[15px]">
              <FiLogOut size={20} />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
