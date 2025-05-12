import React from 'react'
import HomeSlider from '../Components/HomePage/HomeSlider'
import ProductCategory from '../Components/HomePage/ProductCategory'
import PopularProducts from '../Components/HomePage/PopularProducts'
import OfferBanners from '../Components/HomePage/LatestOfferBanner'
import FreeShipping from '../Components/HomePage/FreeShipping'
import FeaturedCategoryBanner from '../Components/HomePage/FeaturedCategoryBanner'
import LatestProducts from '../Components/HomePage/LatestProducts'
import BlogPost from '../Components/HomePage/BlogPost'


const Home = () => {
  return (
    <>
      <div className='w-full py-[15px] pb-[40px]'>
          <HomeSlider/>
          <ProductCategory/>
          <PopularProducts/>
          <div className='w-full py-8 bg-[#f5f5f5]'>
            <OfferBanners/>
          </div>
          <div className='w-full py-[40px] bg-white'>
            <FreeShipping/>
            <FeaturedCategoryBanner/>
          </div>
          <div className='w-full py-8 bg-white'>
            <LatestProducts/>
          </div>
          <div className='w-full border-t border-gray-50 py-8 '>
            <BlogPost/>
          </div>

          
      </div>
    </>
  )
}

export default Home