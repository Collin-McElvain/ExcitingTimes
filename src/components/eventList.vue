<template>
    <div>
        <b-list-group>
            <event v-for='(event) in events' :event='event' :key="event.id"></event>
        </b-list-group>       
    </div>
</template>

<script>
import Vue from 'vue';
// eslint-disable-next-line import/extensions
import './event.vue';

const eventList = Vue.component('eventList', {
  props: ['events'],
});
export default eventList;
</script>

<style>

</style>