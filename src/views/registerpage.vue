<template>
  <div class="form">
    <b-card border-variant='Dark' header='Register' header-bg-variant="primary" bg-variant='dark' text-variant='white'>
      <b-form @submit="onRegister">
        <b-form-group id="input-1" label="Name:" label-for="name" label-cols-sm="4" label-align-sm="right">
          <b-form-input id="name" required v-model="form.name" placeholder="Enter your name"></b-form-input>
        </b-form-group>
        <b-form-group id="input-2" label="Username:" label-for="username" label-cols-sm="4" label-align-sm="right">
          <b-form-input id="username" required v-model="form.username" placeholder="Enter a username"></b-form-input>
        </b-form-group>
        <b-form-group id="input-3" label="Password:" label-for="password" label-cols-sm="4" label-align-sm="right">
          <b-form-input id="password" type="password" required v-model="form.password" placeholder="Enter a password"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="light">Register new user</b-button>
      </b-form>   
    </b-card> 
    <b-link to="login">Already a member? Sign in!</b-link>
  </div>
</template>

<script>
import userService from '../services/userServices';

export default {
  data() {
    return {
      form: {
        name: '',
        username: '',
        password: '',
      },
    };
  },
  created() {
    this.$emit('logoutBtn', false);
  },
  methods: {
    // Submission call to db for registration
    onRegister(event) {
      // Prevent immediate submission of form
      event.preventDefault();

      // Call to server register call
      userService.createUser(this.form.name, this.form.username, this.form.password).then((res) => {
        if (res.auth) {
          // Set JSONWebToken in localStorage
          localStorage.setItem('user', res.user);
          localStorage.setItem('jwt', res.token);
          this.$router.push({ name: 'EventPage' });
        }
      }).catch((err) => {
        // Throw error back to user
        this.$bvToast.toast(err.response.data, {
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
