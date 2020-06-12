import axios from 'axios';


export default {

  // Sign in call to backend
  signIn(username, password) {
    return axios.post('/api/login', {
      username,
      password,
    }).then(response => response.data);
  },
};
