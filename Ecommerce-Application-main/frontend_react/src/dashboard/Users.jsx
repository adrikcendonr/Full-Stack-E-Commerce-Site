import React, { useState, useEffect } from 'react';
import { getAllUser } from '../api';
import Pagination from './Pagination';
import Loader from '../utils/Loader';
import { useParams, useNavigate } from 'react-router';

const Users = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { userType } = useParams();
  const usersPerPage = 10;
  const navigate = useNavigate();

  const fetchAllUsers = async (page, limit, type) => {
    setLoading(true);
    const data = await getAllUser(page, limit, type);
    const parseUser = JSON.parse(data?.data)
    setUsers(parseUser?.users);
    setTotalPages(parseUser?.totalPages);
    setLoading(false);
  } 

  const fetchSearchedUser = async (page, limit, type) => {
    const data = await getAllUser(page, limit, type);
    const parseUser = JSON.parse(data.data)
    const filteredUsers = parseUser?.users?.filter(user => user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    setUsers(filteredUsers);
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
      fetchSearchedUser(currentPage, usersPerPage, userType);
    }
    else {
      fetchAllUsers(currentPage, usersPerPage, userType);
    }
  },[searchTerm, userType, currentPage])

  if(loading) return <Loader />

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='flex flex-row justify-between items-center'>
        <h1 className="text-2xl font-semibold mb-6">{userType === "admin" ? "Manage Admins" : "Manage Users"}</h1>
        <input
          type="text"
          placeholder="Search by email..."
          className="w-64 rounded-md py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <a href='/dashboard/user/add' className='mb-6 px-3 py-2 bg-blue-600 rounded-md hover:bg-blue-500 text-gray-100'>Create User</a>
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                UserId
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                isActive
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit User
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {users?.map((user, i) => (
            <tr key={i}> 
              <td className="px-6 py-4 whitespace-nowrap">{user?.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user?.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user?._id?.$oid}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user?.isActive}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user?.accessLevel}</td>
              <td onClick={() => navigate(`/dashboard/${userType}/edit/${user?._id?.$oid}`)} className='cursor-pointer px-6 py-4 whitespace-nowrap rounded-md text-red-600 font-bold'>Edit</td>
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

export default Users;