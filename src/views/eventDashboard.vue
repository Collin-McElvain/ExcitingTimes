
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
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/extensions
import '../components/eventList.vue';
import eventService from '../services/eventServices';

export default {
  data() {
    return {
      user: localStorage.getItem('user'),
      addName: '',
      addDate: '',
      events: [],
    };
  },
  created() {
    this.$emit('logoutBtn', true);
    // This method is called before render.
    const that = this;
    // Get the events loaded as user logs in
    eventService.getEvents(this.user).then((events) => {
      if (events) {
        that.events = events;
      }
    }).catch((err) => {
      if (!err.response.data.success) {
        // Token is not authenticated or there is not a token.
        that.$emit('logoutDash');
      } else {
        this.$bvToast.toast(err.message, {
          title: 'ERROR',
          autoHideDelay: 3000,
        });
      }
    });
  },
  methods: {
    // Method to add events
    addEventHandler() {
      if (this.addName === '' || this.addDate === '') {
        this.$bvToast.toast('Fill out form completely', {
          title: 'ERROR',
          autoHideDelay: 3000,
        });
        return;
      }
      eventService.createEvent(this.addName, this.addDate, this.user).then(
        (event) => {
          if (event) {
            // Put new event here, and prevent extra call
            this.events = [...this.events, {
              _id: event._id,
              name: event.name,
              date: event.date,
              user: this.user,
            }];
            this.addName = '';
            this.addDate = '';
          }
        }).catch((err) => {
        if (!err.response.data.success) {
        // Token is not authenticated or there is not a token.
          this.$emit('logoutDash');
        } else {
          this.$bvToast.toast(err.message, {
            title: 'ERROR',
            autoHideDelay: 3000,
          });
        }
      });
    },
    removeEvent(deleteEvent) {
      const that = this;
      eventService.deleteEvent(deleteEvent._id).then(
        (response) => {
          if (response) {
            const filterEvents = that.events.filter(curEvent => curEvent._id !== deleteEvent._id);
            that.events = filterEvents;
          }
        }).catch((err) => {
        if (!err.response.data.success) {
        // Token is not authenticated or there is not a token.
          that.$emit('logoutDash');
        } else {
          this.$bvToast.toast(err.message, {
            title: 'ERROR',
            autoHideDelay: 3000,
          });
        }
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