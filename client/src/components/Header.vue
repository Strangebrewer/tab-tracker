<template>
	<v-toolbar fixed class="cyan" dark>
		<v-toolbar-title class="mr-4">
			<router-link class="toolbar-title" tag="span" :to="{ name: 'songs' }">TabTracker</router-link>
		</v-toolbar-title>

		<v-toolbar-items>
			<v-btn flat :to="{ name: 'songs' }">Browse</v-btn>
		</v-toolbar-items>

		<v-spacer></v-spacer>

		<v-toolbar-items>
			<v-btn v-if="!$store.state.isUserLoggedIn" flat :to="{ name: 'login' }">Log In</v-btn>
			<v-btn v-if="!$store.state.isUserLoggedIn" flat :to="{ name: 'register' }">Sign Up</v-btn>
			<v-btn v-if="$store.state.isUserLoggedIn" flat @click="logout">Log Out</v-btn>
		</v-toolbar-items>
	</v-toolbar>
</template>

<!-- Everything inside the script tag controls the template -->
<script>
export default {
	methods: {
		logout() {
			this.$store.dispatch("setUser", null);
			this.$store.dispatch("setToken", null);
			this.$router.push({ name: "songs" });
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toolbar-title {
	cursor: pointer;
}
</style>
