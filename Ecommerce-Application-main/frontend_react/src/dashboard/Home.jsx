import React, { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar, Dashboard, Users, CreateUser, EditUser, CreateShoppingItems, Products, EditProduct, Orders, UpdateStatus } from './index';
import Loader from '../utils/Loader';

const Home = ({ user }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollTo(0,0);
  },[])

  return (
    <div className='flex md:flex-row flex-col h-[100%] transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user} />
      </div>
      <div className='pb-2 flex-1 h-screen overflow-y-auto' ref={scrollRef}>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/add' element={<CreateShoppingItems /> } />
          <Route path='/products/edit/:productId' element={<EditProduct />} />
          <Route path='/:userType' element={<Users user={user} />} />
          <Route path='/user/add' element={<CreateUser />} />
          <Route path='/:userType/edit/:userId' element={<EditUser />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/orders/edit/:orderId' element={<UpdateStatus />} />
          <Route path='*' element={<Loader />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home;