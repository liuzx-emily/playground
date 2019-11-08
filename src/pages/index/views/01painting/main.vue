<style lang="less" scoped>
button.control-history-step-button {
	border: none;
  outline: none;
	padding: 4px 10px;
	color: #03a9f4;
	background: aliceblue;
	cursor: pointer;
	margin-right: 5px;
	&:disabled {
		background: #777;
		color: #555;
		cursor: not-allowed;
	}
}
canvas {
	outline: 1px solid #000;
}
ul li {
	display: inline-block;
	width: 50px;
	height: 50px;
	vertical-align: top;
	img {
		width: 100%;
		border: 1px solid #eee;
	}
}
li.current img {
	border-color: coral;
}
</style>

<template>
	<section>
		<section>
			<button class="control-history-step-button" type="button" @click="goBack" :disabled="historyIndex==0"><i class="fa fa-undo"></i></button>
			<button class="control-history-step-button" type="button" @click="goNext" :disabled="!inHistory"><i class="fa fa-repeat"></i></button>
		<ul>
			<li v-for="(item,index) in historyList" :key="index" :class="{'current':index==historyIndex}">
				<img :src="item" alt="">
			</li>
		</ul>
			<br>
			画笔颜色<input type="color" v-model="lineColor">
			画笔粗细<input type="number" v-model="lineWidth">
			<br>
		</section>
		<canvas width="500" height="500" ref="canvas"></canvas>
	</section>
</template>
<script>
export default {
	data() {
		return {
			canvas: null,
			ctx: null,
			historyList: [],
			historyIndex: 0,
			lineColor: "#FF5722",
			lineWidth: 20,
		}
	},
	computed: {
		inHistory() { return this.historyIndex < this.historyList.length - 1; }
	},
	watch: {
		lineColor(val) { this.ctx.strokeStyle = val; },
		lineWidth(val) { this.ctx.lineWidth = val; },
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.canvas = this.$refs.canvas;
			this.canvas.addEventListener("mousedown", this.drawLine);
			this.ctx = this.canvas.getContext('2d');
			// 初始化设置样式
			this.ctx.strokeStyle = this.lineColor;
			this.ctx.lineWidth = this.lineWidth;
      // 
			const url = this.canvas.toDataURL();
			this.historyList.push(url);
		},
		drawLine(e) {
			const getOffset = e => {
				return [e.clientX - this.canvas.getBoundingClientRect().left, e.clientY - this.canvas.getBoundingClientRect().top]
			};
			const ctx = this.ctx;
			ctx.beginPath();
			ctx.moveTo(...getOffset(e));
			document.onmousemove = e => {
				ctx.lineTo(...getOffset(e));
				ctx.stroke();
				return false;
			};
			document.onmouseup = e => {
				if (this.inHistory) {
					this.historyList.length = this.historyIndex + 1;
				}
				const url = this.canvas.toDataURL();
				this.historyList.push(url);
				this.historyIndex = this.historyList.length - 1;

				document.onmousemove = null;
				document.onmouseup = null;
			};
		},
		goBack() {
			this.historyIndex = this.historyIndex - 1;
			this.goToHistory();
		},
		goNext() {
			this.historyIndex = this.historyIndex + 1;
			this.goToHistory();
		},
		goToHistory() {
			const url = this.historyList[this.historyIndex];
			const oImage = new Image();
			oImage.onload = e => {
				this.ctx.clearRect(0, 0, 500, 500);
				this.ctx.drawImage(oImage, 0, 0, 500, 500);
			};
			oImage.src = url;
		},
	},
}
</script>

