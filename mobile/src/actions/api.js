import axios from 'axios';
import env from '../../env';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : env.SERVER_URL;

const [get, post, patch] = ['get', 'post', 'patch'].map(method => (path, data) => {
  const { audio, ...rest } = data || {};
  console.log('request', method, path, rest);
  return axios({
    method,
    url: path,
    data,
  }).then(response => response.data);
});

export const register = user => Promise.resolve();
