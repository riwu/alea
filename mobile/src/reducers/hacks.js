import { SET_HACKS, SUBMIT_HACK, MOVE_HACK_TO_END } from '../actions/types';

const hacks = (state = {}, action) => {
  switch (action.type) {
    case SET_HACKS:
      return action.hacks;
    case SUBMIT_HACK: {
      const { type, categories, ...data } = action;
      return {
        ...state,
        ...categories.reduce((acc, category) => {
          acc[category] = [data].concat(state[category] || []);
          return acc;
        }, {}),
      };
    }
    case MOVE_HACK_TO_END: {
      const data = state[action.category];
      return {
        ...state,
        [action.category]: data
          .slice(0, action.index)
          .concat(data.slice(action.index + 1))
          .concat(data[action.index]),
      };
    }
    default:
      return state;
  }
};

export default hacks;
