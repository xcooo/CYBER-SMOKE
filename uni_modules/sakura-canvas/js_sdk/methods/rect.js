export default class DrawRect {
	constructor(params) {
		Object.assign(this, params)
	}
	/**
	 * 获取绘制参数
	 * @param { Object } params 参数
	 * @param { Boolean } conversion 是否需要转换单位
	 */
	getDrawParams(params = {}, conversion = true) {
		const globalDataParams = this.commonUtilMethods.getGlobalDataDrawParams(params)
		return conversion ? this.commonUtilMethods.conversionUnit(globalDataParams) : globalDataParams
	}
	/**
	 * 绘制矩形
	 * @param { Object } params 矩形参数
	 * @param { Boolean } conversion 是否需要转换单位
	 */
	draw(params = {}, conversion = true) {
		const { Context, commonUtilMethods, commonDrawMethods } = this
		const { canvasWidth, is2d, pxToRpx, unit } = commonUtilMethods
		let { 
			x, y, w, h, r, color, alpha, isFill, lineWidth, 
			windowAlign, rotate, drawImage, 
			borderColor, borderWidth, borderType, shadow, gradient, offsetRight
		} = this.getDrawParams(params, conversion)
		if (color === 'black' && drawImage) {
			color = 'none'
		} else if(color === 'black') {
			color = '#ffffff'
		}
		if (typeof r === 'number') {
			if (r * 2 > h) {
				r = h / 2
			}
		}
		if (windowAlign !== 'none') {
			x = commonDrawMethods.computedCenterX(canvasWidth, w, windowAlign, offsetRight) || x
		}
		if (!drawImage && rotate.deg) {
			Context.save()
			commonDrawMethods.setRotate(x, y, w, h, rotate)
		}
		if (drawImage && shadow.show) {
			commonDrawMethods.setShadow(shadow.x, shadow.y, shadow.blur, shadow.color)
		}
		if (!drawImage && shadow.show) {
			// Context.save()
			commonDrawMethods.setShadow(shadow.x, shadow.y, shadow.blur, shadow.color)
		}
		Context.beginPath()
		commonDrawMethods.setAlpha(alpha)
		let tr = 0
		let tl = 0
		let br = 0
		let bl = 0
		if (typeof r === 'object') {
			const length = r.length
			if (length === 1) {
				tl = r[0]
				tr = r[0]
				br = r[0]
				bl = r[0]
			} else if (length === 2) {
				tl = r[0]
				tr = r[1]
				br = r[0]
				bl = r[1]
			} else if (length === 3) {
				tl = r[0]
				tr = r[1]
				br = r[2]
				bl = r[1]
			} else if (length === 4) {
				tl = r[0]
				tr = r[1]
				br = r[2]
				bl = r[3]
			}
		} else if (typeof borderType === 'string') {
			switch(borderType) {
				case 'tr':
					tr = r
					break
				case 'tl':
					tl = r
					break
				case 'br':
					br = r
					break
				case 'bl':
					bl = r
					break
				default:
					tr = r
					tl = r
					br = r
					bl = r
			}
		} else if (borderType instanceof Array && typeof r === 'number') {
			if (borderType.includes('tr')) {
				tr = r
			} else if (borderType.includes('tl')) {
				tl = r
			} else if (borderType.includes('br')) {
				br = r
			} else if (borderType.includes('bl')) {
				bl = r
			} else if (borderType.includes('default')) {
				tr = r
				tl = r
				br = r
				bl = r
			}
		}
		// 上右 tr
		Context.lineTo(x + tl, y)
		Context.arc(x + w - tr, y + tr, tr, Math.PI * 1.5, 0, false)
		// 下右 br
		Context.lineTo(x + w, y + h - br)
		Context.arc(x + w - br,y + h - br, br, 0, Math.PI * .5, false)
		// 下左 bl
		Context.lineTo(x + bl, y + h)
		Context.arc(x + bl, y + h - bl, bl, Math.PI * .5, Math.PI, false)
		// 上左 tl
		Context.lineTo(x, y + tl)
		Context.arc(x + tl, y + tl, tl, Math.PI * 1, Math.PI * 1.5, false)
		Context.closePath()
		if (isFill) {
			if (borderWidth != 0) {
				// console.log(borderWidth)
				// console.log(borderColor)
				commonDrawMethods.setLineWidth(borderWidth)
				commonDrawMethods.setStrokeStyle(borderColor)
				Context.stroke()
			}
			if (gradient.show) {
				const { type = 'linear', relative, position, colors } = gradient
				color = commonUtilMethods.getGradient(type, relative, commonUtilMethods.conversionUnit(position), colors, { x, y })
			}
			if (!drawImage || (drawImage && color !== 'none')) {
				commonDrawMethods.setFillStyle(color)
				Context.fill()
			}
		} else {
			commonDrawMethods.setLineWidth(lineWidth)
			commonDrawMethods.setStrokeStyle(color)
			Context.stroke()
		}
		commonDrawMethods.setAlpha(1)
		if (!drawImage && rotate.deg) {
			Context.restore()
		}
		if (shadow.show) {
			commonDrawMethods.setShadow(0, 0, 0, 'black')
		}
		return {
			success: true,
			w: unit === 'rpx' ? pxToRpx(w) : w,
			h: unit === 'rpx' ? pxToRpx(h) : h
		}
	}
}