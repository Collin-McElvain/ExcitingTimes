import Vue from 'vue';
import Router from 'vue-router';
import loginpage from '@/components/loginpage';
import eventpage from '@/components/eventpage';

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
      path: '/EventPage',
      name: 'events',
      component: eventpage,
    },
  ],
});
