import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../api';
import Pagination from './Pagination';
import Loader from '../utils/Loader';
import { useNavigate } from 'react-router';

const Products = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 10;
  const navigate = useNavigate();

  const fetchAllProducts = async (page, limit) => {
    setLoading(true);
    const data = await getAllProducts(page, limit);
    const parseProdutcs = JSON.parse(data?.data)
    setProducts(parseProdutcs?.products);
    setTotalPages(parseProdutcs?.totalPages);
    setLoading(false);
  } 

  const fetchSearchedProducts = async (page, limit) => {
    const data = await getAllProducts(page, limit);
    const parseProdutcs = JSON.parse(data.data)
    const filteredUsers = parseProdutcs?.products?.filter(product => product.category.toLowerCase().includes(searchTerm.toLowerCase()))
    setProducts(filteredUsers);
    setTotalPages(JSON.parse(data.data));
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      fetchSearchedProducts(currentPage, productsPerPage);
    }
    else {
      fetchAllProducts(currentPage, productsPerPage);
    }
  },[searchTerm, currentPage])

  if(loading) return <Loader />

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='flex flex-row justify-between items-center'>
        <h1 className="text-2xl font-semibold mb-6">All Products</h1>
        <input
          type="text"
          placeholder="Search by category..."
          className="w-64 rounded-md py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit Product
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {products?.map((product, i) => (
            <tr key={i}> 
              <td className="px-6 py-4">{product?.title}</td>
              <td className="px-6 py-4">{product?.category}</td>
              <td className="px-6 py-4">{product?.stock}</td>
              <td className="px-6 py-4">{product?.brand}</td>
              <td className="px-6 py-4">{product?.price}</td>
              <td onClick={() => navigate(`/dashboard/products/edit/${product?._id?.$oid}`)} className='cursor-pointer px-6 py-4 whitespace-nowrap rounded-md text-red-600 font-bold'>Edit</td>
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

export default Products;