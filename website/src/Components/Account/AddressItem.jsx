import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const AddressItem = ({ address, onEdit }) => {
    console.log(address);
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className='relative p-2 flex gap-2 items-start bg-gray-100 rounded-md my-2'>
            <div className='flex-1'>
                <div className='flex gap-2 items-center'>
                    <p className='px-2 py-1 bg-gray-200 rounded-md text-gray-600'>{address.address_type}</p>
                </div>
                <div className='mt-1 py-1'>
                    <p>{`${address.address_line} ${address.city}, ${address.state}, ${address.pincode}`}</p>
                     <p>{address.phone ? `Phone: ${address.phone}` : ""}</p>
                </div>
            </div>

            <div className='relative'>
                <BsThreeDotsVertical
                    className='cursor-pointer'
                    onClick={() => setShowMenu(prev => !prev)}
                />
                {showMenu && (
                    <>
                        <div className='absolute right-0 bg-white shadow-md rounded-md z-10 mt-2 w-[100px]'>
                            <p
                                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                onClick={() => {
                                    onEdit(address);
                                    setShowMenu(false);
                                }}
                            >
                                Edit
                            </p>
                             <p
                                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                
                            >
                                Delete
                            </p>
                        </div>
                    </>

                )}
            </div>
        </div>
    );
};

export default AddressItem;
