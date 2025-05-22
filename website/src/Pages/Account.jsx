import React from 'react'
import ProfileSidebar from '../Components/Account/ProfileSidebar'
import { Outlet } from 'react-router-dom'

const Account = () => {
  return (
    <>
    <div className='py-8 xl:w-[85%] lg:w-[90%] sm:w-[95%] w-[98%] m-auto md:flex gap-[15px] items-start '>
        <div className='shadow-md rounded-lg border-gray-800 hidden md:block'>
            <ProfileSidebar/>
        </div>
        <div className='shadow-md rounded-md border-gray-800 p-4 flex-1 bg-white min-w-0'>
            <Outlet/>
        </div>
    </div>
    </>
  )
}

export default Account