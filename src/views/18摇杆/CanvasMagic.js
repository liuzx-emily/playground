export default class CanvasMagic {
	constructor({ canvas }) {
		this.canvas = canvas
		this.ctx = canvas.getContext('2d')
	}
	drawLine({ p1, p2, color }) {
		const ctx = this.ctx
		color && (ctx.strokeStyle = color)
		ctx.moveTo(p1[0], p1[1])
		ctx.lineTo(p2[0], p2[1])
		ctx.stroke()
	}
	drawSolidCircle({ center, radius, color, borderColor, borderWidth }) {
		const ctx = this.ctx
		if (borderColor) {
			this.drawSolidCircle({ center, radius, color: borderColor })
			this.drawSolidCircle({ center, radius: radius - (borderWidth || 2), color: color })
		} else {
			color && (ctx.fillStyle = color)
			this._drawCircle({ center, radius, mode: 'fill' })
		}
	}
	drawHollowCircle({ center, radius, color }) {
		const ctx = this.ctx
		color && (ctx.strokeStyle = color)
		this._drawCircle({ center, radius, mode: 'stroke' })
	}
	_drawCircle({ center, radius, mode }) {
		const ctx = this.ctx
		ctx.beginPath()
		ctx.arc(center[0], center[1], radius, 0, Math.PI * 2)
		if (!mode || mode === 'stroke') {
			ctx.stroke()
		} else {
			ctx.fill()
		}
	}
}