<template>
    <div>
        <b-list-group>
            <event v-for='(event) in events' :newEvent='event' :key="event._id" :datakey='event._id'
            @item-deleted="onEventDeleted" @item-edit="onEventEdit"></event>
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
    onEventEdit(event) {
      this.$emit('item-edit', event);
    },
  },
});
export default eventList;
</script>

<style>

</style>