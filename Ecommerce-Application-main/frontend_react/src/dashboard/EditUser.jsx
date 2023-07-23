import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getRequestedUser, editUser } from "../api";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [role, setRole] = useState("");
  const { userType, userId } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const active = String(isActive);

    if(name && email && active && role) {
      await editUser({ name, email, userId, active, role })
       .then(() => {alert('Sucessfully Updated!'); navigate(`/dashboard/${userType}`)})
       .catch(() => alert('Something went wrong...'));
    }
  };

  const getCurrentUserDetails = async () => {
    const { data } = await getRequestedUser(userId);
    const user = JSON.parse(data);
    setName(user?.name)
    setEmail(user?.email)
    setIsActive(JSON.parse(user?.isActive))
    setRole(user?.accessLevel)
  }

  useEffect(() => {
    getCurrentUserDetails();
  },[userId])

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h1 className="text-2xl font-semibold mb-6">Edit User</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="isActive" className="block mb-1">
                Is Active
              </label>
              <input
                type="checkbox"
                id="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-5 h-5"
              />
            </div>
            <div>
              <label htmlFor="role" className="block mb-1">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-6 rounded-md"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
