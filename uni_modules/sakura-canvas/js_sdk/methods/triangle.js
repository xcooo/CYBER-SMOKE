/**
 * 绘制三角形
 */
export default class DrawTriangle {
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
		// 绘制三角形的参数
		const { coordinate = [], drawType = 'isosceles', direction = 'top' } = params
		const triangleParams = {
			...globalDataParams,
			// 当绘制类别是自定义的时候需要传递的参数
			coordinate,
			// 绘制三角形的类型
			// right: 直角三角形
			// isosceles: 等腰三角形
			// custom: 自定义时，x, y, 宽, 高都不需要传递。需要传递绘制点的坐标类型是数组(coordinate)
			// [[1, 3], [2, 3], [4, 5]]
			drawType,
			// 三角形顶点朝向 top, left, right, bottom
			direction,
		}
		return conversion ? this.commonUtilMethods.conversionUnit(triangleParams) : triangleParams
	}
	/**
	 * 绘制三角形
	 * @param { Object } params 矩形参数
	 * @param { Boolean } conversion 是否需要转换单位
	 */
	draw(params = {}, conversion = true) {
		const { Context, commonUtilMethods, commonDrawMethods } = this
		const { canvasWidth, is2d } = commonUtilMethods
		let { 
			x, y, w, h, color, alpha, isFill, lineWidth, drawType, offsetRight,
			coordinate, rotate, windowAlign, direction, borderWidth, borderColor, drawImage
		} = this.getDrawParams(params, conversion)
		if (color === 'black' && drawImage) {
			color = 'none'
		} else if(color === 'black') {
			color = '#ffffff'
		}
		if (windowAlign !== 'none' && drawType != 'custom') {
			x = commonDrawMethods.computedCenterX(canvasWidth, w, windowAlign, offsetRight)
		}
		if (rotate.deg && drawType !== 'custom') {
			Context.save()
			commonDrawMethods.setTriangleRotate(x, y, w, h, rotate, drawType)
		}
		Context.beginPath()
		commonDrawMethods.setAlpha(alpha)
		if (drawType === 'isosceles') {
			switch (direction) {
				case 'top':
					Context.lineTo(x + w / 2, y)
					Context.lineTo(x, y + h)
					Context.lineTo(x + w, y + h)
					break
				case 'bottom':
					Context.lineTo(x, y)
					Context.lineTo(x + w, y)
					Context.lineTo(x + w / 2, y + h)
					break
				case 'right':
					Context.lineTo(x, y)
					Context.lineTo(x, y + h)
					Context.lineTo(x + w, y + h / 2)
					break
				case 'left':
					Context.lineTo(x + w, y)
					Context.lineTo(x + w, y + h)
					Context.lineTo(x, y + h / 2)
					break
			}
		} else if (drawType === 'right') {
			switch (direction) {
				case 'top':
					Context.lineTo(x, y)
					Context.lineTo(x, y + h)
					Context.lineTo(x + w, y + h)
					break
				case 'bottom':
					Context.lineTo(x, y)
					Context.lineTo(x + w, y)
					Context.lineTo(x, y + h)
					break
				case 'left':
					Context.lineTo(x, y)
					Context.lineTo(x, y + h)
					Context.lineTo(x + w, y)
					break
				case 'right':
					Context.lineTo(x, y + h)
					Context.lineTo(x + w, y + h)
					Context.lineTo(x + w, y)
					break
			}
			
		} else if (drawType === 'custom') {
			for (let i of coordinate) {
				Context.lineTo(i[0], i[1])
			}
		}
		Context.closePath()
		if (isFill) {
			if (borderWidth !== 0) {
				commonDrawMethods.setLineWidth(borderWidth)
				commonDrawMethods.setStrokeStyle(borderColor)
				Context.stroke()
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
		if (rotate.deg && drawType !== 'custom') {
			Context.restore()
		}
	}
}