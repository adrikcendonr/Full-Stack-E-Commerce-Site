import React, { useContext } from 'react';
import cartImage from '../assests/empty-cart.svg';
import { token, placeOrder } from '../api';
import CartContext from "../context/CartContext";
import { useNavigate } from 'react-router-dom';

const Cart = ({ user }) => {
  const { cart, setCart } = useContext(CartContext);

  document.title = cart?.length !== 0 ? `Cart(${cart?.length})`: 'Cart';

  const navigate = useNavigate();

  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item._id.$oid !== productId);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const getTotal = () => {
    const total = cart.reduce((total, item) => {
      const discountedPrice = item.price * (100 - item.discountPercentage) / 100;
      return total + discountedPrice * item.quantity;
    }, 0);
    return total.toFixed(2);
  };

  const purchase = async (e) => {
    e.preventDefault();
    
    const userId = user?._id;

    const order = {
      userId: userId,
      items: cart,
      status: 'Confirmed',
      total: Number(getTotal()),
    };

    const { data } = await placeOrder(order);

    if (data) {
      navigate(`/orders/${data.orderId}`);
      window.location.reload();
      localStorage.removeItem('cart');
    }
  }

  return (
    <section className='bg-gray-100'>
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 px-4 md:mt-0 pt-8 pb-12 md:pt-24'>
        {cart?.length === 0 && (
          <div className='flex flex-wrap bg-white p-4 items-center justify-center gap-20'>
            <div className='flex flex-col'>
              <img src={cartImage} alt="empty-cart" className='w-[600px]' />
            </div>
            <div className='flex flex-col justify-center items-center'>
              <p className='text-center text-xl font-semibold'>Your Cart is empty.</p>
              {token ? (
                <p className='mt-4 px-8 font-sans'>Your Shopping Cart lives to serve. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more.
                Continue shopping on the <a href='/' className='text-blue-500 font-semibold hover:underline'>E-shop</a> homepage.</p>
              ):(
                <div className='mt-4 flex flex-wrap gap-3 lg:gap-10'>
                  <div className='flex flex-wrap'>
                    <a href="/login" className='bg-blue-600 w-full rounded-md flex px-4 py-2 justify-center items-center text-white hover:bg-blue-500'>Sign into your account</a>
                  </div>
                  <div className='flex flex-wrap'>
                    <a href="/signup" className='bg-gray-100 w-full rounded-md flex px-4 py-2 justify-center items-center text-black hover:bg-greenOverlay'>Sign up now</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {cart?.length !== 0 && (
          <>
            <div className="space-y-4">
              {cart?.map((item) => (
                <div
                  key={item._id.$oid}
                  className="grid grid-cols-5 gap-4 items-center bg-white shadow rounded p-4"
                >
                  <img
                    className="w-full h-32 object-cover rounded"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <div className="col-span-3">
                    <h2 className="text-xl font-semibold mb-2">{item?.title}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold mb-2">
                      ${((item?.price * (100 - item?.discountPercentage)) / 100).toFixed(2)}
                    </p>
                    <p className="text-gray-600">Qty: {item?.quantity}</p>
                    <button
                      className="bg-red-600 text-white font-semibold py-1 px-2 rounded hover:bg-red-700"
                      onClick={(e) => {e.stopPropagation(); removeFromCart(item?._id.$oid);}}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex items-end justify-end mt-6">
                <div className="w-64 p-4 bg-white shadow rounded">
                  <p className="text-xl font-semibold mb-4">
                    Total: ${getTotal()}
                  </p>
                  <button onClick={purchase} className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700">
                    Place order
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Cart;