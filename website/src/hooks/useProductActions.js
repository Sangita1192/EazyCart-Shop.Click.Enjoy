import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showError, showSuccess, showWarning } from '../services/toastService';
import { addProductToWishlist, deleteProductFromWishlist } from '../Api/api';
import { fetchWishlist } from '../redux/slices/wishlistSlice';
import { addCart, updateCartQty, removeFromCart } from '../redux/slices/cartSlice';

export const useProductActions = (product) => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { wishlists } = useSelector((state) => state.wishlist);
    const { cart } = useSelector((state) => state.cart);

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [localQty, setLocalQty] = useState(1);

    const isInWishlist = wishlists.some((item) => item.product._id === product?._id);

    const hasSizes = product?.size && product.size.length > 0;
    const hasColors = product?.color && product.color.length > 0;

    const matchingItems = cart?.items?.filter((item) => item.product._id === product?._id) || [];

    const variantItem = matchingItems.find((item) => {
        const sizeMatch = hasSizes ? item.size === selectedSize?.label : true;
        const colorMatch = hasColors ? item.color === selectedColor?.code : true;
        return sizeMatch && colorMatch;
    });


    //   useEffect(() => {
    //     setLocalQty(cartQty > 0 ? cartQty : 1);
    //   }, [cartQty]);

    // Sync selected variant and quantity when product or cart changes
    useEffect(() => {
        if (!product?._id) return;

        const newMatchingItems =
            cart?.items?.filter((item) => item.product._id === product._id) || [];

        const newVariantItem = newMatchingItems.find((item) => {
            const sizeMatch = hasSizes ? item.size === selectedSize?.label : true;
            const colorMatch = hasColors ? item.color === selectedColor?.code : true;
            return sizeMatch && colorMatch;
        });

        setLocalQty(newVariantItem ? newVariantItem.quantity : 1);
    }, [selectedSize, selectedColor, cart, product?._id]);



    const toggleWishlist = async () => {
        if (!isLoggedIn) return nav('/login');
        try {
            if (isInWishlist) {
                await deleteProductFromWishlist(product._id);
                showSuccess('Product removed from wishlist');
            } else {
                await addProductToWishlist(product._id);
                showSuccess('Product added to wishlist');
            }
            dispatch(fetchWishlist());
        } catch (error) {
            showError(error.message || 'Something went wrong');
        }
    };

    const addToCart = () => {
        if (!isLoggedIn) return nav('/login');
        if ((hasSizes && !selectedSize) || (hasColors && !selectedColor))
            return showError('Please select size and color');
        if(localQty < 1) return showWarning("Quanity must be greater than 1");

        if (variantItem) {
            dispatch(
                updateCartQty({
                    itemId: variantItem._id,
                    quantity: variantItem.quantity + localQty,
                })
            );
        } else {
            dispatch(
                addCart({
                    id: product._id,
                    quantity: localQty,
                    size: selectedSize?.label || null,
                    color: selectedColor?.code || null,
                })
            );
        }
    };

    const updateQuantity = (newQty) => {
        if (!isLoggedIn) return nav('/login');
        if (!variantItem) return showError('Item not found in cart');
        if (newQty < 1) {
            dispatch(removeFromCart(variantItem._id));
        } else {
            dispatch(updateCartQty({ itemId: variantItem._id, quantity: newQty }));
        }
    };

    return {
        selectedSize,
        setSelectedSize,
        selectedColor,
        setSelectedColor,
        localQty,
        setLocalQty,
        hasSizes,
        hasColors,
        variantItem,
        toggleWishlist,
        addToCart,
        updateQuantity,
        isInWishlist,
    };
};
