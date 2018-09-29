import * as api from './api';
import * as types from './types';

export const register = user => dispatch => api.register(user).then(() => {
  const { password, ...rest } = user;
  dispatch({
    type: types.SET_USER,
    user: rest,
  });
});
