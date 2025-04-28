/**
 * 绘制圆形
 */
export default class DrawArc {
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
		// 绘制圆的参数
		const { s = 0, e = Math.PI * 2, d = false } = params
		const arcParams = {
			...globalDataParams,
			s,
			e,
			d,
		}
		return conversion ? this.commonUtilMethods.conversionUnit(arcParams) : arcParams
	}
	/**
	 * 绘制矩形
	 * @param { Object } params 矩形参数
	 * @param { Boolean } conversion 是否需要转换单位
	 */
	draw(params = {}, conversion = true) {
		const { Context, commonUtilMethods, commonDrawMethods } = this
		const { canvasWidth, is2d } = commonUtilMethods	
		let { 
			x, y, r, s, e, d, alpha, isFill, lineWidth, color, rotate,
			windowAlign, borderColor, borderWidth, offsetRight,
			drawImage, shadow, gradient 
		} = this.getDrawParams(params, conversion)
		if (color === 'black' && drawImage) {
			color = 'none'
		} else if(color === 'black') {
			color = '#ffffff'
		}
		if (shadow.show) {
			// Context.save()
			commonDrawMethods.setShadow(shadow.x, shadow.y, shadow.blur, shadow.color)
		}
		x = x + r
		y = y + r
		if (windowAlign !== 'none') {
			x = commonDrawMethods.computedCenterX(canvasWidth, r * 2, windowAlign, offsetRight)
			x += r
		}
		if (!drawImage && rotate.deg) {
			Context.save()
			commonDrawMethods.setRotate(x - r, y - r, r * 2, r * 2, rotate)
		}
		Context.beginPath()
		commonDrawMethods.setAlpha(alpha)
		Context.arc(x, y, r, s, e, d)
		if (isFill) {
			if (borderWidth != 0) {
				commonDrawMethods.setLineWidth(borderWidth)
				commonDrawMethods.setStrokeStyle(borderColor)
				Context.stroke()
			}
			if (gradient.show) {
				const { type, relative, position, colors } = gradient
				color = commonUtilMethods.getGradient(type || 'linear', relative, commonUtilMethods.conversionUnit(position), colors, { x, y })
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
	}
}