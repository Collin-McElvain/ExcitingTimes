<template>
  <div>
        <section class="app-content">
          <div class="create-event-wrapper">
            <b-input-group>
                <b-form-input type='text' ref='eventName' placeholder='Event Description'></b-form-input>
                <b-form-input type='date' ref='eventDate'></b-form-input>
                <b-input-group-append>
                    <b-button variant='outline-secondary' @press='addEventHandler'>Add Event</b-button>
                </b-input-group-append>
            </b-input-group>
          </div>

          <div>
              <eventList :events="events"></eventList>
          </div>
        </section>
  </div>
  
</template>

<script>
// eslint-disable-next-line import/extensions
import '../components/eventList.vue';

export default {
  data() {
    return {
      user: this.$route.params.username,
      events: [
        {
          id: '1',
          name: 'lame',
          date: '03/22/2020',
          user: 'StankyStarfish',
        },
        {
          id: '2',
          name: 'stupid',
          date: '09/05/2020',
          user: 'StankyStarfish',
        },
        {
          id: '3',
          name: 'dumb',
          date: '06/28/2020',
          user: 'StankyStarfish',
        },
        {
          id: '4',
          name: 'yay',
          date: '07/11/2020',
          user: 'StankyStarfish',
        },
      ],
    };
  },
  methods: {
    addEventHandler() {
      this.events = [...this.events, {
        id: (this.events.length + 1).toString(),
        name: this.$refs.eventName.value,
        date: this.$refs.eventDate.value,
        user: this.user,
      }];
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