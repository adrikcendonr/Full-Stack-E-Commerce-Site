import React from 'react';

const ViralProducts = () => {
  // images cited from amazon.com
  return (
    <section className='bg-gray-100'>
      <div className='max-w-7xl mx-auto justify-center items-center'>
        <img src='https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2022/InternetFamous/Flips/EOY/LandingPage/PageHeaders/IF_EOY_StorefrontHeader_DT_3000x336.jpg' className='py-0 h-[60px] md:h-full md:py-6' alt='internet-sale' />
        <div className='grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 md:gap-10'>
          <a href='/home'><img src='https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2022/T5/IF/LP/IF_XGL_BF_Browse_DealTile_Home_544x655.jpeg' alt='internet-sale' /></a>
          <a href='/beauty'><img src='https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2022/T5/IF/LP/IF_XGL_BF_Browse_DealTile_Beauty_544x655.jpeg' alt='internet-sale' /></a>
          <a href='/men'><img src='https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2022/T5/IF/LP/IF_XGL_BF_Browse_DealTile_Mfashion_544x655.jpeg' alt='internet-sale' /></a>
          <a href='/women'><img src='https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2022/T5/IF/LP/IF_XGL_BF_Browse_DealTile_Wfashion_544x655.jpeg' alt='internet-sale' /></a>
        </div>
        <div className='mt-8'>
          <a href='/'>
            <img src='https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2022/T5/IF/LP/IF_XGL_BF_LeadUp_BrowseHeader_DT_3000x336.jpg' alt='internet-sale' className='h-[60px] md:h-full'/>
          </a>
        </div>
      </div>
    </section> 
  )
}

export default ViralProducts;