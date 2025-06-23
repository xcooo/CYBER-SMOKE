<template>
  <view>
    <canvas class="canvas" :id="canvasId" :canvas-id="canvasId" :style="[canvasStyle]" />
  </view>
</template>
<script>
import Draw from '@/uni_modules/sakura-canvas/js_sdk/index'
export default {
  props: {
    shareUrl: String,
    localPosterCover: String,
    h5LocalPosterCover: String,
    h5Url: String,
    invite_code: String,
  },
  data () {
    return {
      canvasStyle: {
        width: '750rpx',
        height: '500rpx'
      },
      showPoster: false,
      posterImage: '',
      canvasId: 'autoHeight',
      qrCode: '',  // 小程序码
      qrCodeFetched: false // 用于标记二维码是否已获取
    }
  },
  mounted () {
    this.createDraw()
  },
  methods: {
    // 获取小程序二维码
    async fetchQrCode (invite_code) {
      if (this.qrCodeFetched) return; // 如果已获取过二维码，则不再重新获取
      this.qrCodeFetched = true;
      if (this.qrCode == '') {
        this.req({
          url: '/v1/share/getMiniQrcode',
          data: { invite_code },
          success: res => {
            if (res.code == 200) {
              this.qrCode = res.data
            }
          }
        })
      }
    },
    createDraw () {
      if (this.draw) return; // 防止重复创建 Draw 实例

      const draw = new Draw({
        width: 750,
        height: 600,
        canvasId: this.canvasId,
        _this: this,
        unit: 'rpx',
        type: 'default',
        fontStyle: {
          size: 32,
        },
        background: {
          type: 'color',
          color: '#ffffff',
          w: 750,
          h: 99999,
        },
        drawDelayTime: 200,
        exportImageDelayTime: 400,
      });

      this.draw = draw;
      draw.$on('init', async () => {
        await draw.drawBackground();
        await this.drawPoster();
      });
      draw.$on('drawComplete', async (result) => {
        const { width, contentHeight } = result;
        this.canvasStyle.width = width + draw.unit;
        this.canvasStyle.height = contentHeight + 48 + draw.unit;
        await draw.setCanvasStyle(width, contentHeight + 48);
      });
    },
    async drawPoster () {
      if (this.posterImage) {
        this.$emit('handleSuccess', { showPoster: true, posterImage: this.posterImage });
        this.showPoster = true;
        return;
      }
      console.log(this.draw)
      const res = await this.draw.drawPoster(({ ctxObj, bgObj }) => {
        // console.log(ctxObj,bgObj);
        // ctxObj: 画布的宽高
        // bgObj: 背景的宽高
        const { width, height } = ctxObj
        // 随机图片
        const randomImage = () => {
          return this.h5LocalPosterCover
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
          text: '心动开盲盒',
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
        // const qcCode = {
        //   name: 'qcCode',
        //   type: 'qrcode',
        //   mode: 'widthFix',
        //   drawType: 'rect',
        //   src: this.qrCode,
        //   size: 200,
        //   callback: (before, all) => {
        //     console.log(all, '1')
        //     const { sx, ex } = all.find((item) => item.name === 'image')
        //     const { ey } = all.find((item) => item.name === 'image')
        //     return {
        //       // w: width / 3,
        //       // x: ex / 2 + 80,
        //       // y: ey + 50
        //       w: width / 3,
        //       x: ex - 250,
        //       y: ey + 50
        //     }
        //   }
        // }
        const qcCode = {
          name: 'qcCode',
          type: 'image',
          src: this.qrCode, // 直接使用 Base64 数据
          w: width / 3,
          callback: (before, all) => {
            const { ex } = all.find((item) => item.name === 'image')
            const { ey } = all.find((item) => item.name === 'image')
            return {
              x: ex - 270,
              y: ey + 10
            }
          }
        }
        console.log('123', qcCode)
        // #endif
        return [image, title, subtitle, qcCode]
      })
      if (!res.success) return
      this.$emit('handleSuccess', { showPoster: true, posterImage: res.data })
      this.showPoster = true
      this.posterImage = res.data
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

.poster_tool {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 99999999999;
  width: 100vw;
  height: 210rpx;
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom);

  .poster_tool_item {
    width: 150rpx;
    height: 150rpx;
    background-color: #e6e6e652;
    border-radius: 15rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 23rpx;
    color: #666666b8;

    button {
      width: 150rpx;
      height: 150rpx;
      background-color: #f5f5f552;
      border-radius: 15rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 23rpx;
      color: #666666b8;
      padding: 0;
    }

    button::after {
      border: none;
      outline: none;
    }
  }

  .poster_tool_item:hover {
    background-color: #dfdfdf52;
  }
}
</style>
