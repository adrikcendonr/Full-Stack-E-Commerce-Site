import React, { useState } from 'react';
import { createUser } from '../api'; 
import { useNavigate, useParams } from 'react-router-dom';

const CreateUser = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', accessLevel: '' });
  const navigate = useNavigate();
  const { userType } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, accessLevel } = formData;
    const { data } = await createUser({ name, email, password, accessLevel });
    if (data) {
      setFormData({ name: '', email: '', password: '', accessLevel: '' });
      navigate(`/dashboard/${userType}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Create User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="accessLevel"
            className="block text-gray-700 font-bold mb-2"
          >
            Access Level
          </label>
          <select
            id="accessLevel"
            name="accessLevel"
            value={formData.accessLevel}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select access level</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-700 text-gray-100 hover:bg-blue-600 text -white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
            
export default CreateUser;
