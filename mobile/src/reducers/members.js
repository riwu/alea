import { SET_MEMBERS, ADD_MEMBER, DELETE_MEMBERS } from '../actions/types';

const members = (state = {}, action) => {
  switch (action.type) {
    case SET_MEMBERS:
      return action.members;
    case ADD_MEMBER:
      return { ...state, [action.id]: action.member };
    case DELETE_MEMBERS:
      return Object.entries(state)
        .filter(([id]) => !action.ids.includes(id))
        .reduce((acc, [id, member]) => {
          acc[id] = member;
          return acc;
        }, {});
    default:
      return state;
  }
};

export default members;
