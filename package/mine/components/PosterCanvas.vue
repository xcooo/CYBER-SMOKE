<template>
  <view>
    <canvas class="canvas" :id="canvasId" :canvas-id="canvasId" :style="[canvasStyle]" />
  </view>
</template>
<script>
import Draw from '@/uni_modules/sakura-canvas/js_sdk/index'
export default {
  props: {
    shareUrl: {
      type: String,
      default: function () {
        return ''
      }
    },
    localPosterCover: {
      type: String,
      default: function () {
        return ''
      }
    },
    h5LocalPosterCover: {
      type: String,
      default: function () {
        return ''
      }
    },
    h5Url: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  data () {
    return {
      canvasStyle: {
        width: '750rpx',
        height: '500rpx'
      },
      showPoster: false,
      posterImage: '',
      canvasId: 'autoHeight'
    }
  },
  mounted () {
    this.createDraw()
  },
  methods: {
    createDraw() {
		
      const draw = new Draw({
        width: 750,
        height: 600,
        canvasId: this.canvasId,
        _this: this,
        // 绘制单位 px/rpx
        unit: 'rpx',
        // default: 默认绘制模式 2d: 2d绘制模式(只在下小程序上使用, H5/APP会自定转成default)
        type: 'default',
        // 设置默认字体样式
        fontStyle: {
          size: 32
        },
        background: {
          type: 'color',
          color: '#ffffff',
          // 宽度, 不填默认为画布的宽度
          w: 750,
          // 高度，不填默认为画布的高度
          // 像这种不知道绘制出来的图片具体高度的直接填写一个较大的值
          h: 99999
        },
        // 绘制时的延迟时间
        drawDelayTime: 200,
        // 导出图片时的延迟时间
        exportImageDelayTime: 400
      })
      this.draw = draw
      // 目前绘制需要先监听draw抛出的监听事件
      // init: 初始化完成可以绘制画布背景(现在画布背景需要自行调用方法绘制)
      draw.$on('init', async () => {
        // 绘制画布背景
        await draw.drawBackground()
        // 当需要直接绘制内容是就这里/background的监听回调里面调用
        // await this.drawPoster()
      })
      // background: 绘制画布背景完成，会具体返回背景的宽度高度和一个style(不需要监听时可以不监听)
      // 用于当背景为图片(mode: widthFix/heightFix)时不确定的宽度/高度，可以动态修改画布的宽高
      // draw.$on('background', async result => {
      // 	// console.log(result)
      // 	await drawPoster()
      // })
      // drawComplete: 用于监听绘制完成事件, 可以返回当前画布的宽度高度和已经绘制完成内容的高度, 用于当前的情况，不确定画布高度时，动态修改画布的高度
      draw.$on('drawComplete', async (result) => {
        const { width, height, contentHeight } = result
        this.canvasStyle.width = width + draw.unit
        this.canvasStyle.height = contentHeight + 48 + draw.unit
        // tips:
        // setCanvasStyle在2d里面有些许绘制慢,因为2d绘制需要重新在绘制一遍内容才行(插件内部会执行)，所以如果是需要动态设置高度的不建议使用2d绘制。 普通绘制只需要修改一下画布的宽高就行，不需要重新绘制。
        // setCanvasStyle: 设置canvas宽高
        await draw.setCanvasStyle(width, contentHeight + 48)
      })
    },
    async drawPoster() {
		console.log(this.h5Url)
      const res = await this.draw.drawPoster(({ ctxObj, bgObj }) => {
		  // console.log(ctxObj,bgObj);
        // ctxObj: 画布的宽高
        // bgObj: 背景的宽高
        const { width, height } = ctxObj
        const startX = 24
        // 随机图片
        const randomImage = () => {
		  console.log('这里打印全部', this.localPosterCover, this.h5LocalPosterCover)
          // #ifdef MP-WEIXIN
		  console.log('这里是小程序', this.localPosterCover)
          return this.localPosterCover;
          // #endif
          // #ifdef H5
		  console.log('这里是h5', this.h5LocalPosterCover)
          return this.h5LocalPosterCover
          // #endif
          // // 字节跳动小程序不知道为啥子不能绘制本地图片。。。
          // // #ifndef MP-TOUTIAO
          // const images = ['/static/car.jpg', '/static/img.jpg', '/static/logo.png', '/static/head.jpg']
          // const randomNum = Math.floor(Math.random() * images.length)
          // return images[randomNum]
          // // #endif
          // // #ifdef MP-TOUTIAO
          // return 'https://api.chuyiwang.com.cn/public/upload/2022/0715/2022071517518621.jpg'
          // // #endif
        }

        // 不确定高度的图片
        const image = {
          name: 'image',
          type: 'image',
          w: width,
          // tips: mode只有在drawType不为default的时候才生效
          mode: 'widthFix',
          drawType: 'rect',
          src: randomImage()
        }
        const title = {
          font: {
            size: 34
          },
          line: {
            height: 42,
            num: 2
          },
          textIndent: 40,
          name: 'title',
          type: 'text',
          text: '心跳开盲盒',
          color: '#000',
          callback: (before) => {
            return {
              y: before.ey + 108
            }
          }
        }
        const subtitle = {
          font: {
            size: 34
          },
          line: {
            height: 42,
            num: 2
          },
          textIndent: 40,
          name: 'subtitle',
          type: 'text',
          text: ' 美好不重样！',
          color: '#2c2c2c',
          callback: (before) => {
            return {
              y: before.ey + 20
            }
          }
        }
        // app二维码图
        // 	#ifdef APP-PLUS
        const qcCode = {
          name: 'qcCode',
          type: 'qrcode',
          text: this.appShareUrl,
          size: 200,
          image: {
            src: '/pagesA/static/head.jpg',
            size: 100,
            r: 10,
            borderWidth: 14,
            borderColor: '#ffffff'
          },
          callback: (before, all) => {
            const { sx, ex } = all.find((item) => item.name === 'image')
            const { ey } = all.find((item) => item.name === 'image')
            return {
              w: width / 3,
              x: ex - 250,
              y: ey + 50
            }
          }
        }
        // #endif
        // 	#ifdef H5
        const qcCode = {
          name: 'qcCode',
          type: 'qrcode',
          text: this.h5Url,
          size: 200,
          image: {
            src: '/pagesA/static/head.jpg',
            size: 100,
            r: 10,
            borderWidth: 14,
            borderColor: '#ffffff'
          },
          callback: (before, all) => {
            const { sx, ex } = all.find((item) => item.name === 'image')
            const { ey } = all.find((item) => item.name === 'image')
            return {
              w: width / 3,
              x: ex - 250,
              y: ey + 50
            }
          }
        }
        // #endif

        // #ifdef MP-WEIXIN
        // 小程序二维码图
        const qcCode = {
          name: 'image',
          type: 'image',
          mode: 'widthFix',
          drawType: 'rect',
          src: this.shareUrl,
          callback: (before, all) => {
            console.log(all, '1')
            const { sx, ex } = all.find((item) => item.name === 'image')
            const { ey } = all.find((item) => item.name === 'image')
            return {
              w: width / 3,
              x: ex / 2 + 80,
              y: ey + 50
            }
          }
        }
        // #endif
        return [image, title, subtitle, qcCode]
      })
	  console.log(res);
      if (!res.success) return
      this.$emit('handleSuccess', { showPoster: true, posterImage: res.data })
      this.showPoster = true
      this.posterImage = res.data
      console.log(this.posterImage, 'this.posterImage')
    }
  }
}
</script>

<style scoped lang="scss">
.canvas {
  position: fixed;
  left: -999999rpx;
  top: -999999rpx;
}

.poster-box {
  width: 750rpx;
  height: 500rpx;
  background-color: red;
}
</style>
