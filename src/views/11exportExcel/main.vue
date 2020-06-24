<template>
	<section>
		<p>npm install xlsx file-saver -S</p>
		<p>npm install script-loader -S -D</p>
		<input type="button" @click="exportExcel" value="导出excel">
	</section>
</template>

<script>
	import { export_json_to_excel, formatJson } from './Export2Excel'
	export default {
		methods: {
			exportExcel() {
				const list = [
					{ name: "小明", age: 12, },
					{ name: "小红", age: 13, },
					{ name: "小刚", age: 14, },
				];
				export_json_to_excel({
					//表头 必填
					header: ["姓名", "年龄", ],
					//具体数据 必填
					data: formatJson(["name", "age", ], list),
					// excel文件名称
					filename: '学生信息',
					autoWidth: true,
					bookType: 'xlsx',
				})
			},
		}
	}
</script>

<style>

</style>