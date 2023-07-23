import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../api';
import { useParams } from 'react-router-dom';

const UpdateStatus = () => {
  const [orderData, setOrderData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { orderId } = useParams();

  const fetchOrderDetails = async () => {
    const { data } = await getOrders(orderId);
    setOrderData(data);
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { data } = await updateOrderStatus(id, newStatus);
      if(data) {
        fetchOrderDetails();
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  
  useEffect(() => {
    fetchOrderDetails();
  },[])

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <div className='flex flex-row justify-between mb-4'>
          <h1 className="text-2xl font-bold mb-4">Order Details</h1>
          <button onClick={toggleModal} className="p-2 text-white font-semibold bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded transition duration-150 ease-in-out">
            Change Status
          </button>
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
      {modalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center  pt-4 px-4 pb-20 text-center">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Change Status
                  </h3>
                  <div className="mt-2">
                    <label htmlFor="orderStatus" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      id="orderStatus"
                      value={orderData.status}
                      onChange={(e) => updateStatus(orderData._id.$oid, e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="Cancelled">Cancelled</option>
                      <option value="Getting Packed">Getting Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={toggleModal}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateStatus;