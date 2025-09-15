import React, { useEffect, useState } from 'react';
import { fetchBottomCard } from '../../Api/api';

const FeaturedCategoryBanner = () => {
    const [bottomBanners, setBottomBanners] = useState([]);

    useEffect(() => {
        fetchBottomBanners();
    }, []);

    const fetchBottomBanners = async () => {
        try {
            const res = await fetchBottomCard();
            setBottomBanners(res.data.banners);
            console.log(res.data.banners);
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className='w-[85%] lg:w-[92%] m-auto mt-10 py-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px] justify-center items-center'>
                {bottomBanners.length > 0 &&
                    bottomBanners.map(banner => (
                        <div
                            key={banner._id}
                            className="shadow-lg rounded-lg bg-[#DBDCF1] relative overflow-hidden h-[250px] cursor-pointer group"
                            onClick={() => window.location.href = banner.link}
                        >
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4 !capitalize">
                                <h1 className="text-xl lg:text-3xl font-semibold text-white drop-shadow-md">
                                    {banner.title}
                                </h1>
                                <p className="text-[silver] font-bold text-md my-2 drop-shadow">
                                    {banner.description}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>

        </>
    )
}

export default FeaturedCategoryBanner