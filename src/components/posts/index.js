import React from 'react';

import './index.css';
import user from '../../assets/images/user.png';

const Posts = ({posts}) => {
  console.log(posts)
  return <div className='posts'>
    {posts.map(e => <div className='post' key={e.id}>
        <div className='author'>
          <div className='author-img'>
            <img
              src={user}
              className='avatar'
              width='65'
              height='65'
              alt=''
            />
          </div>
          {e.name && <span>{e.name}</span>}
        </div>
        <div className='post-data'>
          <div className='post-detail'>
            <h3 className='p-title mb-2'>{e.title}</h3>
            <p className='p-description'>{e.body}</p>
          </div>
          <div className='comment-section'>
            <i className='fa fa-comments'></i>
            <span className='count'>2</span> Comments
          </div>
        </div>
      </div>)}
  </div>
};

export default Posts;