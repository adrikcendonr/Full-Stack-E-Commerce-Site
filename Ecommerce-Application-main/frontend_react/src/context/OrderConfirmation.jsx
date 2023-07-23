import React, { useState, useEffect } from 'react';
import { getOrders, cancelOrder } from '../api';
import { useParams } from 'react-router-dom';

const OrderConfirmation = () => {
  const [orderData, setOrderData] = useState(null);
  const { orderId } = useParams();

  const fetchOrderDetails = async () => {
    const { data } = await getOrders(orderId);
    setOrderData(data);
  }

  const handleCancelOrder = async () => {
    const { data } = await cancelOrder(orderId);
    if(data) {
      alert('Sucess!')
      fetchOrderDetails();
    }
  }

  useEffect(() => {
    fetchOrderDetails();
  },[])

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <div className='flex flex-row justify-between mb-4'>
          <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
          {orderData?.status === "Confirmed" && (
            <button onClick={(e) => {e.stopPropagation(); handleCancelOrder();}} className="p-2 text-white font-semibold bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded transition duration-150 ease-in-out">
              Cancel Order
            </button>
           )}
        </div>
        <p>Order ID: {orderData?._id.$oid}</p>
        <p>Total: ${orderData?.total}</p>
        <p>Status: {orderData?.status}</p>

        <div className="mt-6">
          {orderData?.items?.map((item, index) => (
            <div key={index} className="bg-gray-100 rounded-md p-4 mb-4">
              <div className="flex items-center">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p>Brand: {item.brand}</p>
                  <p>Category: {item.category}</p>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation;