<template>
	<v-toolbar fixed class="cyan" dark>
		<v-toolbar-title class="mr-4">
			<span @click="navigateTo({ name: 'root' })" class="toolbar-title">TabTracker</span>
		</v-toolbar-title>

		<v-toolbar-items>
			<v-btn flat @click="navigateTo({ name: 'songs' })">Browse</v-btn>
		</v-toolbar-items>

		<v-spacer></v-spacer>

		<v-toolbar-items>
			<v-btn v-if="!$store.state.isUserLoggedIn" flat @click="navigateTo({ name: 'login' })">Log In</v-btn>
			<v-btn v-if="!$store.state.isUserLoggedIn" flat @click="navigateTo({ name: 'register' })">Sign Up</v-btn>
			<v-btn v-if="$store.state.isUserLoggedIn" flat @click="logout">Log Out</v-btn>
		</v-toolbar-items>
	</v-toolbar>
</template>

<!-- Everything inside the script tag controls the template -->
<script>
export default {
	methods: {
		navigateTo(route) {
			this.$router.push(route);
		},
		logout() {
         this.$store.dispatch('setUser', null);
         this.$store.dispatch('setToken', null);
         this.$router.push({ name: 'root' });
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
