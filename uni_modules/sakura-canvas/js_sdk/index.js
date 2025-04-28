// 绘制文字
import DrawText from './methods/text'
// 绘制线条
import DrawLine from './methods/line'
// 绘制矩形
import DrawRect from './methods/rect'
// 绘制圆形
import DrawArc from './methods/arc'
// 绘制图片
import DrawImage, { getModeImage, getImageSrc, getImageInfo } from './methods/image'
// 绘制三角形
import DrawTriangle from './methods/triangle'
// 绘制二维码
import DrawQrcode from './methods/qrcode'
import Canvas from './methods/canvas'
// 公共绘制方法 公共工具方法
import { CommonDrawMethods, CommonUtilMethods, sleep } from './utils/common'
// 绘制海报方法
export default class DrawPoster {
	constructor(options) {
		const { 
			width = 375.0001, height = 0, canvasId = null, _this = null, background = {},
			type = 'default', unit = 'px', drawDelayTime = 200, exportImageDelayTime = 200,
			showDrawTips = true, drawTipsText = '绘制中...', showExportImagesTips = true, exportImageTips = '导出图片中...',
			fontStyle = {}, exportImageStyle = {}
		} = options
		// 画布背景参数
		this.background = {
			type: 'color',
			w: width,
			h: height,
			color: '#ffffff',
			...background
		}
		// 画布id
		this.canvasId = canvasId
		// 当前页面vm
		this._this = _this
		// 绘制类型 default: 默认 2d: 2d绘制
		this.type = type
		// h5/APP无论设置什么都为default
		// #ifdef H5 || APP-PLUS
		this.type = 'default'
		// #endif
		// 是否是2d绘制
		this.is2d = this.type === '2d'
		// 绘制单位
		this.unit = unit
		// 绘制时的延迟时间
		this.drawDelayTime = drawDelayTime
		// 导出图片时的延迟时间
		this.exportImageDelayTime = exportImageDelayTime
		// 是否显示绘制时的提示
		this.showDrawTips = showDrawTips
		// 绘制时的提示
		this.drawTipsText = drawTipsText
		// 是否显示导出图片时的提示
		this.showExportImagesTips = showExportImagesTips
		// 导出图片时的提示
		this.exportImageTips = exportImageTips
		// 默认字体样式
		this.fontStyle = {
			size: this.type === 'default' ? 16 : 32,
			family: 'sans-serif',
			style: 'normal', 
			variant: 'normal', 
			weight: 'normal',
			...fontStyle
		}
		// 公共方法实例
		this.commonUtilMethods = new CommonUtilMethods({
			unit, 
			type: this.type, 
			width,
			height,
			fontStyle: this.fontStyle,
		})
		// 设置画布宽高
		this.setCanvasStyle(width, height)
		// 导出图片时的大小/位置, 默认canvas宽高
		this.exportImageStyle = {
			width,
			height,
			x: 0,
			y: 0,
			fileType: 'png',
			quality: 1,
			...exportImageStyle,
		}
		// 所有的callback回调
		this.allCallback = []
		// 存储所有的监听事件
		this.$eventsMap = new Map()
		// 创建绘制对象-->Context
		this.createContext()
		this.drawCallback = null
	}
	/**
	 * 创建绘制对象
	 */
	async createContext() {
		const { width, height, canvasId, _this, type, is2d } = this
		const setValue = (Context, canvas = null) => {
			this.Context = Context
			this.canvas = canvas
			// 公共绘制方法
			this.commonDrawMethods = new CommonDrawMethods(Context, type, this.commonUtilMethods)
			this.commonUtilMethods.Context = Context
			this.commonUtilMethods.canvas = canvas
			this.initDrawMethods()
			this.$emit('init')
		}
		const dpr = uni.getSystemInfoSync().pixelRatio
		this.dpr = dpr
		if (!is2d) {
			const Context = uni.createCanvasContext(canvasId, _this)
			await sleep(50)
			setValue(Context)
		} else {
			uni.createSelectorQuery()
			.select(`#${canvasId}`)
			.fields({ node: true, size: true })
			.exec(res => {
				const canvas = res[0].node
				const Context = canvas.getContext(type)
				canvas.width = this.commonUtilMethods.getConvertedValue(width) * dpr
				canvas.height = this.commonUtilMethods.getConvertedValue(height) * dpr
				Context.scale(dpr, dpr)
				setValue(Context, canvas)
			})
		}
	}
	/**
	 * 初始化绘制方法
	 */
	initDrawMethods() {
		const { Context, commonUtilMethods, commonDrawMethods } = this
		const initParams = {
			Context, commonUtilMethods, commonDrawMethods
		}
		// 创建canvas方法->导出图片之类的
		this.canvasMethods = new Canvas(this)
		// 绘制文字
		const drawText = new DrawText(initParams)
		// 绘制线条
		const drawLine = new DrawLine(initParams)
		// 绘制矩形
		const drawRect = new DrawRect(initParams)
		// 绘制圆形
		const drawArc = new DrawArc(initParams)
		// 绘制图片
		const drawImage = new DrawImage(initParams)
		// 绘制三角形
		const drawTriangle = new DrawTriangle(initParams)
		// 绘制二维码
		const drawQrcode = new DrawQrcode(initParams)
		// 绘制方法集合
		this.commonDrawMethods.drawParams = {
			drawText,
			drawLine,
			drawRect,
			drawArc,
			drawImage,
			drawTriangle,
			drawQrcode
		}
		this.drawText = drawText
		this.drawLine = drawLine
		this.drawRect = drawRect
		this.drawArc = drawArc
		this.drawImage = drawImage
		this.drawTriangle = drawTriangle
		this.drawQrcode = drawQrcode
	}
	/**
	 * 设置导出图片的大小
	 */
	setExportImageStyle(options) {
		this.exportImageStyle = {
			...this.exportImageStyle,
			...options
		}
	}
	/**
	 * 设置背景图片样式
	 * @param { Object } options 
	 */
	setBackgroundStyle(options) {
		this.background = {
			...this.background,
			...options
		}
	}
	/**
	 * 设置画布宽高
	 * @param { Number } width 宽度
	 * @param { Number } height 高度
	 */
	async setCanvasStyle(width, height) {
		this.width = width
		this.height = height
		this.commonUtilMethods.width = width
		this.commonUtilMethods.height = height
		this.commonUtilMethods.setCanvasStyle()
		// 回调
		this.callbackInfo = {
			bgObj: {
				width: this.background.w,
				height: this.background.h
			},
			ctxObj: {
				width,
				height
			},
		}
		this.setExportImageStyle({
			width,
			height
		})
		if (this.canvas) {
			const { dpr, canvas, Context, commonUtilMethods } = this
			// const canvasData = Context.getImageData(0, 0, canvas.width, canvas.height)
			canvas.width = commonUtilMethods.getConvertedValue(width) * dpr
			canvas.height = commonUtilMethods.getConvertedValue(height) * dpr
			Context.scale(dpr, dpr)
			// Context.putImageData(canvasData, 0, 0)
			await this.drawBackground(false)
			if (this.drawArrayFn) {
				await this.drawCanvas(this.drawArrayFn(this.callbackInfo), false)
			}
		}
	}
	/**
	 * 监听绘制时/绘制完成的事件
	 * @param { String } type 
	 * @param { Function } callback 回调
	 */
	$on(type = '', callback = null) {
		if (!type || !callback) return
		if (typeof callback !== 'function') return
		let eventSet = this.$eventsMap.get(type)
		if (!eventSet) {
			this.$eventsMap.set(type, (eventSet = new Set()))
		}
		eventSet.add(callback)
	}
	/**
	 * 触发用户传入的事件
	 * @param { String } type 什么类型
	 * @param { Array } args 其余参数
	 */
	$emit(type = '', ...args) {
		if (!type) return
		const eventSet = this.$eventsMap.get(type)
		if (eventSet) {
			eventSet.forEach(event => {
				event.apply(this, args)
			})
		}
	}
	/**
	 * 绘制背景
	 * @param { Boolean } isSendEvent 是否发送绘制完成事件
	 * @returns 
	 */
	drawBackground(isSendEvent = true) {
		const { background, width, height, Context, drawRect, drawImage, unit, commonUtilMethods } = this
		// console.log(Context)
		return new Promise(async resolve => {
			const { type, ...params } = background
			// Context.beginPath()
			// Context.save()
			// console.log({
			// 	...params,
			// 	w: params.w ?? width,
			// 	h: params.h ?? height,
			// })
			if (!isSendEvent) {
				this.canvasMethods.clearCanvas()
			}
			let result = {}
			if (type === 'color') {
				result = drawRect.draw({
					...params,
					w: params.w ?? width,
					h: params.h ?? height,
					color: params.color ?? '#ffffff'
				})
			} else if (type === 'image') {
				result = await drawImage.draw({
					...params,
					w: params.w ?? width,
					h: params.h ?? height,
				})
			}
			result.style = {
				width: result.w + unit,
				height: result.h + unit,
			}
			this.background.w = result.w
			this.background.h = result.h
			if (isSendEvent) {
				this.$emit('background', result)
			}
			// Context.clip()
			// Context.restore()
			resolve(result)
		})
	}
	/**
	 * 往所有的回调信息里面添加内容
	 * @param { Object } params 内容
	 */
	async setAllCallBack(params) {
		const { width, commonUtilMethods, commonDrawMethods } = this
		const { canvasWidth } = commonUtilMethods
		let { 
			type, x = 0, y = 0, r = 0, w = canvasWidth, h = 0, 
			lineWidth = 1, size = 0, name = '', windowAlign = 'none', 
			drawType = 'default', mode = 'aspectFill', src = '', offsetRight = 0
		} = params
		let sx = x
		let sy = y
		let ex = x + w
		let ey = y + h
		// 文字
		if (type === 'text') {
			let { 
				text, textIndent, lastWidth, font, line, textAlign, windowAlign, color, highlightText
			} = this.drawText.getDrawParams(params, false)
			const textArr = commonDrawMethods.computedFontTextLineHeight({
				x, y, w, text, textIndent, lastWidth, font, line, textAlign, windowAlign, defaultColor: color, offsetRight, highlightText
			})
			const lastText = textArr[textArr.length - 1]
			const firstText = textArr[0]
			ey = lastText.ey
			ex = firstText.tx + firstText.w
			params.textArr = commonUtilMethods.conversionUnit(textArr)
			params.h = ey - sy
			params.tw = firstText.w
			// if (params.name) {
			// 	console.log(params.text)
			// 	console.log(font)
			// 	console.log(textArr)
			// }
		} else if (type === 'arc') {
			ex = x + r * 2
			ey = y + r * 2
			w = r * 2
			h = r * 2
		} else if (type === 'line') {
			ey = y + lineWidth
			h = lineWidth
		} else if (type === 'qrcode') {
			ex = x + size
			ey = y + size
			w = size
			h = size
		} else if (type === 'image') {
			if (windowAlign !== 'none') {
				x = commonDrawMethods.computedCenterX(width, w, windowAlign, offsetRight)
			}
			const srcRes = await getImageSrc(src)
			if (!srcRes.success) {
				return srcRes
			}
			src = srcRes.src
			const imageInfo = await getImageInfo(src)
			if (!imageInfo.success) {
				return Promise.resolve(true)
			}
			const modeImage = getModeImage(Number(imageInfo.width), Number(imageInfo.height), commonUtilMethods.getConvertedValue(x), commonUtilMethods.getConvertedValue(y), commonUtilMethods.getConvertedValue(w), commonUtilMethods.getConvertedValue(h), mode)
			const { dx, dy, dw, dh, sw, sh, sx, sy } = modeImage
			if (mode === 'widthFix') {
				h = this.unit === 'rpx' ? commonUtilMethods.pxToRpx(sh) : sh
				ey = y + h
			} else if (mode === 'heightFix') {
				w = this.unit === 'rpx' ? commonUtilMethods.pxToRpx(sw) : sw 
				ex = x + w
			}
			if (drawType === 'arc' && h == 0) {
				h = w
				ey = y + h
			}
			params.drawModeImage = modeImage
			params.drawSrc = src
			params.drawImageInfo = imageInfo
		}
		params.sx = sx
		params.sy = sy
		params.ex = ex
		params.ey = ey
		this.allCallback.push({
			sx,
			sy,
			ex,
			ey,
			w,
			h,
			name,
			before: params.before || {}
		})
		return Promise.resolve(true)
	}
	/**
	 * 绘制内容
	 * @param { Array } drawArray 绘制数组
	 * @param { Boolean } isSendEvent 是否发送事件
	 */
	drawCanvas(drawArray, isSendEvent = true) {
		const { Context, showDrawTips, showExportImagesTips } = this
		return new Promise(async resolve => {
			try {
				for (let i of drawArray) {
					if (i.callback && typeof i.callback === 'function' && i.type !== 'custom') {
						const beforeInfo = this.allCallback.length == 0 ? {} : this.allCallback[this.allCallback.length - 1]
						const callBackInfo = i.callback(beforeInfo, this.allCallback) || {}
						const { callback, ...data } = i
						i = { ...data, ...callBackInfo }
					}
					if (i.type !== 'custom' && i.drawType !== 'custom') {
						await this.setAllCallBack(i)
					}
					switch (i.type) {
						// 文字
						case 'text': 
							this.drawText.draw(i)
							break
						// 矩形
						case 'rect':
							this.drawRect.draw(i)
							break
						// 图片
						case 'image': 
							const image = await this.drawImage.draw(i)
							if (!image.success) {
								return resolve(image)
							}
							break
						// 圆形
						case 'arc':
							this.drawArc.draw(i)
							break
						// 三角形
						case 'triangle':
							this.drawTriangle.draw(i)
							break
						// 线条
						case 'line':
							this.drawLine.draw(i)
							break
						// 二维码
						case 'qrcode':
							await this.drawQrcode.draw(i)
							break
						// 自定义
						case 'custom':
							i.setDraw(Context, this)
							break
					}
				}
				resolve({
					success: true
				})
				if (!isSendEvent) return
				// 绘制完成触发完成事件
				const { width, height, } = this
				const contentHeight = this.allCallback.reduce((a, data) => Math.max(a, data.ey), 0)
				const contentWidth = this.allCallback.reduce((a, data) => Math.max(a, data.ex), 0)
				this.$emit('drawComplete', {
					width, height,
					contentHeight: contentHeight,
					contentWidth: contentWidth
				})
			} catch (e) {
				return resolve({
					success: false,
					msg: '绘制内容失败:' + e
				})
			} finally {
				if (showDrawTips || showExportImagesTips) {
					uni.hideLoading()
				}
			}
		})
	}
	/**
	 * 绘制海报
	 * @param { Function } drawArrayFn 绘制内容 返回一个数组
	 */
	drawPoster(drawArrayFn) {
		const { callbackInfo, showDrawTips, drawTipsText, showExportImagesTips } = this
		return new Promise(async resolve => {
			if (!drawArrayFn || typeof drawArrayFn !== 'function') {
				return resolve({
					success: false,
					msg: 'drawPoster参数错误'
				})
			}
			if (this.drawArrayFn) {
				this.allCallback = []
				this.canvasMethods.clearCanvas()
				await this.drawBackground(false)
			}
			this.drawArrayFn = drawArrayFn
			showDrawTips && uni.showLoading({ title: drawTipsText })
			const result = await this.drawCanvas(drawArrayFn(callbackInfo))
			// 绘制内容
			if (!result.success) {
				return resolve(result)
			}
			resolve(await this.canvasMethods.canvasDraw())
			if (showDrawTips || showExportImagesTips) {
				uni.hideLoading()
			}
		})
	}
}