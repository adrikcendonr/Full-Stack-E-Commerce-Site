import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, Navbar, Cart, HomePage, Account, ViralProducts } from '../components';
import { ShoppingItems, ItemDetail, OrderConfirmation, Orders } from '../context';
import LoginAndSecurity from '../components/account/LoginAndSecurity';
import Loader from '../utils/Loader';
import WishList from '../context/WishList';

const Home = ({ user, signOut }) => {
  const [searchTerm, setSearchTerm] = useState();

  return (
    <React.Fragment>
      <Header user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:categoryId' element={<ShoppingItems />} />
        <Route path='/:categoryId/:productId' element={<ItemDetail user={user} />} />
        <Route path='/search' element={<ShoppingItems searchTerm={searchTerm} />} />
        <Route path='/cart' element={<Cart user={user} />} />
        <Route path='/account' element={<Account user={user} signOut={signOut} />} />
        <Route path='/account/login-and-security' element={<LoginAndSecurity user={user} />} />
        <Route path='/:userId/wishlist' element={<WishList user={user} />} />
        <Route path='/viral-products' element={<ViralProducts />} />
        <Route path='/:userId/orders' element={<Orders user={user} />} />
        <Route path='/orders/:orderId' element={<OrderConfirmation />} />
        <Route path='/*' element={<Loader />} />
      </Routes>
    </React.Fragment>
  )
}

export default Home;