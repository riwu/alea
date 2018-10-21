import { SET_RANK } from '../actions/types';

const rank = (state = {}, action) => {
  switch (action.type) {
    case SET_RANK:
      return action.rank;
    default:
      return state;
  }
};

export default rank;
