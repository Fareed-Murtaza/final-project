import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addComment, editComment } from '../../redux/actions/posts';
import './index.css';

const AddComment = props => {
  const [comment, setComment] = useState('');
  const [edit, setEditComment] = useState(null);
  const {post} = useSelector((state) => state.posts);
  const {currentUser} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if(props.comment && !edit) {
      setEditComment(props.comment)
      setComment(props.comment.comment)
    }
  }, [props, edit])

  const commentChangeHandler = (e) => {
    setComment(e.target.value);
  };

  const addCommentHandler = () => {
    if(edit != null) {
      dispatch(editComment(edit.postId, edit.commentId, comment));
      setEditComment(null);
      setComment('');
      props.isEdited();
    } else {
      dispatch(addComment(post.id, comment, currentUser.uid, currentUser.name));
    }
  };

  return (
    <div className='add-comment'>
      <input
        type='text'
        id='commentInput'
        placeholder='Add Comment'
        name='comment'
        onChange={commentChangeHandler}
        value={comment}
        className='comment-input'
        required
      />
      <button className='btn btn-secondary' onClick={addCommentHandler}>
        Send
      </button>
    </div>
  );
};

AddComment.propTypes = {
  isEdited: PropTypes.func,
  comment: PropTypes.any
}

export default AddComment;
