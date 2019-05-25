<template>
	<div>
		<h1>Register</h1>

		<input v-model="email" type="email" name="email" placeholder="email">
		<br>
		<input v-model="password" type="password" name="password" placeholder="password">
		<br>
		<div class="error" v-html="error"/>
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
			password: "",
			error: 'Fucking lint'
		};
	},
	methods: {
		async register() {
			try {
				this.error = null;
				const response = await AuthenticationService.register({
					email: this.email,
					password: this.password
				});
				console.log("response.data:::", response.data);
			} catch (error) {
				this.error = error.response.data.error;
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
	color: red;
}
</style>
