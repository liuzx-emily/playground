<style scoped></style>
<template>
	<section>
		<gc-editor :fcontent.sync="currentData.content" height="200"></gc-editor>
	</section>
</template>
<script>
export default {
	inject: ["treeStore"],
	data() {
		return {}
	},
	computed: {
		currentData() {
			return this.treeStore.currentNode;
		}
	},
};
</script>