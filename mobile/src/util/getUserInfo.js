import {
  getHacks, getMembers, getFeedback, getRank,
} from '../actions';

const getUserInfo = () => (dispatch) => {
  dispatch(getHacks());
  dispatch(getMembers());
  dispatch(getFeedback());
  dispatch(getRank());
};

export default getUserInfo;
