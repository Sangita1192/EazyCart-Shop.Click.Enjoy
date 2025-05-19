import React, { useState } from 'react'
import ChangePassword from './ChangePassword';
import { Button } from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const Profile = () => {
    const [phone, setPhone] = useState();
    const [showChangePass, setShowChangePass] = useState(false);
    return (
        <>
            <div>
                <div className='w-full flex justify-between'>
                    <h1 className='text-2xl font-bold'>My Profile</h1>
                    <Button className='!text-amber-600 hover:!bg-amber-600 hover:!text-white !flex !gap-[5px]' onClick={() => setShowChangePass(!showChangePass)}>
                        <span> Change Password </span>
                    </Button>
                </div>
                <div className='w-full mt-[20px]'>
                    <div className='md:grid grid-cols-2 gap-[25px]'>
                        <div className='mb-[15px] flex flex-col'>
                            <label htmlFor="Name">Full Name</label>
                            <input type="text" id="name" name='name' className='bg-gray-100/70 rounded-md p-[10px] focus:outline-none focus:border focus:border-amber-600' />
                        </div>
                        <div className='mb-[15px] flex flex-col'>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name='email' className='bg-gray-100/70 rounded-md p-[10px] focus:outline-none focus:border focus:border-amber-600' />
                        </div>
                        <div className='mb-[15px] flex flex-col'>
                            <label htmlFor="Phone">Phone</label>
                            <PhoneInput
                                className='bg-gray-100/70 rounded-md p-[10px] !h-full focus:!outline-none'
                                international
                                defaultCountry="CA"
                                countryCallingCodeEditable={false}
                                value={phone}
                                onChange={setPhone} />
                        </div>
                    </div>

                    <Button className='!mt-[30px] !bg-amber-600 !text-white hover:!bg-amber-700 !flex !gap-[5px] !w-[180px]'>
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

export default Profile