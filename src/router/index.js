import Vue from 'vue';
import Router from 'vue-router';
import loginpage from '@/views/loginpage';
import eventpage from '@/views/eventDashboard';
import registerpage from '@/views/registerpage';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: loginpage,
      meta: {
        guest: true,
      },
    },
    {
      path: '/Register',
      name: 'register',
      component: registerpage,
      meta: {
        guest: true,
      },
    },
    {
      path: '/EventPage',
      name: 'EventPage',
      component: eventpage,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

// Call this before each route change, make sure user is authorized to be there
router.beforeEach((to, from, next) => {
  // Check if user is on page that requires auth
  if (to.matched.some(routeRecord => routeRecord.meta.requiresAuth)) {
    // Kick user to login page if they do not have a JSONWebToken
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath },
      });
    } else {
      // If user does have jwt, continue route
      next();
    }
    // Check if user is going to guest page
  } else if (to.matched.some(routeRecord => routeRecord.meta.guest)) {
    // If no jwt, continue to guest page
    if (localStorage.getItem('jwt') == null) {
      next();
    } else {
      // If there is a jwt, kick to eventpage
      next({ name: 'EventPage' });
    }
  } else {
    // Continue route
    next({ name: 'login' });
  }
});

export default router;
