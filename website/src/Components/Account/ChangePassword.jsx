import { Button } from '@mui/material'
import React from 'react'

const ChangePassword = () => {
    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 lg:w-[80%] w-full">
                <div className='w-full mt-[20px]'>
                    <div className='md:grid grid-cols-2 gap-[25px]'>
                        <div className='mb-[15px] flex flex-col'>
                            <label htmlFor="Old password">Old Password</label>
                            <input type="text" id="password" name='password' className='bg-gray-100/70 rounded-md p-[10px] focus:outline-none focus:border focus:border-amber-600' placeholder='Old Password' />
                        </div>
                        <div className='mb-[15px] flex flex-col'>
                            <label htmlFor="new_password">New Password</label>
                            <input type="text" id="new_password" name='new_password' className='bg-gray-100/70 rounded-md p-[10px] focus:outline-none focus:border focus:border-amber-600' placeholder='New Password' />
                        </div>
                        <div className='mb-[15px] flex flex-col'>
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input type="text" id="confirm_password" name='confirm_password' className='bg-gray-100/70 rounded-md p-[10px] focus:outline-none focus:border focus:border-amber-600' placeholder="Confirm password" />
                        </div>
                    </div>


                    <Button className='!mt-[30px] !bg-amber-600 !text-white hover:!bg-amber-700 !flex !gap-[5px] w-[180px]'>
                        Submit
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ChangePassword