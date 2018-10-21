import axios from 'axios';
import env from '../../env';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.1.105:3000/' : env.SERVER_URL;

const [get, post, patch, del] = ['get', 'post', 'patch', 'delete'].map(method => (path, data) => {
  console.log('request', method, path, data);
  return axios({
    method,
    url: path,
    data,
  }).then(response => response.data);
});

export const register = user => post('users', user);
export const login = user => post('sessions', user);
export const submitHack = hack => post('hacks', hack);
export const getHacks = () => get('hacks');
export const updateUser = user => patch('users/me', user);
export const addMember = member => post('users/me/members', member);
export const getMembers = () => get('users/me/members');
export const deleteMembers = ids => del(`users/me/members/${ids}`);
export const requestFeedback = memberIds => post('feedback/request', { memberIds });
export const getFeedback = () => get('feedback/me');
export const sendFeedback = info => post('feedback/others', info);
export const getRank = () => get('rank');
