<template>
	<panel title="Recently Viewed">
		<v-data-table :headers="headers" :pagination.sync="pagination" :items="history">
			<template slot="items" slot-scope="props">
				<td class="text-xs-right">{{props.item.title}}</td>
				<td class="text-xs-left">
					{{props.item.artist}}
					<span class="delete-btn" @click="removeHistory(props.item.id)">&times;</span>
				</td>
			</template>
		</v-data-table>
	</panel>
</template>

<script>
import { mapState } from "vuex";
import SongHistoryService from "../../services/SongHistoryService";

export default {
	computed: {
		...mapState(["isUserLoggedIn", "user"])
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
			history: []
		};
	},
	methods: {
		async removeHistory(value) {         
         await SongHistoryService.delete(value);
			this.history = (await SongHistoryService.index()).data;
		}
	},
	async mounted() {
		if (this.isUserLoggedIn) {
			this.history = (await SongHistoryService.index()).data;
		}
	}
};
</script>

<style>
.delete-btn {
	position: absolute;
	right: 20px;
	top: 10px;
	cursor: pointer;
	font-size: 20px;
}
.text-xs-left {
	position: relative;
}
</style>
