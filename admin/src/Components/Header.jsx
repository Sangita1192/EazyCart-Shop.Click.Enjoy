import Button from "@mui/material/Button";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdManageAccounts } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaExpeditedssl } from "react-icons/fa";
import userProfile from "./../../public/Images/profile.jpg";
import logo from "/Images/logo.png";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { GlobalContext } from "../context/GlobalContext";

const Header = ({ setShowSidebar }) => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const { handleLogout } = useContext(GlobalContext);

  if (loading) return null;

  return (
    <div className="w-full py-2 shadow-md flex items-center justify-between px-4 bg-white z-10 relative">
      <div className="flex gap-2 items-center">
        <Button
          className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px]"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          <HiMenuAlt1 size={28} className="text-[dimgray]" />
        </Button>
        <img src={logo} alt="logo" className="w-[160px] sm:w-[210px] h-auto" />
      </div>

      {user && (
        <div className="flex items-center gap-4 relative">
          {user.email && (
            <p className="hidden sm:block text-sm font-medium text-gray-700">
              {user.email}
            </p>
          )}

          <img
            src={userProfile}
            alt="user_profile"
            onClick={() => setDropdown(!dropdown)}
            className="h-[35px] w-[35px] rounded-full cursor-pointer object-cover"
          />

          <ul
            className={`w-[200px] absolute top-[48px] right-0 bg-white shadow-lg rounded-md border border-gray-200 
              transition-all duration-200 ease-out
              ${dropdown ? "opacity-100 visible" : "opacity-0 invisible"}
            `}
          >
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">
              <Link to="/profile" className="flex items-center gap-3">
                <MdManageAccounts size={20} />
                My Account
              </Link>
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b flex items-center gap-3">
              <FaExpeditedssl size={20} />
              Reset Password
            </li>

            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
              onClick={() => {
                handleLogout();
                navigate("/login");
              }}

            >
              <FiLogOut size={20} />
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
