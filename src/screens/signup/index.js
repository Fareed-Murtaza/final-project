import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './index.css';
import loadingGif from '../../assets/images/loading.gif';
import { userSignup } from '../../redux/actions/authentication';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { currentUser, loading } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(`/`);
    }
  }, [currentUser, navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userSignup(name, email, password))
  }

  const nameChange = (e) => {
    setName(e.target.value)
  }
  const emailChange = (e) => {
    setEmail(e.target.value)
  }
  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  return <div className='signup'>
    {!loading && <form className='form-signup' onSubmit={handleSubmit}>
      <h1 className='h3 mb-3 font-weight-normal text-center'>
        Sign Up
      </h1>

      <div>
        <input
          type='name'
          id='nameInput'
          placeholder='Enter name'
          name='name'
          onChange={nameChange}
          value={name}
          required
        />
        <input
          type='email'
          id='emailInput'
          placeholder='Enter Email'
          name='email'
          onChange={emailChange}
          value={email}
          required
        />
        <input
          type='password'
          id='passwordInput'
          placeholder='Enter Password'
          name='password'
          onChange={passwordChange}
          value={password}
          required
        />
      </div>

      <button className='btn btn-secondary btn-block' type='submit'>
        Sign Up
      </button>

      <hr />

      <p>Have an account</p>
      <Link to='/signin'>
        <button className='btn btn-prmary btn-block' type='button' id='btn-signup'>
          <i className='fas fa-user'></i> Sign In
        </button>
      </Link>
    </form>}

    {loading && <img src={loadingGif} alt='' />}
  </div>
};

export default SignUp;