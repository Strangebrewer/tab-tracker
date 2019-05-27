<template>
	<v-layout row wrap>
		<v-flex xs6 offset-xs3>
			<songs-search-panel/>
			<songs-panel class="mt-2"/>
		</v-flex>
	</v-layout>
</template>

<!-- Everything inside the script tag controls the template -->
<script>
import SongsPanel from "./SongsPanel";
import SongsSearchPanel from "./SongsSearchPanel";
import SongsService from "../../services/SongsService";
export default {
	components: {
		SongsPanel,
		SongsSearchPanel
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
