<style lang="less" scoped>
@space-width: 18px;
.ms-tree-space {
	position: relative;
	top: 1px;
	display: inline-block;
	font-style: normal;
	font-weight: 400;
	line-height: 1;
	width: @space-width;
	height: 14px;
	&::before {
		content: "";
	}
}
.tree-ctrl {
	position: relative;
	cursor: pointer;
	color: #2196f3;
	margin-left: -@space-width;
}
.el-icon-minus,
.el-icon-plus {
	width: @space-width;
}
</style>
<template>
	<el-table :data="formattedData" :row-style="showRow" class="xTableStyle" :class="styleClassList">
		<!-- 控制列永远是左对齐的，不受表格整体对齐方式的影响 -->
		<el-table-column :width="controlColumn.width">
			<section slot="header" style="text-align:left">
				{{controlColumn.label}}
			</section>
			<section slot-scope="scope" style="text-align:left">
				<span v-for="space in scope.row._level" :key="space" class="ms-tree-space" />
				<span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope)">
					<i v-if="!scope.row._expanded" class="el-icon-plus" />
					<i v-else class="el-icon-minus" />
				</span>
				{{scope.row[controlColumn.prop]}}
			</section>
		</el-table-column>
		<slot></slot>
	</el-table>
</template>
<script>
import Vue from 'vue'
export default {
	install(Vue) {
		Vue.component("gc-treetable", this);
	},
	props: {
		data: {
			type: Array,
			required: true,
		},
		controlColumn: {
			type: Object,
			default: () => {
				return {
					label: "",
					width: "",
					prop: "",
				}
			}
		},
		expandAll: {
			type: Boolean,
			default: false
		},
		// ------------ 样式class -------------------
		color: {
			type: String,
			default: "common"
		},
		size: {
			type: String,
			default: "common"
		},
		align: {
			type: String,
			default: "center"
		},
	},
	computed: {
		formattedData: function () {
			function treeToArray(data, expandAll, parent = null, level = null) {
				let tmp = []
				Array.from(data).forEach(function (record) {
					if (record._expanded === undefined) {
						Vue.set(record, '_expanded', expandAll)
					}
					let _level = 1
					if (level !== undefined && level !== null) {
						_level = level + 1
					}
					Vue.set(record, '_level', _level);
					// 如果有父元素
					if (parent) {
						Vue.set(record, '_parent', parent);
					}
					tmp.push(record);
					if (record.child && record.child.length > 0) {
						const child = treeToArray(record.child, expandAll, record, _level)
						tmp = tmp.concat(child)
					}
				})
				return tmp;
			}
			let _data = this.xtools.arrayToTree(this.data, { id: "id", parentId: "parentId", children: "child" });
			let res = treeToArray(_data, this.expandAll);
			return res;
		},
		styleClassList() {
			return ["color-" + this.color, "size-" + this.size, "align-" + this.align];
		},
	},
	methods: {
		showRow: function (row) {
			let show;
			if (row.row._parent) {
				let parent = row.row._parent
				show = parent._expanded && parent._show;
			} else {
				show = true;
			}
			row.row._show = show;
			return show ? '' : 'display:none;'
		},
		// 切换下级是否展开
		toggleExpanded: function (scope) {
			scope.row._expanded = !scope.row._expanded;
		},
		// 图标显示
		iconShow(index, record) {
			return (index === 0 && record.child && record.child.length > 0)
		}
	}
};
</script>