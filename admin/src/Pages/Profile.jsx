import { Button } from '@mui/material'
import React, { useState } from 'react'
import { TbPasswordUser } from 'react-icons/tb'
import user from "/Images/profile.jpg"
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import ChangePassword from '../Components/ChangePassword';


const Profile = () => {
    const [phone, setPhone] = useState();
    const [showChangePass, setShowChangePass] = useState(false);

    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 lg:w-[70%] w-full">
                <div className='w-full flex justify-between'>
                    <h1 className='text-2xl font-bold'>User Profile</h1>
                    <Button className='!bg-[#F66C2B] hover:!bg-[#E55B1C] !text-white !flex !gap-[5px]' onClick={()=>setShowChangePass(!showChangePass)}>
                        <TbPasswordUser />
                        <span> Change Password </span>
                    </Button>
                </div>
                <div className='w-full mt-[20px]'>
                    <img src={user} alt="" className='w-[200px] h-[200px] rounded-full' />
                    <div className='md:grid grid-cols-2 gap-[25px]'>
                        <div className='mb-[15px] flex flex-col'>
                            <label htmlFor="Name">Name</label>
                            <input type="text" id="name" name='name' className='bg-gray-200 rounded-md p-[10px]' />
                        </div>
                        <div className='mb-[15px] flex flex-col'>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name='email' className='bg-gray-200 rounded-md p-[10px]' />
                        </div>
                        <div className='mb-[15px] flex flex-col'>
                            <label htmlFor="Phone">Phone</label>
                            <PhoneInput
                                className='bg-gray-200 rounded-md p-[10px] !h-full'
                                international
                                defaultCountry="CA"
                                countryCallingCodeEditable={false}
                                value={phone}
                                onChange={setPhone} />
                        </div>
                    </div>

                    <Button className='!mt-[30px] !bg-blue-600 !text-white hover:!bg-blue-800 !flex !gap-[5px] w-full'>
                        Update Profile
                    </Button>
                </div>
            </div>
            {
                showChangePass &&
                <ChangePassword />
            }
            
        </>
    )
}

export default Profile;