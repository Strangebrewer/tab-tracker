<template>
	<v-layout>
		<v-flex xs6 v-if="isUserLoggedIn">
			<songs-bookmarks/>
			<recently-viewed-songs class="mt-2"/>
		</v-flex>
		<v-flex :class="{xs6: isUserLoggedIn, xs12: !isUserLoggedIn}" class="ml-2">
			<songs-search-panel/>
			<songs-panel class="mt-2"/>
		</v-flex>
	</v-layout>
</template>

<!-- Everything inside the script tag controls the template -->
<script>
import SongsPanel from "./SongsPanel";
import SongsBookmarks from "./SongsBookmarks";
import RecentlyViewedSongs from "./RecentlyViewedSongs";
import SongsSearchPanel from "./SongsSearchPanel";
import SongsService from "../../services/SongsService";
import { mapState } from "vuex";

export default {
	components: {
		SongsPanel,
		SongsSearchPanel,
		SongsBookmarks,
		RecentlyViewedSongs
	},
	computed: {
		...mapState(["isUserLoggedIn"])
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
