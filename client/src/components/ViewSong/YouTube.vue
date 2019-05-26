<template>
	<panel title="YouTube Video">
		<youtube :video-id="youtubeId" :player-height="294" :player-width="300"></youtube>
	</panel>
</template>

<!-- Everything inside the script tag controls the template -->
<script>
import Panel from "@/components/Panel";
export default {
	props: ["youtubeId"],
	components: {
		Panel
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
