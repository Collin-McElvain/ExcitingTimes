import Vue from 'vue';
import Router from 'vue-router';
import loginpage from '@/views/loginpage';
import eventpage from '@/views/eventDashboard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: loginpage,
    },
    {
      path: '/EventPage/:username',
      name: 'EventPage',
      component: eventpage,
    },
  ],
});
