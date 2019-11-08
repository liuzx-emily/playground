<template>
	<section>
		<xtree :data="treedata" style="background:#eee;"></xtree>
	</section>
</template>
<script>
import xtree from '~/components/tree/main.vue'
export default {
	components: { xtree },
	data() {
		const treedata = this.xtools.arrayToTree(original_data);
		return { treedata }
	},
	mounted() { },
};
const original_data = [
	{ "id": 16, "name": "echarts", "parentId": 9, },
	{ "id": 18, "name": "CSS", "parentId": 10, },
	{ "id": 26, "name": "打印", "parentId": 25, },
	{ "id": 41, "name": "tricks", "parentId": 21, },
	{ "id": 17, "name": "Guide", "parentId": 9, },
	{ "id": 21, "name": "Javascript", "parentId": 10, },
	{ "id": 27, "name": "页面导出PDF", "parentId": 25, },
	{ "id": 30, "name": "在初始化方法完成后再加载其他部分", "parentId": 28, },
	{ "id": 42, "name": "多级地址", "parentId": 21, },
	{ "id": 9, "name": "插件DEMO", "parentId": 0, },
	{ "id": 19, "name": "使用css绘制图形", "parentId": 18, },
	{ "id": 22, "name": "console", "parentId": 21, },
	{ "id": 29, "name": "图片的src是变量", "parentId": 28, },
	{ "id": 10, "name": "黑科技&难点", "parentId": 0, },
	{ "id": 25, "name": "综合", "parentId": 10, },
	{ "id": 28, "name": "vue相关", "parentId": 10, },
];
</script>

 