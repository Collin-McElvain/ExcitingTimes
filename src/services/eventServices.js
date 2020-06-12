import axios from 'axios';

export default {

  // Create event with this user
  createEvent(name, date, username) {
    return axios.post('/api/event', {
      name,
      date,
      username,
    }).then(response => response.data);
  },

  // Get all events with this user
  getEvents(username) {
    return axios.get('api/events', {
      params: {
        username,
      },
    }).then(response => response.data);
  },
};
