<template>
	<panel title="Song Metadata">
		<v-layout>
			<v-flex xs6>
				<div class="song-title">{{song.title}}</div>
				<div class="song-artist">{{song.artist}}</div>
				<div class="song-genre">{{song.genre}}</div>
				<v-btn class="cyan" :to="{name: 'song-edit', params: {songId: song.id}}" dark>Edit</v-btn>
				<v-btn v-if="isUserLoggedIn && !bookmark" class="cyan" @click="setBookmark" dark>Set Bookmark</v-btn>
				<v-btn
					v-if="isUserLoggedIn && bookmark"
					class="cyan"
					@click="removeBookmark"
					dark
				>Remove Bookmark</v-btn>
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
import { mapState } from "vuex";
import BookmarksService from "../../services/BookmarksService";

export default {
	computed: {
		...mapState(["isUserLoggedIn"])
	},
	data() {
		return {
			bookmark: null
		};
	},
	methods: {
		async setBookmark() {
			try {
				this.bookmark = (await BookmarksService.post({
					songId: this.song.id
				})).data;
			} catch (e) {
				console.log("e in bookmark:::", e);
			}
		},
		async removeBookmark() {
         console.log('this.bookmark.id:::', this.bookmark.id);
			try {
				await BookmarksService.delete(this.bookmark.id);
				this.bookmark = null;
			} catch (e) {
				console.log("e in unbookmark:::", e);
			}
		}
	},
	async mounted() {
      if (!this.isUserLoggedIn) return;
      console.log('songId:::', this.$route.params.songId);

		try {
			this.bookmark = (await BookmarksService.index({
				// The songId below was originally 'this.song.id', which would grab the id from the song prop.
				// The problem is, the song prop isn't yet present when this component mounts, so this query never worked right.
				// I changed it to extract the songId from the route params, which works, but using the song method in 'watch' (commented out below) also works.
				// The watch method is probably a better practice since props won't usually be available as route params.
				songId: this.$route.params.songId,
				// songId: this.song.id
         })).data[0];
         
         console.log('this.bookmark:::', this.bookmark);

			// if (bookmarks.length) this.bookmark = bookmarks[0];
		} catch (e) {
			console.log("e in mounted SongMetaData:::", e);
		}
	},
	props: ["song"]
	// watch: {
	// 	async song() {
	// 		if (!this.isUserLoggedIn) return;

	// 		try {
	// 			this.bookmark = (await BookmarksService.index({
	// 				songId: this.song.id
	// 			})).data[0];
	// 		} catch (e) {
	// 			console.log("e in mounted SongMetaData:::", e);
	// 		}
	// 	}
	// }
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
