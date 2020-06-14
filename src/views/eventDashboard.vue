<template>
  <div>
        <section class="app-content">
          <div class="create-event-wrapper">
            <b-input-group>
                <b-form-input type='text' v-model='addName' placeholder='Event Description'></b-form-input>
                <b-form-datepicker v-model='addDate' :min="min"></b-form-datepicker>
                <b-form-timepicker v-model='addTime' :disabled="disabled" locale="en"></b-form-timepicker>
                <b-input-group-append>
                    <b-button variant='success' @click='addEventHandler'>Add Event</b-button>
                </b-input-group-append>
            </b-input-group>
          </div>

          <div>
              <eventList :events="events" @item-deleted="removeEvent" @item-edit="editEvent"></eventList>
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
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 15th two months prior
    const minDate = new Date(today);
    return {
      user: localStorage.getItem('user'),
      addName: '',
      addDate: '',
      addTime: '00:00:00',
      events: [],
      min: minDate,
    };
  },
  // This method is called before render.
  created() {
    this.$emit('logoutBtn', true);
    // Get the events loaded as user logs in
    this.refresh();
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
      // Call to the backend to add event
      eventService.createEvent(this.addName, this.fullDate, this.user).then(
        (event) => {
          if (event) {
            // Refresh the events array with get call to the back end
            this.refresh();
            this.addName = '';
            this.addDate = '';
          }
        }).catch((err) => {
        if (!err.response.data.success) {
        // Token is not authenticated or there is not a token.
          this.$emit('logoutDash');
        } else {
          this.$bvToast.toast(err.response.data, {
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
            // Refresh the events array with get call to the back end
            this.refresh();
          }
        }).catch((err) => {
        if (!err.response.data.success) {
        // Token is not authenticated or there is not a token.
          that.$emit('logoutDash');
        } else {
          this.$bvToast.toast(err.response.data, {
            title: 'ERROR',
            autoHideDelay: 3000,
          });
        }
      });
    },
    // Calls a getall function in the backend to recieve all events by this user.
    refresh() {
      eventService.getEvents(this.user).then((events) => {
        if (events) {
          this.events = events;
        }
      }).catch((err) => {
        if (!err.response.data.success) {
        // Token is not authenticated or there is not a token.
          this.$emit('logoutDash');
        } else {
          this.$bvToast.toast(err.response.data, {
            title: 'ERROR',
            autoHideDelay: 3000,
          });
        }
      });
    },
    // Calls edit on backend to edit event
    editEvent(editedEvent) {
      eventService.editEvent(editedEvent).then((event) => {
        if (event) {
          // Refresh the events array with get call to the back end
          this.refresh();
        }
      }).catch((err) => {
        if (!err.response.data.success) {
        // Token is not authenticated or there is not a token.
          this.$emit('logoutDash');
        } else {
          this.$bvToast.toast(err.response.data, {
            title: 'ERROR',
            autoHideDelay: 3000,
          });
        }
      });
    },
  },
  computed: {
    // Check if addTime should be disabled or not
    disabled() {
      return this.addDate === '';
    },
    // Compute the full date
    fullDate() {
      return `${this.addDate} ${this.addTime}`;
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
  background-color: darkgrey;
}
</style>