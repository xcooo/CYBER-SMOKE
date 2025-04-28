import QRCodeAlg from '../plugins/qrcodeAlg'
/**
 * 绘制二维码
 */
export default class DrawQrcode {
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
		// 绘制二维码的参数
		const { text = '', image = {}, size = 100, lv = 3, background = '#ffffff', foreground = '#000000', pdground = '#000000' } = params
		const qrCodeParams = {
			...globalDataParams,
			text: String(text) || '',
			image,
			size,
			// 容错级别 默认3
			correctLevel: lv,
			// 二维码背景色
			background,
			// 二维码前景色
			foreground,
			// 二维码角标色
			pdground,
		}
		return conversion ? this.commonUtilMethods.conversionUnit(qrCodeParams) : qrCodeParams
	}
	/**
	 * 绘制二维码
	 * @param { Object } params 矩形参数
	 * @param { Boolean } conversion 是否需要转换单位
	 */
	draw(params = {}, conversion = true) {
		const { Context, commonUtilMethods, commonDrawMethods } = this
		const { canvasWidth, is2d } = commonUtilMethods
		let { x, y, image, windowAlign, offsetRight, ...options } = this.getDrawParams(params, conversion)
		return new Promise(async resolve => {
			if (windowAlign !== 'none') {
				x = commonDrawMethods.computedCenterX(canvasWidth, options.size, windowAlign, offsetRight)
			}
			//使用QRCodeAlg创建二维码结构
			let qrcodeAlgObjCache = []
			let qrCodeAlg = null
			let l = qrcodeAlgObjCache.length
			let d = 0
			for (let i = 0;i < l; i++) {
				d = i
				if (qrcodeAlgObjCache[i].text == options.text && qrcodeAlgObjCache[i].text.correctLevel == options.correctLevel) {
					qrCodeAlg = qrcodeAlgObjCache[i].obj
					break
				}
			}
			if (d == l) {
				qrCodeAlg = new QRCodeAlg(options.text, options.correctLevel)
				qrcodeAlgObjCache.push({
					text: options.text,
					correctLevel: options.correctLevel,
					obj: qrCodeAlg
				})
			}
			/**
			 * 计算矩阵点的前景色
			 * @param {Obj} config
			 * @param {Number} config.row 点x坐标
			 * @param {Number} config.col 点y坐标
			 * @param {Number} config.count 矩阵大小
			 * @param {Number} config.options 组件的options
			 * @return {String}
			 */
			let getForeGround = function (config) {
				let options = config.options
				if (options.pdground && (
					(config.row > 1 && config.row < 5 && config.col > 1 && config.col < 5) ||
					(config.row > (config.count - 6) && config.row < (config.count - 2) && config.col > 1 && config.col < 5) ||
					(config.row > 1 && config.row < 5 && config.col > (config.count - 6) && config.col < (config.count - 2))
				)) {
					return options.pdground
				}
				return options.foreground
			}
			let count = qrCodeAlg.getModuleCount()
			let ratioSize = options.size
			let ratioImgSize = commonUtilMethods.getConvertedValue(image.size) || 30
			//计算每个点的长宽
			let tileW = (ratioSize / count).toPrecision(4)
			let tileH = (ratioSize / count).toPrecision(4)
			//绘制
			for (let row = 0; row < count; row++) {
				for (let col = 0; col < count; col++) {
					let w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW))
					let h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW))
					let foreground = getForeGround({
						row: row,
						col: col,
						count: count,
						options: options
					})
					commonDrawMethods.setFillStyle(qrCodeAlg.modules[row][col] ? foreground : options.background)
					Context.fillRect(x + Math.round(col * tileW), y + Math.round(row * tileH), w, h)
				}
			}
			if (image.src) {
				const { src, r, color, borderWidth, borderColor } = conversion ? this.commonUtilMethods.conversionUnit(image) : image
				const dx = x + Number(((ratioSize - ratioImgSize) / 2).toFixed(2))
				const dy = y + Number(((ratioSize - ratioImgSize) / 2).toFixed(2))
				const drawImage = await commonDrawMethods.drawParams.drawImage.draw({
					x: dx,
					y: dy,
					w: ratioImgSize,
					h: ratioImgSize,
					src,
					r,
					color,
					borderWidth,
					borderColor,
					drawType: 'rect',
					isCompressImage: false,
				}, false)
				if (!drawImage.success) {
					return resolve(drawImage)
				}
			}
			return resolve({
				success: true
			})
		})
	}
}