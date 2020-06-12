<template>
    <div>
        <b-list-group>
            <event v-for='(event) in events' :newEvent='event' :key="event.id" :datakey='event.id'
            @item-deleted="onEventDeleted"></event>
        </b-list-group>       
    </div>
</template>

<script>
import Vue from 'vue';
// eslint-disable-next-line import/extensions
import './event.vue';

const eventList = Vue.component('eventList', {
  props: ['events'],
  methods: {
    onEventDeleted(event) {
      this.$emit('item-deleted', event);
    },
  },
});
export default eventList;
</script>

<style>

</style>