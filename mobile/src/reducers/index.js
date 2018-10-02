import { combineReducers } from 'redux';
import user from './user';
import hacks from './hacks';
import members from './members';

const reducer = combineReducers({
  user,
  hacks,
  members,
});

export default reducer;
