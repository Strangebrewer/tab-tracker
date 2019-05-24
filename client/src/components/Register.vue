<template>
  <div>
    <h1>Register</h1>

    <input v-model="email" type="email" name="email" placeholder="email">
    <br>
    <input v-model="password" type="password" name="password" placeholder="password">
    <br>
    <button @click="register">Register</button>
  </div>
</template>

<!-- Everything inside the script tag controls the template -->
<script>
import AuthenticationService from "../services/AuthenticationService";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async register() {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      });
      console.log('response.data:::', response.data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
