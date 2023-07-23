import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assests/login_logo.png';

const Signup = () => {
  const [formData, setFormData] = useState({ name:'', email: '', password: '' , repeatpassword: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { name, email, password, repeatpassword } = formData;

  const handleChangeInput = (e) => {

    const { name, value } = e.target;

    setFormData({...formData, [name] : value});

  }

  const onSubmit = async e => {
    e.preventDefault();

    if(name && email && password && repeatpassword) {
      const body = { name, email, password, repeatpassword };
      await axios.post('/api/v1/user/signup', body)
        .then(() => {navigate('/login'); window.location.reload(); setError(false);})
        .catch((e) => setError(e.response.data?.message))
    }
    else {
      setError("Invalid Credentials!");
    }

  }

  return (
    <section className='bg-gray-100 h-screen'>
      <div className='bg-white flex flex-col justify-center items-center mx-auto sm:px-6 lg:px-8 px-4 md:mt-0 pt-8 pb-12'>
        <a href='/' className='mb-4 flex items-start justify-start'>
          <img src={logo} alt="company-logo" className='h-[80px] pointer-events-none'/>
        </a>
        <form onSubmit={onSubmit} className='bg-white shadow-lg px-6 py-4 w-[400px] border-2'>
          <h1 className='font-semibold text-2xl'>Create account</h1>
          <div className='flex flex-col py-6 gap-2 text-md'>
            <label htmlFor="email-address" className="text-sm font-semibold">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="name"
              onChange={handleChangeInput}
              required
              className={'mb-2 px-2 py-2 text-sm border-2 w-full rounded-[4px] focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:z-10'}
            />
            <label htmlFor="email-address" className="text-sm font-semibold">
              Email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete='email'
              onChange={handleChangeInput}
              required
              className={'mb-2 px-2 py-2 text-sm border-2 w-full rounded-[4px] focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:z-10'}
            />
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChangeInput}
              required
              className={'px-2 py-2 text-sm border-2 w-full rounded-[4px] focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:z-10'}
            />
            <label htmlFor="password" className="text-sm font-semibold">
              Re-enter password
            </label>
            <input
              id="repeatpassword"
              name="repeatpassword"
              type="password"
              onChange={handleChangeInput}
              required
              className={'px-2 py-2 text-sm border-2 w-full rounded-[4px] focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:z-10'}
            />
            {error && <p className='text-start text-red-500 font-semibold text-sm'>{error}</p>}
            <button className='mt-4 bg-blue-600 w-full rounded-[4px] flex px-4 py-2 justify-center items-center text-white hover:bg-blue-500'>Sign up</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Signup;