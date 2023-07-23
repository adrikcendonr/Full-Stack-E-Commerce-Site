import React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assests/login_logo.png';
import { setTokenTimestamp } from '../api';

const Signin = () => {
  const [validation, setValidation] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const validateEmail = async e => {
    e.preventDefault();
    const email = emailRef.current.value;

    if(email) { 
      const body = { email };
      await axios.post('/api/v1/user/validation', body)
        .then(() => {setValidation(true); setError(false);})
        .catch(() => setError(true));    
    }
    else {
      alert("Please enter a valid email!")
    }
  }

  const onSubmit = async e => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if(email && password) { 
      const body = { email, password };
      await axios.post('/api/v1/user/signin', body)
        .then((res) => {localStorage.setItem("access_token", res.data?.access_token); localStorage.setItem("user", res.data?.user); setTokenTimestamp(); setError(false); navigate('/'); window.location.reload();})
        .catch((e) => {alert(e.response.data?.message)});
    }
    else {
      setError(true);
    }

  }

  return (
    <section className='bg-gray-100 h-screen'>
      <div className='bg-white flex flex-col justify-center items-center mx-auto sm:px-6 lg:px-8 px-4 md:mt-0 pt-8 pb-12'>
        <a href='/' className='mb-4 flex items-start justify-start'>
          <img src={logo} alt="company-logo" className='h-[80px] pointer-events-none'/>
        </a>
        <form className='bg-white shadow-lg px-6 py-4 w-[400px] border-2'>
          <h1 className='font-semibold text-2xl'>Sign in</h1>
          <div className='flex flex-col py-6 gap-2 text-md'>
            <label htmlFor="email-address" className="text-sm font-semibold">
              Email
            </label>
            {validation ? (
              <input
                id="email-address"
                name="email"
                autoComplete='email'
                value={emailRef.current.value}
                ref={emailRef}
                disabled
                className={'mb-2 px-2 py-2 text-sm border-2 w-full rounded-[4px] focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:z-10'}
              />
            ): (
              <input
                id="email-address"
                name="email"
                autoComplete='email'
                ref={emailRef}
                required
                className={'mb-2 px-2 py-2 text-sm border-2 w-full rounded-[4px] focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:z-10'}
              />
            )}
            {validation && (
              <>
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={passwordRef}
                  autoComplete='password'
                  required
                  className={'px-2 py-2 text-sm border-2 w-full rounded-[4px] focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:z-10'}
                />
              </>
            )}
            {error && <p className='text-start text-red-500 font-semibold text-sm'>Email does not exists!</p>}
            <button onClick={validation ? onSubmit : validateEmail} className='bg-blue-600 w-full rounded-[4px] flex px-4 py-2 justify-center items-center text-white hover:bg-blue-500'>{validation ? "Sign in" : "Continue" }</button>
          </div>
        </form>
        <div className='mt-8 flex flex-row'>
          <hr className='mt-2.5 border-gray-500 w-32'/>&nbsp; <p className='text-sm font-semibold'>New to E shop?</p> &nbsp;<hr className='mt-2.5 border-gray-500 w-32'/>
        </div>
        <div className='mt-2 flex flex-col'>
          <a href='/signup' className='bg-gray-200 w-[350px] text-black font-semibold rounded-md flex px-4 py-2 justify-center items-center hover:bg-gray-100'>Create your E-shop account</a>
        </div>
      </div>
    </section>
  )
}

export default Signin;