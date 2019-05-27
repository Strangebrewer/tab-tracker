<template>
	<panel title="Tab">
		<textarea v-model="song.tab" readonly multi-line></textarea>
	</panel>
</template>

<!-- Everything inside the script tag controls the template -->
<script>
export default {
	props: ["song"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
	width: 100%;
	font-family: monospace;
	border: none;
	height: 600px;
	overflow: auto;
	padding: 20px;
}
</style>
