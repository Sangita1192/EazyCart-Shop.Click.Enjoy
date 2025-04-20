import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { MdOutlineDashboard, MdLogout, MdCategory } from "react-icons/md";
import { TbSlideshow } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiUsers } from "react-icons/hi2";
import { FaBagShopping, FaProductHunt } from "react-icons/fa6";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";

export const SideBar = () => {
    const [bannerShow, setBannerShow] = useState(false);
    const [productShow, setProductShow] = useState(false);
    const [categoryShow, setCategoryShow] = useState(false);

    return (
        <>
            <div className={`h-screen w-full p-4`}>
                <ul>
                    <li className="px-2 text-start border-b-1 border-b-slate-200">
                        <Link to="/">
                            <Button className="!py-[15px] w-full !capitalize  flex !justify-start items-center gap-2">
                                <MdOutlineDashboard size={22} className="text-[royalblue]" /> Dashboard
                            </Button>
                        </Link>
                    </li>
                    <li className="px-2 text-start border-b-1 border-b-slate-200">

                        <Button className="!py-[15px] w-full !capitalize  flex !justify-between items-center" onClick={() => setBannerShow(!bannerShow)}>
                            <div className="flex items-center gap-3">
                                <TbSlideshow size={22} />
                                Home Banner Slide
                            </div>
                            <IoMdArrowDropdown />
                        </Button>
                        <ul className={`w-[90%] ml-auto  transition-all ease-in-out duration-400 ${bannerShow ? "opacity-100 max-h-[1000px] pointer-events-auto" : "opacity-0 max-h-0 pointer-events-none"}`}>
                            <li>
                                <Link to="/banner/add">
                                    <Button className="!py-[10px] w-full !capitalize !text-[dimgray] flex !justify-start items-center gap-3">
                                        Add Banner Slide
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/banner/view">
                                    <Button className="!py-[10px]  w-full !capitalize !text-[dimgray]  flex !justify-start items-center gap-3">
                                        View Banner Slide List
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="px-2 text-start border-b-1 border-b-slate-200">
                        <Link to="/users">
                            <Button className="!py-[15px] w-full !capitalize  flex !justify-between items-center" onClick={() => setBannerShow(!bannerShow)}>
                                <div className="flex items-center gap-3">
                                    <HiUsers size={22} />
                                    Users
                                </div>
                            </Button>
                        </Link>
                    </li>
                    <li className="px-2 text-start border-b-1 border-b-slate-200">
                        <Button className="!py-[15px] w-full !capitalize  flex !justify-between items-center" onClick={() => setProductShow(!productShow)}>
                            <div className="flex items-center gap-3">
                                <FaProductHunt size={22} />
                                Products
                            </div>
                            <IoMdArrowDropdown />
                        </Button>
                        <ul className={`w-[90%] ml-auto text-[gray] transition-all ease-in-out duration-400 ${productShow ? "opacity-100 max-h-[1000px] pointer-events-auto" : "opacity-0 max-h-0 pointer-events-none"}`}>
                            <li>
                                <Button className="!py-[10px] !text-[dimgray] w-full !capitalize  flex !justify-start items-center gap-3">
                                    Add Products
                                </Button>
                            </li>
                            <li>
                                <Button className="!py-[10px] !text-[dimgray]  w-full !capitalize  flex !justify-start items-center gap-3">
                                    View Products List
                                </Button>
                            </li>
                        </ul>
                    </li>
                    <li className="px-2 text-start border-b-1 border-b-slate-200">
                        <Button className="!py-[15px] w-full !capitalize  flex !justify-between items-center" onClick={() => setCategoryShow(!categoryShow)}>
                            <div className="flex items-center gap-3">
                                <MdCategory size={22} />
                                Category
                            </div>
                            <IoMdArrowDropdown />
                        </Button>
                        <ul className={`w-[90%] ml-auto text-[gray] transition-all ease-in-out duration-400 ${categoryShow ? "opacity-100 max-h-[1000px] pointer-events-auto" : "opacity-0 max-h-0 pointer-events-none"}`}>
                            <li>
                                <Button className="!py-[10px] !text-[dimgray] w-full !capitalize  flex !justify-start items-center gap-3">
                                    Add Category
                                </Button>
                            </li>
                            <li>
                                <Button className="!py-[10px] !text-[dimgray]  w-full !capitalize  flex !justify-start items-center gap-3">
                                    View Category List
                                </Button>
                            </li>
                            <li>
                                <Button className="!py-[10px] !text-[dimgray] w-full !capitalize  flex !justify-start items-center gap-3">
                                    Add SubCategory
                                </Button>
                            </li>
                            <li>
                                <Button className="!py-[10px] !text-[dimgray]  w-full !capitalize  flex !justify-start items-center gap-3">
                                    View SubCategory List
                                </Button>
                            </li>
                        </ul>
                    </li>
                    <li className="px-2 text-start border-b-1 border-b-slate-200">
                        <Button className="!py-[15px] w-full !capitalize  flex !justify-between items-center">
                            <div className="flex items-center gap-3">
                                <FaBagShopping size={22} />
                                Orders
                            </div>
                        </Button>
                    </li>
                    <li className="px-2 text-start border-b-1 border-b-slate-200">
                        <Button className="!py-[15px] w-full !capitalize  flex !justify-between items-center" >
                            <div className="flex items-center gap-3">
                                <FiLogOut size={22} />
                                Logout
                            </div>
                        </Button>
                    </li>
                </ul>

            </div >

        </>
    )
} 