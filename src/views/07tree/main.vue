<template>
	<section>
		<input type="button" @click="editTree" value="修改tree">
		<x-tree :data="treedata" style="background:#eee;"></x-tree>
	</section>
</template>
<script>
	import xTree from './tree.vue'
	export default {
		components: { xTree },
		data() {
			const treedata = this.xtools.arrayToTree(original_data);
			return {
				treedata
			}
		},
		methods: {
			editTree() {
				this.treedata = this.xtools.arrayToTree([
					{ "id": 16, "parentId": 9, "name": "猫", },
					{ "id": 18, "parentId": 10, "name": "大陆", },
					{ "id": 17, "parentId": 9, "name": "狗", },
					{ "id": 28, "parentId": 19, "name": "中国", },
					{ "id": 30, "parentId": 28, "name": "北京", },
				]);
			}
		}
	};
	const original_data = [
		{ "id": 16, "parentId": 9, "name": "猫", },
		{ "id": 18, "parentId": 10, "name": "大陆", },
		{ "id": 41, "parentId": 21, "name": "太平洋", },
		{ "id": 17, "parentId": 9, "name": "狗", },
		{ "id": 21, "parentId": 10, "name": "海洋", },
		{ "id": 42, "parentId": 21, "name": "大西洋", },
		{ "id": 9, "parentId": 0, "name": "动物", },
		{ "id": 19, "parentId": 18, "name": "亚洲", },
		{ "id": 22, "parentId": 21, "name": "北冰洋", },
		{ "id": 10, "parentId": 0, "name": "地球", },
		{ "id": 25, "parentId": 10, "name": "岩层", },
		{ "id": 26, "parentId": 18, "name": "非洲", },
		{ "id": 27, "parentId": 18, "name": "北美洲", },
		{ "id": 27, "parentId": 18, "name": "南美洲", },
		{ "id": 28, "parentId": 19, "name": "中国", },
		{ "id": 30, "parentId": 28, "name": "北京", },
	];
</script>