# sakura-canvas(海报生成器)

# 新版地址: https://ext.dcloud.net.cn/plugin?id=10960

# 公告

## 本次更新为一次大更新，重新架构插件结构，之前的js隐性多继承太low了。！！！这次更新没有完全向下兼容！！！，一些地方需要做出改变。

## 如有不懂的地方先查看示例项目或者添加下面的联系方式，联系本人。！！！

## 1) 新增了监听回调 ！！！ 重要更新

##         2) 新增了修改画布宽高方法 draw.setCanvasStyle(宽度, 高度)

## 3) 新增了修改导出画布样式的方法draw.setExportImageStyle

## 4) 修复了一些问题 比如：字节跳动小程序导出的图片太模糊，性能问题 ...

## 5) 新增动态设置画布大小

## 6) Draw类初始化参数改变

##     1，fileType，quality参数移至exportImageStyle属性

##    	2、exportDelayTime改名为exportImageDelayTime

## 	3、新增fontStyle属性用于设置字体的全局样式

## 	4、新增exportImageTips属性用于导出图片时的提示

## 5、移除success属性，移至到监听(init)事件

## 7) 一些方法改名

## 	1、 createPoster方法改名为drawPoster

## 	2、callBack回调改名为callback ！！！

## 8) 这次更新之后不在内部调用绘制背景，需要用户自行调用方法！！！方法名称为drawBackground！！！

## 9) 本次更新完善2d绘制不在只限制微信小程序，目前可用于字节跳动，微信，支付宝小程序。

## 10）更新示例项目，

## 	1、添加v3写法与v2写法的示例

## 	2、更新动态画布大小的示例



# 联系方式

## QQ: 2445263384



# 提示: 

## 1、最好引入示例项目看一下如何使用

## 2、现已支持小程序2d绘制(微信小程序，字节跳动小程序，支付宝小程序均可使用)

## 3、已支持钉钉小程序(不支持2d绘制)

## 4、绘制文字已添加高亮文字！！！

## 5、绘制文字已添加文本框, 可以用来为文字添加边框，可以是边框也可以是填充的背景色

## 6、矩形,矩形图片圆角属性已实现设置多个不同圆角角度



# 感谢话语

## 非常感谢QQ: 119582291 对本项目的bug修复于2d绘制的完善！！！



# 引入

```javascript
import Draw from '@/uni_modules/sakura-canvas/js_sdk/index'
```



# <a id="initDraw">Draw类初始化属性</a>

| 属性名称      | 类型     | 默认值                            | 可选值   | 是否必填 | 说明                                                         |
| ------------- | -------- | --------------------------------- | -------- | -------- | ------------------------------------------------------------ |
| width         | Number   | 0                                 |          | 是       | 画布的宽度                                                   |
| height        | Number   | 0                                 |          | 是       | 画布的高度                                                   |
| canvasId      | String   |                                   |          | 是       | canvas-id                                                    |
| _this         | This     |                                   |          | 是       | 当前页面的this                                               |
| background    | Object   | [DrawBackground](#drawBackground) |          | 是       | 画布的背景                                                   |
| type          | String   |                                   | 2d       | 否       | 2d绘制(微信小程序，字节跳动小程序，支付宝小程序)       |
| unit          | String   | px                                | px, rpx  |          | 画图时的单位                                                 |
| fontStyle | Object | [Font](#font) |  | | 全局字体默认样式 |
| exportImageStyle | Object | [ExportImageStyle](#exportImageStyle) |  | | 导出图片的样式 |
| drawDelayTime | Number   | 200                               |          |          | 绘制海报时的延迟时间(单位毫秒)                               |
| exportImageDelayTime | Number   | 200                               |          |          | 导出图片时的延迟时间(单位毫秒)                               |
| showDrawTips | Boolean | true |  | | 是否显示绘制时的加载提示 |
| drawTipsText | Stirng   | 绘制中...                         | 随意文字 |          | 绘制时的加载提示                                             |
| showExportImagesTips | Boolean | true |  | | 是否显示导出图片时的提示 |
| exportImageTips | String | 导出图片中 | 随意文字 | | 导出图片时的提示 |

```javascript
const draw = new Draw({
    width: 375,
    height: 500,
    canvasId: 'myCanvas',
    _this: this,
    unit: 'px',
    background: {
        type: 'color', 
        color: '#fffff',
  		w: 375,
        h: 500
    },
    exportImageStyle:{
        // 导出图片的类型只支持 JPG/PNG
      	fileType: 'png',
        // 导出图片的质量 0~1之间
        quality: 1
    },
    drawDelayTime: 200,
    exportImageDelayTime: 200,
    drawTipsText: '绘制中...',
    exportImageTips: '导出图片中...'
})
```



# <a id="drawOn">Draw监听回调</a>

| 事件名称     | 用处                                                         |
| ------------ | ------------------------------------------------------------ |
| init         | 画布初始化完成可以绘制背景图片，画布内容                     |
| background   | 绘制背景完成，可以在这里监听背景图片的大小，用于动态修改画布大小 |
| drawComplete | 绘制内容完成，可以在这里监听绘制出来的内容大小，用于动态修改画布大小 |

```javascript
import Draw from '@/uni_modules/sakura-canvas-js/js_sdk'
const draw = new Draw({
    width: 375,
    height: 500,
    canvasId: 'myCanvas',
    _this: this,
    unit: 'px',
    background: {
        type: 'color', 
        color: '#fffff',
  		w: 375,
        h: 500
    },
    exportImageStyle:{
        // 导出图片的类型只支持 JPG/PNG
      	fileType: 'png',
        // 导出图片的质量 0~1之间
        quality: 1
    },
    drawDelayTime: 200,
    exportImageDelayTime: 200,
    drawTipsText: '绘制中...',
    exportImageTips: '导出图片中...'
})
// init: 初始化完成可以绘制画布背景(现在画布背景需要自行调用方法绘制)，等同于之前的success属性
draw.$on('init', () => {
    // 绘制画布背景
    await draw.drawBackground()
})
// background: 绘制画布背景完成，会具体返回背景的宽度高度和一个style(不需要监听时可以不监听)
// 用于当背景为图片(mode: widthFix/heightFix)时不确定的宽度/高度，可以动态修改画布的宽
draw.$on('background', async result => {
    // w: 背景宽度 h: 背景高度
 	const { w, h } = result
    // 可以在此处调用setCanvasStyle方法用于修改画布大小
})
// drawComplete: 用于监听绘制完成事件, 可以返回当前画布的宽度高度和已经绘制完成内容的高度, 用于当前的情况，不确定画布高度时，动态修改画布的高度
draw.$on('drawComplete', async result => {
    // width: 设置的画布的宽度
    // height:设置的画布的高度
    // contentWidth: 绘制出来的内容宽度
    // contentWidth: 绘制出来的内容高度
    const { width, height, contentHeight, contentWidth } = result
    // 可以在此处调用setCanvasStyle方法用于修改画布大小
})
```



# <a id="root">目录</a>

| 绘制类型         |                       |
| ---------------- | --------------------- |
| 绘制文字         | [点我跳转](#text)     |
| 绘制矩形         | [点我跳转](#rect)     |
| 绘制圆形         | [点我跳转](#arc)      |
| 绘制图片         | [点我跳转](#image)    |
| 绘制三角形       | [点我跳转](#triangle) |
| 绘制线条         | [点我跳转](#line)     |
| 绘制二维码       | [点我跳转](#qrcode)   |
| JSON方式绘制海报 | [点我跳转](#poster)   |



# <a id="text">绘制文字</a> [返回目录](#root)

| 属性名称      | 类型     | 默认值                          | 可选值                                        | 是否必填 | 说明                                                         |
| ------------- | -------- | ------------------------------- | --------------------------------------------- | -------- | ------------------------------------------------------------ |
| x             | Number   | 0                               |                                               |          | x轴位置                                                      |
| y             | Number   | 0                               |                                               |          | y轴位置                                                      |
| w             | Number   | 0                               |                                               |          | 文字的宽度<br />提示: 不填写文字宽度时可以在<br />callBack中可以获取当前文字的宽度<br /> |
| text          | String   |                                 |                                               | 是       | 文字的内容<br />提示: 已支持使用\n换行(你好\n世界)           |
| color         | String   | #000000                         |                                               |          | 颜色                                                         |
| textIndent    | Number   | 0                               |                                               |          | 文字首行缩进                                                 |
| textAlign     | String   | none                            | 默认: none<br />居中: center<br />靠右: right |          | 文字水平对齐方式                                             |
| lastWidth     | Number   |                                 |                                               |          | 当限制文字行数时最后一行的宽度                               |
| font          | Object   | [Font](#font)                   |                                               |          | 文字样式                                                     |
| line          | Object   | [LineHeight](#lineHeight)       |                                               |          | 文字行数, 文字行高之类的                                     |
| alpha         | Number   | 1                               |                                               |          | 透明度                                                       |
| isFill        | Boolean  | true                            |                                               |          | 是否为填充文字                                               |
| windowAlign   | String   | none                            | 默认: none<br />居中: center<br />靠右: right |          | 文字在窗口(整个画布的宽度)对齐的方式                         |
| offsetRight   | Number   | 0                               |                                               |          | 当使用windowAlign时可以设置右边空出的间距<br />比如: windowAlign: 'right', 靠右。但是我要不直接顶着右边，需要控制在靠右边20rpx\|px距离就设置这个属性;<br />offsetRight: 20 |
| highlightText | Array    | [HighlightText](#highlightText) |                                               |          | 文字高亮                                                     |
| textRect      | Object   | [textRect](#textRect)           |                                               |          | 绘制文字边框                                                 |
| callBack      | Function | [CallBack](#callBack)           |                                               |          | 绘制回调                                                     |



# <a id="rect">绘制矩形</a> [返回目录](#root)

| 属性名称    | 类型             | 默认值                | 可选值                                                 | 是否必填 | 说明                                                         |
| ----------- | ---------------- | --------------------- | ------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| x           | Number           | 0                     |                                                        |          | x轴位置                                                      |
| y           | Number           | 0                     |                                                        |          | y轴位置                                                      |
| w           | Number           | 0                     |                                                        | 是       | 宽度                                                         |
| h           | Number           | 0                     |                                                        | 是       | 高度                                                         |
| r           | Number  \| Array | 0                     |                                                        |          | 圆角角度<br />number: 全圆角角度大小<br />array: [上, 右, 下, 左], 可以与css样式一样。简写<br />[上下, 左右], [上, 左右, 下], [全部]<br />tips: 这个已经可以替代borderType属性 |
| alpha       | Number           | 1                     | 0~1                                                    |          | 透明度                                                       |
| borderType  | Aarray           | ['default']           | tr:右上; tl: 左下;  br: 右下; bl: 左下;default: 全圆角 |          | 圆角的方向<br />值类型为数组, 添加不同的圆角方向设置哪里是圆角哪里不是圆角 |
| color       | String           | #000000               |                                                        |          | 背景颜色                                                     |
| borderWidth | Number           | 0                     |                                                        |          | 边框宽度                                                     |
| borderColor | String           | #000000               |                                                        |          | 边框颜色                                                     |
| isFill      | Boolean          | true                  | true, false                                            |          | 是否是填充矩形                                               |
| lineWidth   | Number           | 0                     |                                                        |          | 当不是填充矩形时，边框的大小                                 |
| windowAlign | String           | none                  | 默认: none<br />居中: center<br />靠右: right          |          | 矩形在窗口(整个画布的宽度)对齐的方式                         |
| offsetRight | Number           | 0                     |                                                        |          | 当使用windowAlign时可以设置右边空出的间距<br />比如: windowAlign: 'right', 靠右。但是我要不直接顶着右边，需要控制在靠右边20rpx\|px距离就设置这个属性;<br />offsetRight: 20 |
| rotate      | Object           | [Rotate](#rotate)     |                                                        |          | 矩形旋转                                                     |
| gradient    | Object           | [Gradient](#gradient) |                                                        |          | 渐变色，当使用这个时，color: 将失效                          |
| shadow      | Object           | [Shadow](#shadow)     |                                                        |          | 阴影                                                         |
| callback    | Function         | [callback](#callback) |                                                        |          | 绘制回调                                                     |



# <a id="arc">绘制圆形 </a>[返回目录](#root)

| 属性名称    | 类型     | 默认值                | 可选值                                        | 是否必填 | 说明                                                         |
| ----------- | -------- | --------------------- | --------------------------------------------- | -------- | ------------------------------------------------------------ |
| x           | Number   | 0                     |                                               |          | x轴位置                                                      |
| y           | Number   | 0                     |                                               |          | y轴位置                                                      |
| r           | Number   | 0                     |                                               | 是       | 圆形半径                                                     |
| s           | Number   | 0                     |                                               |          | 画圆时起始弧度                                               |
| e           | Number   | Math.PI * 2           |                                               |          | 画圆时结束弧度                                               |
| d           | Boolean  | false                 |                                               |          | 指定弧度的方向是逆时针还是顺时针; 默认: 顺时针               |
| alpha       | Number   | 1                     | 0~1                                           |          | 透明度                                                       |
| color       | String   | #000000               |                                               |          | 背景颜色                                                     |
| borderWidth | Number   | 0                     |                                               |          | 边框宽度                                                     |
| borderColor | String   | #000000               |                                               |          | 边框颜色                                                     |
| isFill      | Boolean  | true                  | true, false                                   |          | 是否是填充圆形                                               |
| lineWidth   | Number   | 0                     |                                               |          | 当不是填充圆形时，边框的大小                                 |
| windowAlign | String   | none                  | 默认: none<br />居中: center<br />靠右: right |          | 圆形在窗口(整个画布的宽度)对齐的方式                         |
| offsetRight | Number   | 0                     |                                               |          | 当使用windowAlign时可以设置右边空出的间距<br />比如: windowAlign: 'right', 靠右。但是我要不直接顶着右边，需要控制在靠右边20rpx\|px距离就设置这个属性;<br />offsetRight: 20 |
| rotate      | Object   | [Rotate](#rotate)     |                                               |          | 圆形旋转                                                     |
| gradient    | Object   | [Gradient](#gradient) |                                               |          | 渐变色，当使用这个时，color: 将失效                          |
| shadow      | Object   | [Shadow](#shadow)     |                                               |          | 阴影                                                         |
| callback    | Function | [callback](#callback) |                                               |          | 绘制回调                                                     |



# <a id="image">绘制图片</a> [返回目录](#root)

| 属性名称    | 类型           | 默认值                | 可选值                                                  | 是否必填 | 说明                                                         |
| ----------- | -------------- | --------------------- | ------------------------------------------------------- | -------- | ------------------------------------------------------------ |
| x           | Number         | 0                     |                                                         |          | x轴位置                                                      |
| y           | Number         | 0                     |                                                         |          | y轴位置                                                      |
| w           | Number         | 0                     |                                                         | 是       | 宽度                                                         |
| h           | Number         | 0                     |                                                         | 是       | 高度                                                         |
| src         | String         |                       |                                                         | 是       | 图片资源地址(网络路径, 本地路径, base64)<br />提示: 小程序需要配置网络路径的白名单 |
| r           | Number \|Array | 0                     |                                                         |          | 圆角角度(当绘制类型为rect时圆角的大小, 和矩形一样可以设置不同圆角的大小) |
| drawType    | String         | default               | 默认: default<br />矩形: rect<br />圆形: arc            |          | 图片绘制类型; <br />                                         |
| mode        | String         | aspectFill            | aspectFill<br />aspectFit<br /> widthFix<br />heightFix |          | 图片模式                                                     |
| alpha       | Number         | 1                     | 0~1                                                     |          | 透明度                                                       |
| color       | String         | #000000               |                                                         |          | 背景颜色                                                     |
| borderWidth | Number         | 0                     |                                                         |          | 边框宽度                                                     |
| borderColor | String         | #000000               |                                                         |          | 边框颜色                                                     |
| windowAlign | String         | none                  | 默认: none<br />居中: center<br />靠右: right           |          | 图片在窗口(整个画布的宽度)对齐的方式                         |
| offsetRight | Number         | 0                     |                                                         |          | 当使用windowAlign时可以设置右边空出的间距<br />比如: windowAlign: 'right', 靠右。但是我要不直接顶着右边，需要控制在靠右边20rpx\|px距离就设置这个属性;<br />offsetRight: 20 |
| rotate      | Object         | [Rotate](#rotate)     |                                                         |          | 图片旋转                                                     |
| shadow      | Object         | [Shadow](#shadow)     |                                                         |          | 阴影                                                         |
| callback    | Function       | [callback](#callback) |                                                         |          | 绘制回调                                                     |



# <a id="triangle">绘制三角形</a> [返回目录](#root)

| 属性名称    | 类型     | 默认值                            | 可选值                                                   | 是否必填 | 说明                                                         |
| ----------- | -------- | --------------------------------- | -------------------------------------------------------- | -------- | ------------------------------------------------------------ |
| x           | Number   | 0                                 |                                                          |          | x轴位置                                                      |
| y           | Number   | 0                                 |                                                          |          | y轴位置                                                      |
| w           | Number   | 0                                 |                                                          | 是       | 宽度                                                         |
| h           | Number   | 0                                 |                                                          | 是       | 高度                                                         |
| alpha       | Number   | 1                                 | 0~1                                                      |          | 透明度                                                       |
| color       | String   | #000000                           |                                                          |          | 背景颜色                                                     |
| drawType    | String   | issceles                          | isosceles: 等腰三角形; right: 直角三角形; custom: 自定义 |          | 三角形类型<br />提示自定义时，x, y, 宽, 高都不需要传递。需要传递绘制点的坐标类型是数组(coordinate) |
| coordinate  | Array    | []                                |                                                          |          | [[x1, y1], [x2, y2], [x3, y3]]                               |
| borderWidth | Number   | 0                                 |                                                          |          | 边框宽度                                                     |
| borderColor | String   | #000000                           |                                                          |          | 边框颜色                                                     |
| isFill      | Boolean  | true                              | true, false                                              |          | 是否是填充三角形                                             |
| lineWidth   | Number   | 0                                 |                                                          |          | 当不是填充三角形时，边框的大小                               |
| windowAlign | String   | none                              | 默认: none<br />居中: center<br />靠右: right            |          | 三角形在窗口(整个画布的宽度)对齐的方式<br />提示: 三角形为自定义时失效 |
| offsetRight | Number   | 0                                 |                                                          |          | 当使用windowAlign时可以设置右边空出的间距<br />比如: windowAlign: 'right', 靠右。但是我要不直接顶着右边，需要控制在靠右边20rpx\|px距离就设置这个属性;<br />offsetRight: 20 |
| rotate      | Object   | [TriangleRotate](#triangleRotate) |                                                          |          | 三角形旋转                                                   |
| callback    | Function | [callback](#callback)             |                                                          |          | 绘制回调                                                     |



# <a id="line">绘制线条</a> [返回目录](#root)

| 属性名称  | 类型     | 默认值                | 可选值                       | 是否必填 | 说明                   |
| --------- | -------- | --------------------- | ---------------------------- | -------- | ---------------------- |
| x         | Number   | 0                     |                              |          | x轴位置                |
| y         | Number   | 0                     |                              |          | y轴位置                |
| w         | Number   | 0                     |                              | 是       | 宽度                   |
| lineWidth | Number   | 1                     |                              |          | 线条高度               |
| alpha     | Number   | 1                     | 0~1                          |          | 透明度                 |
| color     | String   | #000000               |                              |          | 颜色                   |
| lineType  | String   | solid                 | 实线: solid<br />虚线:dashed |          | 线条类型               |
| pattern   | Array    | [5, 5]                |                              |          | 当线条类型为虚线是生效 |
| offset    | Number   | 5                     |                              |          | 虚线偏移量             |
| lineCap   | String   | butt                  | butt, round, square          |          | 线条端点样式           |
| callback  | Function | [callback](#callback) |                              |          | 绘制回调               |



# <a id="qrcode">绘制二维码 </a>[返回目录](#root)

| 属性名称    | 类型     | 默认值                      | 可选值                                        | 是否必填 | 说明                                                         |
| ----------- | -------- | --------------------------- | --------------------------------------------- | -------- | ------------------------------------------------------------ |
| x           | Number   | 0                           |                                               |          | x轴位置                                                      |
| y           | Number   | 0                           |                                               |          | y轴位置                                                      |
| size        | Number   | 100                         |                                               | 是       | 二维码大小                                                   |
| text        | String   |                             |                                               | 是       | 二维码内容                                                   |
| image       | Object   | [QrCodeImage](#qrCodeImage) |                                               |          | 二维码中间的图片                                             |
| background  | String   | #ffffff                     |                                               |          | 二维码背景色                                                 |
| foreground  | String   | #000000                     |                                               |          | 二维码前景色                                                 |
| pdground    | String   | #000000                     |                                               |          | 二维码角标色                                                 |
| lv          | Number   | 3                           |                                               |          | 容错级别(一般不需要调它)                                     |
| windowAlign | String   | none                        | 默认: none<br />居中: center<br />靠右: right |          | 二维码在窗口(整个画布的宽度)对齐的方式                       |
| offsetRight | Number   | 0                           |                                               |          | 当使用windowAlign时可以设置右边空出的间距<br />比如: windowAlign: 'right', 靠右。但是我要不直接顶着右边，需要控制在靠右边20rpx\|px距离就设置这个属性;<br />offsetRight: 20 |
| callBack    | Function | [CallBack](#callBack)       |                                               |          | 绘制回调                                                     |





#  特殊类型参数



# <a id="drawBackground">DrawBackground</a> [点我返回](#initDraw)

| 属性名称 | 类型   | 默认值 | 可选值                        | 是否必填 | 说明                                                         |
| -------- | ------ | ------ | ----------------------------- | -------- | ------------------------------------------------------------ |
| type     | String |        | 纯色: color;<br />图片: image | 是       | 背景类型<br />纯色: 详看绘制矩形时的参数 [点我跳转](#rect)<br />图片: 详看绘制图片时的参数 [点我跳转](#image) |



# <a id="exportImageStyle">ExportImageStyle</a> [点我返回](#initDraw)

| 属性名称   | 类型   | 默认值                | 可选值 | 是否必填 | 说明                                                   |
| ---------- | ------ | --------------------- | ------ | -------- | ------------------------------------------------------ |
| x          | Number | 0                     |        |          | 画布x轴起点（默认0）                                   |
| y          | Number | 0                     |        |          | 画布y轴起点（默认0）                                   |
| width      | Number | canvas宽度-x          |        |          | 画布宽度（默认为canvas宽度-x）                         |
| height     | Number | canvas高度-y          |        |          | 画布高度（默认为canvas高度-y）                         |
| destWidth  | Number | width * 屏幕像素密度  |        |          | 输出图片宽度（默认为 width * 屏幕像素密度）            |
| destHeight | Number | height * 屏幕像素密度 |        |          | 输出图片高度（默认为 height * 屏幕像素密度）           |
| fileType   | String | png                   |        |          | 目标文件的类型，只支持 'jpg' 或 'png'。默认为 'png'    |
| quality    | Number | 1                     |        |          | 图片的质量，取值范围为 (0, 1)，不在范围内时当作1.0处理 |



# <a id="font">Font</a> [点我返回](#text)

| 属性名称 | 类型             | 默认值     | 可选值                                              | 是否必填 | 说明     |
| -------- | ---------------- | ---------- | --------------------------------------------------- | -------- | -------- |
| size     | Number           | 16         |                                                     |          | 文字大小 |
| family   | String           | sans-serif |                                                     |          | 文字字体 |
| style    | String           | normal     | 默认:normal;<br />斜体: italic<br />倾斜体: oblique |          | 文字样式 |
| weight   | String \| Number | normal     | normal, bold, 数字                                  |          | 文字加粗 |





# <a id="lineHeight">LineHeight</a> <a href="#text">点我返回</a>

| 属性名称 | 类型   | 默认值 | 可选值                                                     | 是否必填 | 说明                     |
| -------- | ------ | ------ | ---------------------------------------------------------- | -------- | ------------------------ |
| num      | Number | -1     |                                                            |          | 文字行数<br />不限制: -1 |
| height   | Number | 16     |                                                            |          | 行高                     |
| style    | String | none   | 默认: none<br />下划线: underline<br />删除线: lineThrough |          | 样式                     |
| type     | String | solid  | 实线: solid<br />虚线 : dashed                             |          | 线类型                   |
| width    | Number | 1      |                                                            |          | 线宽度                   |



# <a id="highlightText">HighlightText</a>(注意这是一个数组对象，下面描述对象属性值) <a href="#text">点我返回</a>

| 属性名称       | 类型   | 默认值 | 可选值                                    | 是否必填 | 说明                                                         |
| -------------- | ------ | ------ | ----------------------------------------- | -------- | ------------------------------------------------------------ |
| text           | String |        |                                           | 是       | 高亮文字(我)                                                 |
| color          | Stirng |        |                                           |          | 颜色                                                         |
| size           | Number |        |                                           |          | 重置的字体大小                                               |
| weight         | String |        |                                           |          | 重置的字体粗体                                               |
| style          | String |        |                                           |          | 重置的文字样式                                               |
| family         | Stirng |        |                                           |          | 重置的文字字体                                               |
| siblingsCenter | String | bottom | center: 居中<br />top: 上<br />bottom: 下 |          | 和兄弟字体的对其方式                                         |
| siblingsNum    | Number | 0      |                                           |          | 和兄弟字体对其的差值<br />因为在不同端，绘制字体的位置都不一样，设置这个属性可以改变在不同端不一样导致的差异 |



# <a id="textRect">textRect</a> <a href="#text">点我返回</a>

### tips: 在微信小程序上绘制的边框可能并不是那种和文字非常的对称的敬请谅解

| 属性名称   | 类型    | 默认值 | 可选值 | 是否必填 | 说明                                                         |
| ---------- | ------- | ------ | ------ | -------- | ------------------------------------------------------------ |
| show       | Boolean | false  |        |          | 是否显示                                                     |
| vorizontal | Number  |        |        | 必填     | 水平(左右两边的间隔大小)                                     |
| vertical   | Number  |        |        | 必填     | 垂直(上下两边的间隔大小)                                     |
| isFill     | Boolean | true   |        |          | 是否是填充矩形边框<br />(其实从这里开始后面的参数就是绘制矩形时的参数了，<br />我这里就列出几个常用的几个参数，<br />剩下的参数可参考绘制矩形的参数) |
| color      | String  | #00000 |        |          | 背景色                                                       |
| r          | Number  |        |        |          | 圆角角度                                                     |
| lineWidth  | Number  |        |        |          | 当不是填充矩形时，矩形的边框大小                             |



# <a id="rotate">Rotate</a> [返回绘制矩形](#rect) [返回绘制圆形](#arc) [返回绘制图片](#image)

| 属性名称 | 类型   | 默认值 | 可选值                                                       | 是否必填 | 说明       |
| -------- | ------ | ------ | ------------------------------------------------------------ | -------- | ---------- |
| deg      | Number | 0      |                                                              |          | 旋转角度   |
| type     | String | middle | 上左: topLeft<br />上中: topMiddle<br />上右: topRight<br />中左: middleLeft<br />中心: middle<br />中右: middleRight<br />下左: bottomLeft<br />下中: bottomMiddle<br />下右: bottomRight |          | 旋转中心点 |



# <a id="qrCodeImage">QrCodeImage</a> [返回绘制二维码](#qrcode)

| 属性名称    | 类型   | 默认值 | 可选值 | 是否必填 | 说明     |
| ----------- | ------ | ------ | ------ | -------- | -------- |
| size        | Number |        |        | 是       | 图片大小 |
| src         | String |        |        | 是       | 图片路径 |
| r           | Number |        |        |          | 圆角     |
| color       | String | #fff   |        |          | 背景色   |
| borderWidth | Number | 0      |        |          | 边框大小 |
| borderColor | String |        |        |          | 边框颜色 |



# <a id="triangleRotate">TriangleRotate</a> [返回绘制三角形](#triangle)

| 属性名称 | 类型   | 默认值 | 可选值                                    | 是否必填 | 说明       |
| -------- | ------ | ------ | ----------------------------------------- | -------- | ---------- |
| deg      | Number | 0      |                                           |          | 旋转角度   |
| type     | String | middle | 中心: middle<br />左: left<br />右: right |          | 旋转中心点 |



# <a id="gradient">Gradient</a> [返回绘制矩形](#rect) [返回绘制圆形](#arc)

| 属性名称 | 类型    | 默认值 | 可选值                         | 是否必填 | 说明                                                         |
| -------- | ------- | ------ | ------------------------------ | -------- | ------------------------------------------------------------ |
| show     | Boolean | false  |                                |          | 是否显示                                                     |
| type     | String  | linear | 线性: linear<br />圆形: circle |          | 渐变类型                                                     |
| relative | Boolean | true   |                                |          | position的参数是否相对于容器<br />                           |
| position | Object  | {}     |                                | 是       | [线性渐变参数](#gradientRect)<br />[圆形渐变参数](#gradientCircle) |
| colors   | Array   | []     |                                | 是       | [渐变colors参数](#colors)<br />渐变点，至少要两个            |

```javascript
// 线性
const react = {
    type: 'rect',
    w: 400,
    h: 200,
    gradient: {
        show: true,
        position: {
            x0: 0,
            y0: 0,
            x1: 400,
            y1: 0
        },
        colors: [{
            stop: 0,
            color: 'red'
        }, {
            stop: 1,
            color: 'white'
        }]
    }
}
// 圆形
const circle = {
    type: 'arc',
    y: 200,
    r: 100,
    gradient: {
        show: true,
        type: 'circle',
        position: {
            x: 0,
            y: 0,
            r: 50,
        },
        colors: [{
            stop: 0,
            color: 'red'
        }, {
            stop: 1,
            color: 'white'
        }]
    }
}
```



# <a id="gradientRect">线性渐变Position参数</a> [点我返回](#gradient)

| 属性名称 | 类型   | 默认值 | 可选值 | 是否必填 | 说明        |
| -------- | ------ | ------ | ------ | -------- | ----------- |
| x0       | Number | 0      |        | 是       | 起点的x坐标 |
| y0       | Number | 0      |        | 是       | 起点的y坐标 |
| x1       | Number | 0      |        | 是       | 终点的x坐标 |
| y1       | Number | 0      |        | 是       | 终点的y坐标 |



# <a id="gradientCircle">圆形渐变Position参数</a> [点我返回](#gradient)

| 属性名称 | 类型   | 默认值 | 可选值 | 是否必填 | 说明        |
| -------- | ------ | ------ | ------ | -------- | ----------- |
| x        | Number | 0      |        | 是       | 圆心的x坐标 |
| y        | Number | 0      |        | 是       | 圆心的y坐标 |
| r        | Number | 0      |        | 是       | 圆的半径    |



# <a id="colors">渐变colors参数</a> [点我返回](#gradient)

| 属性名称 | 类型   | 默认值 | 可选值 | 是否必填 | 说明                           |
| -------- | ------ | ------ | ------ | -------- | ------------------------------ |
| stop     | Number |        | 0~1    | 是       | 表示渐变点在起点和终点中的位置 |
| color    | String |        |        | 是       | 颜色                           |



# <a id="shadow">Shadow 阴影参数</a> [返回绘制矩形](#rect) [返回绘制圆形](#arc) [返回绘制图片](#image)

| 属性名称 | 类型    | 默认值  | 可选值 | 是否必填 | 说明                           |
| -------- | ------- | ------- | ------ | -------- | ------------------------------ |
| show     | Boolean | false   |        |          | 是否显示                       |
| x        | Number  | 0       |        |          | 阴影相对于形状在水平方向的偏移 |
| y        | Number  | 0       |        |          | 阴影相对于形状在竖直方向的偏移 |
| blur     | Number  | 0       |        |          | 阴影的模糊级别，数值越大越模糊 |
| String   | String  | #000000 |        |          | 阴影的颜色                     |



# <a id="callback">callback</a> [返回绘制文字](#text) [返回绘制矩形](#rect) [返回绘制圆形](#arc) [返回绘制图片](#image) [返回绘制线条](#line) [返回绘制二维码](#qrcode) [返回绘制三角形](#triangle)

```javascript
 callback: (before, all) => {
     let { sx, sy, ex, ey, w, h } = before
     // sx: 上一次绘制内容开始的x轴位置
     // sy: 上一次绘制内容开始的y轴位置
     // ex: 上一次绘制内容结束的x轴位置
     // ey: 上一次绘制内容结束的y轴位置
     // w: 上一次绘制内容的宽度
     // h: 上一次绘制内容的高度
     // callback 返回的对象会覆盖原属性
     return {
         x: sx,
         y: sy
     }
 }
```





# <a id="poster">JSON方式绘制海报</a> [返回目录](#root)

```javascript
const res = await draw.drawPoster(({ bgObj, ctxObj }) => {
    // bgObj: 背景的宽高
    // ctxObj: 画布的宽高
    // 文字
    const text = {
        type: 'text',
        // 查看绘制文字的参数
    }
    // 矩形
    const react = {
        type: 'rect',
        // 查看绘制矩形的参数
    }
    // 圆形
    const arc = {
        type: 'arc',
        //  查看绘制圆形的参数
    }
    // 三角形
    const triangle = {
        type: 'triangle',
        // 查看绘制三角形的参数
    }
    // 线条
    const line = {
        type: 'line',
        // 查看绘制线条的参数
    }
    // 图片
    const image = {
        type: 'image',
        // 查看绘制图片的参数
    }
    // 二维码
    const qrcode = {
        type: 'qrcode',
        // 查看绘制二维码的参数
    }
    // 自定义绘制
    const custom = {
        type: 'custom',
        setDraw(Context) {
            // 原生方法绘制
            Context.fillText('你好', 0, 200)
        }
    }
    return [ react, arc, text ]
})
let { success, message, data } = res
// succes: 是否绘制成功
// message: 绘制成功与失败时的提示
// data: 绘制成功时返回的图片地址
```



[#textRect]: 