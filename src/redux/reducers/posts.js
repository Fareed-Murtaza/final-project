import {
  ADD_COMMENT,
  CREATE_POST,
  DELETE_COMMENT,
  DELETE_POST,
  GET_AUTHOR,
  GET_MY_POSTS,
  GET_POST_BY_ID,
  RESET_SINGLE_POST,
  SET_POSTS,
  SET_POSTS_ERROR,
  START_POSTS_LOADING,
  STOP_POSTS_LOADING,
  UPDATE_COMMENT,
  UPDATE_POST,
} from '../actions/posts/types';

const initialState = {
  loading: false,
  posts: [],
  post: null,
  author: null,
  myPosts: [],
  error: '',
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS: {
      return { ...state, posts: action.payload, loading: false };
    }
    case CREATE_POST: {
      let newPost = {
        ...action.payload,
        id: state.posts.length + 1,
      };
      return {
        ...state,
        posts: [newPost, ...state.posts],
        loading: false,
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((e) => e.id !== action.payload),
        loading: false,
      };
    }
    case GET_POST_BY_ID: {
      return {
        ...state,
        post: state.posts.filter((e) => e.id === +action.payload.id)[0],
        loading: false,
      };
    }
    case GET_AUTHOR: {
      return {
        ...state,
        author: { name: action.payload.name },
        loading: false,
      };
    }
    case RESET_SINGLE_POST: {
      return { ...state, author: null, post: null };
    }
    case UPDATE_POST: {
      let updatedPosts = state.posts.map((e) => {
        if (e.id === action.payload.id) {
          return {
            ...e,
            title: action.payload.title,
            body: action.payload.body,
          };
        } else return e;
      });
      return { ...state, posts: updatedPosts, loading: false };
    }
    case ADD_COMMENT: {
      let updatedPosts = state.posts.map((e) => {
        if (e.id === action.payload.postId) {
          let newComments = [];
          
          if(e.comments?.length) {
            newComments.push({
              id: +(e.comments[e.comments.length-1].id)+1,
              comment: action.payload.comment,
              userId: action.payload.userId,
              userName: action.payload.userName
            }, ...e.comments)
          } else {
            newComments.push({
              id: 1,
              comment: action.payload.comment,
              userId: action.payload.userId,
              userName: action.payload.userName
            })
          }
          
          return {
            ...e,
            comments: newComments
          };
        } else return e;
      });
      return { ...state, posts: updatedPosts, loading: false };
    }
    case UPDATE_COMMENT: {
      let updatedPosts = state.posts.map((e) => {
        if (e.id === action.payload.postId) {
          let updatedComments = e.comments.map(c => {
            if(c.id === action.payload.commentId) {
              return { ...c, comment: action.payload.comment }
            } else return c
          })
          
          return { ...e, comments: updatedComments };
        } else return e;
      });
      return { ...state, posts: updatedPosts, loading: false };
    }
    case DELETE_COMMENT: {
      let updatedPosts = state.posts.map((e) => {
        if (e.id === action.payload.postId) {
          let updatedComments = e.comments.filter(c => c.id !== action.payload.commentId)
          
          return { ...e, comments: updatedComments };
        } else return e;
      });
      return { ...state, posts: updatedPosts, loading: false };
    }
    case GET_MY_POSTS: {
      return {
        ...state,
        myPosts: state.posts.filter((e) => e.userId === action.payload.userId),
        loading: false
      };
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
};

export default postsReducer;
