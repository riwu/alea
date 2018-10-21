import { combineReducers } from 'redux';
import user from './user';
import hacks from './hacks';
import members from './members';
import feedback from './feedback';
import rank from './rank';

const reducer = combineReducers({
  user,
  hacks,
  members,
  feedback,
  rank,
});

export default reducer;
