import React, { useEffect, useState } from 'react';
import product1 from '/productImg1.webp';
import product2 from '/productImg2.webp';
import { FaRegHeart, FaStar } from 'react-icons/fa6';
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showError, showSuccess } from '../services/toastService';
import { addProductToWishlist, deleteProductFromWishlist } from '../Api/api';
import { fetchWishlist } from '../redux/slices/wishlistSlice';
import { addCart, removeFromCart, updateCartQty } from '../redux/slices/cartSlice';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { wishlists } = useSelector(state => state.wishlist);
  const { cart } = useSelector(state => state.cart);

  const nav = useNavigate();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [localQty, setLocalQty] = useState(1);
  const isInWishlist = wishlists.some(item => item.product._id === product._id);
  const matchingItems = cart?.items?.filter(item => item.product._id === product._id) || [];
  // Determine if product has sizes or colors
  const hasSizes = product?.size && product?.size.length > 0;
  const hasColors = product?.color && product?.color.length > 0;

  const variantItem = matchingItems.find(item => {
    const sizeMatch = hasSizes ? item.size === selectedSize?.label : true;
    const colorMatch = hasColors ? item.color === selectedColor?.code : true;
    return sizeMatch && colorMatch;
  });


  const cartQty = variantItem ? variantItem.quantity : 0;


  useEffect(() => {
    if (cartQty > 0) {
      setLocalQty(cartQty);
    } else {
      setLocalQty(1);
    }
  }, [cartQty]);


  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setLocalQty(1);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setLocalQty(1);
  };

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
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      nav('/login');
      return;
    }

    if ((hasSizes && !selectedSize) || (hasColors && !selectedColor)) {
      showError('Please select size and color');
      return;
    }

    if (localQty < 1) {
      showError('Quantity must be at least 1');
      return;
    }

    // If variantItem exists, update quantity instead of adding new
    if (variantItem) {
      dispatch(updateCartQty({
        itemId: variantItem._id,
        quantity: variantItem.quantity + localQty,
      }));
    } else {
      dispatch(addCart({
        id: product._id,
        quantity: localQty,
        size: selectedSize?.label || null,
        color: selectedColor?.code || null,
      }));
    }
  };


  const handleUpdateQuantity = (newQty) => {
    if (!isLoggedIn) {
      nav('/login');
      return;
    }

    if ((hasSizes && !selectedSize) || (hasColors && !selectedColor)) {
      showError('Please select size and color');
      return;
    }

    if (!variantItem) {
      showError('Item not found in cart');
      return;
    }
    if (newQty < 1) {
      dispatch(removeFromCart(variantItem._id));
    } else {
      dispatch(updateCartQty({
        itemId: variantItem._id,
        quantity: newQty,
      }));
    }
  };

  return (
    <div className='border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-md transition-shadow duration-200 bg-gray-50 cursor-pointer'>
      <div className="w-full h-[240px] overflow-hidden relative group">
        {/* Default Image */}
        <img
          src={product?.images[0] || product2}
          alt="Product"
          className="w-full h-full absolute top-0 left-0 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
        />
        {/* Hover Image */}
        <img
          src={product?.images[1] || product1}
          alt="Product Hover"
          className="w-full h-full absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        />

        {/* Discount Tag */}
        {product?.discount &&
          <span className='absolute top-[3%] left-[3%] bg-red-500 text-white px-3 py-1 rounded-lg text-sm'>
            {product?.discount}%
          </span>
        }

        {/* Floating Icons */}
        <div className='absolute top-[8%] right-[2%] flex flex-col gap-2 opacity-0 -translate-y-4 
          group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out'>
          <div
            className={`p-[6px] w-[40px] h-[40px] rounded-full flex items-center text-white justify-center 
    ${isInWishlist ? 'bg-red-500 hover:bg-gray-500' : 'bg-gray-500 hover:bg-red-700'}`}
            onClick={() => handleWishlist(product._id)}
            title={`${isInWishlist ? 'remove from wishlist' : 'add to wishlist'}`}
          >
            <FaRegHeart size={22} />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 py-2">
        <Link to={`/product/${product?._id}`}>
          <p className="font-semibold text-gray-800 cursor-pointer text-base line-clamp-2 hover:text-amber-700">
            {product?.name}
          </p>
        </Link>
        {/* Ratings  and Price*/}
        <div className='flex justify-between items-center'>
          <div className="flex items-center gap-1 text-yellow-500 mt-2 text-sm">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <div className='text-red-600 font-semibold'>
            ${Math.floor((product?.price || 259) * (100 - (product?.discount || 0)) / 100)}
          </div>
        </div>

        {/* Size Selection (only if available) */}
        {hasSizes ? (
          <div className="mt-2">
            <div className="flex gap-2 overflow-x-auto no-scrollbar size-color-scroller">
              {product.size.map((s) => (
                <button
                  key={s._id}
                  onClick={() => handleSizeChange(s)}
                  className={`px-3 py-1 rounded-full text-sm border cursor-pointer hover:border-black whitespace-nowrap ${selectedSize === s
                    ? "bg-emerald-700 text-white"
                    : "text-gray-700 border-gray-300"
                    }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        ) :
          !hasSizes && <div className="h-[32px]"></div>
        }

        {/* Color Selection (only if available) */}
        {hasColors ? (
          <div className="mt-2">
            <div className="flex gap-2 overflow-x-auto no-scrollbar size-color-scroller">
              {product.color.map((c) => (
                <button
                  key={c._id}
                  onClick={() => handleColorChange(c)}
                  className={`w-6 h-6 rounded-full border-2 cursor-pointer hover:border-black flex-shrink-0 ${selectedColor === c ? "border-black" : "border-gray-300"
                    }`}
                  style={{ backgroundColor: c.code }}
                >
                </button>
              ))}
            </div>
          </div>
        ) : (
          !hasColors && <div className="h-[32px]"></div>
        )
        }
        {/* Add to Cart or Quantity */}
        <div className="mt-4">
          {variantItem ? (
            <div className="flex items-center justify-center gap-4 border border-gray-200 rounded">
              <button
                onClick={() => handleUpdateQuantity(localQty - 1)}
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-xl rounded cursor-pointer"
              >
                -
              </button>
              <span className="font-medium text-lg flex-1 text-center">{localQty}</span>
              <button
                onClick={() => handleUpdateQuantity(localQty + 1)}
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-xl rounded cursor-pointer"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={(hasSizes && !selectedSize) || (hasColors && !selectedColor)}
              className={`w-full py-2 rounded-md font-semibold text-white bg-amber-500 hover:bg-amber-600 ${(hasSizes && !selectedSize) || (hasColors && !selectedColor)
                ? "cursor-not-allowed opacity-50"
                : ""
                }`}
            >
              <FaShoppingCart className="inline-block mr-2" size={16} />
              Add to Cart
            </button>
          )}
        </div>


      </div>
    </div>
  );
};

export default ProductItem;
