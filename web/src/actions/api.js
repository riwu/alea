import axios from 'axios';

axios.defaults.baseURL = '/api/';

const [get, post] = ['get', 'post'].map(method => (path, data) => axios({
  method,
  url: path,
  data,
}).then(response => response.data));

export const getFeedbackTokenInfo = tokenQuery => get(`feedback/request${tokenQuery}`);
export const postFeedback = (tokenQuery, adaptabilities, comments) => post(`feedback${tokenQuery}`, { adaptabilities, comments });
