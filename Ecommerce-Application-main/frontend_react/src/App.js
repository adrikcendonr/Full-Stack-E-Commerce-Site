import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Home from './Routes/Home';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import { getUser, token, checkAccessTokenState } from './api';
import Dashboard from './dashboard/Home';
import Loader from './utils/Loader';

const App = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const fetchUser = () => {
    const data = getUser();
    if (data) {
      setUser(JSON.parse(data));
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);

    navigate('/');
  }

  useEffect(() => {
    checkAccessTokenState();
    fetchUser();
  },[])

  return (
    <React.Fragment>
      <Routes>
        <Route path='/*' element={<Home user={user} signOut={signOut} />} />
        <Route path='/login' element={token ? <Navigate to='/' /> : <Signin />} />
        <Route path='/signup' element={token ? <Navigate to='/' /> : <Signup />} />
        {user?.accessLevel === "admin" ? (
          <React.Fragment>
            <Route path='/dashboard/*' element={<Dashboard user={user} />} />
          </React.Fragment>
        ): (
          <Route path='/dashboard/*' element={<Loader />} />
        )}
      </Routes>
    </React.Fragment>
  )
}

export default App;