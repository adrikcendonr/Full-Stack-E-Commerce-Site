import React, { useState, useEffect } from 'react';
import { getAllUserOrders } from '../api';
import { useParams } from 'react-router-dom';
import Loader from '../utils/Loader';

const Orders = () => {
  const [orders, setOrders] = useState([]); // setting the state
  const { userId } = useParams(); // getting from useParams :userId

  document.title = "Orders"; 

  const fetchUsersOrders = async () => {
    const { data } = await getAllUserOrders(userId);  /// 
    setOrders(data)
  }

  useEffect(() => {
    fetchUsersOrders(); // loads as the /orders route is accessed 
  },[])

  if(orders.length === 0) return <Loader /> // if no order order found display loader

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <ul className="divide-y divide-gray-200">
        {orders?.map((order) => (
          <li key={order._id.$oid} className="bg-white py-6 px-4 shadow-sm rounded-md">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
              <div className="flex-grow">
                <p className="text-lg font-semibold">Order ID: {order._id.$oid}</p>
                <p>Total: ${order.total}</p>
                <p>Status: {order.status}</p>
                <p>Items: {order.items.length} item(s)</p>
              </div>
              <div className="flex-shrink-0 mt-4 md:mt-0">
                <a href={`/orders/${order._id.$oid}`} className="p-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded transition duration-150 ease-in-out">
                  View Details
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Orders;