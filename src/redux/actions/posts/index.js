import axios from "axios";

import { START_POSTS_LOADING, SET_POSTS_ERROR, SET_POSTS, RESET_POSTS } from "./types";

export const fetchPosts = () => {
  return (dispatch) => {
    dispatch(startLoading());
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(({data}) => dispatch(fetchSuccessful(data)))
      .catch(error => dispatch(generateError(error)))
  }
}

export const resetPosts = () => {
  return (dispatch) => {
    dispatch(startLoading());
    dispatch(reset());
  }
}

const startLoading = () => {
  return {
    type: START_POSTS_LOADING
  }
}
const generateError = (error) => {
  return {
    type: SET_POSTS_ERROR,
    error: error
  }
}
const fetchSuccessful = (posts) => {
  return {
    type: SET_POSTS,
    payload: posts
  }
}
const reset = () => {
  return {
    type: RESET_POSTS
  }
}