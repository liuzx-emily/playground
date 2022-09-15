<style lang="less" scoped>
canvas {
	border: 10px solid #aaa;
	display: block;
}
</style>

<template>
	<section>
		<input type="file" accept="image/*" @change="uploadFile">
		<img src="./1.jpg" style="display:none">
		问题：为什么本地图片1.jpg会加载失败？？？
		<button type="button" @click="visualEffect_none">原图</button>
		<button type="button" @click="visualEffect_brighter(20)">增加亮度</button>
		<button type="button" @click="visualEffect_brighter(-20)">降低亮度</button>
		<button type="button" @click="visualEffect_momo">沫沫</button>
		<button type="button" @click="visualEffect_gray">黑白</button>
		<button type="button" @click="visualEffect_upsidedown">颠倒</button>
		<button type="button" @click="visualEffect_mosaic">马赛克</button>
		<canvas :id="elementId"></canvas>
	</section>
</template>
<script>
let canvas;
let ctx;
let width = 600;
let height = 400;
export default {
	data() {
		return {
			elementId: "canvas" + this.xtools.randomId(),
			imgdata1: null,
			imgdata2: null,
		}
	},

	mounted() {
		canvas = document.querySelector("#" + this.elementId);
		canvas.setAttribute("width", width);
		canvas.setAttribute("height", height);
		ctx = canvas.getContext("2d");
		this.getOriginalImageData("1.jpg");
	},
	methods: {
		uploadFile() {
			let img = this.$el.querySelector('input[type="file"]').files[0];
			var fr = new FileReader();
			fr.onload = () => {
				this.$el.querySelector("img").src = fr.result;
			};
			fr.readAsDataURL(img);
			// ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
			// this.imgdata1 = ctx.getImageData(0, 0, width, height);
			// this.imgdata2 = ctx.createImageData(this.imgdata1);
		},
		getOriginalImageData(path) {
			// const img = new Image();
			const img = this.$el.querySelector("img");
			img.onload = () => {
				ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
				this.imgdata1 = ctx.getImageData(0, 0, width, height);
				this.imgdata2 = ctx.createImageData(this.imgdata1);
			};
			img.onerror = e => {
				console.log(e);
			};
		},
		visualEffect_none() {
			this.clearCanvas();
			ctx.putImageData(this.imgdata1, 0, 0);
		},
		// 增加亮度
		visualEffect_brighter(delta) {
			this.clearCanvas();
			for (let x = 0; x < width; x++) {
				for (let y = 0; y < height; y++) {
					const colorArr = this.getColor(this.imgdata1, x, y);
					let newColor = colorArr.map(item => item + delta);
					this.setColor(this.imgdata2, x, y, newColor);
				}
			}
			ctx.putImageData(this.imgdata2, 0, 0);
		},
		// 沫沫
		visualEffect_momo() {
			this.clearCanvas();
			for (let x = 0; x < width; x++) {
				for (let y = 0; y < height; y++) {
					const colorArr = this.getColor(this.imgdata1, x, y);
					// ---------------- 沫沫效果 ----------------
					if (Math.random() < 0.5) {
						this.setColor(this.imgdata2, x, y, colorArr);
					} else {
						this.setColor(this.imgdata2, x, y, colorArr.map(item => Math.round(item * 0.5)));
					}

				}
			}
			ctx.putImageData(this.imgdata2, 0, 0);
		},
		// 黑白
		visualEffect_gray() {
			this.clearCanvas();
			for (let x = 0; x < width; x++) {
				for (let y = 0; y < height; y++) {
					const colorArr = this.getColor(this.imgdata1, x, y);
					const gray = 0.3 * colorArr[0] + 0.3 * colorArr[1] + 0.4 * colorArr[2];
					this.setColor(this.imgdata2, x, y, [gray, gray, gray, 255]);
				}
			}
			ctx.putImageData(this.imgdata2, 0, 0);
		},
		// 颠倒
		visualEffect_upsidedown() {
			this.clearCanvas();
			for (let x = 0; x < width; x++) {
				for (let y = 0; y < height; y++) {
					const colorArr = this.getColor(this.imgdata1, x, y);
					this.setColor(this.imgdata2, width - x, height - y, colorArr);
				}
			}
			ctx.putImageData(this.imgdata2, 0, 0);
		},
		// 马赛克
		visualEffect_mosaic() {
			const level = 10;
			this.clearCanvas();
			for (let x = 0; x < width; x += level) {
				for (let y = 0; y < height; y += level) {
					const colorArr = this.getColor(this.imgdata1, x, y);
					for (let x_level = -level; x_level < level; x_level++) {
						for (let y_level = -level; y_level < level; y_level++) {
							this.setColor(this.imgdata2, x + x_level, y + y_level, colorArr);
						}
					}
				}
			}
			ctx.putImageData(this.imgdata2, 0, 0);
		},
		clearCanvas() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		},
		getColor(imageData, x, y) {
			let index = 4 * (y * imageData.width + x);
			return [imageData.data[index],
			imageData.data[index + 1],
			imageData.data[index + 2],
			imageData.data[index + 3]
			];
		}
		,
		setColor(imageData, x, y, color) {
			let index = 4 * (y * imageData.width + x);
			imageData.data[index] = color[0];
			imageData.data[index + 1] = color[1];
			imageData.data[index + 2] = color[2];
			imageData.data[index + 3] = color[3];
		}
	},
}
</script>

