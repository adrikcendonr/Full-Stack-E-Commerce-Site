import React, { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { getWishList } from '../api';
import { useParams } from 'react-router-dom';
import Loader from '../utils/Loader';

const WishList = ({ user }) => {
  const [wishListItems, setWishListItems] = useState();
  const [loading, setLoading] = useState(false);
  const { userId, categoryId } = useParams();

  document.title = `${user?.name}'s Wishlist`;

  const averageRating = (shoppingItem) => {
    if (!shoppingItem || !shoppingItem?.reviews || shoppingItem?.reviews.length === 0) {
      return 0;
    }
  
    const totalRatings = shoppingItem?.reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = totalRatings / shoppingItem?.reviews.length;
  
    return Math.round(average);
  };

  const fetchWishListItems = async () => {
    setLoading(true);
    const { data } = await getWishList(userId);
    if (data) {
      setWishListItems(JSON.parse(data));
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWishListItems();
  }, []);

  if (wishListItems?.length === 0) {
    return (
      <section className='bg-gray-100'>
        <div className='bg-white max-w-7xl mx-auto sm:px-6 lg:px-8 px-4 pt-8 pb-12'>
          <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
          <p>Your wishlist is empty</p>
        </div>
      </section>
    )
  }

  if(loading) return <Loader />

  return (
    <section className='bg-gray-100'>
      <div className='bg-white max-w-7xl mx-auto sm:px-6 lg:px-8 px-4 pt-8 pb-12'>
        <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
        <div className='grid md:grid-cols-3 xl:grid-cols-5 gap-5'>
          {wishListItems?.map((items) => (
            <a key={items?._id?.$oid} href ={`/${categoryId || items?.category}/${items?._id?.$oid}`}>
              <div className='bg-white p-5 flex flex-col justify-center items-center'>
                <div className="w-[200px] h-[300px] mx-auto bg-gray-100 p-2">
                  <img 
                    src={items?.thumbnail} 
                    alt='pic' 
                    className='w-full h-full object-contain' 
                  />
                </div>
                <h3 className='text-center font-serif mt-2 hover:text-gray-500'>{items?.title}</h3>
                <div className='flex items-center space-x-2 justify-center mt-4'>
                  <div className="flex items-center bg-green-500 text-white px-1 shadow-lg rounded-sm">
                    <span>{averageRating(items).toFixed(2)}</span><AiFillStar className="h-4" />{" "}
                  </div>
                  <span>({items?.reviews?.length})</span>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <span className="font-bold flex items-center">
                  ${(((items?.price || 0) * (100 - (items?.discountPercentage || 0))) / 100).toFixed(0)}
                    <p className="text-sm text-gray-500 pl-3 line-through">
                      {items?.price}
                    </p>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WishList;