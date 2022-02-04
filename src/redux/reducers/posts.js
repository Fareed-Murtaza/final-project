import { SET_POSTS_ERROR, START_POSTS_LOADING, SET_POSTS, RESET_POSTS, STOP_POSTS_LOADING } from '../actions/posts/types';

const initialState = {
  loading: false,
  posts: [],
  error: ''
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS: {
      return { ...state, posts: action.payload, loading: false };
    }
    case RESET_POSTS: {
      return { ...state, posts: [], loading: false };
    }
    case START_POSTS_LOADING: {
      return { ...state, loading: true };
    }
    case STOP_POSTS_LOADING: {
      return { ...state, loading: false };
    }
    case SET_POSTS_ERROR: {
      return { ...state, error: action.error, loading: false };
    }
    default:
      return state;
  }
}

export default postsReducer;