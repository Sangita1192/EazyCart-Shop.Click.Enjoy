import React, { useState } from 'react'
import FilterSection from './ProductListing/FilterSection'
import { Button } from '@mui/material';

const ProductSideBar = ({ isOpen, setIsOpen }) => {
    const [selectedFilters, setSelectedFilters] = useState({});

    // add or remove a filter value under a filter type (eg. Category['fashion'])
    const toggleFilter = (type, value) => {
        setSelectedFilters(prev => {
            const current = prev[type] || [];
            const exists = current.includes(value);
            const updated = exists ?
                current.filter(v => v !== value)
                :
                [...current, value];

            //If updated array is empty, remove the key
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
            {/* Backdrop for small screens */}
            {isOpen && (
                <div
                    className="fixed bg-black/50 inset-0 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={`
                    lg:w-[20%] w-[270px] bg-white z-50 lg:h-auto h-[100vh]
                    lg:static fixed top-0 left-0 transition
                    transition-transform duration-300
                    border-r lg:border-gray-200 lg:pr-[10px]
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
                `}>
                <div className={`lg:h-auto h-[90%] p-3 overflow-y-auto lg:overflow-y-visible scrollbar-sidebar`}>
                    {/* Close button for mobile */}
                    <div className="flex justify-end lg:hidden mb-2">
                        <button onClick={() => setIsOpen(false)} className="text-red-500 text-xl font-bold">
                            ✕
                        </button>
                    </div>

                    {/*Selected Filter Tags */}
                    {Object.keys(selectedFilters).length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4 cursor-pointer">
                            {Object.entries(selectedFilters).flatMap(([type, values]) =>
                                values.map(value => (
                                    <span
                                        key={`${type}-${value}`}
                                        className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded"
                                    >
                                        {value}
                                        <button
                                            className="text-blue-600 hover:text-blue-800"
                                            onClick={() => removeFilter(type, value)}
                                        >
                                            ✕
                                        </button>
                                    </span>
                                ))
                            )}
                        </div>
                    )}
                    <FilterSection title="Category" options={['Fashion', 'Electronics', 'Footwear']} selected={selectedFilters['Category'] || []} onToggle={value => toggleFilter('Category', value)} />

                    <FilterSection title="Size" options={['S', 'M', 'L', 'XL']} selected={selectedFilters['Size'] || []} onToggle={value => toggleFilter('Size', value)} />

                    <FilterSection title="Color" options={['Red', 'Blue', 'Green', 'Black']} selected={selectedFilters['Color'] || []} onToggle={value => toggleFilter('Color', value)} />
                    <FilterSection title="Size" options={['S', 'M', 'L', 'XL']} selected={selectedFilters['Size'] || []} onToggle={value => toggleFilter('Size', value)} />

                    <FilterSection title="Color" options={['Red', 'Blue', 'Green', 'Black']} selected={selectedFilters['Color'] || []} onToggle={value => toggleFilter('Color', value)} />
                    <FilterSection title="Size" options={['S', 'M', 'L', 'XL']} selected={selectedFilters['Size'] || []} onToggle={value => toggleFilter('Size', value)} />

                    <FilterSection title="Color" options={['Red', 'Blue', 'Green', 'Black']} selected={selectedFilters['Color'] || []} onToggle={value => toggleFilter('Color', value)} />

                </div>
                <div className={` lg:hidden my-2 px-2 `} onClick={() => setIsOpen(false)}>
                    <Button className='!bg-amber-500 !text-white hover:!bg-amber-600 !m-auto !w-full'>
                        View Results
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ProductSideBar