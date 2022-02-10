import axios from 'axios';

import { child, get, ref } from 'firebase/database';
import { firebaseDatabase } from '../../../firebase';

import {
  ADD_COMMENT,
  CREATE_POST,
  DELETE_COMMENT,
  DELETE_POST,
  GET_AUTHOR,
  GET_MY_POSTS,
  GET_POST_BY_ID,
  SET_POSTS,
  SET_POSTS_ERROR,
  START_POSTS_LOADING,
  RESET_SINGLE_POST,
  UPDATE_POST,
  UPDATE_COMMENT,
} from './types';

export const fetchPosts = () => {
  return (dispatch) => {
    dispatch(startLoading());
    axios
      .get(`${process.env.REACT_APP_URL}/posts`)
      .then(({ data }) => dispatch(fetchSuccessful(data)))
      .catch((error) => dispatch(generateError(error)));
  };
};
export const createPost = (title, body, userId) => {
  return (dispatch) => {
    dispatch(startLoading());
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_URL}/posts`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        title: title,
        body: body,
        userId: userId,
      }),
    })
      .then(({ data }) => dispatch(newPostSuccessful({ title, body, userId })))
      .catch((error) => dispatch(generateError(error)));
  };
};
export const editPost = (postId, title, body) => {
  return {
    type: UPDATE_POST,
    payload: { id: postId, title, body }
  }
};
export const getPostDetailById = (postId) => {
  return (dispatch) => {
    dispatch(startLoading());
    dispatch(resetSinglePostData());
    dispatch(getPostById(postId));
  };
};
export const getPostAuthor = (userId) => {
  return (dispatch) => {
    dispatch(startLoading());
    if (userId <= 10) {
      axios
        .get(`${process.env.REACT_APP_URL}/users/${userId}`)
        .then(({ data }) => dispatch(userFetched(data.name)))
        .catch((error) => dispatch(generateError(error)));
    } else {
      get(child(ref(firebaseDatabase), `users/${userId}`))
        .then((snapshot) => dispatch(userFetched(snapshot.val().name)))
        .catch((error) => console.error(error))
        .catch((error) => dispatch(generateError(error)));
    }
  };
};
export const addComment = (postId, comment, userId, userName) => {
  return {
    type: ADD_COMMENT,
    payload: {
      postId, comment, userId, userName
    }
  }
}
export const editComment = (postId, commentId, comment) => {
  return {
    type: UPDATE_COMMENT,
    payload: {
      postId, commentId, comment
    }
  }
} 
export const deleteComment = (postId, commentId) => {
  return {
    type: DELETE_COMMENT,
    payload: {
      postId, commentId
    }
  }
} 

const startLoading = () => {
  return {
    type: START_POSTS_LOADING,
  };
};
const generateError = (error) => {
  return {
    type: SET_POSTS_ERROR,
    error: error,
  };
};
const fetchSuccessful = (posts) => {
  return {
    type: SET_POSTS,
    payload: posts,
  };
};
const newPostSuccessful = (newPost) => {
  return {
    type: CREATE_POST,
    payload: newPost,
  };
};
export const getMyPosts = (userId) => {
  return {
    type: GET_MY_POSTS,
    payload: {userId},
  };
};
export const deletePost = (id) => {
  return {
    type: DELETE_POST,
    payload: id,
  };
};
export const userFetched = (name) => {
  return {
    type: GET_AUTHOR,
    payload: { name },
  };
};
const getPostById = (id) => {
  return {
    type: GET_POST_BY_ID,
    payload: { id },
  };
};
export const resetSinglePostData = () => {
  return {
    type: RESET_SINGLE_POST,
  };
};
