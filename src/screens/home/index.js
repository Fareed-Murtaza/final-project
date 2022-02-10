import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPosts } from '../../redux/actions/posts';
import loadingGif from '../../assets/images/loading.gif';
import noData from '../../assets/images/no-data.jpg';
import Posts from '../../components/posts';

import './index.css';

const Home = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { posts, loading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => posts?.length === 0? dispatch(fetchPosts()): '', []);

  const newPostBtnClickHandler = () => {
    navigate(`/new`)
  }

  return (
    <div className='home'>
      {loading && <img className='loading' src={loadingGif} alt='' />}
      {!loading &&
        (!posts?.length ? (
          <div className='no-data'>
            <div className='nd-container'>
              <img src={noData} alt='' width='100%' height='auto' />
              <h3 className='no-data-title'>No Post Found</h3>
            </div>
          </div>
        ) : (
          <div className='post-container'>
            <div className='p-header'>
              <h1 className='p-heading'>Posts:</h1>
              {currentUser && (
                <div className='custom-btn' onClick={newPostBtnClickHandler}>
                    <span className='new-post-heading'>Create New</span>
                </div>
              )}
            </div>
            <div className='posts'>
              <Posts posts={posts} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
