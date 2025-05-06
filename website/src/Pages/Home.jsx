import React from 'react'
import HomeSlider from '../Components/HomeSlider'
import ProductCategory from '../Components/ProductCategory'
import PopularProducts from '../Components/PopularProducts'

const Home = () => {
  return (
    <>
      <div className='w-full py-[15px] pb-[40px]'>
          <HomeSlider/>
          <ProductCategory/>
          <PopularProducts/>
      </div>
    </>
  )
}

export default Home