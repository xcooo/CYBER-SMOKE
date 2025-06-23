import { downloadFile, base64ToPathFn } from '../utils/util'
/**
 * 绘制图片
 */
export default class DrawImage {
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
		// 绘制图片的参数
		const { 
			src = '', mode = 'aspectFill', triangle = {}, isCompressImage = false, 
			quality = 100, drawSrc = false, drawModeImage = false, drawImageInfo = false 
		} = params
		const imageParams = {
			...globalDataParams,
			src,
			mode,
			drawType: params.drawType || 'default',
			// 绘制三角形图片时三角形的内容
			// triangle.type 三角形的类型 right: 直角三角形 isosceles: 等腰三角形 custom: 自定义三角形(不支持旋转)
			// triangle.coordinate 自定义三角形时传递的坐标
			// triangle.direction 三角形顶点朝向
			triangle,
			// 是否压缩图片
			isCompressImage,
			// 压缩图片时图片的质量只对jpg类型的图片生效
			quality,
			drawSrc,
			drawModeImage,
			drawImageInfo,
			drawImage: true
		}
		return conversion ? this.commonUtilMethods.conversionUnit(imageParams) : imageParams
	}
	/**
	 * 绘制图片
	 * @param { Object } params 矩形参数
	 * @param { Boolean } conversion 是否需要转换单位
	 */
	draw(params = {}, conversion = true) {
		const { Context, commonUtilMethods, commonDrawMethods } = this
		const { canvasWidth, is2d } = commonUtilMethods	
		let { 
			w, src, windowAlign, drawModeImage, offsetRight, x, ...otherParams
		} = this.getDrawParams(params, conversion)
		return new Promise(async resolve => {
			try {
				if (!/\S/.test(src)) {
					return resolve({
						success: false,
						message: '图片路径为空'
					})
				}
				if (!is2d) {
					// 不是2d需要先下载本地
					let srcRes = await getImageSrc(src)
					if (!srcRes.success) {
						return resolve(srcRes)
					}
					src = srcRes.src
				}
				if (windowAlign !== 'none') {
					x = commonDrawMethods.computedCenterX(canvasWidth, w, windowAlign, offsetRight)
				}
				let imageInfo = drawModeImage
				if (!imageInfo) {
					imageInfo = await getImageInfo(src)
					if (!imageInfo.success) {
						// uni.hideLoading()
						return resolve(imageInfo)
					}
				}
				const img = this.getImage(src)
				const drawImageParams = {...otherParams, x, imageInfo, img, w, src, windowAlign, drawModeImage, offsetRight}
				if (is2d) {
					img.onload = async () => {
						return resolve(await this.drawImageByType(drawImageParams))
					}
				} else {
					return resolve(await this.drawImageByType(drawImageParams))
				}
			} catch (e) {
				return resolve({
					success: false,
					msg: '绘制图片出错' + e
				})
			}
		})
	}
	/**
	 * 绘制参数
	 * @param { Object } params 
	 * @returns 
	 */
	drawImageByType(params) {
		let { 
			imageInfo, r, x, y, w, h, rotate,
			borderWidth, borderColor, color, alpha, borderType, triangle, 
			mode, drawType, img, shadow, drawSrc, drawModeImage
		} = params
		const { Context, commonDrawMethods, commonUtilMethods } = this
		const { unit, pxToRpx } = commonUtilMethods
		return new Promise(async resolve => {
			if (h === 0) {
				h = w
			}
			let modeImage = drawModeImage
			if (!modeImage) {
				modeImage = getModeImage(Number(imageInfo.width), Number(imageInfo.height), x, y, w, h, mode)
				// this.conversionUnit(await getImageInfo(src))
			}
			const { dx, dy, dw, dh, sw, sh, sx, sy } = modeImage
			Context.save()
			Context.beginPath()
			if (drawType !== 'triangle') {
				commonDrawMethods.setRotate(x, y, w, h, rotate)
			}
			const drawEnd = async () => {
				Context.clip()
				commonDrawMethods.setAlpha(alpha)
				await this.drawImageContent(mode, drawType, img, dx, dy, dw, dh, sx, sy, sw, sh)
				Context.restore()
			}
			if (drawType == 'default') {
				// commonDrawMethods.drawRect.draw else if (drawType == 'arc')({
				// 	x,
				// 	y,
				// 	w,
				// 	h,
				// 	alpha,
				// 	color,
				// 	drawImage: true
				// })
				commonDrawMethods.setAlpha(alpha)
				await this.drawImageContent(mode, drawType, img, dx, dy, dw, dh, sx, sy, sw, sh, x, y, w, h)
				Context.clip()
				Context.restore()
			} else if (drawType === 'arc') {
				commonDrawMethods.drawParams.drawArc.draw({
					x,
					y,
					r: w / 2,
					borderWidth,
					borderColor,
					color,
					drawImage: true,
					shadow
				}, false)
				await drawEnd()
			} else if (drawType === 'rect') {
				if (mode === 'widthFix') {
					h = sh
				} else if (mode === 'heightFix') {
					w = sw
				}
				commonDrawMethods.drawParams.drawRect.draw({
					x,
					y,
					w,
					h,
					alpha,
					borderWidth,
					borderColor,
					borderType,
					r,
					color,
					drawImage: true,
					shadow
				}, false)
				await drawEnd()
			} else if (drawType === 'triangle') {
				// 绘制三角形图片
				let type = triangle.type || 'isosceles'
				let coordinate = triangle.coordinate || []
				let direction = triangle.direction || 'top'
				if (type !== 'custom') {
					commonDrawMethods.setTriangleRotate(x, y, w, h, rotate, type)
				}
				commonDrawMethods.drawParams.drawTriangle.draw({
					x,
					y,
					w,
					h,
					alpha,
					borderWidth,
					borderColor,
					color,
					coordinate,
					direction,
					drawType: type,
					drawImage: true,
				}, false)
				await drawEnd()
			}
			commonDrawMethods.setAlpha(1)
			return resolve({
				success: true,
				w: unit === 'rpx' ? pxToRpx(w) : w,
				h: unit === 'rpx' ? pxToRpx(h) : h
			})
		})
	}
	/**
	 * 绘制图片内容
	 * @returns 
	 */
	drawImageContent(mode, drawType, img, dx, dy, dw, dh, sx, sy, sw, sh, x, y, w, h) {
		const { Context } = this
		return new Promise(async resolve => {
			if (drawType === 'default') {
				await Context.drawImage(img, x, y, w, h)
			} else if (mode !== 'default') {
				await Context.drawImage(img, dx, dy, dw, dh, sx, sy, sw, sh)
			} else {
				await Context.drawImage(img, dx, dy, dw, dh)
			}
			resolve(true)
		})
	}
	/**
	 * 获取绘制图片的内容
	 * @param { String } src 资源目录
	 */
	getImage(src) {
		const { commonUtilMethods } = this
		const { is2d, canvas } = commonUtilMethods	
		if (is2d) {
			const img = canvas.createImage()
			// const imageData = canvas.createImageData()
			img.src = src
			return img
		} else {
			return src
		}
	}
}

/**
 * 获取使用模式的图片信息
 * @param { String | Number } oWidth 原图宽度
 * @param { String | Number } oHeight 原图高度
 * @param { String | Number } x x轴位置
 * @param { String | Number } y y轴位置
 * @param { String | Number } width 宽度
 * @param { String | Number } height 高度
 * @param { String } mode 模式 
 * 			 		 aspectFit 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
 * 					 aspectFill 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
 * 					 widthFix  宽度不变，高度自动变化，保持原图宽高比不变
 * 					 heightFix 高度不变，宽度自动变化，保持原图宽高比不变
 */
export const getModeImage = (oWidth, oHeight, x, y, width, height, mode) => {
	if (mode === 'aspectFit') {
		return getAspectFitModelInfo(oWidth, oHeight, x, y, width, height)
	}
	if (mode === 'aspectFill') {
		return getAspectFillModelInfo(oWidth, oHeight, x, y, width, height)
	}
	if (mode === 'widthFix') {
		return getWidthFixModelInfo(oWidth, oHeight, x, y, width, height)
	}
	if (mode === 'heightFix') {
		return getHeightFixModelInfo(oWidth, oHeight, x, y, width, height)
	}
	if (mode === 'default') {
		return {
			dw: width,
			dh: height,
			dx: x,
			dy: y
		}
	}
	return getAspectFillModelInfo(oWidth, oHeight, x, y, width, height)
}
// aspectFit 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
function getAspectFitModelInfo(oWidth, oHeight, x, y, width, height) {
	let aspect = oHeight / oWidth
	let sw = width
	let sh = aspect * sw
	if (aspect >= 1) {
		aspect = oWidth / oHeight
		sh = height
		sw = aspect * sh
	}
	return {
		sw,
		sh,
		sx: x + ((width - sw) / 2),
		sy: y + ((height - sh) / 2),
		dw: oWidth,
		dh: oHeight,
		dx: 0,
		dy: 0
	}
}
// 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
function getAspectFillModelInfo(oWidth, oHeight, x, y, width, height) {
	// 高比宽大 宽是短边
	let aspect = oHeight / oWidth
	let sw = width
	let sh = aspect * sw
	let dx = 0
	let dy = (oHeight - (height * (oHeight / sh))) / 2
	if (aspect < 1) {
		// 高比宽小 高是短边
		aspect = oWidth / oHeight
		sh = height
		sw = aspect * sh
		dy = 0
		dx = (oWidth - (width * (oWidth / sw))) / 2
	}
	return {
		sw,
		sh,
		sx: x,
		sy: y,
		dw: oWidth,
		dh: oHeight,
		dx,
		dy
	}
}
// 宽度不变，高度自动变化，保持原图宽高比不变
function getWidthFixModelInfo(oWidth, oHeight, x, y, width, height) {
	let aspect = oHeight / oWidth
	let sw = width
	let sh = sw * aspect
	let dx = 0
	let dy = 0
	return {
		sw,
		sh,
		sx: x,
		sy: y,
		dw: oWidth,
		dh: oHeight,
		dx,
		dy
	}
}
// 高度不变，宽度自动变化，保持原图宽高比不变
function getHeightFixModelInfo(oWidth, oHeight, x, y, width, height) {
	let aspect = oWidth / oHeight
	let sh = height
	let sw = sh * aspect
	let dx = 0
	let dy = 0
	return {
		sw,
		sh,
		sx: x,
		sy: y,
		dw: oWidth,
		dh: oHeight,
		dx,
		dy
	}
}
/**
* 获取图片信息
* @param { String } src 图片地址
*/
export const getImageInfo = src => {
	return new Promise(resolve =>{
	uni.getImageInfo({
		src,
		success: res => {
			resolve({
				success: true,
				...res
			})
		},
		fail: e => {
			resolve({
				success: false,
				msg: e
			})
		}
	})
 })
}
/**
 * 获取图片src路径
 * @param { String } src 图片地址
 * @returns 
 */
export function getImageSrc(src) {
	return new Promise(async resolve => {
		src = await base64ToPathFn(src)
		// #ifndef MP-TOUTIAO
		if (src.includes('http') && !src.includes('resource')) {
			const downlaod = await downloadFile(src)
			if (!downlaod.success) {
				return resolve({
					success: false,
					msg: `图片路径为:${src}的文件下载失败`
				})
			}
			src = downlaod.data.tempFilePath
		}
		// #endif
		return resolve({
			success: true,
			src
		})
	})
}