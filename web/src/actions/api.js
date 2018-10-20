import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/'
  : `${process.env.REACT_APP_API_URL}/`;

const [get, post] = ['get', 'post'].map(method => (path, data) => axios({
  method,
  url: path,
  data,
}).then(response => response.data));

export const getFeedbackTokenInfo = tokenQuery => get(`feedback/request${tokenQuery}`);
export const postFeedback = (tokenQuery, adaptabilities, comments) => post(`feedback${tokenQuery}`, { adaptabilities, comments });
