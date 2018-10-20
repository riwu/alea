import { SET_FEEDBACK } from '../actions/types';

const feedback = (state = {}, action) => {
  switch (action.type) {
    case SET_FEEDBACK:
      return action.feedback;
    default:
      return state;
  }
};

export default feedback;
