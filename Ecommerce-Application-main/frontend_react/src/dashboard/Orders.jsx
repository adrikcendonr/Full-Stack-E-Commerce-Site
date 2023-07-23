import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../api';
import Pagination from './Pagination';
import Loader from '../utils/Loader';
import { useNavigate } from 'react-router';

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const navigate = useNavigate();

  const fetchAllOrders = async (page, limit) => {
    setLoading(true);
    const data = await getAllOrders(page, limit);
    const parseOrders = JSON.parse(data?.data)
    setOrders(parseOrders?.orders);
    setTotalPages(parseOrders?.totalPages);
    setLoading(false);
  } 

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchAllOrders(currentPage, usersPerPage);
  },[currentPage])

  if(loading) return <Loader />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Manage Orders</h1>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Update
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {orders?.map((order, i) => (
            <tr key={i}> 
              {order?.items?.slice(0,1).map((item, i) => (
                <td className="px-6 py-4 whitespace-nowrap">{item?.title.slice(0,10)}</td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap">{order.items?.length}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order?.total}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order?.status}</td>
              <td onClick={() => navigate(`/dashboard/orders/edit/${order?._id?.$oid}`)} className='cursor-pointer px-6 py-4 whitespace-nowrap rounded-md text-red-600 font-bold'>Edit</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default Orders;