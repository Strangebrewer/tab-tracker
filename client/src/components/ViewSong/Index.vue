<template>
	<div>
		<v-layout>
			<v-flex xs6>
				<song-metadata :song="song"/>
			</v-flex>

			<v-flex xs6 class="ml-2">
				<you-tube :youtubeId="song.youtubeId"/>
			</v-flex>
		</v-layout>

		<v-layout>
			<v-flex xs6 class="mt-2">
				<tab :song="song"/>
			</v-flex>

			<v-flex xs6 class="ml-2 mt-2">
				<lyrics :song="song"/>
			</v-flex>
		</v-layout>
	</div>
</template>

<!-- Everything inside the script tag controls the template -->
<script>
import { mapState } from "vuex";
import SongsService from "@/services/SongsService";
import SongHistoryService from "@/services/SongHistoryService";
import SongMetadata from "./SongMetaData";
import YouTube from "./YouTube";
import Lyrics from "./Lyrics";
import Tab from "./Tab";

export default {
	components: {
		SongMetadata,
		YouTube,
		Lyrics,
		Tab
	},
	computed: {
		...mapState(["isUserLoggedIn", "user", "route"])
	},
	data() {
		return {
			song: {}
		};
	},
	async mounted() {
		const songId = this.$store.state.route.params.songId;
		this.song = (await SongsService.show(songId)).data;

		if (this.isUserLoggedIn)
			SongHistoryService.post({ songId });
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
