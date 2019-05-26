<template>
	<v-layout row wrap>
		<v-flex xs6 offset-xs3>
         <panel title="Songs">
            <div v-for="song in songs" :key="song.title">
               {{song.title}}
               {{song.artist}}
               {{song.album}}
            </div>
         </panel>
		</v-flex>
	</v-layout>
</template>

<!-- Everything inside the script tag controls the template -->
<script>
import SongsService from '../services/SongsService'
import Panel from '../components/Panel'
export default {
   components: {
      Panel
   },
   data () {
      return {
         songs: null
      }
   },
   methods: {},
   async mounted () {
      // TODO: Make a call to the db to get songs
      this.songs = await SongsService.index();
   }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
