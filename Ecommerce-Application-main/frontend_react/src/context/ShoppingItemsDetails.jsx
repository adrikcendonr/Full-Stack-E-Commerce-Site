import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getShoppingItemDetails, addReview, saveToWishList, getWishList, removeFromWishList } from '../api';
import Recommendation from './Recommendation';
import CartContext from "./CartContext";
import Loader from '../utils/Loader';

const ItemDetail = ({ user }) => {
  const [item, setItem] = useState();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', rating: '', text: '' });
  const { categoryId, productId } = useParams();
  const userId = user?._id?.$oid;
  const { cart, setCart } = useContext(CartContext);
  const [isInWishList, setIsInWishList] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, rating, text } = newReview;

  const discountedPrice = (item?.price * (100 - item?.discountPercentage)) / 100;

  const averageRating = () => {
    if (!item || !item?.reviews || item?.reviews?.length === 0) {
      return 0;
    }

    const totalRatings = item?.reviews?.reduce((sum, review) => sum + review.rating, 0);
    return totalRatings / item?.reviews?.length;
  };

  const fetchShoppingItemDetails = async () => {
    setLoading(true);
    const { data } = await getShoppingItemDetails(productId);
    if (data) {
      setItem(JSON.parse(data));
      const review = JSON.parse(data);
      if (review?.reviews?.length > 0) {
        setReviews(review?.reviews);
      }
      setLoading(false);
    }
  }

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item._id.$oid === product._id.$oid);
    let newCart;
  
    if (existingProductIndex !== -1) {
      newCart = cart.map((item, index) => {
        if (index === existingProductIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      const newProduct = { ...product, quantity: 1 };
      newCart = [...cart, newProduct];
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviews([...reviews, newReview]);
    await addReview({ productId, name, rating, text, userId })
    setNewReview({ name: '', rating: '', text: '' });
  };

  useEffect(() => {
    fetchShoppingItemDetails();
  },[productId])

  const fetchIsInWishList = async () => {
    if (!userId) return;

    const { data } = await getWishList(userId);
    if (data) {
      const wishList = JSON.parse(data);
      wishList?.forEach((item) => {
        if (item._id.$oid === productId) {
          setIsInWishList(true);
        }
      });
    }
  }

  useEffect(() => {
    fetchIsInWishList();
  },[productId, userId])

  const handleSaveToWishlist = async () => {
    if (!userId || !productId) return;

    await saveToWishList({ productId, userId });

    setIsInWishList(!isInWishList);
  };

  const handleRemoveFromWishlist = async () => {
    if (!userId || !productId) return;

    await removeFromWishList({ productId, userId });

    setIsInWishList(!isInWishList);
  };

  if(loading) return <Loader />

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        <div className="w-1/2">
          <img src={item?.thumbnail} alt={item?.title} className="w-full rounded-md shadow-lg" />
        </div>
        <div className="w-1/2 px-8">
          <h1 className="text-3xl font-semibold mb-4">{item?.title}</h1>
          <p className="text-lg font-light mb-4">{item?.description}</p>
          <div className="mb-4">
            <span className="text-2xl font-semibold">${discountedPrice.toFixed(0)}</span>
            <span className="text-lg text-gray-500 line-through ml-2">${item?.price}</span>
            <span className="text-lg text-green-500 ml-2">-{item?.discountPercentage}%</span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-semibold">Rating:</span>
            <span className="text-lg ml-2">{averageRating().toFixed(2)}/5</span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-semibold">Stock:</span>
            <span className="text-lg ml-2">{item?.stock} available</span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-semibold">Brand:</span>
            <span className="text-lg ml-2">{item?.brand}</span>
          </div>
          <div className="mb-4">
            <span className="text-lg font-semibold">Category:</span>
            <span className="text-lg ml-2 capitalize">{item?.category}</span>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => addToCart(item)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add to Cart
            </button>
            {user && (
              (isInWishList ? (
                <button
                  onClick={handleRemoveFromWishlist}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Remove from Wishlist
                </button>
              ) : (
                <button
                  onClick={handleSaveToWishlist}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                >
                  Save to Wishlist
                </button>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {reviews?.map((review, index) => (
          <div key={index} className="bg-gray-100 p-4 mb-4 rounded-md">
            <h3 className="text-lg font-semibold">{review?.name}</h3>
            <p className="text-sm">Rating: {review?.rating}/5</p>
            <p className="text-sm">{review?.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={newReview?.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-semibold">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              min="1"
              max="5"
              value={newReview?.rating}
              required
              onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="text" className="block text-sm font-semibold">
              Review
            </label>
            <textarea
              id="text"
              value={newReview?.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
              rows="4"
            ></textarea>
          </div>
          {user ? (
            <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md">
              Submit Review
            </button>
          ): (
            <button disabled className="bg-blue-400 text-white px-4 py-2 rounded-md">
              Please log in to submit a review.
            </button>
          )}
        </form>
      </div>
      <Recommendation categoryId={categoryId} productId={productId} addToCart={(product) => addToCart(product)} />
    </div>
  );
};

export default ItemDetail;