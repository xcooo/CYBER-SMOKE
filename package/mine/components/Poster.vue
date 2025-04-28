<template>
  <view :class="[{ 'poster_container_active': realShow }, 'poster_container']">
    <view class="poster">
      <view @click="close" class="poster_close">
        <u-icon name="close-circle" color="#fff" size="80"></u-icon>
      </view>
      <view class="poster_qrcode">
        <image :src="qrCode" mode="widthFix"></image>
      </view>
      <canvas v-if="realShow" :style="[canvasStyle]" :canvas-id="canvasId" @error="canvasIdErrorCallback"></canvas>
    </view>
    <view class="poster_tool">
      <view class="poster_tool_item">
        <button open-type="share">
          <u-icon name="weixin-circle-fill" color="green" size="38"></u-icon>
          <text>分享到微信</text>
        </button>
      </view>
      <view class="poster_tool_item" @click="savePoster">
        <u-icon name="download" color="#00aaff" size="38"></u-icon>
        <text style="margin-top: 10rpx;">保存到本地</text>
      </view>
    </view>
  </view>
</template>


<script>
export default {
  data () {
    return {
      qrCode: '',
      realShow: false,
      cacheImage: '',
      canvasId: 'poster',
      canvasStyle: {
        width: '610rpx',
        height: '950rpx',
        // width: '100%',
        // height: '100%',
        opacity: 0
      },
      pixelRatio: 3,//屏幕像数密度
    }
  },
  mounted () {

  },
  methods: {
    // 显示海报
    async show (invite_code) {
      if (this.qrCode == '') {
        this.req({
          url: '/v1/share/getMiniQrcode',
          data: { invite_code },
          success: res => {
            console.log(res)
            if (res.code == 200) {
              this.qrCode = res.data
            }
          }
        })
      }
      this.realShow = true
    },
    // 关闭海报
    close () {
      this.realShow = false
    },
    // 将网络图片变成临时图片
    handleNetworkImgaeTransferTempImage (url) {
      return new Promise(resolve => {
        if (url.indexOf('http') === 0) {
          uni.downloadFile({
            url,
            success: res => {
              resolve(res.tempFilePath);
            }
          });
        }
        else {
          resolve(url);
        }
      });
    },
    // 删除本地同名base64图片文件
    removeSave () {
      return new Promise((resolve, reject) => {
        const fsm = uni.getFileSystemManager();
        const FILE_BASE_NAME = 'tmp_base64src';
        const format = 'jpeg';
        const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
        fsm.unlink({
          filePath: filePath,
          success (res) {
            resolve(true);
          },
          fail (err) {
            resolve(true);
          }
        })
      })
    },
    // 将base64图片存储到本地并转换成临时图片
    handleBase64ImageTransferTempImage (base64Image, FILE_BASE_NAME = 'tmp_base64src') {
      const fsm = uni.getFileSystemManager();
      return new Promise((resolve, reject) => {
        //format这个跟base64数据的开头对应
        const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64Image) || [];
        if (!format) {
          reject(new Error('ERROR_BASE64SRC_PARSE'));
        }
        const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
        fsm.writeFile({
          filePath,
          data: bodyData,
          encoding: 'base64',
          success () {
            resolve(filePath);
          },
          fail () {
            reject(new Error('ERROR_BASE64SRC_WRITE'));
          },
        });
      })
    },
    // 生成 canvas 并生成微信缓存图片
    async htmlToCanvas () {
      if (!this.qrCode) {
        uni.showLoading({ title: '生成海报失败', duration: 3000 })
        return
      }
      let that = this
      uni.showLoading({ title: '正在生成海报' })
      const ctx = uni.createCanvasContext(this.canvasId, this)
      // 手机适配,像素转换,求出他们之间的通用分辨率
      const system = uni.getSystemInfoSync()
      const wpx = system.windowWidth / 750
      // 图片尺寸
      // 绘画过程,需先将网络图片转为本地临时图片
      const image = 'https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/share_bg.png'
      uni.getImageInfo({
        src: image,
        success: async (res) => {
          console.log(res)
          if (res.errMsg == 'getImageInfo:ok') {
            ctx.drawImage(res.path, 0, 0, 610 * wpx, 1050 * wpx)
            // 绘画过程,需将base64图片转为本地临时图片,否则canvas不支持
            await this.removeSave()
            const base64CacheImage = await this.handleBase64ImageTransferTempImage(this.qrCode)
            // const base64CacheImage = this.qrCode
            if (base64CacheImage) {
              // ctx.drawImage(base64CacheImage,218*wpx,705*wpx,185*wpx,195*wpx)
              ctx.drawImage(base64CacheImage, 155 * wpx, 415 * wpx, 300 * wpx, 300 * wpx)
            }
            // 一定要添加一个定时器
            setTimeout(() => {
              ctx.draw(true, () => {
                uni.canvasToTempFilePath({
                  canvasId: this.canvasId,
                  success (res) {
                    console.log('结果', res)
                    that.cacheImage = res.tempFilePath
                    that.saveImage()
                  },
                  fail (error) {
                    throw new Error(error)
                  }
                }, that)
              })
              uni.hideLoading()
            }, 100)

          } else {
            uni.showToast({
              title: '生成海报失败，稍后再试',
              duration: 2000,
              icon: 'none'
            })
            uni.hideLoading()
          }
        }
      })
    },

    async saveImage () {
      await uni.saveImageToPhotosAlbum(
        {
          filePath: this.cacheImage,
          success (res) {
            console.log('保存结果', res)
            uni.showToast({
              title: '海报保存成功',
              duration: 2000
            })
          },
          fail (err) {
            uni.showToast({
              title: '保存失败，稍后再试',
              duration: 2000,
              icon: 'none'
            })
          }
        }
      )

    },
    // 授权相册并保存
    authToSave () {
      let that = this
      uni.authorize({
        scope: 'scope.writePhotosAlbum',
        success () {
          uni.showLoading({ title: '正在保存海报' })
          if (that.cacheImage != '') {
            uni.getImageInfo({
              src: that.cacheImage,
              success: function (image) {
                /* 保存图片到手机相册 */
                uni.saveImageToPhotosAlbum({
                  filePath: that.cacheImage,
                  success: function () {
                    that.realShow = false
                    uni.$u.toast('图片已成功保存到相册')
                  }
                });
              },
              fail: function (image) {
                console.log(image);
              }
            });
          } else {
            that.authToSave()
          }
        },
        complete (res) {
          uni.hideLoading()
          /* 判断如果没有授权就打开设置选项让用户重新授权 */
          uni.getSetting({
            success (res) {
              if (!res.authSetting['scope.writePhotosAlbum']) {
                /* 打开设置的方法 */
                uni.showModal({
                  content: '没有授权保存图片到相册,点击确定去允许授权',
                  success: function (res) {
                    if (res.confirm) {
                      /* 打开设置的API*/
                      uni.openSetting({
                        success (res) { }
                      });
                    } else if (res.cancel) {
                      uni.showModal({
                        cancelText: '取消',
                        confirmText: '重新授权',
                        content: '你点击了取消，将无法进行保存操作',
                        success: function (res) {
                          if (res.confirm) {
                            uni.openSetting({
                              success (res) {/* 授权成功 */ }
                            });
                          } else if (res.cancel) {
                            console.log('用户不授权');
                          }
                        }
                      });
                    }
                  }
                });
              }
            }
          });
        }
      })
    },
    // 监控canvas错误函数
    canvasIdErrorCallback (e) {
      console.log(e);
    },
    // 保存本地
    savePoster () {
      this.htmlToCanvas()

      // this.authToSave()
    }
  }
}
</script>


<style lang="scss" scoped>
.poster_container {
  opacity: 0;
  display: block;
  position: fixed;
  z-index: -99;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transition: opacity .5s;

  .poster {
    background: url('https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/share_bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    width: 610rpx;
    height: 950rpx;
    top: 54%;
    left: 50%;
    transform: translate3d(-50%, -575rpx, 0);

    .poster_close {
      position: absolute;
      top: -3%;
      right: -6%;
      z-index: 9999999999999;
    }

    .poster_qrcode {
      position: absolute;
      left: 50%;
      bottom: 28%;
      transform: translateX(-50%);

      image {
        width: 300rpx;
      }
    }
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
}

.poster_container_active {
  opacity: 1;
  z-index: 99999999;
  background-color: rgba(0, 0, 0, .7);
}
</style>
