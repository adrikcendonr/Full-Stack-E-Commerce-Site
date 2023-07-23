import React, { useState, useEffect } from 'react';
import { getUserDetails, updateUserDetails, deleteUser } from '../../api';
import { useNavigate } from 'react-router-dom';

const LoginAndSecurity = ({ user }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const userId = user?._id?.$oid;

  document.title = "Account Settings";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(password) {
      const { data } = await updateUserDetails({ name, email, password });

      if(data) {
        alert('Sucess!')
        localStorage.clear();
        navigate('/login');
        window.location.reload();
      }

    }
    else {
      const { data } = await updateUserDetails({ name, email });

      if(data) {
        alert('Sucess!');
      }
    }
  };

  const handleDeleteAccount = async () => {
    const { data } = await deleteUser(userId);

    if (data) {
      alert('Sucess!')
      localStorage.clear();
      navigate('/');
      window.location.reload();
    }
  };

  const getCurrentUserDetails = async () => {
    const { data } = await getUserDetails();
    const user = JSON.parse(data);
    setName(user?.name)
    setEmail(user?.email)
  }

  useEffect(() => {
    getCurrentUserDetails();
  },[])

  return (
    <div className="bg-gray-100 min-h-screen p-4">
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="py-1 mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-1 mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-1 mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Settings
        </button>
      </form>
      <button
        onClick={(e) => {e.stopPropagation(); handleDeleteAccount();}}
        className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Delete Account
      </button>
    </div>
  </div>
  )
}

export default LoginAndSecurity;
