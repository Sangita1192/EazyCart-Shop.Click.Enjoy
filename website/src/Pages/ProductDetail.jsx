import React, { useEffect, useState } from 'react'
import product1 from '/productImg1.webp';
import product2 from '/productImg2.webp';
import { FaChevronDown, FaChevronUp, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa6';
import { Button } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/styles.min.css'
import LoadingSpinner from '../Components/LoadingSpinner';
import ProductReview from '../Components/Review/ProductReview';
import RelatedProducts from '../Components/RelatedProducts';
import { useNavigate, useParams } from 'react-router-dom';
import { addProductToWishlist, deleteProductFromWishlist, getProduct } from '../Api/api';
import { showError, showSuccess } from '../services/toastService';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from '../redux/slices/wishlistSlice';


const ProductDetail = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { wishlists } = useSelector(state => state.wishlist);
    const { id } = useParams();
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const isInWishlist = wishlists.some(item => item.product._id === product?._id);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await getProduct(id);
            setProduct(res.data.product[0]);
            setSelectedImg(res.data.product[0].images[0]);
        }
        catch (e) {
            showError(e.message || "error in fetching product details");
            nav('/')
        } finally {
            setLoading(false);
        }
    }

    const handleWishlist = async (id) => {
        if (!isLoggedIn) return nav('/login');
        try {
            if (isInWishlist) {
                await deleteProductFromWishlist(id);
                showSuccess("Product removed from wishlist");
            } else {
                await addProductToWishlist(id);
                showSuccess("Product added to wishlist");
            }
            dispatch(fetchWishlist());
        }
        catch (error) {
            showError(error.message || "something went wrong");
            nav('/');
        }
    }
    return (
        <>
            <div className='w-full py-6 pt-8 px-2'>
                {loading ?
                    <LoadingSpinner />
                    :
                    <>
                        <div className='xl:w-[80%] lg:w-[85%] sm:w-[95%] w-full m-auto sm:flex gap-[15px] xl:gap-[25px]'>
                            <div className="sm:w-[40%] flex flex-col-reverse sm:flex-row gap-2 justify-between ">
                                <div className='flex sm:flex-col gap-2 w-[15%] justify-start items-start my-2 sm:my-0'>
                                    {product?.images?.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img || (i % 2 === 0 ? product1 : product2)}
                                            alt={product?.name || "product"}
                                            onClick={() => setSelectedImg(img)}
                                            className={`shadow-lg rounded-md cursor-pointer border ${selectedImg === img ? "border-amber-600" : "border-transparent"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className='sm:w-[80%] w-full rounded-md relative'>
                                    <InnerImageZoom
                                        zoomSrc={selectedImg}
                                        src={selectedImg}
                                        alt={product?.name || "product image"}
                                        zoomType="hover"
                                        showZoom={false}
                                        zoomPreload={true}
                                        className='zoom-full-img w-full lg:h-[450px] md:h-[350px] h-[300px] rounded-md shadow-sm' />
                                </div>
                            </div>
                            <div className='w-full sm:w-[56%] px-2 text-gray-600'>
                                <h1 className='text-2xl xl:text-4xl font-semibold '>{product?.name}</h1>
                                <div className='flex justify-start items-center gap-8 xl:mt-2'>
                                    <div className='text-sm flex gap-1 xl:text-md'>
                                        <span className='text-gray-500 text-sm xl:text-md'>Category:</span>
                                        <span className='text-sm xl:text-md'>{product?.category?.name}</span>
                                    </div>
                                    <div className='flex gap-2 justify-center text-sm items-center '>
                                        <div className="flex gap-1 text-yellow-500 text-sm xl:text-md">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} />
                                            ))}
                                        </div>
                                        <span className='text-sm xl:text-md'>({product?.ratings?.length || 0})</span>
                                    </div>

                                </div>
                                <div className='mt-2 text-lg xl:text-2xl flex gap-4 font-semibold xl:mt-4'>
                                    <span>${Math.floor((product?.price || 259) * (100 - (product?.discount || 0)) / 100)}</span>
                                    <span className='text-red-600 line-through'>${product?.price}</span>
                                </div>
                                <p className='mt-2 text-justify xl:text-lg'>
                                    {product?.description}
                                </p>
                                <div className='mt-2 flex gap-4 xl:mt-3'>
                                    {product?.size?.length > 0 && <span className='uppercase text-lg'>SIZE</span>}
                                    <div className="flex gap-2 overflow-x-auto size-color-scroller">
                                        {product?.size?.map((s) => (
                                            <button
                                                key={s._id}
                                                // onClick={() => handleSizeChange(size)}
                                                className={`px-3 py-1 rounded-lg text-sm border ${"size" === s
                                                    ? "bg-emerald-700 text-white"
                                                    : "text-gray-700 border-gray-300"
                                                    }`}
                                            >
                                                {s.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-2 xl:mt-3">
                                    {product?.color?.map((c) => (
                                        <button
                                            key={c._id}
                                            aria-label={`Select color ${c}`}
                                            // onClick={() => handleColorChange(color)}
                                            className={`w-6 h-6 rounded-full border-2 cursor-pointer ${"selectedColor" === c ? "border-black" : "border-gray-300"}`}
                                            style={{ backgroundColor: c.name }}
                                        ></button>
                                    ))}
                                </div>
                                <p className='mt-2 mb-3 xl:mt-3'> Free Shipping over $39.99 (Est Delivery in 2-3 days)</p>
                                <div className='flex gap-4 mb-3'>
                                    <div className="relative w-20">
                                        <input
                                            type="number"
                                            min={1}
                                            max={10}
                                            value={quantity}
                                            readOnly
                                            className="w-full text-center border border-gray-300 rounded-md py-2 pr-6 focus:outline-none"
                                        />
                                        <div className="absolute inset-y-0 right-1 flex flex-col justify-center gap-[2px]">
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="text-gray-600 hover:text-black"
                                            >
                                                <FaChevronUp size={12} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(quantity - 1)}
                                                className="text-gray-600 hover:text-black"
                                            >
                                                <FaChevronDown size={12} />
                                            </button>
                                        </div>
                                    </div>

                                    <Button className='!flex !gap-2 !justify-center !items-center !bg-amber-600 !cursor-pointer hover:!bg-amber-700 !text-white !px-[15px]'>
                                        <FaShoppingCart className="inline-block mr-2" size={16} />
                                        Add to Cart
                                    </Button>
                                </div>
                                <Button
                                    className={`!mt-2 !flex !gap-2 !curosr-pointer xl:!mt-3 !border ${isInWishlist ? "!border-[red]" : "!border-[gray]"}`}
                                    onClick={() => handleWishlist(product?._id)}
                                >
                                    {isInWishlist ? <FaRegHeart /> : <FaHeart color='red' />}
                                    {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                                </Button>
                            </div>
                        </div>
                        <div className='lg:w-[85%] sm:w-[95%] lg:px-6 w-full m-auto shadow-lg p-2 bg-gray-200/50 mt-4'>
                            <ProductReview productId={id} reviews={product?.ratings} />
                        </div>
                    </>
                }

            </div>
            <div className='m-auto w-[90%] '>
                <RelatedProducts />
            </div>
        </>
    )
}

export default ProductDetail