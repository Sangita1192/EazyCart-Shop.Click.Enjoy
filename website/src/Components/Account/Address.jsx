import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { Button } from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Address = () => {
    const [addAddress, setAddAdress] = useState(false);
    const [addressList, setAddressList] = useState([]);

    return (
        <>
            <div className=' w-full'>
                <Button className="!w-full !flex !justify-center !gap-2 hover:!border !border-blue-400 !rounded-lg !bg-blue-200/40 !py-4 !items-center" onClick={() => !setAddAdress(!addAddress)}>
                    <FaPlus />
                    <span>Add Address</span>
                </Button>
                {
                    (addressList.length > 0) &&
                    <div className='w-full p-2 rounded-md bg-gray-100/50 my-2'>
                        <div className='p-2 flex gap-2 items-start'>
                            <div className='flex-1'>
                                <div className='flex gap-2 items-center'>
                                    <p className='px-2 py-1 bg-gray-200 rounded-md text-gray-600'>Office</p>
                                </div>
                                <div className='mt-1 py-1'>
                                    <div className='flex gap-3 lg:text-md text-sm'>
                                        <p className='font-semibold'>Sangeeta</p>
                                        <span>+1-643-413-9841</span>
                                    </div>
                                    <p>18451 85Ave Surrey, British Columbia, V8B-8Ml</p>
                                </div>
                            </div>
                            <BsThreeDotsVertical />
                        </div>
                    </div>
                }

                {
                    addAddress &&
                    <AddAddress />
                }

            </div>

        </>
    )
}

const AddAddress = () => {
    const [phone, setPhone] = useState();
    return (
        <div className='my-3 pt-3'>
            <h1 className='text-xl font-semibold mb-5'>Add Delivery Address</h1>
            <div className="relative mb-4">
                <input
                    type="text"
                    id="address_line"
                    placeholder=" "
                    className="peer w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
                <label
                    htmlFor="address_line"
                    className="absolute left-3 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-blue-600 bg-white px-1"
                >
                    Address Line
                </label>
            </div>
            <div className="relative mb-4">
                <input
                    type="text"
                    id="city"
                    placeholder=" "
                    className="peer w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
                <label
                    htmlFor="city"
                    className="absolute left-3 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-blue-600 bg-white px-1"
                >
                    City
                </label>
            </div>
            <div className="relative mb-4">
                <input
                    type="text"
                    id="state"
                    placeholder=" "
                    className="peer w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
                <label
                    htmlFor="state"
                    className="absolute left-3 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-blue-600 bg-white px-1"
                >
                    State
                </label>
            </div>
            <div className="relative mb-4">
                <input
                    type="text"
                    id="pincode"
                    placeholder=" "
                    className="peer w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
                <label
                    htmlFor="pincode"
                    className="absolute left-3 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-blue-600 bg-white px-1"
                >
                    Pincode
                </label>
            </div>
            <div className="relative mb-4">
                <input
                    type="text"
                    id="country"
                    placeholder=" "
                    className="peer w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
                <label
                    htmlFor="country"
                    className="absolute left-3 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-blue-600 bg-white px-1"
                >
                    Country
                </label>
            </div>
            <div className='mb-4 flex flex-col'>
                <label htmlFor="Phone" hidden>Phone</label>
                <PhoneInput
                    className='bg-gray-100/70 rounded-md p-[10px] !h-full focus:!outline-none focus:!border-blue-600'
                    international
                    defaultCountry="CA"
                    countryCallingCodeEditable={false}
                    value={phone}
                    onChange={setPhone} />
            </div>
            <div className='mb-4 px-2'>
                <label htmlFor="address_type" className='pb-2 block font-medium'>Address Type</label>
                <div className='flex gap-6 px-3'>
                    <div className='flex gap-2 items-center'>
                        <input type="radio" name="address_type" id="home" value="Home" />
                        <label htmlFor="home">Home</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="radio" name="address_type" id="office" value="Office" />
                        <label htmlFor="office">Office</label>
                    </div>
                </div>
            </div>
            <Button className='!bg-amber-600 !text-white hover:!bg-amber-700 !cursor-pointer sm:!w-[200px] !w-full'>
                Save
            </Button>



        </div>
    )
}

export default Address