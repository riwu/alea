import * as api from './api';
import * as types from './types';

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

export const register = user => dispatch => api.register(user).then(() => dispatch(setUser(user)));
export const login = user => dispatch => api.login(user).then((userInfo) => {
  dispatch(getMembers());
  return dispatch(setUser({ ...user, ...userInfo }));
});

export const updateUser = user => dispatch => api.updateUser(user).then(() => dispatch(setUser(user)));

export const getHacks = () => dispatch => api.getHacks().then(hacks => dispatch({
  type: types.SET_HACKS,
  hacks,
}));
export const submitHack = hack => dispatch => api.submitHack(hack).then(() => dispatch({
  type: types.SUBMIT_HACK,
  ...hack,
}));

export const moveHackToEnd = category => ({
  type: types.MOVE_HACK_TO_END,
  category,
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
