<template>
	<v-layout row wrap>
		<v-flex xs6 offset-xs3>
			<div class="white elevation-8">
				<v-toolbar flat dense class="cyan" dark>
					<v-toolbar-title>Login</v-toolbar-title>
				</v-toolbar>
				<div class="pl-4 pr-4 pt-2 pb-2">
					<v-text-field v-model="email" label="email"></v-text-field>
					<br>
					<v-text-field v-model="password" label="password"></v-text-field>
					<br>
					<div class="error" v-html="error"></div>
					<v-btn class="cyan" @click="login" dark>Login</v-btn>
				</div>
			</div>
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
</style>
