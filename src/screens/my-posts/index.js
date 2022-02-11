import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMyPosts } from '../../redux/actions/posts';
import loadingGif from '../../assets/images/loading.gif';
import noData from '../../assets/images/no-data.jpg';
import Posts from '../../components/posts';
import { useNavigate } from 'react-router-dom';

import './index.css';


const MyPosts = () => {
  const { currentUser } = useSelector(state => state.auth)
  const { posts, loading, myPosts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(currentUser) {
      if (myPosts?.length === 0) dispatch(getMyPosts(currentUser.uid))
    } else {
      navigate(`/`)
    }
  }, [posts]);

  return (
    <div className='home'>
      {loading && <img className='loading' src={loadingGif} alt='loading' />}
      {!loading &&
        (!myPosts?.length ? (
          <div className='no-data'>
            <div className='nd-container'>
              <img src={noData} alt='no data' width='100%' height='auto' />
              <h3 className='no-data-title'>No Post Found</h3>
            </div>
          </div>
        ) : (
          <div className='post-container'>
            <div className='p-header'>
              <h1 className='p-heading'>My Posts:</h1>
            </div>
            <div className='posts'>
              <Posts posts={myPosts} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyPosts;
