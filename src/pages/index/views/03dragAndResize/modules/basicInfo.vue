<style scoped></style>
<template>
	<section>
		<el-input v-model="currentNode.title" />
		<x-button @click="do_add" icon="plus"></x-button>
		<x-button @click="do_delete" icon="trash"></x-button>
	</section>
</template>
<script>
export default {
	inject: ["treeStore"],
	computed: {
		currentNode() {
			return this.treeStore.currentNode;
		}
	},
	methods: {
		do_add() {
			this.treeStore.insertChild(this.currentNode.id);
		},
		do_delete() {
			this.treeStore.removeNode(this.currentNode);
		},
	}
};
</script>