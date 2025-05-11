import React from 'react'
import HomeSlider from '../Components/HomeSlider'
import ProductCategory from '../Components/ProductCategory'
import PopularProducts from '../Components/PopularProducts'
import FreeShipping from '../Components/FreeShipping'
import FeaturedCategoryBanner from '../Components/FeaturedCategoryBanner'
import LatestProducts from '../Components/LatestProducts'
import OfferBanners from '../Components/LatestOfferBanner'
import BlogPost from '../Components/BlogPost'

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