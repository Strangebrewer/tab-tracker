<template>
	<div class="white elevation-8">
		<v-toolbar flat dense class="cyan" dark>
			<v-toolbar-title>{{title}}</v-toolbar-title>
         <slot name="action"></slot>
		</v-toolbar>
		<div class="pl-4 pr-4 pt-2 pb-2">
			<slot>
            No slot content defined.
         </slot>
		</div>
	</div>
</template>

<!-- Everything inside the script tag controls the template -->
<script>
export default {
   props: [
      'title'
   ],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
