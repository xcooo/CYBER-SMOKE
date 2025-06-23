<template>
  <u-popup v-model="localShow" mode="bottom" border-radius="16" height="80%" closeable close-icon-pos="top-left">
    <view class="alipay">
      <!-- <view class="alipay-tutorial" @click="tutorialShow = true">支付宝充值教程</view> -->
      <view class="alipay-title">
        支付宝扫码支付
      </view>
      <view class="alipay-title alipay-price">
        ¥ <text class="alipay-price-text">{{ orderData.pay_money }}</text>
      </view>
      <view class="ali-item">
        <view>
          订单号
        </view>
        <view>
          {{ orderData.order_sn }}
        </view>
      </view>
      <view class="ali-item">
        <view>
          订单信息
        </view>
        <view>
          {{ orderData.title }}
        </view>
      </view>
      <view class="ali-qrcode">
        <!-- #ifdef H5 -->
        <uv-qrcode ref="qrcode" canvas-id="qrcode" :value="aliUrl" size="500rpx" :loading="isPaying" :options="options"
          :h5SaveIsDownload="true"></uv-qrcode>
        <!-- #endif -->
        <!-- #ifdef MP -->
        <canvas ref="uqrcode" canvas-id="wxcode" class="ali-qrcode-img" />
        <!-- #endif -->
      </view>
      <view class="ali-tip">保存或者截图,支付宝付款码,打开支付宝扫一扫</view>
      <view class="btn-wrap" @click="saveAliCode">
        <view class="btn">
          保存付款码/概率+10%
        </view>
      </view>
      <view class="ali-tip-2">本服务支付宝(杭州)信息技术有限公司提供</view>
    </view>
  </u-popup>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    orderData: {
      type: Object
    },
    isPaying: {
      type: Boolean,
      default: false
    },
    aliUrl: {
      type: String
    }
  },
  components: {

  },
  data () {
    return {
      localShow: this.show,
      options: {
        useDynamicSize: false,
        errorCorrectLevel: 'Q',
        margin: 10,
        areaColor: "#fff",
        // 指定二维码前景，一般可在中间放logo
        // foregroundImageSrc: require('static/web/logo.png')
      },
    }
  },
  watch: {
    show (val) {
      this.localShow = val
    },
    localShow (val) {
      this.$emit('update:show', val)
    }
  },
  computed: {
  },
  methods: {
    async saveAliCode () {
      // #ifdef H5
      this.$refs.qrcode.save({
        success: () => {
          console.log('生成成功');
        },
        fail: err => {
          console.log(err)
        }
      });
      // #endif
      // #ifdef MP
      setTimeout(() => {
        uni.canvasToTempFilePath(
          {
            canvasId: 'wxcode',
            width: '350',
            height: '350',
            success: res => {
              console.log(res);
              uni.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: res => {
                  console.log(res);
                },
                fail: err => {
                  console.log(err);
                }
              });
            },
            fail: err => {
              console.log(err);
            }
          },
          // this // 组件内使用必传当前实例
        );
      }, 300);
      // #endif
    },
  },
}
</script>

<style lang='scss' scoped>
.alipay {
  height: 100%;
  position: relative;
  padding-top: 80rpx;

  .alipay-tutorial {
    padding-top: 30rpx;
    padding-right: 20rpx;
    color: #4197ef;
    font-size: 18px;
    text-align: right;
    display: inline-block;
    position: absolute;
    right: 20rpx;
    top: 0;
  }

  .alipay-title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 10rpx;
    margin-top: 20rpx;
  }

  .alipay-price {
    font-size: 20px;
    margin-bottom: 40rpx;

    .alipay-price-text {
      font-size: 28px;
    }
  }

  .ali-item {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx;
    margin-bottom: 20rpx;
  }

  .ali-qrcode {
    margin-top: 20rpx;
    display: flex;
    justify-content: center;

    .ali-qrcode-img {
      width: 350px;
      height: 350px;
    }
  }

  .ali-tip {
    text-align: center;
    color: #999;
    margin: 20rpx 0;
    margin-bottom: 30rpx;
  }

  .btn-wrap {
    display: flex;
    justify-content: center;

    .btn {
      width: 90%;
      font-size: 16px;
      font-weight: 700;
      background: #3f95ee;
      color: #fff;
      padding: 20rpx 0;
      text-align: center;
      border-radius: 40rpx;
    }
  }

  .ali-tip-2 {
    text-align: center;
    color: #999;
    margin-top: 10rpx;
  }
}
</style>