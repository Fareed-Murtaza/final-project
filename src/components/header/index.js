import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './index.css';
import logo from '../../assets/images/logo.png';
import { userLogout } from '../../redux/actions/authentication';

const Header = () => {
  const { currentUser, error } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => !currentUser ? navigate('/') : '', [currentUser])

  const logoutHandler = () => dispatch(userLogout())

  return <div className='header'>
    <div className='h-container col-12'>
      <div className='d-flex justify-content-between'>
        <div className='logo'>
          <img src={logo} alt='' width='100%' height='auto' />
        </div>
        <div className='d-flex h-menu'>
          <Link className='h-menu-li' to='/'>All Posts</Link>
          <Link className='h-menu-li' to='/'>My Posts</Link>
          {!currentUser && <Link className='h-menu-li' to='/signin'>Sign In</Link>}
          {currentUser && <a className='h-menu-li' onClick={logoutHandler}>Log Out</a>}
        </div>
      </div>
    </div>
  </div>
}

export default Header;