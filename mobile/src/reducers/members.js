import { SET_MEMBERS, ADD_MEMBER } from '../actions/types';

const members = (state = {}, action) => {
  switch (action.type) {
    case SET_MEMBERS:
      return action.members;
    case ADD_MEMBER:
      return { ...state, [action.id]: action.member };
    default:
      return state;
  }
};

export default members;
