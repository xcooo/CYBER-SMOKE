import { sleep } from '../utils/common'
export default class DrawText {
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
		// 绘制文字的参数
		const { 
			text = '', textIndent = 0, lastWidth = 0, font = {}, 
			textAlign = 'none', baseline = 'top', line = {}, 
			highlightText = [], textRect = { show: false, isFill: true, lineWidth: 1 }
		} = params
		const textParams = {
			...globalDataParams,
			text: String(text) || '',
			textIndent,
			lastWidth,
			font: conversion ? this.commonUtilMethods.conversionUnit(this.getFontStyle(font)) : this.getFontStyle(font, conversion),
			textAlign,
			baseline,
			line: this.getTextLine(line, conversion),
			highlightText,
			textRect,
		}
		return conversion ? this.commonUtilMethods.conversionUnit(textParams) : textParams
	}
	/**
	 * 绘制文字
	 * @param { Object } params 文字参数
	 * @param { Boolean } conversion 是否需要转换单位
	 */
	draw(params = {}, conversion = true) {
		const { Context, commonUtilMethods, commonDrawMethods } = this
		const { canvasWidth, is2d } = commonUtilMethods
		let { 
			x, y, w, h, text, textIndent,
			lastWidth, font, color, alpha, 
			isFill, line, windowAlign, textAlign, baseline, highlightText, textRect, offsetRight
		} = this.getDrawParams(params, conversion)
		Context.save()
		Context.beginPath()
		commonDrawMethods.setAlpha(alpha)
		Context.font = font.style
		if (!is2d) {
			// #ifdef MP-TOUTIAO
			// 不知道为啥现在字节跳动一定用这个方法来设置文字大小了. 之前还不用...
			Context.setFontSize(font.fontSize)
			// #endif
			Context.setTextBaseline(baseline)
		}else{
			Context.textBaseline = baseline
		}
		if (typeof text !== 'string') {
			text += ''
		}
		// console.log(this.formatTextData(text, color, highlightText))
		const textArr = params.textArr || commonDrawMethods.computedFontTextLineHeight({
			x, y, w, text, textIndent, lastWidth, font, line, textAlign, windowAlign, color, offsetRight, highlightText
		})
		// console.log(textArr)
		if (textRect.show) {
			// 水平的 垂直的
			const { vorizontal, vertical, ...textReactParmas } = commonUtilMethods.conversionUnit(textRect)
			// console.log({
			// 	vorizontal,
			// 	vertical,
			// })
			const firstText = textArr[0]
			let tw = w === canvasWidth ? commonUtilMethods.conversionUnit(params).tw ?? firstText.w : w
			let tx = firstText.x - vorizontal
			let ty = firstText.y - vertical
			let ey = textArr[textArr.length - 1].y + font.fontSize
			let th = ey - firstText.y
			th += vertical * 2
			// #ifdef MP-WEIXIN || MP-TOUTIAO
			if (uni.getSystemInfoSync().platform === 'android') {
				ty += font.fontSize / 3
				th -= font.fontSize / 3
			}
			// #endif
			tw += (vorizontal * 2)
			commonDrawMethods.drawParams.drawRect.draw({
				x: tx,
				y: ty,
				w: tw,
				h: th,
				...textReactParmas
			}, false)
		}
		Context.font = font.style
		let currentFontSize = 0
		if (font.style.includes(8)) {
			currentFontSize = 8
		} else if (font.style.includes(16)) {
			currentFontSize = 16
		} else {
			currentFontSize = font.fontSize
		}
		for (const item of textArr) {
			const { text, x, y, tx, ty, tw, fontColor, fontSize, font: customFont } = item
			if (currentFontSize !== fontSize) {
				const { fontStyle, fontVariant, fontWeight, fontFamily } = font
				const { fontStyle: customFontStyle, fontVariant: customFontVariant, fontWeight: customFontWeight, fontFamily: customfontFamily } = customFont
				Context.font = `${customFontStyle || fontStyle} ${customFontVariant || fontVariant} ${customFontWeight || fontWeight} ${fontSize || currentFontSize}px ${customfontFamily || fontFamily}`
				currentFontSize = fontSize
				// await sleep(20)
			}
			if (isFill) {
				commonDrawMethods.setFillStyle(fontColor)
				Context.fillText(text, x, y)
			} else {
				commonDrawMethods.setStrokeStyle(fontColor)
				Context.strokeText(text, x, y)
			}
			if (line.lineStyle !== 'none') {
				if (isFill) {
					commonDrawMethods.setFillStyle(color)
				} else {
					commonDrawMethods.setStrokeStyle(color)
				}
				commonDrawMethods.drawParams.drawLine.draw({
					x: tx,
					y: ty,
					w: tw,
					color,
					lineType: line.lineType,
					lineWidth: line.lineWidth
				}, false)
			}
		}
		Context.restore()
		Context.font = this.getFontStyle().style
		commonDrawMethods.setAlpha(1)
	}
	/**
	 * 获取字体样式
	 * @param { Object } font 字体样式
	 * @param { Boolean } conversion 是否装换单位
	 * @returns 
	 */
	getFontStyle(fontStyle = {}, conversion = true) {
		const { size, family, style, variant, weight } = {...this.commonUtilMethods.fontStyle, ...fontStyle}
		return {
			fontSize: size,
			fontSizeBefore: size,
			fontFamily: family,
			fontStyle: style,
			fontVariant: variant,
			fontWeight: weight,
			style: `${style || 'normal'} ${variant || 'normal'} ${weight || 'normal'} ${conversion ? this.commonUtilMethods.getConvertedValue(size) : size}px ${family || 'sans-serif'}`
		}
	}
	/**
	 * 获取文字line样式
	 * @param { Object } line 行高
	 * @param { Object } conversion 是否转换单位默认true
	 */
	 getTextLine(line = {}, conversion = true) {
		const { num = -1, height = 0, style = 'none', type = 'solid', width = 1 } = line
		return {
			lineNum: num,
			lineHeight: conversion ? this.commonUtilMethods.getConvertedValue(height) : height,
			lineStyle: style,
			lineType: type, 
			lineWidth: width
		}
	}
	/**
	 * 格式化文字
	 * @param { String } formatText 文字内容
	 * @param { String } color 文字默认颜色
	 * @param { Object } defaultFont 文字
	 * @param { Array } highlightText 高亮文字
	 * @returns 
	 */
	formatTextData(formatText, color = 'black', defaultFont, highlightText = []) {
		const isBr = formatText.includes('\n')
		const isHightText = highlightText.length !== 0
		if (isBr) {
			// console.log(formatText)
			const formatTexts = formatText.split('\n').map((v, index) => ({
				text: v,
				isBr: index > 0
			}))
			if (isHightText) {
				return formatTexts.map(({ text, isBr }) => this.formatHighlightText(text, color, defaultFont, highlightText, isBr)).flat()
			}
			return formatTexts.map(({ text, isBr }) => ({ text, color, font: defaultFont, isBr}))
		}
		if (isHightText) {
			return this.formatHighlightText(formatText, color, defaultFont, highlightText)
		}
		return [{ text: formatText, color, font: defaultFont }]
	}
	/**
	 * 格式化高亮文字
	 * @param { String } formatText 文字
	 * @param { String } defaultColor 默认颜色
	 * @param { Object } defaultFont 默认字体
	 * @param { Array } highlightText 高亮文字
	 * @param { Body } isBr 是否需要换行
	 * @returns 
	 */
	formatHighlightText(formatText, defaultColor = 'black', defaultFont, highlightText, isBr = false){
		const row = []
		const texts = highlightText.map(item => {
			item.i = 0
			return item
		})
		let flag = true
		const rulesData = []
		while (flag) {
			texts.forEach((item) => {
				const { text, color = defaultColor, i, fontSize, siblingsCenter = 'bottom', siblingsNum = 0, ...customFont  } = item
				const index = formatText.indexOf(text, i)
				if (formatText.includes(text) && index !== -1) {
					item.i = index + 1 + text.length
					rulesData.push(({
						index,
						length: text.length,
						color,
						fontSize: fontSize ?? defaultFont.fontSize,
						font: Object.keys(customFont).length !== 0 ? this.getFontStyle(customFont, false) : defaultFont,
						siblingsCenter,
						siblingsNum,
					}))
				} else {
					flag = false
				}
			})
		}
		const rulesIndex = rulesData.map(item => item.index)
		let text = ''
		for (let i = 0; i < formatText.length; i++) {
			if (rulesIndex.includes(i)) {
				const { length, color, fontSize, font, siblingsCenter, siblingsNum } = rulesData.find(item => item.index === i)
				if (text) {
					row.push({
						text,
						color: defaultColor,
						fontSize: defaultFont.fontSize,
						font: defaultFont,
						isBr
					})
					if (isBr) isBr = false
					text = ''
				}
				row.push({
					text: formatText.slice(i, i + length),
					color,
					fontSize,
					font,
					siblingsCenter, 
					siblingsNum,
					isBr
				})
				if (isBr) isBr = false
				i += length - 1
				continue
			}
			text += formatText[i]
			if (i === formatText.length - 1) {
				row.push({
					text,
					color: defaultColor,
					fontSize: defaultFont.fontSize,
					font: defaultFont,
					isBr
				})
				if (isBr) isBr = false
			}
		}
		return row
	}
}