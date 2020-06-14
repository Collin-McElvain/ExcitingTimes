<template>
  <div id="app" >
    <header>
      <span>{{title}}</span>
      <b-button style="position:absolute; right: 10px;" v-if="userVisible" @click="logout" >Logout</b-button>
    </header>
    <main>
      <router-view @logoutBtn="logoutBtn" @logoutDash="logout"></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      title: 'Exciting Times',
      userVisible: false,
    };
  },
  methods: {
    // Called when login, register, or eventDashboard emits true or false
    // Based on value, it will show the logout button
    logoutBtn(value) {
      this.userVisible = value;
    },
    // Called when any of the views emit logout
    logout() {
      localStorage.clear();
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  padding-top: 20px;
  background-color: darkgrey;
}

header {
  margin: 0;
  height: 56px;
  padding: 10px 16px 10px 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: contents;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
