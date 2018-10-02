import { ADD_MEMBER } from '../actions/types';

const members = (state = {}, action) => {
  switch (action.type) {
    case ADD_MEMBER:
      return { ...state, [action.id]: action.member };
    default:
      return state;
  }
};

export default members;
