import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './index.css';
import loadingGif from '../../assets/images/loading.gif';
import { userSignin } from '../../redux/actions/authentication';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {currentUser, loading} = useSelector(state => state.auth)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => currentUser? navigate('/'): '', [currentUser, navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userSignin(email, password))
  }

  const emailChange = (e) => {
    setEmail(e.target.value)
  }
  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  return <div className='signin'>
    {!loading && <form className='form-signup' onSubmit={handleSubmit}>
      <h1 className='mb-4 font-weight-normal text-center'>
        Sign In
      </h1>

      <input
        type='email'
        id='emailInput'
        placeholder='Enter Email'
        name='email'
        onChange={emailChange}
        value={email}
        className='mb-3'
        required
      />
      <input
        type='password'
        id='passwordInput'
        placeholder='Enter Password'
        name='password'
        onChange={passwordChange}
        value={password}
        className='mb-3'
        required
      />

      <button className='btn btn-primary btn-block mb-3' type='submit'>
        Sign In
      </button>

      <hr className='mb-4' />

      <p className='m-0'>Don`t have an account? <Link to='/signup'>Sign Up</Link></p>
    </form>}
    {loading && <img src={loadingGif} alt='' />}
  </div>
};

export default Signin;