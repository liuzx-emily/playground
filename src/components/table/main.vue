<template>
	<section v-loading.fullscreen.lock="loading">
		<!-- 表格 -->
		<el-table :data="tableData" @selection-change="handleSelectionChange" @sort-change="sortChange" class="xTableStyle" :class="styleClassList" v-bind="$attrs">
			<!-- 多选列 -->
			<el-table-column type="selection" v-if="enableCheckbox"></el-table-column>
			<slot></slot>
		</el-table>
		<!-- 分页 -->
		<template v-if="enablePaging && startRenderingPaging">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :total="count" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, slot" style="margin-top:5px;">
				<template slot-scope="scope">{{ scope }}哈哈</template>
			</el-pagination>
		</template>
	</section>
</template>
<script>
export default {
	install(Vue) {
		Vue.component("gc-table", this);
	},
	props: {
		refresh: Function,
		// 是否开启分页功能
		enablePaging: {
			default: true
		},
		// 是否添加多选列
		enableCheckbox: {
			default: false
		},
		// 默认排序
		defaultsort: {
			default: () => { return { sort: "", order: "" } }
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
		styleClassList() {
			return ["color-" + this.color, "size-" + this.size, "align-" + this.align];
		},
	},
	data() {
		let param = {
			loading: false,
			// 表格多选的值
			tableSelection: [],
			// 排序
			sort: this.defaultsort.sort,
			order: this.defaultsort.order,
			// 搜索条件
			searchparam: {},
			// 表格数据
			tableData: [],
			count: 0
		};
		if (this.enablePaging) {
			param.pageSizes = [10, 20, 50, 100, 500];
			param.pageNum = 1;
			param.pageSize = 10;
		}
		/*
				element的分页组件在初始化完成后，再通过js修改 `current-page` ，组件是不会响应它的变化的。
				所以为了实现 “一上来就显示第3页” 这种需求，必须 ==先把 current-page 改成3，然后再初始化分页组件  。

				引入 `startRenderingPaging` 参数，控制分页组件的初始化时间。初始化为 false。
				在` refreshTable` 方法中，把 `startRenderingPaging`的值改为true。
				所以只要在调用 `refreshTable` 之前设置好 `current-page`就可以了。
		*/
		param.startRenderingPaging = false;
		return param;
	},
	methods: {
		// ------------------------------ 刷新表格数据 ------------------------------
		refreshTable(searchparam) {
			this.startRenderingPaging = true;
			// 如果传来了新的搜索参数，那么用新的。不然，沿用之前的搜索参数
			if (searchparam) {
				this.searchparam = this._.cloneDeep(searchparam);
			}
			let param = this._.cloneDeep(this.searchparam);
			if (this.enablePaging) {
				// 分页参数
				param.page = this.pageNum;
				param.row = this.pageSize;
			}
			// 排序参数
			param.sort = this.sort;
			param.order = this.order;
			// 调用父组件传来的 refresh 方法
			this.refresh(param, this);
		},
		// 表格分页：每页的条数变化
		handleSizeChange(val) {
			this.pageSize = val;
			// 跳回第一页
			this.pageNum = 1;
			this.refreshTable();
		},
		// 表格分页：跳页
		handleCurrentChange(val) {
			this.pageNum = val;
			this.refreshTable();
		},
		// -------------------------------- 表格 --------------------------------
		// 点击表头排序
		sortChange(param) {
			if (param.order == 'ascending') {
				this.sort = param.prop;
				this.order = "asc";
			} else if (param.order == 'descending') {
				this.sort = param.prop;
				this.order = "desc";
			} else if (param.order == null) {
				this.sort = "";
				this.order = "";
			}
			// 跳回第一页
			this.pageNum = 1;
			this.refreshTable();
		},
		// 表格的checkbox，有变化时触发
		handleSelectionChange(selections) {
			this.tableSelection = selections;
		},
		// 获取selection
		getSelection() {
			return this.tableSelection;
		}
	}
};
</script>