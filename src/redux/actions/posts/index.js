import axios from "axios";

import { ref, child, get } from "firebase/database";
import { firebaseDatabase } from "../../../firebase";

import {
  START_POSTS_LOADING,
  SET_POSTS_ERROR,
  SET_POSTS,
  CREATE_POST,
  GET_POST_BY_ID,
  GET_MY_POSTS,
  DELETE_POST,
  GET_AUTHOR,
  RESET_SINGLE_POST,
  UPDATE_POST,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from "./types";

export const fetchPosts = () => {
  return (dispatch) => {
    dispatch(startLoading());
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(({ data }) => dispatch(fetchSuccessful(data)))
      .catch((error) => dispatch(generateError(error)));
  };
};
export const createPost = (title, body, userId) => {
  return (dispatch) => {
    dispatch(startLoading());
    return axios({
      method: "post",
      url: "https://jsonplaceholder.typicode.com/posts",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
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
        .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(({ data }) => dispatch(userFetched(data.name)))
        .catch((error) => console.log(error))
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

// export const createPost = (title, body, userId) => {
//   return (dispatch) => {
//     dispatch(startLoading());
//     return axios({
//       method: "post",
//       url: "https://jsonplaceholder.typicode.com/posts",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//       body: JSON.stringify({
//         title: title,
//         body: body,
//         userId: userId,
//       }),
//     })
//       .then(({data}) => dispatch(newPostSuccessful({id: data.id, title, body, userId})))
//       .catch(error => dispatch(generateError(error)))
//   };
// };
