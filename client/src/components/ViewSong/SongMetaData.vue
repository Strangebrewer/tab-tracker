<template>
	<panel title="Song Metadata">
		<v-layout>
			<v-flex xs6>
				<div class="song-title">{{song.title}}</div>
				<div class="song-artist">{{song.artist}}</div>
				<div class="song-genre">{{song.genre}}</div>
				<v-btn class="cyan" @click="navigateTo({name: 'song-edit', params: {songId: song.id}})" dark>Edit</v-btn>
			</v-flex>

			<v-flex xs6>
				<img class="album-image" :src="song.albumImageUrl">
				<br>
				{{song.album}}
			</v-flex>
		</v-layout>
	</panel>
</template>

<!-- Everything inside the script tag controls the template -->
<script>
import Panel from "../Panel";
export default {
	components: {
		Panel
	},
	methods: {
		navigateTo(route) {
			this.$router.push(route);
		}
	},
	props: ["song"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.album-image {
	width: 70%;
	margin: 0 auto;
}
.song-title {
	font-size: 30px;
}
.song-artist {
	font-size: 24px;
}
.song-genre {
	font-size: 18px;
}
</style>
