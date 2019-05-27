<template>
	<v-layout row wrap>
		<v-flex xs6 offset-xs3>
			<panel title="Sign Up">
				<form name="signup-form" autocomplete="off">
					<v-text-field v-model="email" label="email"></v-text-field>
					<br>
					<v-text-field v-model="password" type="password" label="password"></v-text-field>
				</form>
				<br>
				<div class="danger-alert" v-html="error"/>
				<v-btn class="cyan" @click="register" dark>Sign Up</v-btn>
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
		async register() {
			try {
				this.error = null;
				const response = await AuthenticationService.register({
					email: this.email,
					password: this.password
				});
				console.log("response.data:::", response.data);
				this.$store.dispatch("setToken", response.data.token);
				this.$store.dispatch("setUser", response.data.user);
				this.$router.push({ name: "songs" });
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
