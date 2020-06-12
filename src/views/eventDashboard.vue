<template>
  <div>
        <section class="app-content">
          <div class="create-event-wrapper">
            <b-input-group>
                <b-form-input type='text' v-model='addName' placeholder='Event Description'></b-form-input>
                <b-form-input type='date' v-model='addDate'></b-form-input>
                <b-input-group-append>
                    <b-button variant='outline-secondary' @click='addEventHandler'>Add Event</b-button>
                </b-input-group-append>
            </b-input-group>
          </div>

          <div>
              <eventList :events="events" @item-deleted="removeEvent"></eventList>
          </div>
        </section>
  </div>
  
</template>

<script>
// eslint-disable-next-line import/extensions
import '../components/eventList.vue';
import eventService from '../services/eventServices';

export default {
  data() {
    return {
      user: localStorage.getItem('user').username,
      addName: '',
      addDate: '',
      events: [],
    };
  },
  created() {
    // This method is called before render.
    const that = this;
    // Get the events loaded as user logs in
    eventService.getEvents(this.user).then((events) => {
      if (events) {
        that.events = events;
      }
    }).catch((err) => {
      const lame = err;
      return lame;
    });
  },
  methods: {
    // Method to add events
    addEventHandler() {
      eventService.createEvent(this.addName, this.addDate, this.user).then(
        (event) => {
          if (event) {
            // Put new event here, and prevent extra call
            this.events = [...this.events, {
              id: event.id,
              name: event.name,
              date: event.date,
              user: this.user,
            }];
          }
        }).catch((err) => {
        const lame = err;
        return lame;
      });
    },
    removeEvent(deleteEvent) {
      eventService.deleteEvent(deleteEvent.id).then(
        (response) => {
          if (response) {
            const filterEvents = this.events.filter(curEvent => curEvent.id !== deleteEvent.id);
            this.events = filterEvents;
          }
        }).catch((err) => {
        const lame = err;
        return lame;
      });
    },
  },
};
</script>

<style>
.create-event-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #b3b3b3;
  box-sizing: border-box;
}
</style>