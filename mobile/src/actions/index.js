import * as api from './api';
import * as types from './types';

export const setUser = (user) => {
  const { password, ...rest } = user;
  return {
    type: types.SET_USER,
    user: rest,
  };
};

export const register = user => dispatch => api.register(user).then(() => dispatch(setUser(user)));
export const login = user => dispatch => api.login(user).then(() => dispatch(setUser(user)));
