<style scoped></style>
<template>
	<section>
		<el-card>
			<div slot="header">
				<span style="color:red">很有用的！</span>
			</div>
			<!-- card body -->
			<p>1 条件断点： 先创建个正常的断点，然后"编辑断点"。<el-button type="success" class="size-tiny" @click="debugWithCondition">试一下</el-button>
			</p>
			<p>2 DOM断点：右键目标元素 -> <code>Break On</code> -> 选择条件。
				<el-button type="success" class="size-tiny" @click="domBreakOn">试下</el-button>
				<span ref="dom_breakon" style="outline:1px solid black;margin-left:15px;">"受害"元素</span>
			</p>
			<p>3 如果希望重新发送 XHR 请求，但不想刷新页面或触发事件，可以在network中选中方法，右键<code>Replay XHR</code></p>
			<p>4 <code>$_</code>：上一个表达式的结果</p>
		</el-card>
		<el-card>
			<div slot="header">
				<span>还行吧</span>
			</div>
			<!-- card body -->
			<p>1 美化资源，尤其是压缩后的。在sources中，点击文件内容下面的大括号<code>pretty print</code></p>
			<p>2 在DOM元素界面，使用方向键上下可以切换元素，左右可以展开收起元素</p>
			<p>3 <code>console.time(label)</code>和<code>console.timeEnd(label)</code>定时器 <el-button class="size-tiny" type="success" @click="doTiming">试一下</el-button>
			</p>
		</el-card>
		<el-card>
			<div slot="header">
				花里胡哨
			</div>
			<!-- card body -->
			<p>
				1<code>%c</code>样式 <el-button class="size-tiny" type="success" @click="withStyle">试一下</el-button>
			</p>
			<p>
				2<code>console.table</code>打印表格 <el-button class="size-tiny" type="success" @click="printTable">试一下</el-button>
			</p>
		</el-card>
	</section>
</template>
<script>
export default {
	props: {},
	components: {},
	data() {
		return {
			timer: null,
		}
	},
	computed: {},
	watch: {},
	created() { },
	mounted() { },
	methods: {

		withStyle() {
			console.log("%c你好", "color:white;background:hotpink;fontSize:30px;");
		},
		printTable() {
			let arr = [
				{ "num": "1", "title": "海军芜湖舰参加突尼斯海军成立60周年国际舰队检阅活动", "publisher": "小明", "time": "1549987200000", "roofPlacement": "0", "audit": "2", "id": "1" },
				{ "num": "2", "title": "守好祖国疆域一草一木（强军思想引领新征程）", "publisher": "陈余治", "time": "1549555200000", "roofPlacement": "0", "audit": "1", "id": "2" },
				{ "num": "3", "title": "加拿大司法部就孟晚舟案签发授权 华为：对此感到失望", "publisher": "快科技", "time": "1551628800000", "roofPlacement": "0", "audit": "0", id: "3", }
			];
			// 第二个参数(可选，指明需要输出哪一列
			console.table(arr, ["title", "publisher"]);
		},
		doTiming() {
			if (this.timer) {
				this.$message({
					message: '计时结束',
					type: 'success',
					showClose: true,
				});
				console.timeEnd(this.timer);
				this.timer = null;
			} else {
				this.$message({
					message: '计时开始',
					type: 'success',
					showClose: true,
				});
				this.timer = this.xtools.randomId();
				console.time(this.timer);
			}
		},
		// 条件断点
		debugWithCondition() {
			let sum = 0;
			for (let i = 0; i < 100; i++) {
				// 在这里打断点，设置条件为 i==62
				sum += i;
			}
		},
		// DOM断点
		domBreakOn() {
			let oTarget = this.$refs.dom_breakon;
			oTarget.style.color = "red"
		}

	}
};
</script>