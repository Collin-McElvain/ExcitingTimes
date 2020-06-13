<template>

    <b-list-group-item :data-key='datakey'>
        <h3 style="color: darkred;">{{ newEvent.name }}</h3>
        <div class='container'>
                <counter :time="days" :valueName="daysDescription"></counter>
                <counter :time="hours" :valueName="hoursDescription"></counter>
                <counter :time="minutes" :valueName="minutesDescription"></counter>
                <counter :time="seconds" :valueName="secondsDescription"></counter>
                <b-button variant='danger' @click="onDelete">Delete</b-button>
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
      date: this.newEvent.date,
      days: '',
      hours: '',
      minutes: '',
      seconds: '',
      daysDescription: 'Days',
      hoursDescription: 'Hours',
      minutesDescription: 'Minutes',
      secondsDescription: 'Seconds',
      timer: '',
    };
  },
  created() {
    this.timer = setInterval(this.updateTime, 1000);
  },
  methods: {
    // Update the time based on here to now
    // If date has passed change its color and text to DONE
    updateTime() {
      if (this.date) {
        const date = new Date(this.date).getTime();
        const now = new Date().getTime();
        const distance = date - now;
        if (distance < 0) {
          this.days = 'D';
          this.hours = 'O';
          this.minutes = 'N';
          this.seconds = 'E';
        } else {
          this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
          this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        }
      }
    },
    onDelete() {
      this.$emit('item-deleted', { _id: this.newEvent._id });
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