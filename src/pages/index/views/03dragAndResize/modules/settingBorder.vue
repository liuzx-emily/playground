<style scoped></style>
<template>
	<section>
		<el-form ref="form" label-width="70px" :model="currentData">
			<el-form-item label="边框" prop="borderStyle">
				<el-radio-group v-model="currentData.borderStyle" style="width:100%">
					<el-radio label="1">无</el-radio>
					<el-radio label="solid">实线</el-radio>
					<el-radio label="dashed">虚线</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="圆角" prop="borderStyle">
				<el-input-number v-model="currentData.borderRadius" :min="0" :precision="0"></el-input-number>
			</el-form-item>
			<template v-if="currentData.borderStyle!=1">
				<el-form-item label="颜色" prop="borderColor">
					<el-color-picker v-model="currentData.borderColor"></el-color-picker>
				</el-form-item>
				<el-form-item label="宽度" prop="borderWidth">
					<el-input-number v-model="currentData.borderWidth" :min="0" :precision="0"></el-input-number>
				</el-form-item>
			</template>
		</el-form>
	</section>
</template>
<script>
import { render_border, } from '../utils.js'
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
		"currentData.borderRadius"() {
			render_border(this.currentData.vueInstance);
		},
		"currentData.borderStyle"() {
			render_border(this.currentData.vueInstance);
		},
		"currentData.borderColor"() {
			render_border(this.currentData.vueInstance);
		},
		"currentData.borderWidth"() {
			render_border(this.currentData.vueInstance);
		},
	},
};
</script>