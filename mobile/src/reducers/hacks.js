import { SET_HACKS, SUBMIT_HACK, MOVE_HACK_TO_END } from '../actions/types';

const hacks = (state = {}, action) => {
  switch (action.type) {
    case SET_HACKS:
      return action.hacks;
    case SUBMIT_HACK:
      return {
        ...state,
        ...action.categories.reduce((acc, category) => {
          acc[category] = [action.text].concat(state[category] || []);
          return acc;
        }, {}),
      };
    case MOVE_HACK_TO_END:
      return {
        ...state,
        [action.category]: state[action.category].slice(1).concat(state[action.category][0]),
      };
    default:
      return state;
  }
};

export default hacks;
