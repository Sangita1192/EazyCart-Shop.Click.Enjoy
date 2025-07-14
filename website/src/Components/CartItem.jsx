import React from 'react'
import { FaStar } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'

const CartItem = () => {
    return (
        <>
            <div className='flex gap-3 py-2 border-b border-gray-300'>
                <img src="/productImg2.webp" alt="product image" className='w-[70px] h-[100px] md:w-[120px] md:h-[150px] rounded-md shadow-md' />
                <div className='flex-1 flex gap-1'>
                    <div className='flex-1'>
                        <h3 className='font-semibold lg:text-xl text-lg'>Embroided Saree</h3>
                        <p className='italic md:text-md text-sm'>FASHION</p>
                        <p className='hidden sm:block'>{`lorem ba hfoiasjfla ahfoefjlafnla iewahfoilejflafjla khfoielwjflafnk afhjfolejfa`.slice(0, 100)}...</p>
                        <div className='text-yellow-600 mt-1 flex gap-1'>
                            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="quantity" className="text-sm font-medium text-gray-700 mr-1">
                                Qty:
                            </label>
                            <select
                                name="quantity"
                                id="quantity"
                                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-amber-500 focus:border-amber-500 px-2 py-1"
                                defaultValue="1"
                            >
                                {Array.from({ length: 10 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='mt-3 flex md:gap-4 gap-2'>
                            <p>$160.00</p>
                            <p className='text-gray-500 line-through'>$179.68</p>
                            <span className='font-bold text-red-600 uppercase hidden sm:block'>10% off</span>

                        </div>
                    </div>

                    <MdCancel size={24} className='hover:text-amber-600' />
                </div>
            </div>
        </>
    )
}

export default CartItem