import { combineReducers } from 'redux';

import authReducer from './authentication';
import postsReducer from './posts';


const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
})

export default rootReducer;
