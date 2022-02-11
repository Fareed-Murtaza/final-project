import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { deletePost } from '../../redux/actions/posts';

import './index.css';


const Posts = ({ posts }) => {
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div className='posts'>
      {posts.map((e) => (
        <div className='post' key={e.id}>
          <div className='post-data'>
            <div className='post-detail'>
              <h3 className='p-title mb-2'>{e.title}</h3>
              <p className='p-description'>{e.body}</p>
            </div>
            <div className='comment-section'>
              <div>
                <i className='fa fa-comments'></i>
                <span className='count'>{e.comments?.length? e.comments.length: 0}</span> Comments
              </div>
              <div className='post-actions'>
                {currentUser?.uid === e.userId && <>
                  <Link className='action-delete'  to='' onClick={() => deletePostHandler(e.id)}>
                    <i className='fa fa-trash'></i>Delete
                  </Link>
                  <Link className='action-edit' to={`/posts/edit/${e.id}`}>
                    <i className='fa fa-pencil'></i>Edit
                  </Link>
                </>}
                <Link className='action-view' to={`/posts/${e.id}`}>
                  <i className='fa fa-eye'></i>View
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
