import {combineReducers} from 'redux';
import userReducer from './user';
import childrenReducer from './children';
import womenReducer from './women';
const rootReducer = combineReducers({
  userReducer,
  childrenReducer,
  womenReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
