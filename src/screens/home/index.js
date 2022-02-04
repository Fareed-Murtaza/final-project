import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';
import { fetchPosts } from '../../redux/actions/posts';
import loadingGif from '../../assets/images/loading.gif';
import noData from '../../assets/images/no-data.jpg';
import user from '../../assets/images/user.png';

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
    </div> : <div className='post'>
      <div className='p-header'>
        <h1 className='p-title'>
          Posts:
        </h1>
        {currentUser && <div className='custom-btn'>
          <div className='new-post'>Create New</div>
        </div>}
      </div>
      <div className='posts'>
        {posts.map(post => <article key={post.id} className="question question-type-normal question_author_yes sticky post-2110 type-question status-publish hentry question-category-analytics question_tags-analytics question_tags-programs">
          <h2>{post.title}</h2>
          <div className="question-author">
            <div className='question-author-img tooltip-n'>
              <img
                src={user}
                itemProp="image"
                className="avatar avatar-65 photo"
                width="65"
                height="65"
              />
            </div>
            <span itemProp="name" className="hide">{post.userId}</span>
          </div>
          <div className="question-inner">
            <div className="question-desc">
              <div>{post.body}</div>
            </div>
            <span className="question-comment">
              <i className="fa fa-comments"></i>
              <span itemProp="answerCount">2</span> Comments
            </span>
            <div className="clearfix"></div>
          </div>
        </article>)}
      </div>
    </div>)}
  </div>
};

export default Home;

{/* <div key={post.id}>{post.body}</div> */ }
