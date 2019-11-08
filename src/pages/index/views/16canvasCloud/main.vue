<style lang="less" scoped>
canvas {
	box-shadow: 0 0 3px 0 #bac;
	margin: 10px auto 0;
	display: block;
}
</style>
<template>
	<section>
		<canvas width="1000" height="500" ref="canvas"></canvas>
	</section>
</template>
<script>
const DRAWING_MODE = {
	sky: Symbol(),
	sun: Symbol(),
	cloud_type1: Symbol(),
	cloud_type2: Symbol(),
	grassland: Symbol(),
}
export default {
	data() {
		return {
			// 太阳升起的时长
			sunRiseDuration: 500,
			// 天空颜色
			skyColor: "#f2fafe",
			ctx: null,
			drawingList: [
				// 天空
				{ mode: DRAWING_MODE.sky, motionIndex: 0, },
				// 太阳
				{ mode: DRAWING_MODE.sun, x1: 100, y1: 500, x2: 800, y2: 100, motionIndex: 0, },
				// 草地
				{ mode: DRAWING_MODE.grassland, motionIndex: 0, },
				// motionIndex 运动的起始角度
				// motionSpeed 值越小，运动速度越快
				// motionRange 值越大，运动范围越大
				{ mode: DRAWING_MODE.cloud_type2, x: 130, y: 95, scaleX: 0.35, scaleY: 0.35, color: "rgba(227, 242, 253, 1)", motionIndex: 1, motionSpeed: 300, motionRange: 150, },
				{ mode: DRAWING_MODE.cloud_type1, x: 350, y: 0, scaleX: 0.45, scaleY: 0.4, color: "rgba(97, 185, 255,0.9)", motionIndex: 0, motionSpeed: 250, motionRange: 70, },
				{ mode: DRAWING_MODE.cloud_type2, x: 550, y: 70, scaleX: 0.3, scaleY: 0.32, color: "rgba(227, 242, 253, 1)", motionIndex: 1, motionSpeed: 160, motionRange: 50, },
			]
		}
	},
	mounted() {
		this.ctx = this.$refs.canvas.getContext("2d");
		this.draw();
	},
	methods: {
		getNowPosition(val1, val2, progress, method) {
			// if (val1 > val2) {
			// 	[val1, val2] = [val2, val1];
			// }
			if (progress >= 1) {
				return val2;
			} else {
				let _added = progress;
				if (method == "easein") {
					_added = 1 - Math.sin(((progress + 1) * Math.PI) / 2);
				} else if (method == "easeout") {
					_added = Math.sin(progress * Math.PI / 2);
				}
				let _now = val1 + Math.round((val2 - val1) * _added);
				return _now;
			}
		},
		draw() {
			this.ctx.clearRect(0, 0, 1000, 500);
			this.drawingList.forEach(drawingElement => {
				drawingElement.motionIndex++;
				if (drawingElement.mode === DRAWING_MODE.sky) {
					this.sky(drawingElement);
				} else if (drawingElement.mode === DRAWING_MODE.grassland) {
					this.grassland(drawingElement);
				} else if (drawingElement.mode === DRAWING_MODE.sun) {
					this.sun(drawingElement);
				} else if (drawingElement.mode === DRAWING_MODE.cloud_type1) {
					this.three(drawingElement);
				} else if (drawingElement.mode === DRAWING_MODE.cloud_type2) {
					this.circle(drawingElement);
				}
			});
			requestAnimationFrame(this.draw);
		},
		sun(params) {
			let _progress = (params.motionIndex - this.sunRiseDuration / 2) / (this.sunRiseDuration / 2);
			// 太早了，还没有太阳呢~
			if (_progress < 0) {
				return;
			}
			if (_progress > 1) {
				_progress = 1;
			}
			this.ctx.save();
			let center = [
				this.getNowPosition(params.x1, params.x2, _progress, "easein"),
				this.getNowPosition(params.y1, params.y2, _progress, "easeout"),
			];
			// 白色耀眼长光束~
			let BNUMBER;
			if (params.motionIndex > this.sunRiseDuration * 0.75) {
				BNUMBER = 100;
				this.ctx.fillStyle = `rgba(255,255,255,${_progress * 0.5})`;
				for (let i = 0; i <= 100; i += 10) {
					let radius = 5000;
					this.ctx.beginPath();
					this.ctx.moveTo(...center);
					this.ctx.arc(...center, radius, 2 * Math.PI / BNUMBER * i, 2 * Math.PI / BNUMBER * (i + 5));
					this.ctx.fill();
				}
			}
			// 一圈小火苗~
			BNUMBER = 130;
			this.ctx.fillStyle = "#ffc107";
			for (let i = 1; i <= BNUMBER; i += 6) {
				let radius = 80 + Math.sin((i * 10 + params.motionIndex / 20)) * 20;
				this.ctx.beginPath();
				this.ctx.moveTo(...center);
				this.ctx.arc(...center, radius, 2 * Math.PI / BNUMBER * (i + params.motionIndex / 15), 2 * Math.PI / BNUMBER * ((i + params.motionIndex / 15) + 2));
				this.ctx.fill();
			}
			// 
			var grd = this.ctx.createRadialGradient(...center, 0, ...center, 50);
			grd.addColorStop(0.3, "#ff5803");
			grd.addColorStop(0.7, "#ffde3b");
			grd.addColorStop(0.75, "#ffde3b");
			grd.addColorStop(0.95, this.skyColor);
			this.ctx.fillStyle = grd;
			this.ctx.beginPath();
			this.ctx.arc(...center, 50, 0 * Math.PI, 2 * Math.PI);
			this.ctx.fill();
			this.ctx.restore();
		},
		sky(params) {
			this.ctx.save();
			this.skyColor = this.getNowColor(params.motionIndex);
			this.ctx.fillStyle = this.skyColor;
			this.ctx.fillRect(0, 0, 1000, 500);
			this.ctx.restore();
		},
		getNowColor(index) {
			let _start = [82, 115, 161];
			let _end = [242, 250, 254];
			let _now = [];
			for (let i = 0; i < 3; i++) {
				_now[i] = _start[i] + Math.round((_end[i] - _start[i]) / this.sunRiseDuration * index);
				_now[i] = Math.min(_now[i], _end[i]);
			}
			return `rgb(${_now[0]},${_now[1]},${_now[2]})`
		},
		circle(params) {
			this.ctx.save();
			// 挪过去、摆好尺寸、设置颜色
			this.ctx.translate(params.x, params.y);
			this.ctx.translate(Math.sin(params.motionIndex / params.motionSpeed) * params.motionRange, 0);
			this.ctx.scale(params.scaleX, params.scaleY);
			this.ctx.strokeStyle = params.color;
			this.ctx.fillStyle = params.color;

			// 开始画啦
			this.ctx.beginPath();
			this.ctx.arc(50, 150, 50, 0 * Math.PI, 2 * Math.PI);
			this.ctx.fill();

			this.ctx.beginPath();
			this.ctx.arc(120, 80, 80, 0 * Math.PI, 2 * Math.PI);
			this.ctx.fill();

			this.ctx.beginPath();
			this.ctx.arc(220, 110, 70, 0 * Math.PI, 2 * Math.PI);
			this.ctx.fill();

			this.ctx.beginPath();
			this.ctx.arc(290, 150, 50, 0 * Math.PI, 2 * Math.PI);
			this.ctx.fill();

			this.ctx.beginPath();
			this.ctx.moveTo(45, 200);
			this.ctx.bezierCurveTo(60, 205, 290, 205, 290, 200);
			this.ctx.lineTo(290, 120);
			this.ctx.lineTo(60, 120);
			this.ctx.fill();

			this.ctx.restore();
		},
		three(params) {
			this.ctx.save();
			// 挪过去、摆好尺寸、设置颜色
			this.ctx.translate(params.x, params.y);
			this.ctx.translate(Math.sin(params.motionIndex / params.motionSpeed) * params.motionRange, 0);
			this.ctx.scale(params.scaleX, params.scaleY);
			this.ctx.strokeStyle = params.color;
			this.ctx.fillStyle = params.color;
			// 开始画啦
			this.ctx.beginPath();
			this.ctx.moveTo(100, 300);
			this.ctx.bezierCurveTo(20, 300, 10, 180, 100, 180);
			this.ctx.bezierCurveTo(90, 60, 230, 60, 250, 150);
			this.ctx.bezierCurveTo(280, 130, 340, 145, 350, 200);
			this.ctx.bezierCurveTo(410, 200, 430, 280, 350, 300);
			this.ctx.bezierCurveTo(330, 330, 210, 320, 200, 310);
			this.ctx.bezierCurveTo(180, 320, 120, 320, 100, 300);
			this.ctx.stroke();
			this.ctx.fill();
			this.ctx.restore();
		},
		grassland(params) {
			this.ctx.save();
			let center = [680, 2250];
			let radius = 1900;

			var grd = this.ctx.createRadialGradient(...center, 0, ...center, radius);
			grd.addColorStop(0.8, "#66a13c");
			grd.addColorStop(1, "#8bc34a");
			this.ctx.fillStyle = grd;

			this.ctx.shadowBlur = 10;
			this.ctx.shadowColor = "#99d457";
			this.ctx.beginPath();
			this.ctx.moveTo(...center);
			this.ctx.arc(...center, radius, 0, 2 * Math.PI);
			this.ctx.fill();
			this.ctx.restore();
		}
	}
}
</script>