import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillHome, AiOutlineShoppingCart, AiFillShopping } from 'react-icons/ai';

const Sidebar = ({ user }) => {
  const dashboardLinks = [
    {
      name:"Manage Admins",
      link:'admin'
    },
    {
      name:"Manage Users",
      link:'user'
    },
  ]

  const shoppingItemsLinks = [
    {
      name:"All Products",
      link:'products'
    },
    {
      name:"Add Product",
      link:'products/add'
    }
  ]

  const ordersLinks = [
    {
      name:"All Orders",
      link:'orders'
    },
  ]

  return (
    <div className='bg-gray-900 border-r'>
      <div className='flex flex-col justify-center items-center pb-20'>
        <a href="/dashboard" className='flex flex-col justify-center items-center mt-4 gap-2'>
          <img src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user?.name}`} alt='profile-pic' className='w-[100px] h-[100px] rounded-full' />
          <h1 className='text-gray-100 text-md'>{user?.name}</h1>
        </a>
        <div className='flex flex-col justify-center items-center mt-4 gap-2'>
          <a href="/dashboard" className='flex flex-row justify-start items-start text-gray-100 gap-2'>
            <AiFillHome size={24} className="mt-0.5" />
            <h1 className='text-[22px]'>Dashboard</h1>
          </a>
          {dashboardLinks.map((links, i) => (
            <NavLink 
              key={i}
              to={`/dashboard/${links.link}`}
              className={({ isActive }) => isActive ? 'bg-gray-800 px-16 py-2' : 'px-16 py-2'}
            >
              <p className='text-gray-100 text-sm'>{links.name}</p>
            </NavLink>
          ))}
          <a href="/dashboard/products" className='flex flex-row justify-start items-start text-gray-100 gap-2'>
            <AiOutlineShoppingCart size={24} className="mt-0.5" />
            <h1 className='text-[22px]'>Products</h1>
          </a>
          {shoppingItemsLinks.map((links, i) => (
            <NavLink 
              key={i}
              to={`/dashboard/${links.link}`}
              className={({ isActive }) => isActive ? 'bg-gray-800 px-16 py-2' : 'px-16 py-2'}
            >
              <p className='text-gray-100 text-sm'>{links.name}</p>
            </NavLink>
          ))}
          <a href="/dashboard/orders" className='flex flex-row justify-start items-start text-gray-100 gap-2'>
            <AiFillShopping size={24} className="mt-0.5" />
            <h1 className='text-[22px]'>Orders</h1>
          </a>
          {ordersLinks.map((links, i) => (
            <NavLink 
              key={i}
              to={`/dashboard/${links.link}`}
              className={({ isActive }) => isActive ? 'bg-gray-800 px-16 py-2' : 'px-16 py-2'}
            >
              <p className='text-gray-100 text-sm'>{links.name}</p>
            </NavLink>
          ))}
        </div>
        <div className='flex flex-col justify-center items-center mt-4'>
          <a 
            className='bg-white px-2 py-1.5 rounded-md font-medium'
            href='/'
          >
            Back to Homepage
          </a>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;