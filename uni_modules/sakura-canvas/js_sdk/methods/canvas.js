import { sleep } from "../utils/common"

/**
 * canvas的一系列方法
 */
export default class Canvas {
	constructor(drawPoster) {
		this.drawPoster = drawPoster
	}
	/**
	 * 清空画布
	 */
	clearCanvas() {
		const { Context } = this.drawPoster
		Context.clearRect(0, 0, 999999, 999999)
	}
	/**
	 * 导出图片
	 * @returns 
	 */
	exportImage() {
		const { exportImageDelayTime, showExportImagesTips, exportImageTips } = this.drawPoster
		return new Promise(async resolve => {
			showExportImagesTips && uni.showLoading({ title: exportImageTips })
			await sleep(exportImageDelayTime)
			// 绘制图片
			resolve(await this.createCanvasFilePath())
		})
	}
	/**
	 * 创建canvas导出文件
	 * @returns 
	 */
	createCanvasFilePath() {
		const { Context, canvas, canvasId, _this, is2d, exportImageStyle, dpr, showExportImagesTips, showDrawTips } = this.drawPoster
		let { width, height, x, y, fileType, quality, destWidth, destHeight } = exportImageStyle
		const params = {}
		if (destWidth) {
			params.destWidth = destWidth
		}
		if (destHeight) {
			params.destHeight = destHeight
		}
		if (is2d) {
			width = width * dpr
			height = height * dpr
		}
		return new Promise(resolve => {
			try {
				// #ifdef MP-TOUTIAO || MP-ALIPAY
				if (is2d) {
					const url = Context.canvas.toDataURL()
					resolve({
						success: true,
						data: url,
						msg: '绘画成功'
					})
					return
				} else {
					// #ifdef MP-TOUTIAO
					params.destWidth = (params.destWidth ?? width) * dpr
					params.destHeight = (params.destHeight ?? height) * dpr
					// #endif
				}
				// #endif
				uni.canvasToTempFilePath({
					canvasId,
					canvas,
					x,
					y,
					width: Math.floor(width),
					height: Math.floor(height),
					quality,
					fileType,
					...params,
					success: res => {
						return resolve({
							success: true,
							data: res.tempFilePath,
							msg: '绘画成功'
						})
					},
					fail: err => {
						return resolve({
							success: false,
							msg: `导出图片失败: ${JSON.stringify(err)}`
						})
					}, 
					complete: () => {
						(showExportImagesTips || showDrawTips) && uni.hideLoading()
					}
				}, _this)
			} catch (e) {
				return resolve({
					success: false,
					msg: '导出图片失败: 绘画错误' + e
				})
			}
		})
	}
	/**
	 * 将绘制的内容绘制到画布上
	 * @returns 
	 */
	canvasDraw() {
		const { Context, drawDelayTime, is2d } = this.drawPoster
		return new Promise(async resolve => {
			await sleep(drawDelayTime)
			if (is2d) {
				return resolve(await this.exportImage())
			} else {
				await Context.draw(true, async () => {
					return resolve(await this.exportImage())
				})
			}
		})
	}
	/**
	 * 排序drawArray 根据数据的zIndex进行排序，修改渲染顺序
	 * @param { Array } drawArray 绘制内容
	 */
	sortDrawArray(drawArray = []) {
		return drawArray.sort((after, current) => {
			const aZIndex = after.zIndex || 0
			const cZIndex = current.zIndex || 0
			return aZIndex - cZIndex
		})
	}
}