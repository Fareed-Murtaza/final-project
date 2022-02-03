import { SET_ERROR, SIGN_IN, SIGN_UP, START_LOADING, LOG_OUT } from '../actions/authentication/types';

const initialState = {
  loading: false,
  currentUser: null,
  error: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP: {
      return {...state, currentUser: action.payload, loading: false};
    }
    case SIGN_IN: {
      return {...state, currentUser: action.payload, loading: false};
    }
    case LOG_OUT: {
      return {...state, currentUser: action.payload, loading: false};
    }
    case START_LOADING: {
      return {...state, loading: true};
    }
    case SET_ERROR: {
      return {...state, error: action.error, loading: false};
    }
    default:
      return state;
  }
}

export default authReducer;