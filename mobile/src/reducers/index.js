import { combineReducers } from 'redux';
import user from './user';
import hacks from './hacks';
import members from './members';
import feedback from './feedback';

const reducer = combineReducers({
  user,
  hacks,
  members,
  feedback,
});

export default reducer;
