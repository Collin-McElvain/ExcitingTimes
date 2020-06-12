<template>

    <b-list-group-item :data-key='datakey'>
        <div>
            <!-- <b-card header="{{ event.name }}">
                <counter :time="days" :valueName="daysDescription"></counter>
                <counter :time="hours" :valueName="valueName"></counter>
                <counter :time="minutes" :valueName="valueName"></counter>
                <counter :time="seconds" :valueName="valueName"></counter>
            </b-card> -->
            <span>{{event.date}}</span>
        </div>
    </b-list-group-item>
</template>

<script>
import Vue from 'vue';
import './counter';

const event = Vue.component('event', {
  props: ['event', 'datakey'],
  data() {
    return {
      date: event.date,
    };
  },
});
export default event;
</script>

<style>

</style>