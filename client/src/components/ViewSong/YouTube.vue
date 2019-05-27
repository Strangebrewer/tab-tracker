<template>
	<panel title="YouTube Video">
		<youtube :video-id="youtubeId" :player-height="294" :player-width="300"></youtube>
	</panel>
</template>

<!-- Everything inside the script tag controls the template -->
<script>
export default {
	props: ["youtubeId"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
