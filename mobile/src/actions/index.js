import * as api from './api';
import * as types from './types';
import getUserInfo from '../util/getUserInfo';

export const setUser = (user) => {
  const { password, ...rest } = user;
  return {
    type: types.SET_USER,
    user: rest,
  };
};

export const getMembers = () => dispatch => api.getMembers().then(members => dispatch({
  type: types.SET_MEMBERS,
  members,
}));

export const register = user => dispatch => api.register(user).then(({ id }) => dispatch(setUser({ ...user, id })));
export const login = user => dispatch => api.login(user).then((userInfo) => {
  dispatch(getUserInfo());
  return dispatch(setUser({ ...user, ...userInfo }));
});

export const updateUser = user => dispatch => api.updateUser(user).then(() => dispatch(setUser(user)));

export const getHacks = () => dispatch => api.getHacks().then(hacks => dispatch({
  type: types.SET_HACKS,
  hacks,
}));

export const submitHack = hack => (dispatch, getState) => api.submitHack(hack).then(({ id }) => dispatch({
  type: types.SUBMIT_HACK,
  id,
  ...hack,
  userId: getState().user.id,
}));

export const moveHackToEnd = (category, index) => ({
  type: types.MOVE_HACK_TO_END,
  category,
  index,
});

export const addMember = member => dispatch => api.addMember(member).then(({ id }) => dispatch({
  type: types.ADD_MEMBER,
  id,
  member,
}));

export const deleteMembers = ids => dispatch => api.deleteMembers(ids.join(',')).then(() => dispatch({
  type: types.DELETE_MEMBERS,
  ids,
}));

export const getFeedback = () => dispatch => api.getFeedback().then(feedback => dispatch({
  type: types.SET_FEEDBACK,
  feedback,
}));

export const getRank = () => dispatch => api.getRank().then(rank => dispatch({
  type: types.SET_RANK,
  rank,
}));
