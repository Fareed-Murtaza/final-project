import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  deleteComment,
  deletePost,
  getPostAuthor,
  getPostDetailById,
  resetSinglePostData,
} from '../../redux/actions/posts';
import AddComment from '../../components/add comment';
import loadingGif from '../../assets/images/loading.gif';
import userImg from '../../assets/images/user.png';

import './index.css';

const ViewPost = () => {
  const [editComment, setEditComment] = useState(null)
  const { currentUser } = useSelector((state) => state.auth);
  const { author, loading, post, posts } = useSelector((state) => state.posts);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => dispatch(getPostDetailById(params.id)), [params.id, posts]);
  useEffect(() => {
    if (post) {
      dispatch(getPostAuthor(post.userId));
    }
  }, [post]);

  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
    dispatch(resetSinglePostData());
    navigate(`/`);
  };

  const editCommentHandler = (commentId, comment) => {
    setEditComment({postId: post.id, commentId, comment})
  }

  const deleteCommentHandler = (commentId) => {
    dispatch(deleteComment(post.id, commentId));    
  }

  return (
    <>
      {!loading && post && author && (
        <div className='view-post'>
          <div className='post-header'>
            <h2 className='m-0 p-0'>Post Detail</h2>
            {currentUser?.uid === post.userId && (
              <div className='post-actions'>
                <button
                  className='btn btn-danger'
                  onClick={() => deletePostHandler(post.id)}
                >
                  Delete
                </button>
                <button className='btn btn-primary ml-2 edit-post-btn'>
                  <Link to={`/posts/edit/${post.id}`}>Edit</Link>
                </button>
              </div>
            )}
          </div>
          <div className='vp-data'>
            <div className='post-detail'>
              <h3 className='p-title mb-2'>{post.title}</h3>
              <p className='p-description'>{post.body}</p>
            </div>
            <div>
              <i className='fa fa-comments'></i>
              <span className='count'>{post.comments?.length? post.comments.length: 0}</span> Comments
            </div>
            {(currentUser || (typeof post.comments !== 'undefined' && post.comments?.length !== 0)) && <div className='comments-container'>
              {currentUser && <AddComment comment={editComment} isEdited={() => setEditComment(null)} />}
              {typeof post.comments !== 'undefined' && post.comments?.length !== 0 &&
                post.comments.map((e) => {
                  return (
                    <div className='comment' key={e.id}>
                      <div className='comment-author-img'>
                        <img
                          src={userImg}
                          className='avatar'
                          width='50'
                          height='50'
                          alt=''
                        />
                      </div>
                      <div className='comment-detail'>
                        <h5 className='comment-author'>{e.userName}</h5>
                        <p className='comment-text'>{e.comment}</p>
                      </div>
                      {currentUser && <div className='comment-actions'>
                        <div onClick={() => deleteCommentHandler(e.id)}><i className='fa fa-trash'></i></div>
                        <div onClick={() => editCommentHandler(e.id, e.comment)}><i className='fa fa-edit'></i></div>
                      </div>}
                    </div>
                  );
                })}
            </div>}
            <div className='author d-flex'>
              <div className='author-details'>
                <h3 className='author-name'>{author.name}</h3>
                <p>Author</p>
              </div>
              <div className='author-img'>
                <img
                  src='/static/media/user.24e47f1e1f68331fe7f2.png'
                  className='avatar'
                  alt=''
                  width='65'
                  height='65'
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {(loading || !post || !author) && (
        <img className='loading' src={loadingGif} alt='' />
      )}
    </>
  );
};

export default ViewPost;
