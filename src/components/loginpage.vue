<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <b-form @submit="onSubmit">
      <b-form-group id="input-1" label="Username:" label-for="username" label-cols-sm="3" label-align-sm="right">
        <b-form-input id="username" required v-model="form.uname" placeholder="Enter username"></b-form-input>
      </b-form-group>
      <b-form-group id="input-2" label="Password:" label-for="password">
        <b-form-input id="password" type="password" required v-model="form.password" placeholder="Enter password"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>  
    
  </div>
</template>

<script>
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
    onSubmit(event) {
      // Prevent immediate submission of form
      event.preventDefault();
      // eslint-disable-next-line no-console
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(this.form));
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
</style>
