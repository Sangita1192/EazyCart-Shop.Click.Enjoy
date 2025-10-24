import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { MdPayment } from 'react-icons/md';
import { TbCash } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import AddEditAddress from '../Components/Account/AddEditAddress';
import { calculateCartTotals } from '../utils/calculateCart';

const CheckOut = () => {
    const user = useSelector((state) => state.auth.user);
    const { cart } = useSelector((state) => state.cart);
    const { subTotal, tax, shipping, total, cartQty } = calculateCartTotals(cart);

    const [userAddresses, setUserAddresses] = useState([]);
    const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        if (user?.address) setUserAddresses(user.address);
    }, [user]);

    const handleAddAddress = () => {
        setSelectedAddress(null);
        setIsAddressFormOpen(true);
    };

    const handleCloseForm = () => {
        setSelectedAddress(null);
        setIsAddressFormOpen(false);
    };

    return (
        <div className='py-8 xl:w-[80%] lg:w-[85%] sm:w-[95%] w-[98%] m-auto md:flex gap-6 items-start'>

            {/* Left Side: Address Selection */}
            <div className='shadow-md bg-white p-4 rounded-lg xl:w-[40%] flex-1'>
                <div className='w-full flex justify-between mb-3'>
                    <Dialog
                        open={isAddressFormOpen}
                        onClose={handleCloseForm}
                        fullWidth
                        maxWidth="sm"
                    >
                        <DialogTitle>{userAddresses.length > 0 ? "Add New Address" : "Add Delivery Address"}</DialogTitle>
                        <DialogContent>
                            <AddEditAddress onClose={handleCloseForm} />
                        </DialogContent>
                    </Dialog>

                    <Button
                        className="!border-amber-600 !text-amber-600 !border hover:!bg-black/70 hover:!text-white hover:!border-none"
                        onClick={handleAddAddress}
                    >
                        {userAddresses.length > 0 ? "Add New Address" : "Add Delivery Address"}
                    </Button>
                </div>

                <hr className='text-gray-200 mb-3' />

                {userAddresses.length > 0 && <h2 className='font-semibold mb-2'>Select Delivery Address</h2>}
                {userAddresses.map((address) => (
                    <div
                        key={address._id}
                        className={`flex gap-2 p-3 rounded-md my-2 cursor-pointer border ${selectedAddress?._id === address._id ? "border-amber-600 bg-amber-50" : "border-gray-200 bg-gray-50"
                            }`}
                        onClick={() => setSelectedAddress(address)}
                    >
                        <input
                            type="radio"
                            name="address"
                            checked={selectedAddress?._id === address._id}
                            onChange={() => setSelectedAddress(address)}
                        />
                        <label className="flex-1">
                            <p>{`${address.address_line}, ${address.city}, ${address.state}, ${address.pincode}`}</p>
                            {address.phone && <p>Phone: {address.phone}</p>}
                        </label>
                    </div>
                ))}
            </div>

            {/* Right Side: Order Summary */}
            <div className='shadow-md rounded-md border-gray-300 p-6 bg-white xl:w-[35%] lg:w-[50%] flex flex-col gap-4'>
                <h3 className='text-lg font-semibold border-b pb-2'>Order Summary</h3>

                <div className='flex justify-between'>
                    <span>Items in Order</span>
                    <span>{cartQty}</span>
                </div>

                <div className='flex justify-between'>
                    <span>Subtotal</span>
                    <span>${subTotal.toFixed(2)}</span>
                </div>

                <div className='flex justify-between'>
                    <span>Tax (GST/PST)</span>
                    <span>${tax.toFixed(2)}</span>
                </div>

                <div className='flex justify-between'>
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                </div>

                <div className='flex justify-between font-bold text-xl border-t border-gray-300 pt-3'>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                <Button
                    className={`!my-2 !text-white !bg-amber-600 hover:!bg-amber-700 !uppercase !flex !justify-center !gap-2 !py-3 ${selectedAddress? "cursor-pointer": "cursor-not-allowed opacity-30"}`}
                    disabled={!selectedAddress || !cart?.items?.length}
                >
                    <MdPayment size={22} /> Proceed to Payment
                </Button>

                <Button className='!my-2 !bg-blue-500 hover:!bg-blue-600 !py-3 !text-white'>
                    PayPal
                </Button>

                <Button className='!my-2 !bg-black hover:!bg-black/80 !text-white !uppercase !flex !gap-2 !py-3'>
                    <TbCash size={22} /> Cash on Delivery
                </Button>
            </div>

        </div>
    );
};

export default CheckOut;
