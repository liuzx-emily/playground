<style scoped>
.left {
	display: inline-block;
	width: calc(100% - 500px);
	height: 100%;
	vertical-align: top;
	overflow: auto;
}
.container {
	position: relative;
	width: 1200px;
	height: 800px;
	margin: 0 auto;
	outline: 1px solid black;
}
.right {
	display: inline-block;
	width: 500px;
}
>>> .el-card {
	margin-bottom: 5px;
	box-shadow: none !important;
}
>>> .el-card .el-card__header {
	padding: 5px 0;
	text-align: center;
	background: #eee;
	color: #555;
}
>>> .el-card .el-card__body {
	padding: 5px;
}
</style>
<template>
	<section style="height:100%;">
		<section class="left">
			<section class="container">
				<magicComponent v-for="item in treeStore.data" :key="item.id" :data="item"></magicComponent>
			</section>
		</section>
		<section class="right">
			<a href="https://github.com/gorkys/vue-draggable-resizable">github地址</a>
			<button type="button" @click="do_save">保存</button>
			<button type="button" @click="cancelSelect">取消当前选择的内容</button>
			<el-card>
				<div slot="header">当前元素</div>
				<section style="height:450px;overflow:auto">
					<section v-if="currentId">
						<el-tabs>
							<el-tab-pane label="信息">
								<basicInfo></basicInfo>
							</el-tab-pane>
							<el-tab-pane label="内容">
								<editingText></editingText>
							</el-tab-pane>
							<el-tab-pane label="背景">
								<settingBackground></settingBackground>
							</el-tab-pane>
							<el-tab-pane label="边框">
								<settingBorder></settingBorder>
							</el-tab-pane>
						</el-tabs>
					</section>
				</section>
			</el-card>
			<el-card>
				<div slot="header">大纲</div>
				<section style="height:250px;overflow:auto">
					<el-tree :data="treeStore.data" node-key="id" :props="{label:'title'}" :highlight-current="true" :default-expand-all="true" :expand-on-click-node="false" @node-click="nodeClick" ref="tree"></el-tree>
				</section>
			</el-card>
		</section>
	</section>
</template>
<script>
// 数据
import TreeStore from './data/tree-store'
// 递归的 magicComponent
import magicComponent from './magicComponent.vue'
// 弹窗
import basicInfo from './modules/basicInfo.vue'
import editingText from './modules/editingText.vue'
import settingBackground from './modules/settingBackground.vue'
import settingBorder from './modules/settingBorder.vue'
export default {
	components: { magicComponent, basicInfo, editingText, settingBackground, settingBorder, },
	provide() {
		return { treeStore: this.treeStore }
	},
	data() {
		return {
			contentId: "magic",
			treeStore: new TreeStore()
		}
	},
	computed: {
		currentId() {
			return this.treeStore.currentKey;
		}
	},
	watch: {
		"currentId"(val) {
			if (val) {
				this.$refs.tree.setCurrentKey(val);
			} else {
				this.$refs.tree.setCurrentKey(null);
			}
		}
	},
	created() { this.getData(); },
	methods: {
		cancelSelect() {
			this.treeStore.setCurrentKey(null);
		},
		getData() {
			this.xaxios({
				url: "/api/magiccomponent/list.do",
				params: {
					contentId: this.contentId
				}
			}).then(res => {
				const list = this.xtools.arrayToTree(res.data, { children: "list", });
				this.treeStore.setData(list);
			})
		},
		do_save() {
			this.xaxios({
				method: 'POST',
				url: "/api/magiccomponent/saveAll.do",
				data: {
					list: this.treeStore.data,
					contentId: this.contentId
				}
			}).then(res => {
				if (res.code == 1) {
					this.$message({ message: '保存成功！', type: 'success', });
				}
			});
		},
		nodeClick(data) {
			data.active = true;
			this.treeStore.setCurrentKey(data.id);
		}
	}
};
</script>