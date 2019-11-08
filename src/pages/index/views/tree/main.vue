<template>
	<treeChildren :data="formattedData" />
</template>
<script>
import treeChildren from './treeChildren.vue'
export default {
	install(Vue) {
		Vue.component("x-tree", this);
	},
	components: { treeChildren },
	props: {
		data: {
			type: Array,
			default: () => { return []; }
		},
		props: {
			type: Object,
			default: () => {
				return {
					before_idkey: "id",
					before_parentkey: "parentId",
				}
			}
		}
	},
	data() {
		return {
			formattedData: this.formattingData(),
		}
	},
	watch: {
		data() {
			this.formattedData = this.formattingData();
		}
	},
	methods: {
		formattingData() {
			let data = this._.cloneDeep(this.data);
			return data;
		}
	}
};
</script>