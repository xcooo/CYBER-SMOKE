export default class drawLine {
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
		// 绘制线的参数
		const { algin = 'right', lineType = 'solid', pattern = [6, 6], offset = 6, lineCap = 'butt' } = params
		const lineParams = {
			...globalDataParams,
			algin,
			// dashed 虚线 solid 实线
			lineType,
			// 详看CanvasContext.setLineDash文档
			// 一组描述交替绘制线段和间距（坐标空间单位）长度的数字
			pattern,
			// 虚线偏移量
			offset,
			lineCap
		}
		return conversion ? this.commonUtilMethods.conversionUnit(lineParams) : lineParams
	}
	/**
	 * 绘制线条
	 * @param { Object } params 文字参数
	 * @param { Boolean } conversion 是否需要转换单位
	 */
	draw(params = {}, conversion = true) {
		const { Context, commonUtilMethods, commonDrawMethods } = this
		const { canvasWidth, is2d } = commonUtilMethods
		let { 
			x, y, color, w, algin, alpha, lineType, pattern, 
			offset, lineCap, lineWidth, windowAlign, offsetRight
		} = this.getDrawParams(params, conversion)
		Context.beginPath()
		commonDrawMethods.setAlpha(alpha)
		if (lineType === 'dashed') {
			if (!is2d) {
				Context.setLineDash(pattern, offset)
			} else {
				Context.setLineDash(pattern)
				Context.lineDashOffset = offset
			}
		}
		if (!is2d) {
			Context.setLineCap(lineCap)
		} else {
			Context.lineCap = lineCap
		}
		commonDrawMethods.setLineWidth(lineWidth)
		commonDrawMethods.setStrokeStyle(color)
		switch (algin) {
			case 'right':
				if (windowAlign !== 'none') {
					x = commonDrawMethods.computedCenterX(canvasWidth, w, windowAlign, offsetRight)
				}
				Context.moveTo(x, y)
				Context.lineTo(w + x, y)
				break
			case 'left':
				if (windowAlign !== 'none') {
					x = commonDrawMethods.computedCenterX(canvasWidth, w, windowAlign, offsetRight)
				}
				Context.moveTo(x, y)
				Context.lineTo(windowAlign == 'none' ? x - w : x + w, y)
				break
			case 'top':
				Context.moveTo(x, y)
				Context.lineTo(x, -(y + w))
				break
			case 'bottom':
				Context.moveTo(x, y)
				Context.lineTo(x, y + w)
				break
		}
		Context.stroke()
		Context.closePath()
		if (!is2d) {
			Context.setLineDash([0, 0])
		} else {
			Context.setLineDash([0, 0])
			Context.lineDashOffset = 0
		}
		commonDrawMethods.setAlpha(1)
	}
}