<style lang="scss" scoped>
	canvas {
		// background: linear-gradient(20deg, #f88 0, pink 45%, pink 50%, #fe8989 100%);
		border: 1px solid black;
	}
</style>
<template>
	<section>
		<canvas ref="canvas" width="400" height="400" id='ccc'></canvas>
	</section>
</template>

<script>
	import { fabric } from 'fabric'
	import CanvasMagic from './CanvasMagic'
	export default {
		data() {
			return {
				cm: null,
				canvas: null,
				ctx: null,
				cellSize: 40,
			}

		},
		mounted() {
			this.canvas = new fabric.Canvas('ccc', {
				isDrawingMode: false,
				selection: false, // Indicates whether group selection should be enabled
			})
			this.canvas.on({
				'mouse:down': o => {
					let chufajieguo = Math.floor(o.pointer.x / this.cellSize);
					let yushu = o.pointer - this.cellSize * chufajieguo;
					console.log(o.pointer);
					console.log(o.pointer);
				}
			})
			// var rect = new fabric.Rect({ left: 100, top: 100, fill: 'red', width: 20, height: 20 });
			// this.canvas.add(rect);
			this.drawBoard();
			this.drawPieces(1, 1, 'black');
			this.drawPieces(3, 5, 'white');
		},
		methods: {
			drawBoard() {
				const options = { strokeWidth: 2, stroke: 'gray', hasControls: false };
				const lines = [];
				for (let i = 0; i < 9; i++) {
					lines.push(new fabric.Line([this.cellSize * i, 0, this.cellSize * i, this.cellSize * 8], options))
					lines.push(new fabric.Line([0, this.cellSize * i, this.cellSize * 8, this.cellSize * i], options));
				}
				this.canvas.add(...lines);
			},
			drawPieces(x, y, color) {
				const circle = new fabric.Circle({
					radius: this.cellSize * 0.35,
					left: this.cellSize * (x + 0.15),
					top: this.cellSize * (y + 0.15),
					fill: color,
					stroke: 'gray',
					strokeWidth: 3
				});
				this.canvas.add(circle);
			}
		}
	}
</script>

<style>

</style>