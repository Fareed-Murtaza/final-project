import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';
import { fetchPosts } from '../../redux/actions/posts';
import loadingGif from '../../assets/images/loading.gif';
import noData from '../../assets/images/no-data.jpg';
import Posts from '../../components/posts';

const Home = () => {
  const { currentUser } = useSelector(state => state.auth);
  const { posts, loading } = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchPosts()), [])

  return <div className='home'>
    {loading && <img className='loading' src={loadingGif} alt='' />}
    {!loading && (!posts?.length ? <div className='no-data'>
      <div className='nd-container'>
        <img src={noData} alt='' width='100%' height='auto' />
        <h3 className='no-data-title'>No Post Found</h3>
      </div>
    </div> : <div className='post-container'>
      <div className='p-header'>
        <h1 className='p-heading'>
          Posts:
        </h1>
        {currentUser && <div className='custom-btn'>
          <div className='new-post'>Create New</div>
        </div>}
      </div>
      <div className='posts'>
        <Posts posts={posts} />
      </div>
    </div>)}
  </div>
};

export default Home;

{/* <div key={post.id}>{post.body}</div> */ }
