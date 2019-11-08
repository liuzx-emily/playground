<style scoped></style>
<template>
	<section>
		<el-form ref="form" label-width="70px" :model="currentData">
			<el-form-item label="背景" prop="backgroundType">
				<el-radio-group v-model="currentData.backgroundType" style="width:100%">
					<el-radio :label="1">无</el-radio>
					<el-radio :label="2">背景颜色</el-radio>
					<el-radio :label="3">背景图片</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="背景颜色" prop="backgroundColor" v-if="currentData.backgroundType==2">
				<el-color-picker v-model="currentData.backgroundColor" show-alpha></el-color-picker>
			</el-form-item>
			<el-form-item label="背景图片" prop="backgroundImgUrl" v-if="currentData.backgroundType==3">
				<gm-upload-one-img :fimgUrl.sync="currentData.backgroundImgUrl" :canBeDeleted="false"></gm-upload-one-img>
			</el-form-item>
		</el-form>
	</section>
</template>
<script>
import { render_background, } from '../utils.js'
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
	watch: {
		"currentData.backgroundType"() {
			render_background(this.currentData.vueInstance);
		},
		"currentData.backgroundColor"() {
			render_background(this.currentData.vueInstance);
		},
		"currentData.backgroundImgUrl"() {
			render_background(this.currentData.vueInstance);
		},
	},
};
</script>