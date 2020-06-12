import axios from 'axios';

export default {
  createEvent(name, date, username) {
    return axios.post('/api/event', {
      name,
      date,
      username,
    }).then(response => response.data);
  },
};
