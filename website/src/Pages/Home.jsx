import React from 'react'
import HomeSlider from '../Components/HomeSlider'
import ProductCategory from '../Components/ProductCategory'
import PopularProducts from '../Components/PopularProducts'
import FreeShipping from '../Components/FreeShipping'
import FeaturedCategoryBanner from '../Components/FeaturedCategoryBanner'

const Home = () => {
  return (
    <>
      <div className='w-full py-[15px] pb-[40px]'>
          <HomeSlider/>
          <ProductCategory/>
          <PopularProducts/>
          <div className='w-full py-8 bg-[#f5f5f5]'>
            <FreeShipping/>
            <FeaturedCategoryBanner/>
          </div>
          
      </div>
    </>
  )
}

export default Home