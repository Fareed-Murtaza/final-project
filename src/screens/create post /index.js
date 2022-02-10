import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createPost } from '../../redux/actions/posts';
import './index.css';

const CreatePost = () => {
  const [title, setTitle] = useState('HELLO THIS IS NEW POST TITLE.');
  const [body, setBody] = useState('HELLO THIS IS NEW POST bODY...!!');
  const {currentUser} = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const titleChange = (event) => {
    setTitle(event.target.value);
  };
  const bodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch(createPost(title, body, currentUser.uid))
    .then(res => navigate(`/`))
  };

  const clearHandler = () => {
    setTitle('');
    setBody('');
    navigate(`/`)
  };

  return (
    <div className='new-post'>
      <form className='form-new-post' onSubmit={handleSubmit}>
        <h1 className='h3 mb-3 font-weight-normal text-center'>New Post</h1>

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
          <button className='btn btn-danger btn-block' onClick={clearHandler}>
            Cancel
          </button>
          <button className='btn btn-secondary btn-block' type='submit'>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;