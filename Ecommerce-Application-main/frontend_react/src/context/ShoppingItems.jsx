import React, { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { getAllShoppingItems } from '../api';
import { useParams } from 'react-router-dom';
import Loader from '../utils/Loader';

const ShoppingItems = ({ searchTerm }) => {
  const [shoppingItems, setShoppingItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  document.title = categoryId?.charAt(0).toUpperCase() + categoryId?.slice(1);

  const averageRating = (shoppingItem) => {
    if (!shoppingItem || !shoppingItem?.reviews || shoppingItem?.reviews.length === 0) {
      return 0;
    }
  
    const totalRatings = shoppingItem?.reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = totalRatings / shoppingItem?.reviews.length;
  
    return average;
  };

  const fetchAllShoppingItems = async () => {
    setLoading(true);
    const { data } = await getAllShoppingItems(categoryId);
    if (data) {
      setShoppingItems(JSON.parse(data));
      setLoading(false);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      const filteredItems = shoppingItems?.filter((item) => item?.title.toLowerCase().includes(searchTerm?.toLowerCase()));
      setShoppingItems(filteredItems);
    }
    else {
      fetchAllShoppingItems();
    }
  },[categoryId, searchTerm])

  if(shoppingItems?.length === 0 || loading) return <Loader />

  return (
    <section className='bg-gray-100'>
      <div className='bg-white max-w-7xl mx-auto sm:px-6 lg:px-8 px-4 pt-8 pb-12'>
        {searchTerm && (
          <h2 className="text-2xl font-semibold mb-4">
            Showing results for: <span className="text-blue-500">{searchTerm}</span>
          </h2>
        )}
        <div className='grid md:grid-cols-3 xl:grid-cols-5 gap-5'>
          {shoppingItems?.map((items) => (
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

export default ShoppingItems;