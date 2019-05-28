<template>
	<panel title="Bookmarks">
		<v-data-table :headers="headers" :pagination.sync="pagination" :items="bookmarks">
			<template slot="items" slot-scope="props">
				<td class="text-xs-right">{{props.item.title}}</td>
				<td class="text-xs-left">{{props.item.artist}}</td>
			</template>
		</v-data-table>
	</panel>
</template>

<script>
import { mapState } from "vuex";
import BookmarksService from "../../services/BookmarksService";

export default {
	computed: {
		...mapState(["isUserLoggedIn", 'user'])
	},
	data() {
		return {
			headers: [
				{
					text: "Title",
					value: "title"
				},
				{
					text: "Artist",
					value: "artist"
				}
			],
			pagination: {
				sortBy: "createdAt",
				descending: true
			},
			bookmarks: []
		};
	},
	async mounted() {
		if (this.isUserLoggedIn) {
			this.bookmarks = (await BookmarksService.index()).data;
		}
	}
};
</script>

<style>
</style>
