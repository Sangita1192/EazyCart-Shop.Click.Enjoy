import React from 'react'
import { FaRegHeart, FaUser } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { FiLogOut } from 'react-icons/fi'
import { IoBagAdd } from 'react-icons/io5'
import { NavLink} from 'react-router-dom'

const ProfileSidebar = ({user}) => {
    const activeLink = ({ isActive }) =>
        `flex gap-2 items-center px-4 py-3 cursor-pointer border-l-4 ${isActive ? 'border-amber-600' : 'border-none'
        }`;

return (
    <>
        <div className='rounded-lg w-[80%] w-[200px] lg:w-[280px]'>
            <div className='flex flex-col gap-2 justify-center items-center py-4 bg-white px-6'>
                <img src={user.profilePicture || "/fallbackUser.webp"} alt="profile picture" className='w-[100px] h-[100px] rounded-full object-fit-contain' />
                <div className='text-center'>
                    <h6 className='font-semibold capitalize'>{user.name}</h6>
                    <p>{user.email}</p>
                </div>
            </div>
            <div className='bg-gray-200/70'>
                <NavLink to="/my-account" end className={activeLink}>
                    <FaUser />
                    <span>My Profile</span>
                </NavLink>
                <NavLink to="/my-account/address" className={activeLink}>
                    <FaLocationDot />
                    <span>Address</span>
                </NavLink>
                <NavLink to="/my-account/wishlist" className={activeLink}>
                    <FaRegHeart />
                    <span>My Wishlist</span>
                </NavLink>
                <NavLink to="/my-account/orders" className={activeLink}>
                    <IoBagAdd />
                    <span>My Orders</span>
                </NavLink>
            </div>

        </div>
    </>
)
}

export default ProfileSidebar