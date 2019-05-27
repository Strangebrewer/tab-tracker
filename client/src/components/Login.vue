<template>
	<v-layout row wrap>
		<v-flex xs6 offset-xs3>
			<panel title="Log In">
				<form name="login-form" autocomplete="off">
					<v-text-field v-model="email" label="email"></v-text-field>
					<br>
					<v-text-field v-model="password" type="password" label="password"></v-text-field>
				</form>
				<br>
				<div class="error" v-html="error"/>
				<v-btn class="cyan" @click="login" dark>Log In</v-btn>
			</panel>
		</v-flex>
	</v-layout>
</template>

<!-- Everything inside the script tag controls the template -->
<script>
import AuthenticationService from "../services/AuthenticationService";

export default {
	data() {
		return {
			email: "",
			password: "",
			error: null
		};
	},
	methods: {
		async login() {
			try {
				this.error = null;
				const response = await AuthenticationService.login({
					email: this.email,
					password: this.password
				});
				this.$store.dispatch("setToken", response.data.token);
				this.$store.dispatch("setUser", response.data.user);
			} catch (error) {
				this.error = error.response.data.error;
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
