import Vue from 'vue';
import Router from 'vue-router';
import loginpage from '@/components/loginpage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: loginpage,
    },
  ],
});
