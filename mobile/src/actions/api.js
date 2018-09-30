import axios from 'axios';
import env from '../../env';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.1.105:3000/' : env.SERVER_URL;

const [get, post, patch] = ['get', 'post', 'patch'].map(method => (path, data) => {
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
