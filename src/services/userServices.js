import axios from 'axios';


export default {
  signIn(username, password) {
    return axios.post('/api/login', {
      username,
      password,
    }).then(response => response.data);
  },
};
