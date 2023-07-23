import React from 'react';
import banner from '../assests/banner.jpg';

const Banner = () => {
  return (
    <section className='bg-gray-100'>
      <div className='max-w-7xl mx-auto justify-center items-center'>
        <img src={banner} alt="banner" className='w-full object-cover'/>
      </div>
    </section>
  )
}

export default Banner;
