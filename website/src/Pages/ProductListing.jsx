import React, { useEffect, useMemo, useState } from 'react'
import ProductSideBar from '../Components/ProductSideBar'
import { Button } from '@mui/material'
import ProductsGrid from '../Components/ProductListing/ProductsGrid';
import { fetchAllProductColors, fetchAllProductSizes, getAllProducts } from '../Api/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { showError } from '../services/toastService';

const ProductListing = () => {
    const location = useLocation();
    const nav = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    let catId = queryParams.get('category');

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [sortOption, setSortOption] = useState('recommended');

    useEffect(() => {
        const fetchAllProducts = async () => {
            setLoading(true);
            try {
                const res = await getAllProducts(catId);
                const allProducts = res.data.products;
                setProducts(allProducts);

                if (catId && allProducts.length > 0) {
                    const categoryName = allProducts[0]?.category?.name;
                    if (categoryName) {
                        setSelectedFilters({ Category: [categoryName] });
                    }
                } else {
                    setSelectedFilters({});
                }
            }
            catch (e) {
                showError(e.message || "something went wrong");
                nav('/');
            } finally {
                setLoading(false);
            }
        }
        fetchAllProducts();
    }, [catId, nav])

    useEffect(() => {
        fetchAllProductColors().then(res => setColors(res.data.productColors));
        fetchAllProductSizes().then(res => setSizes(res.data.productSizes));
    }, []);

    useEffect(() => {
        document.body.style.overflow = isFilterOpen ? 'hidden' : '';
    }, [isFilterOpen]);


    const filteredSortedProducts = useMemo(() => {
        let filtered = [...products];

        // Only filter if there are selected filters
        if (Object.keys(selectedFilters).length > 0) {
            filtered = filtered.filter(p => {

                const categoryMatch = !selectedFilters.Category?.length ||
                    selectedFilters.Category.includes(p.category.name);

                const sizeMatch = !selectedFilters.Size?.length ||
                    p.size?.some(s => selectedFilters.Size.includes(s.name));

                const colorMatch = !selectedFilters.Color?.length ||
                    p.color?.some(c => selectedFilters.Color.includes(c.name));

                return categoryMatch && sizeMatch && colorMatch;
            });
        }

        // Sorting
        switch (sortOption) {
            case 'low_to_high':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'high_to_low':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'top_rated':
                filtered.sort((a, b) => {
                    const avgA = a.ratings?.reduce((sum, r) => sum + r.rating, 0) / (a.ratings?.length || 1);
                    const avgB = b.ratings?.reduce((sum, r) => sum + r.rating, 0)/ (b.ratings?.length || 1);
                    return avgB - avgA;
                });
                break;
            case 'popular':
                filtered.sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0));
                break;
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            default:
                break;
        }

        return filtered;
    }, [products, selectedFilters, sortOption]);



    const toggleFilter = (type, value) => {
        setSelectedFilters(prev => {
            const current = prev[type] || [];
            const exists = current.includes(value);
            const updated = exists ?
                current.filter(v => v !== value)
                :
                [...current, value];

            //If updated array is empty, key removed
            const newFilters = { ...prev };
            if (updated.length) {
                newFilters[type] = updated;
            } else {
                delete newFilters[type];
            }
            return newFilters;
        });
    };

    // Remove a specific filter
    const removeFilter = (type, value) => {
        toggleFilter(type, value);
    };

    return (
        <>
            <div className='w-full bg-white py-8 '>
                <div className="px-4 mb-4 lg:hidden flex justify-center">
                    <Button
                        onClick={() => setIsFilterOpen(true)}
                        className="!w-[80%] !px-4 !py-2 !bg-amber-500 hover:!bg-amber-600 !text-white rounded"
                    >
                        Filter & Sort
                    </Button>
                </div>

                <div className='flex'>
                    <ProductSideBar
                        isOpen={isFilterOpen}
                        setIsOpen={setIsFilterOpen}
                        sizes={sizes}
                        colors={colors}
                        toggleFilter={toggleFilter}
                        removeFilter={removeFilter}
                        selectedFilters={selectedFilters}
                    />
                    <div className='w-full lg:w-[80%] p-3'>
                        <ProductsGrid
                            products={filteredSortedProducts}
                            loading={loading}
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductListing