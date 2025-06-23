<template>
  <view>
    <u-navbar title="邀请有奖"></u-navbar>
    <view class="invite">
      <image class="bg" :src="mainbg" mode="widthFix"></image>
      <view class="invite-earnings" v-if="userInfo">
        <view class="earnings-list">
          <view class="earnings-list-text">当前收益</view>
          <view class="earnings-list-price">{{ userInfo.gold }}<text>元</text></view>
          <view class="earnings-list-btn" @click="$common.to({ url: 'wallet' })">查看详情 <u-icon name="arrow-right"
              size="22"></u-icon>
          </view>
        </view>
        <view class="earnings-list">
          <view class="earnings-list-text">可提现收益</view>
          <view class="earnings-list-price">{{ userInfo.gold }}<text>元</text></view>
          <view class="earnings-list-btn" @click="$common.to({ url: 'withdrawal' })">查看详情 <u-icon name="arrow-right"
              size="22"></u-icon>
          </view>
        </view>
        <view class="earnings-list">
          <view class="earnings-list-text">已邀请</view>
          <view class="earnings-list-price" style="color: #000;">{{ userInfo.total_xjnum.total_num }}<text>人</text></view>
          <view class="earnings-list-btn" @click="$common.to({ url: 'myTeam' })">查看详情 <u-icon name="arrow-right"
              size="22"></u-icon>
          </view>
        </view>
      </view>
      <view class="invite-step">
        <image src="https://img.50api.cn/vx.tongbayun.v3/invite4.png" mode="widthFix"></image>
      </view>
    </view>
    <view class="btn-ground">
      <view class="btn-ground-left" @click="$common.to({ url: 'withdrawal' })">立即提现</view>
      <!-- #ifdef APP-PLUS || H5   -->
      <view class="btn-ground-right" @click="sharePoster">立即邀请</view>
      <!-- #endif -->

      <!-- #ifdef MP-WEIXIN  -->
      <view class="btn-ground-right" @click="handleInvite">立即邀请</view>
      <!-- #endif -->
    </view>

    <u-popup v-model="show" mode="bottom" border-radius="14">
      <view class="invite-model">
        <view class="invite-model-content">
          <view class="content-title">
            分享
          </view>
          <view class="content-img">
            <!-- #ifdef MP-WEIXIN -->
            <!-- 分享好友 -->
            <button class="share-btn" open-type="share">
              <image src="https://img.50api.cn/vx.tongbayun.v3/invite5.png" mode="" @click="onShareAppMessage"></image>
            </button>
            <!-- 分享海报 -->
            <image src="https://img.50api.cn/vx.tongbayun.v3/invite6.png" mode="" @click="sharePoster">
            </image>
            <image src="https://ddmh.hui-xiang.cn/static/invite6.png" mode="" @click="copy" v-if="userInfo.level == 1">
            </image>
            <!-- #endif -->
          </view>
        </view>
        <view class="invite-model-close" @click="show = false">取消</view>
      </view>
    </u-popup>


    <u-popup v-model="showPoster" mode="center" background="transparent">
      <view class="poster-box">
        <view class="img-box">
          <image :src="posterImage" mode="widthFix" style="width: 100%;"></image>
        </view>
        <view class="btn-share">
          <view class="button" @tap="saveImage">保存海报</view>
          <view class="button" @tap="showPoster = false">关闭海报</view>
        </view>

      </view>
    </u-popup>
    <!-- #ifdef H5 -->
    <PosterCanvas ref="childCanvas" @handleSuccess='canvasSuccess'
      :h5LocalPosterCover="h5LocalPosterCover" :h5Url="userInfo.h5_share_url" />
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <!-- <PosterCanvas ref="childCanvas" @handleSuccess='canvasSuccess' :localPosterCover="localPosterCover"
      :shareUrl="codeShareUrl" /> -->
      <!-- 生成海报 -->
		<Poster ref="poster"></Poster>
    <!-- #endif -->
  </view>
</template>

<script>
import {
  saveImageToPhotosAlbum
} from '@/uni_modules/sakura-canvas/js_sdk/utils/util'
import PosterCanvas from './components/PosterCanvas.vue'
import Poster from './components/Poster.vue'
export default {
  data () {
    return {
      share_ma: '',
      url: '',
      share_bg: '',
      userInfo: null,
      show: false,
      showPoster: false,
      posterImage: '',
      codeShareUrl: '', // 小程序二维码
      appShareUrl: '', // app分享
      localPosterCover: 'https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/share_bg.png',
      h5LocalPosterCover: '',
      mainbg: '',
      sysConfig: '',
      userInfo: '',
      qrCode: '', // 存储请求回来的base64图片路径
			realShow: false, // 控制poster显示隐藏
			cacheImage: '' // 存储canvas转换而来的图片
    }
  },
  components: {
    PosterCanvas,
    Poster
  },
  onLoad () {

  },
  onShow () {
    this.$store.dispatch('getAppConfig').then((res) => {
      console.log(res);
      this.sysConfig = res.data;
      this.mainbg = res.data.share_bg
      uni.getImageInfo({
        src: res.data.poster_bg,
        success: (image) => {
          this.h5LocalPosterCover = image.path
        },
      });
    })
    const _this = this
    this.$store.dispatch('getUserInfo').then(res => {
      console.log(res, 'userInfo')
      _this.userInfo = res.data
      _this.codeShareUrl = res.data.codeShareUrl
      _this.share_ma = res.data.invite_code
      _this.url = res.data.share_url
    })
  },
  methods: {
    sharePoster () {
      this.show = false
      // #ifdef H5
      // this.$refs.childCanvas.h5Url = 'https://laibinwlmh001.oss-cn-beijing.aliyuncs.com/aliyun/63e471006799bb78960663c0b8a32285.jpg'
      // #endif
      this.$refs.childCanvas.drawPoster().then(() => {
        uni.hideLoading()
      })
    },
    canvasSuccess (param) {
      const {
        showPoster,
        posterImage
      } = param
      this.showPoster = showPoster
      this.posterImage = posterImage
      console.log(param)
    },
    async saveImage () {
      // #ifdef H5
      uni.showToast({
        title: 'H5不支持API保存图片,请使用长按保存!!!',
        icon: 'none'
      })
      return
      // #endif
      const res = await saveImageToPhotosAlbum(this.posterImage)
      if (!res.success) {
        uni.showToast({
          title: '保存图片失败!!!',
          icon: 'none'
        })
        return
      }
      this.showPoster = false
    },
    handleInvite () {
      this.$refs.poster.show(this.share_ma);
      // this.show = true

      // this.$refs.childCanvas.drawPoster().then(() => {
      // 	uni.hideLoading()
      // })
      // this.req({
      //   url: '/v1/share/getMiniQrcode',
      //   data: { invite_code: this.share_ma },
      //   success: res => {
      //     console.log(res)
      //     if(res.code == 200) {
      //       this.qrCode = res.data
      //     }
      //     this.realShow = true
      //   }
      // })
    },
    // 获取编辑图片
    // 复制链接
    copy () {
      if (this.url == "") {
        this.$tip.tip("出错了，请稍后再试")
        return
      }
      let dizhi = decodeURIComponent(this.url + '/#/?invite_code=' + this.share_ma)
      uni.setClipboardData({
        data: dizhi,
        success: () => {

        }
      });

    },
    // 获取小程序二维码
    onShareAppMessage (res) {
      if (res.from === 'button') { // 来自页面内分享按钮
        console.log(res.target)
      }
      return {
        title: '邀请好友得豪礼',
        path: '/pages/box/box?invite_code=' + this.share_ma
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.invite {
  width: 100%;
  position: relative;

  .bg {
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
  }

  &-earnings {
    position: absolute;
    width: 690rpx;
    height: 200rpx;
    left: 30rpx;
    box-sizing: border-box;
    // background-color: red;
    top: 0;
    z-index: 9;
    margin-top: 1250rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .earnings-list {
    text-align: center;

    &-text {
      font-size: 22rpx;
      color: #888;
    }

    &-price {
      color: #FE7D57;
      font-size: 36rpx;
      font-weight: bold;
      margin-top: 20rpx;

      text {
        font-size: 26rpx;
        margin-left: 6rpx;
        font-weight: normal;
      }
    }

    &-btn {
      color: #FE7D57;
      font-size: 22rpx;
      margin-top: 30rpx;
      width: 140rpx;
      height: 40rpx;
      line-height: 40rpx;
      text-align: center;
      background-color: rgba(255, 160, 122, .4);
      border-radius: 20rpx;
    }

  }

  .invite-step {
    position: absolute;
    width: 690rpx;
    height: 200rpx;
    left: 30rpx;
    box-sizing: border-box;
    top: 0;
    z-index: 9;
    margin-top: 1620rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;

    image {
      width: 100%;
    }
  }

}

.btn-ground {
  height: calc(100rpx + constant(safe-area-inset-bottom));
  height: calc(100rpx + env(safe-area-inset-bottom));
  width: 690rpx;
  position: fixed;
  bottom: 0;
  z-index: 10;
  left: 30rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-left,
  &-right {
    width: 330rpx;
    height: 100rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 34rpx;
    font-weight: bold;
  }

  &-left {
    background: rgb(247, 205, 186);
    background: linear-gradient(0deg, rgba(247, 205, 186, 1) 0%, rgba(253, 248, 241, 1) 100%);
    border-radius: 10px;
    color: #FE7D57;
  }

  &-right {
    background: rgb(225, 155, 110);
    background: linear-gradient(0deg, rgba(225, 155, 110, 1) 0%, rgba(242, 117, 71, 1) 100%);
    border-radius: 10px;
    color: #fff;
  }
}

.invite-model {
  height: 500rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  .invite-model-content {
    height: 380rpx;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
  }

  .invite-model-close {
    text-align: center;
    height: 100rpx;
    width: 100%;

  }

  .content-title {
    background: rgb(225, 155, 110);
    background: linear-gradient(0deg, rgba(225, 155, 110, 1) 0%, rgba(242, 117, 71, 1) 100%);
    border-radius: 10px;
    width: 200rpx;
    height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-top: 30rpx;
  }

  .content-img {
    width: 690rpx;
    display: flex;
    justify-content: space-around;
    margin-top: 50rpx;

    image {
      width: 200rpx;
      height: 200rpx;
    }
  }
}

.poster-box {
  width: 600rpx;

  .btn-share {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 20rpx 80rpx;

    .button {
      background: #845EC2;
      padding: 0 30rpx;
      height: 70rpx;
      font-size: 26rpx;
      color: #fff;
      border-radius: 30rpx;
      text-align: center;
      line-height: 70rpx;
    }
  }
}

.share-btn {
  background-color: #fff;
  margin: 0;
  padding: 0;
}

.share-btn::after {
  border: none;
}

.img-box {
  width: 600rpx;
  overflow: hidden;
}
</style>
