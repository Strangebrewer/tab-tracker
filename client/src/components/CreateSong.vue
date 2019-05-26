<template>
	<v-layout>
		<v-flex xs6>
			<panel title="Song Metadata">
				<v-text-field :rules="[required]" v-model="song.title" label="Title"></v-text-field>
				<v-text-field :rules="[required]" v-model="song.genre" label="genre"></v-text-field>
				<v-text-field :rules="[required]" v-model="song.artist" label="Artist"></v-text-field>
				<v-text-field :rules="[required]" v-model="song.album" label="album"></v-text-field>
				<v-text-field :rules="[required]" v-model="song.albumImageUrl" label="Album Image URL"></v-text-field>
				<v-text-field :rules="[required]" v-model="song.youtubeId" label="YouTube ID"></v-text-field>
			</panel>
		</v-flex>

		<v-flex xs6>
			<panel title="Song Structure" class="ml-2">
				<v-text-field :rules="[required]" v-model="song.lyrics" label="Lyrics" multi-line></v-text-field>
				<v-text-field :rules="[required]" v-model="song.tab" label="Tablature" multi-line></v-text-field>
			</panel>

			<div class="danger-alert" v-if="error">{{error}}</div>
			<v-btn class="cyan" @click="create" dark>Create Song</v-btn>
		</v-flex>
	</v-layout>
</template>

<!-- Everything inside the script tag controls the template -->
<script>
import Panel from "./Panel";
import SongsService from "../services/SongsService";
export default {
	data() {
		return {
			song: {
				title: null,
				artist: null,
				genre: null,
				album: null,
				albumImageUrl: null,
				youtubeId: null,
				lyrics: null,
				tab: null
			},
			error: null,
			required: value => !!value || "Required."
		};
	},
	components: {
		Panel
	},
	methods: {
		async create() {
			this.error = null;
			const areAllFieldsFilledIn = Object.keys(this.song).every(
				key => !!this.song[key]
			);
			if (!areAllFieldsFilledIn) {
				this.error = "Please fill in all fields.";
				return;
			}
			try {
				await SongsService.post(this.song);
				this.$router.push({ name: "songs" });
			} catch (err) {
				console.log("err in CreateSong.vue:::", err);
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.danger-alert {
   color: red;
}
</style>
