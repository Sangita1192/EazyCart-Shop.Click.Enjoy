import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import AddressItem from './AddressItem';
import { useOutletContext } from 'react-router-dom';
import AddEditAddress from './AddEditAddress';
import { useEffect } from 'react';
import { getAllAddress } from '../../Api/api';
import { showError } from '../../services/toastService';

const Address = () => {
    const { user } = useOutletContext() || {};
    const [isAddresFormVisible, setIsFormVisible] = useState(false);
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        console.log(user);
        if (user.address?.length > 0) {
            fetchAddresses();
        }
    }, [user?.address]);

    const fetchAddresses = async () => {
        try {
            const response = await getAllAddress();
            setAddressList(response.data.addresses)
        }
        catch (error) {
            showError(error.message);
        }
    }

    const handleCloseForm = () => {
        setSelectedAddress(null);
        setIsFormVisible(false);
    };

    const handleEdit = (address) => {
        setSelectedAddress(address);
        setIsFormVisible(true);
    };

    return (
        <>
            <div className=' w-full'>
                <Button className="!w-full !flex !justify-center !gap-2 hover:!border !border-blue-400 !rounded-lg !bg-blue-200/40 !py-4 !items-center" onClick={() => {
                    setIsFormVisible(true);
                    setSelectedAddress(null);
                }}>
                    <FaPlus />
                    <span>Add Address</span>
                </Button>
                {
                    (addressList.length > 0) &&
                    <div className='w-full p-2'>
                        {addressList.map((address) => (
                            <AddressItem
                                key={address._id}
                                address={address}
                                onEdit={() => handleEdit(address)}
                                onDelete={(deletedId) => {
                                    setAddressList(prev => prev.filter(addr => addr._id !== deletedId));
                                }}
                            />
                        ))}

                    </div>
                }
                <Dialog
                    open={isAddresFormVisible}
                    onClose={handleCloseForm}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>{selectedAddress ? "Edit Address" : "Add Address"}</DialogTitle>
                    <DialogContent>
                        <AddEditAddress
                            existingData={selectedAddress}
                            onClose={handleCloseForm}
                            refreshAddressList={fetchAddresses}
                        />
                    </DialogContent>
                </Dialog>

            </div>

        </>
    )
}



export default Address