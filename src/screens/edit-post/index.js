import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { editPost, getPostDetailById } from '../../redux/actions/posts';
import loadingGif from '../../assets/images/loading.gif';

import './index.css';


const EditPost = () => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const { loading, post } = useSelector((state) => state.posts);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => dispatch(getPostDetailById(params.id)), []);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const bodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(editPost(post.id, title, body));
    navigate(`/`);
  };

  const cancleHandler = () => navigate(`/posts/${post.id}`);

  return (
    <>
      {!loading && post && (
        <div className='new-post'>
          <form className='form-new-post' onSubmit={handleSubmit}>
            <h1 className='h3 mb-3 font-weight-normal text-center'>
              Edit Post
            </h1>

            <div>
              <input
                type='title'
                id='titleInput'
                placeholder='Enter title'
                name='title'
                onChange={titleChange}
                value={title}
                required
              />
              <textarea
                type='body'
                id='bodyInput'
                placeholder='Enter body'
                name='body'
                onChange={bodyChange}
                value={body}
                row={6}
                required
              ></textarea>
            </div>

            <div className='actions'>
              <button
                className='btn btn-danger btn-block'
                onClick={cancleHandler}
              >
                Cancel
              </button>
              <button className='btn btn-secondary btn-block' type='submit'>
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {(loading || !post) && (
        <img className='loading' src={loadingGif} alt='loading' />
      )}
    </>
  );
};

export default EditPost;
