import { conversionUnit, countTextLength } from './util'
/**
 * 公共工具方法
 */
export class CommonUtilMethods {
	constructor(options) {
		const { unit, type, width, height, fontStyle } = options
		this.unit = unit
		this.type = type
		this.is2d = type === '2d'
		this.width = width
		this.height = height
		this.fontStyle = fontStyle
		this.Context = null
		this.canvas = null
	}
	setCanvasStyle() {
		const { width, height } = this
		// 绘制时的参数用于当unit为rpx时可以保存之前的参数并且获取转换单位之后的参数值
		this.canvasWidth = this.getConvertedValue(width)
		this.canvasHeight = this.getConvertedValue(height)
	}
	/**
	 * 根据unit单位获取转化过后的数值(rpx下绘制的单位需要转换成px)
	 * @param { Number } value 数值
	 * @returns 
	 */
	getConvertedValue(value = 0) {
		if (value === 0) return 0
		if (this.unit === 'px') {
			return value
		}
		return value === 375.0001 ? 375.0001 : uni.upx2px(value)
	}
	/**
	 * px单位转换成rpx单位
	 * @param { Number } value 
	 */
	pxToRpx(value = 0) {
		return value / (uni.upx2px(100) / 100)
	}
	/***
	 * rpx单位转换为px
	 * @param { String | Number } value 单位大小
	 */
	rpxToPx(value = 0) {
		let type = false
		if (value.includes('px') && !value.includes('r') && !value.includes('u')) {
			value = Number(value.split('px')[0])
			type = true
		}else if (value.includes('rpx')) {
			value = Number(value.split('rpx')[0])
		} else if (value.includes('upx')) {
			value = Number(value.split('upx')[0])
		}
		return type ? value : uni.upx2px(value) 
	}
	/**
	 * 转换单位
	 * @param { Object | Array } params 参数
	 * @returns 
	 */
	conversionUnit(params) {
		return conversionUnit(params, this.getConvertedValue, this)
	}
	/**
	 * 获取公共的绘制参数
	 * @param { Object } params 参数
	 */
	getGlobalDataDrawParams(params = {}) {
		const { width } = this
		const { x = 0, y = 0, w = width, h = 0, r = 0, color = 'black', alpha = 1, isFill = true, 
			lineWidth = 1, windowAlign = 'none', rotate = {}, drawImage = false, 
			borderColor = '#000000', borderWidth = 0, borderType = 'default', offsetRight = 0,
			shadow, gradient = {},
		} = params
		const drawParams = { x, y, w, h, r }
		// 公共的参数
		return {
			...drawParams,
			color,
			lineWidth,
			borderWidth,
			borderColor,
			borderType,
			alpha,
			isFill,
			// 窗口对齐的方式 默认: none 可选 居中: center 右边: right
			windowAlign,
			// 旋转
			rotate,
			// 阴影
			shadow: this.getShadow(shadow),
			// 渐变
			gradient,
			// 距离右边的差值
			offsetRight,
			drawImage
		}
	}
	/**
	 * 获取阴影参数
	 * @param { Boolean } shadow.show 是否使用阴影
	 * @param { Number } shadow.x 阴影相对于形状在水平方向的偏移
	 * @param { Number } shadow.y 阴影相对于形状在竖直方向的偏移
	 * @param { Number } shadow.blur 阴影的模糊级别，数值越大越模糊
	 * @param { String } shadow.color 阴影的颜色
	 * @returns 
	 */
	getShadow(shadow = {}) {
		const { show = false, x = 0, y = 0, blur = 0, color = '#000000' } = shadow
		return { show, x, y, blur, color }
	}
	/**
	 * 获取渐变参数
	 * @param { String } type 渐变类型 linear: 线性 circle: 圆形
	 * @param { Boolean } relative 相对定位
	 * @param { Object } position 位置
	 * @param { Object } colors 颜色
	 * @param { Object } box 盒子的位置
	 * @returns 
	 */
	getGradient(type = 'linear', relative = true, position = {}, colors = [], box = {}) {
		const { x0 = 0, y0 = 0, x1 = 0, y1 = 0, x = 0, y = 0, r = 0 } = position
		if (type == 'linear') {
			position.x0 = relative ? x0 + box.x : x0
			position.y0 = relative ? y0 + box.y : y0
			position.x1 = relative ? x1 + box.x : x1
			position.y1 = relative ? y1 + box.y : y1
		} else {
			position.x = relative ? x + box.x : x
			position.y = relative ? y + box.y : y
			position.r = r
		}
		return type == 'linear' ?  this.getLinearGradient(position, colors) : this.getCircularGradient(position, colors)
	}
	/**
	 * 获取线性渐变颜色
	 * @param { Object } position 位置对象
	 * @param { Array } colors 颜色坐标
	 */
	getLinearGradient(position = {}, colors = []) {
		const { Context } = this
		const { x0, y0, x1, y1 } = position
		const grd = Context.createLinearGradient(x0, y0, x1, y1)
		for(let i of colors) {
			grd.addColorStop(i.stop, i.color)
		}
		return grd
	}
	/**
	 * 获取圆形渐变
	 * @param { Object } position 位置对象
	 * @param { Array } colors 颜色坐标
	 */
	getCircularGradient(position = {}, colors = []) {
		const { Context } = this
		const { x, y, r } = position
		const grd = Context.createCircularGradient(x, y, r)
		for(let i of colors) {
			grd.addColorStop(i.stop, i.color)
		}
		return grd
	}
}
/**
 * 公共绘制方法
 */
export class CommonDrawMethods {
	constructor(Context, type, commonUtilMethods) {
		this.Context = Context
		this.type = type
		this.is2d = type === '2d'
		this.commonUtilMethods = commonUtilMethods
		this.drawParams = {}
	}
	/**
	 * 设置透明度
	 * @param { number } alpha 透明度
	*/
	setAlpha(alpha = 1) {
		const { Context, is2d } = this
		if (is2d) {
			Context.globalAlpha = alpha
		} else {
			Context.setGlobalAlpha(alpha)
		}
	}
	/**
	 * 设置填充颜色
	 * @param { String } style 填充颜色
	*/
	setFillStyle(style) {
		const { Context, is2d } = this
		if (is2d) {
			Context.fillStyle = style
		} else {
			Context.setFillStyle(style)
		}
	}
	/**
	 * 设置宽度大小
	 * @param { number } width 宽度
	 */
	setLineWidth(width) {
		const { Context, is2d } = this
		if (is2d) {
			Context.lineWidth = width
		} else {
			Context.setLineWidth(width)
		}
	}
	/**
	 * 设置描边颜色
	 * @param { String } style 颜色
	*/
	setStrokeStyle(style) {
		const { Context, is2d } = this
		if (is2d) {
			Context.strokeStyle = style
		} else {
			Context.setStrokeStyle(style)
		}
	}
	/**
	 * 设置阴影
	 * @param { Object } params 
	 */
	setShadow(x, y, blur, color) {
		const { Context, is2d } = this
		Context.shadowOffsetX = x
		Context.shadowOffsetY = y
		Context.shadowColor = color
		Context.shadowBlur = blur
	}
	/**
	 * 设置旋转角度
	 * @param { String } x x轴
	 * @param { String } y y轴
	 * @param { String } w 宽度
	 * @param { String } h 高度
	 * @param { Object } rotate 旋转内容
	 * @param { String } rotate.deg 旋转角度
	 * @param { String } rotate.type 类型 topLeft: 中心点在上左 topMiddle 中心点在上中 topRight 中心点在上右
	 *                             middleLeft: 中心点在中左 bottomMiddle 中心点在正中间 middleRight 中心点在中右
	 * 							   bottomLeft: 中心点在下左 bottomMiddle 中心点在下中 middleRight 中心点在下右
	*/
	setRotate(x, y, w, h, rotate) {
		const { Context } = this
		const { deg = 0, type = 'middle' } = rotate
		let rx = x
		let ry = y
		switch (type) {
			case 'topLeft':
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'topMiddle':
				rx = x + (w / 2)
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'topRight':
				rx = x + w
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'bottomLeft':
				ry = y + h
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'bottomMiddle':
				rx = x + (w / 2)
				ry = y + h
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'bottomRight':
				rx = x + w
				ry = y + h
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'middleLeft':
				ry = y + (h / 2)
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'middleRight':
				rx = x + w
				ry = y + (h / 2)
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'middle':
				rx = x + (w / 2)
				ry = y + (h / 2)
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
		}
	}
	/**
	 * 设置三角形旋转角度
	 * @param { String } x x轴
	 * @param { String } y y轴
	 * @param { String } w 宽度
	 * @param { String } h 高度
	 * @param { Object } rotate 旋转内容
	 * @param { String } rotate.deg 旋转角度
	 * @param { String } rotate.type 类型 top: 上 left: 左 right: 右 middle: 中心
	 * @param { String } triangType 三角形类型(不支持自定义的三角形 ) right: 直角三角形 isosceles: 等腰三角形
	*/
	setTriangleRotate(x, y, w, h, rotate, triangType) {
		const { Context } = this
		const { deg = 0, type = 'middle' } = rotate
		let rx = x
		let ry = y
		switch (type) {
			case 'top':
				if (triangType == 'right') {
					rx = x
					ry = y
				} else {
					rx = x + w / 2
					ry = y
				}
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'left':
				rx = x
				ry = y + h
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'right':
				rx = x + w
				ry = y + h
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'middle':
				rx = x + w / 2
				ry = y + h / 2
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
		}
	}
	/**
	 * 计算内容需要显示在画布中间的x轴的位置
	 * @param { Number | String } boxWidth 容器的宽度
	 * @param { Number | String } contentWidth 内容宽度
	 * @param { String } type 类型 center: 水平 right: 右边
	 * @param { Number } offsetRight 距离右边的差值
	 * @returns 
	*/
	computedCenterX(boxWidth, contentWidth, type = 'center', offsetRight = 0) {
		if (type === 'center') {
			return ((boxWidth - contentWidth) / 2) - offsetRight
		}
		if (type === 'right') {
			return boxWidth - contentWidth - offsetRight
		}
		return 0
	}
	/**
	 * 计算出文字一共有多少列,渲染位置之类
	 * @param { Number } params.x x轴
	 * @param { Number } params.y y轴
	 * @param { Number } params.w 文字宽度
	 * @param { String } params.text 文字内容
	 * @param { Number } params.textIndent 首行缩进
	 * @param { Number } params.lastWidth 最后一行的宽度 
	 * @param { Object } params.font 字体
	 * @param { Object } params.line 行高
	 * @param { String } params.textAlign 文字对齐方式
	 * @param { String } params.windowAlign 窗口对齐方式
	 * @param { String } params.defaultColor 字体默认颜色
	 * @param { String } params.offsetRight 距离右侧的距离
	 * @param { Array } params.highlightText 高亮文字
	 * @returns 
	 */
	computedFontTextLineHeight(params) {
		const { x, y, w, text, textIndent, lastWidth, font, line, textAlign, windowAlign, defaultColor, offsetRight, highlightText } = params
		const { Context, commonUtilMethods, drawParams } = this
		const { canvasWidth, is2d } = commonUtilMethods
		const { fontSize } = font
		// console.log(font)
		Context.font = font.style
		// console.log()
		// #ifdef MP-TOUTIAO
		// 不知道为啥现在字节跳动一定用这个方法来设置文字大小了. 之前还不用...
		if (!is2d) {
			Context.setFontSize(fontSize)
		}
		// #endif
		// console.log('fontSize', fontSize)
		let { lineNum, lineHeight, lineStyle } = line
		// 文字的总长度
		// let textLength = countTextLength(Context, text, fontSize)
		// if (w == 0 || w == 375.0001) {
		// 	textLength > canvasWidth ? w = canvasWidth : w = textLength + fontSize
		// }
		// console.log(font)
		const rowData = this.computedTextPositionAndRow(params)
		// 行高
		lineHeight = lineHeight == 1 ? fontSize + 2 : lineHeight
		// 获取一共有多少列
		let lineSize = rowData.length
		// if (lineNum != - 1 && lineNum > lineSize) {
		// 	lineNum = lineSize
		// }
		// console.log(rowData.map(v => v.rowIndex))
		const findRowPosition = rowData.findIndex(item => item.rowIndex == lineNum)
		let size = lineNum != -1 && findRowPosition != -1 ? findRowPosition : lineSize
		const lastRowDataSum = rowData.filter(item => (item.rowIndex + 1) == lineNum).length
		let lastRowCount = 0
		if (size > lineSize) {
			size = lineSize
		}
		// console.log('lineSize--', lineSize)
		// console.log(lastRowCount)
		// console.log(lastRowDataSum)
		let textArr = []
		const rowLenthSize = rowData.reduce((data, item) => {
			const { rowIndex, length } = item
			data[rowIndex] = (data[rowIndex] || 0) + length
			return data
		}, {})
		// console.log('rowLenthSize---', rowLenthSize)
		for (let i = 0; i < size; i++) {
			let { text, length: textLength, lastText, limitText, limitTextWidth, color, rowIndex, dataX, fontSize: customFontSize, font, isCustomFont } = rowData[i]
			let obj = {}
			let wx = x + (dataX ?? 0)
			let tx = x + (dataX ?? 0)
			if (rowIndex === 0 && dataX === 0 && textIndent !== 0 && textAlign == 'none' && windowAlign == 'none') {
				textLength += textIndent
				wx += textIndent
				tx = wx
			}
			if (text && lineNum != -1 && rowIndex == lineNum - 1) {
				if (++lastRowCount === lastRowDataSum) {
					if (lastWidth > 0) {
						text = limitText
						textLength = limitTextWidth
					} else {
						text = textLength + dataX + customFontSize >= w ? lastText : text
					}
				}
			}
			if (textAlign !== 'none' && textLength <= w) {
				let textW = w
				if (textLength == w) {
					textW = canvasWidth
				}
				tx = this.computedCenterX(textW, rowLenthSize[rowIndex], textAlign)
				wx += tx
			}
			if (windowAlign !== 'none' && textAlign !== 'none') {
				wx = this.computedCenterX(canvasWidth, commonUtilMethods.getConvertedValue(w), windowAlign, offsetRight)
				wx += tx
				tx = wx
			} else if (windowAlign !== 'none') {
				wx = this.computedCenterX(canvasWidth, commonUtilMethods.getConvertedValue(w), windowAlign, offsetRight)
				tx = wx
			}
			let tw = 0
			let ty = y + (rowIndex * lineHeight)
			if (lineStyle !== 'none') {
				tx = tx + commonUtilMethods.getConvertedValue(0)
				tw = textLength + commonUtilMethods.getConvertedValue(0)
				if (lineStyle == 'underline') {
					ty += customFontSize + 1
				} else if (lineStyle == 'lineThrough') {
					ty += customFontSize / 2
					// #ifdef MP-WEIXIN
					if (uni.getSystemInfoSync().platform === 'android' && this.type !== '2d') {
						ty += customFontSize / 6
					}
					// #endif
				}
			}
			obj.w = textLength
			obj.text = text
			obj.x = wx
			if (lineHeight == 0) {
				obj.y = y + (customFontSize * rowIndex)
				ty = ty + (customFontSize * rowIndex)
			} else {
				obj.y = y + (lineHeight * rowIndex)
			}
			if (isCustomFont) {
				const { siblingsCenter, siblingsNum } = rowData[i]
				obj.y -= siblingsNum
				// console.log(siblingsCenter)
				if (siblingsCenter === 'center') {
					obj.y -= (customFontSize - fontSize) / 2
					// console.log(obj.y)
				} else if (siblingsCenter === 'bottom') {
					obj.y -= customFontSize - fontSize
				}
				
			}
			obj.fontColor = color
			obj.lineColor = color
			obj.tw = tw
			obj.ty = ty
			obj.tx = tx
			obj.ey = obj.y + customFontSize
			obj.fontSize = customFontSize
			obj.font = font
			text && textArr.push(obj)
		}
		return textArr
	}
	/**
	 * 计算文字的位置于行数
	 * @param { Object } params 参数
	 * @returns 
	 */
	computedTextPositionAndRow(params) {
		const { x, y, w, text, textIndent, lastWidth, font, line, textAlign, windowAlign, defaultColor, offsetRight, highlightText } = params
		const { Context, commonUtilMethods, drawParams } = this
		const { fontSize } = font
		const formatTexts = drawParams.drawText.formatTextData(text, defaultColor, font, highlightText)
		let currentTextLength = 0
		let rowIndex = 0
		let indentLength = 0
		let currentFontSize = fontSize
		let currentFontStyle = font.style
		return formatTexts.map(({ text, color, font: customFont, siblingsCenter, siblingsNum, isBr }, index) => {
			const row = []
			const allData = []
			let text2 = ''
			let length = 0
			// console.log(isBr)
			if (isBr) {
				++rowIndex
				currentTextLength = 0
			}
			// 计算时的fontSize
			// if (currentFontSize !== )
			const computedFontSize = customFont.fontSize || fontSize
			if (computedFontSize !== currentFontSize) {
				currentFontSize = computedFontSize
				currentFontStyle = customFont.style
				Context.font = currentFontStyle
			}
			const setData = (i) => {
				const current = row.length == 0 ? 0 : row[row.length - 1].index
				const newAllData = Object.assign([], allData).splice(current, i)
				// console.log(lastWidth)
				const limitLastText = lastWidth != 0 && newAllData.length != 0 && newAllData.reverse().find(item => item.length <= lastWidth)
				row.push({
					length,
					text: text2,
					index: i - 1,
					lastText: text2.substring(0, text2.length - 1) + '...',
					limitText: limitLastText ? limitLastText.text + '...' : '',
					limitTextWidth: countTextLength(Context, limitLastText.text + '...', computedFontSize),
					color,
					rowIndex,
					dataX: currentTextLength,
					fontSize: computedFontSize,
					fontStyle: currentFontStyle,
					font: customFont,
					isCustomFont: currentFontSize !== fontSize,
					// 当自定义字体大小的时候,设置的排序
					siblingsCenter,
					siblingsNum
				})
				text2 = ''
				// indentLength = 0
			}
			for (let i = 0; i < text.length; i++) {
				text2 += text[i]
				// console.log(text2)
				length = countTextLength(Context, text2, computedFontSize)
				if (textIndent !== 0 && rowIndex === 0 && indentLength === 0) {
					currentTextLength += textIndent
					++indentLength
				}
				if (currentTextLength + length > w - computedFontSize) {
					if (i === text.length - 1) {
						length = 0
					}
					setData(i)
					currentTextLength = 0
					++rowIndex
					length = 0
					continue
				}
				if (length >= w - computedFontSize || i == text.length - 1) {
					setData(i)
					if (length >= w - computedFontSize) {
						++rowIndex
					}
				}
				allData.push({
					index: i,
					text: text2,
					length
				})
			}
			currentTextLength += length
			return row
		}).flat()
	}
}
/**
 * 睡眠线程
 * @param { Number } time 睡眠时间
 */
export function sleep(time = 300) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(true)
		}, time)
	})
}