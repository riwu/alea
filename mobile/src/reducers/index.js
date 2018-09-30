import { combineReducers } from 'redux';
import user from './user';
import hacks from './hacks';

const reducer = combineReducers({
  user,
  hacks,
});

export default reducer;
