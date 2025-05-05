import React from 'react'
import HomeSlider from '../Components/HomeSlider'
import ProductCategory from '../Components/ProductCategory'

const Home = () => {
  return (
    <>
      <div className='w-full py-[15px]'>
          <HomeSlider/>
          <ProductCategory/>
      </div>
    </>
  )
}

export default Home