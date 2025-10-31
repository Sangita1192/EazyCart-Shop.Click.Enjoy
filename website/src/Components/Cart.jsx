import React from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { IoClose } from 'react-icons/io5';
import { Button } from '@mui/material';
import { BsFillCartXFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCartItems, removeFromCart } from '../redux/slices/cartSlice';
import { calculateCartTotals } from '../utils/calculateCart';

const Cart = ({ isCartOpen, setIsCartOpen }) => {
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.cart);
    const { subTotal, tax, shipping, total, cartQty } = calculateCartTotals(cart);

    const handleclearAllCart = ()=>{
        dispatch(clearCartItems());
    }
    if (!isCartOpen) return null;
    return (
        <>
            {/* Background overlay */}
            <div className="fixed inset-0 bg-black/50 z-90"
                onClick={() => setIsCartOpen(false)}>
            </div>

            <RemoveScroll>
                <div className="fixed top-0 right-0 h-[100vh] w-[280px] sm:w-[50%] md:w-[40%] lg:w-[35%] bg-white ps-2 z-9999 shadow-lg transition-transform duration-300 ease-in-out translate-x-0 flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-gray-300">
                        <h2 className="text-lg font-semibold">Shopping Cart <span>({cartQty})</span></h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            aria-label="Close Cart"
                            className="text-2xl cursor-pointer "
                        >
                            <IoClose className='hover:text-amber-600' />
                        </button>
                    </div>
                    {cart?.items?.length < 0 &&
                        <div className="flex items-center justify-between p-4 border-b border-gray-300">
                            <button className='ms-auto hover:!text-red-500 cursor-pointer px-1' onClick={handleclearAllCart}>Clear All</button>
                        </div>
                    }
                    {/* Cart Content */}
                    {
                        cart?.items?.length > 0 ?
                            (
                                <>
                                    <div className="scrollbar-sidebar p-2 flex-1 overflow-y-auto mb-3 flex flex-col gap-2">
                                        {cart?.items?.map(item => (
                                            <div className='px-1 py-3 border-b border-gray-300 flex gap-2' key={item._id}>
                                                <img src={item.product.images[0]} alt={item.product.name} className='w-[60px] h-[80px] rounded-md shadow-md' />
                                                <div className='flex-1 flex gap-2 lg:gap-4 justify-bewteen '>
                                                    <div className='text-sm lg:text-md xl:text-lg flex-1 px-1'>
                                                        <h5>{item.product.name}</h5>
                                                        <p className='font-semibold'>{`${item.product?.description}`.slice(0, 20)}...</p>
                                                        <p className='italic'>
                                                            Qty:
                                                            <span className='ml-2'>{item.quantity}</span>
                                                        </p>
                                                        {(item.size || item.color) && (
                                                            <p className="italic">
                                                                {item.size && <span>Size: {item.size}</span>}
                                                                {item.size && item.color && <span className="mx-2">|</span>}
                                                                {item.color && <span>Color: {item.color}</span>}
                                                            </p>
                                                        )}

                                                        <p className='text-amber-600 font-semibold mt-2'>${item.product.price}</p>
                                                    </div>
                                                    <MdDelete className="text-gray-600 hover:text-amber-600" onClick={() => dispatch(removeFromCart(item._id))} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='py-4 px-2'>
                                        <div className='flex justify-between items-center px-2 py-1 border-t border-gray-300'>
                                            <span>Subtotal</span>
                                            <span>${subTotal.toFixed(2)}</span>
                                        </div>
                                        <div className='flex justify-between items-center px-2 py-1 border-t border-gray-300'>
                                            <span>Tax (GST/PST)</span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        <div className='flex justify-between items-center px-2 py-1 border-t border-gray-300'>
                                            <div>
                                                <span>Shipping Fee</span>
                                                <p className='text-sm italic'>(free shipping over $19.99)</p>
                                            </div>
                                            <span>${shipping.toFixed(2)}</span>
                                        </div>
                                        <div className='flex justify-between items-center px-2 py-1 border-t border-gray-300'>
                                            <span className='font-bold'>Total Amount</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>

                                        <div className='flex justify-center gap-2 items-center py-3 border-t border-gray-300'>
                                            <Button className="!bg-amber-600 !border-2 !border-amber-600 !text-white hover:!bg-black hover:!border-black !w-[45%]" onClick={() => setIsCartOpen(false)}>
                                                <Link to="/cart">
                                                    View Cart
                                                </Link>
                                            </Button>
                                            <Link to={cart?.items?.length ? "/checkout" : "#"} className='!w-[45%]'>
                                                <Button
                                                    className="!w-full !border-2 !border-amber-600 hover:!bg-black hover:!text-white !text-amber-600 hover:!border-black"
                                                    onClick={() => setIsCartOpen(false)}
                                                    disabled={!cart?.items?.length}
                                                >
                                                    Checkout
                                                </Button>
                                            </Link>

                                        </div>
                                    </div>
                                </>

                            )
                            :
                            (
                                <>
                                    <div className="p-4 flex-1 overflow-y-auto flex justify-center items-center">
                                        <div className='flex-1 flex flex-col justify-center items-center gap-3'>
                                            <BsFillCartXFill size={55} className='!text-red-500' />
                                            <p className='text-xl font-semibold text-gray-600'>Your cart is empty.</p>
                                            <Link to="/products" onClick={() => setIsCartOpen(false)}>
                                                <Button className='!bg-amber-600 !text-white hover:!bg-amber-700 !mt-2'>
                                                    Continue Shopping
                                                </Button>
                                            </Link>

                                        </div>
                                    </div>
                                </>
                            )
                    }
                </div>
            </RemoveScroll>
        </>
    );
};

export default Cart;
