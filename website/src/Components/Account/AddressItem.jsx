import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const AddressItem = ({ address, onEdit }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className='relative p-2 flex gap-2 items-start'>
            <div className='flex-1'>
                <div className='flex gap-2 items-center'>
                    <p className='px-2 py-1 bg-gray-200 rounded-md text-gray-600'>{address.type}</p>
                </div>
                <div className='mt-1 py-1'>
                    <div className='flex gap-3 lg:text-md text-sm'>
                        <p className='font-semibold'>{address.name || 'N/A'}</p>
                        <span>{address.phone}</span>
                    </div>
                    <p>{`${address.addressLine}, ${address.city}, ${address.state}, ${address.pincode}`}</p>
                </div>
            </div>

            <div className='relative'>
                <BsThreeDotsVertical
                    className='cursor-pointer'
                    onClick={() => setShowMenu(prev => !prev)}
                />
                {showMenu && (
                    <div className='absolute right-0 bg-white shadow-md border rounded-md z-10 mt-2'>
                        <p
                            className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                            onClick={() => {
                                onEdit(address);
                                setShowMenu(false);
                            }}
                        >
                            Edit
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddressItem;
