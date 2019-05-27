<template>
	<panel title="Songs">
		<div class="song" v-for="song in songs" :key="song.title">
			<v-layout>
				<v-flex xs6>
					<div class="song-title">{{song.title}}</div>
					<div class="song-artist">{{song.artist}}</div>
					<div class="song-genre">{{song.genre}}</div>
					<v-btn class="cyan" :to="{name: 'song', params: {songId: song.id}}" dark>View</v-btn>
				</v-flex>

				<v-flex xs6>
					<img class="album-image" :src="song.albumImageUrl">
					<br>
					{{song.album}}
				</v-flex>
			</v-layout>
		</div>
		<v-btn
			slot="action"
			:to="{name: 'songs-create'}"
			class="cyan accent-2"
			light
			medium
			absolute
			right
			middle
			fab
		>
			<v-icon>add</v-icon>
		</v-btn>
	</panel>
</template>

<!-- Everything inside the script tag controls the template -->
<script>
import SongsService from "../../services/SongsService";

export default {
	data() {
		return {
			songs: null
		};
	},
	// the below watch item works equivalently to fetching all songs when mounted.
	// async mounted() {
	// 	// TODO: Make a call to the db to get songs
	// 	this.songs = (await SongsService.index()).data;
	// },
	watch: {
		"$route.query.search": {
			immediate: true,
			async handler(value) {
				this.songs = (await SongsService.index(value)).data;
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song {
	padding: 20px;
	height: 330px;
	overflow: hidden;
	margin: 10px;
	border: 1px solid red;
}
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
