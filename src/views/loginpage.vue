<template>
  <div class="form">
    <b-card bg-variant='dark' text-variant='white'>
      <b-form @submit="onSubmit">
        <b-form-group id="input-1" label="Username:" label-for="username" label-cols-sm="4" label-align-sm="right">
          <b-form-input id="username" required v-model="form.username" placeholder="Enter username"></b-form-input>
        </b-form-group>
        <b-form-group id="input-2" label="Password:" label-for="password" label-cols-sm="4" label-align-sm="right">
          <b-form-input id="password" type="password" required v-model="form.password" placeholder="Enter password"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="light">Login</b-button>
      </b-form>   
      <b-card-footer>
        <b-button type='submit' variant='light'>register</b-button>
      </b-card-footer>
    </b-card> 
  </div>
</template>

<script>
import userService from '../services/userServices';

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      msg: 'Excitement Tracker',
    };
  },
  methods: {
    // Submission call to db for login check
    onSubmit(event) {
      // Prevent immediate submission of form
      event.preventDefault();

      // Call to server signin function
      userService.signIn(this.form.username, this.form.password).then((res) => {
        if (res.auth) {
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('jwt', res.token);
          this.$router.push({ name: 'EventPage' });
        }
      }).catch(() => {
        // Throw error back to user
        this.$bvToast.toast('Your username or password is incorrect.', {
          title: 'ERROR',
          autoHideDelay: 3000,
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
div.form{
  display: inline-block;
}
button {
  color: darkgrey;
}
</style>
