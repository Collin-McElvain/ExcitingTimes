<template>
  <b-list-group-item :data-key="datakey" :id="divId">
    <h3 style="color: black; background-color: lightblue;" :id="hId">{{ newEvent.name }}</h3>
    <div class="container">
      <counter :time="days" :valueName="daysDescription"></counter>
      <counter :time="hours" :valueName="hoursDescription"></counter>
      <counter :time="minutes" :valueName="minutesDescription"></counter>
      <counter :time="seconds" :valueName="secondsDescription"></counter>

      <b-dropdown id="dropdown-form" text="Edit" ref="dropdown" class="m-2">
        <b-dropdown-form>
          <b-form-group label="Event name" label-for="event-name" @submit.stop.prevent>
            <b-form-input id="event-name" size="sm" v-model="editName"></b-form-input>
          </b-form-group>

          <b-form-group label="Date" label-for="event-date" @submit.stop.prevent>
            <b-form-input type="date" v-model="editDate"></b-form-input>
          </b-form-group>

          <b-form-group label="Time" label-for="event-time" @submit.stop.prevent>
            <b-form-input type="time" v-model="editTime" locale="en"></b-form-input>
          </b-form-group>
          <b-button variant="primary" size="sm" @click="onEdit">DONE</b-button>
        </b-dropdown-form>
      </b-dropdown>
      <b-button variant="danger" @click="onDelete">Delete</b-button>
    </div>
  </b-list-group-item>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import Vue from 'vue';
import './counter';

const event = Vue.component('event', {
  props: ['newEvent', 'datakey'],
  data() {
    return {
      date: '',
      daysDescription: 'Days',
      hoursDescription: 'Hours',
      minutesDescription: 'Minutes',
      secondsDescription: 'Seconds',
      editDate: '',
      editTime: '',
      editName: '',
      distance: '',
      timer: '',
      divId: '',
      hId: '',
    };
  },
  created() {
    // Create an interval to update the distance value every second
    this.timer = setInterval(this.updateTime, 1000);
  },
  // As the data is loaded
  beforeMount() {
    this.date = this.newEvent.date;
    this.editName = this.newEvent.name;
    this.divId = this.newEvent._id;
    this.hId = `${this.newEvent._id}h`;
  },
  methods: {
    // Update the distance value based on date given and now
    // If date has passed change its color and text to DONE
    updateTime() {
      const date = new Date(this.newEvent.date).getTime();
      const now = new Date().getTime();
      this.distance = date - now;
      // Date has passed
      if (this.distance < 0) {
        clearInterval(this.timer);
        const mainDiv = document.getElementById(this.newEvent._id);
        mainDiv.style.backgroundColor = 'grey';
        const mainHeader = document.getElementById(`${this.newEvent._id}h`);
        mainHeader.style.backgroundColor = 'red';
      }
    },
    onDelete() {
      this.$emit('item-deleted', { _id: this.newEvent._id });
    },
    onEdit() {
      // Check if item has changed date or time.
      if (this.editDate !== '') {
        if (this.editTime !== '') {
          this.newEvent.date = `${this.editDate} ${this.editTime}`;
        } else {
          this.newEvent.date = this.editDate;
        }
      }
      this.newEvent.name = this.editName;
      this.$emit('item-edit', this.newEvent);
      this.$refs.dropdown.hide(true);
    },
  },
  computed: {
    // Change seconds only on distance update
    seconds() {
      if (this.distance < 0) {
        return 'E';
      }
      return Math.floor((this.distance % (1000 * 60)) / 1000);
    },
    // Change seconds only on distance update
    minutes() {
      if (this.seconds === 'E') {
        return 'N';
      }
      return Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
    },
    // Change seconds only on distance update
    hours() {
      if (this.seconds === 'E') {
        return 'O';
      }
      return Math.floor(
        (this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
    },
    // Change seconds only on distance update
    days() {
      if (this.seconds === 'E') {
        return 'D';
      }
      return Math.floor(this.distance / (1000 * 60 * 60 * 24));
    },
  },
});
export default event;
</script>

<style>
.container {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: auto;
  background-color: transparent;
  border-radius: 3px;
  box-shadow: none;
}
</style>