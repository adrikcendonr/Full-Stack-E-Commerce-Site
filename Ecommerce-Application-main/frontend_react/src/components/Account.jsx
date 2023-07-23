import React from 'react';
import { GrShieldSecurity } from 'react-icons/gr';
import { GoPackage, GoSignOut } from 'react-icons/go';
import { BsListStars } from 'react-icons/bs';

const Account = ({ user, signOut }) => {
  const AccountCard = ({ title, body, icon, route }) => {
    if (route === '/signout') {
      return (
        <button 
          onClick={signOut} 
          className="flex flex-row bg-transparent border border-gray-500 rounded-lg p-4 width-12 hover:bg-gray-200"
        >
          <div className="flex-[1_1_0%] justify-center items-center m-2"> 
            {icon} 
          </div>
          <div className="flex-[3_3_0%] flex-col text-left mt-2">
            <h1 className="text-md font-regular"> {title} </h1>
            <p className="text-sm text-gray-500"> {body} </p>
          </div>
        </button>
      )
    }

    return (
      <a 
        href={user ? route : '/login'} 
        className="flex flex-row bg-transparent border border-gray-500 rounded-lg p-4 width-12 hover:bg-gray-200"
      >
        <div className="flex-[1_1_0%] justify-center items-center m-2"> 
          {icon} 
        </div>
        <div className="flex-[3_3_0%] flex-col text-left mt-2">
          <h1 className="text-md font-regular"> {title} </h1>
          <p className="text-sm text-gray-500"> {body} </p>
        </div>
      </a>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-3xl mx-auto bg-transparent p-6">
        <h1 className="text-2xl font-regular mb-8">Your Account</h1>
        <div className="grid gap-4 grid-cols-2 grid-rows-3">
          <AccountCard 
            title="Login & Security" 
            body="Edit name, email, and password" 
            icon={<GrShieldSecurity size={50} />}
            route="/account/login-and-security"
          />
          <AccountCard 
            title="Track Orders" 
            body="Track and cancel orders" 
            icon={<GoPackage size={50} />}
            route={`/${user?._id?.$oid}/orders`}
          />
          <AccountCard 
            title="Wishlist" 
            body="View your wishlist" 
            icon={<BsListStars size={50} />}
            route={`/${user?._id?.$oid}/wishlist`}
          />
          <AccountCard 
            title="Sign Out" 
            body="Sign out of your account" 
            icon={<GoSignOut size={50} />}
            route="/signout"
          />
        </div>
      </div>
    </div>
  )
}

export default Account;