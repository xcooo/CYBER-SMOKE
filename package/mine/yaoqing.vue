<template>
  <view>
    <u-navbar title="邀请有奖" back-icon-color="#fff" title-color="#fff"
      :background="{ backgroundColor: '#222333' }"></u-navbar>
    <view class="invite">
      <!-- <image class="bg"
				:src="mainbg"
				mode="widthFix"></image> -->
      <view class="invite-earnings">

        <view class="earnings-list">
          <image :src="userInfo.avatar" class="earnings-list-image"></image>
        </view>
        <view class="earnings-list">
          <view class="earnings-list-text">{{ userInfo.nickName }}</view>
          <view class="earnings-list-text">用户ID{{ userInfo.id }}</view>
          <view class="earnings-list-text">推广链接:</view>
          <view class="earnings-list-url">
            <view class="url-text">
              {{ userInfo.h5_share_url }}
            </view>
            <view class="copy-text" @click="copyUrl(userInfo.h5_share_url)">复制</view>
          </view>
        </view>
      </view>
      <view class="invite-step">
        <view class="self-user" v-if="userInfo.total_xjnum">
          <text>已邀请用户：{{ userInfo.total_xjnum.total_num }}人</text>
        </view>
        <view class="btn-ground-right" @click="$common.to({ url: 'share' })">立即邀请</view>

      </view>
      <view class="invite-info">
        <text class="info-title">我的推广</text>
        <view class="info-date" @click="openDate()">
          <uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" />
        </view>
      </view>
      <view class="invite-content">
        <uni-table ref="table" :loading="loading" border stripe emptyText="暂无更多数据">
          <uni-tr>
            <uni-th width="50rpx" align="center">日期</uni-th>
            <uni-th width="50rpx" align="center">人数</uni-th>
            <uni-th width="50rpx" align="center">消费金额</uni-th>
            <uni-th width="50rpx" align="center">充值金额</uni-th>
          </uni-tr>
          <uni-tr v-for="(item, index) in tableData" :key="index">
            <uni-td>{{ index }}</uni-td>
            <uni-td>{{ item.num }}</uni-td>
            <uni-td align="center">{{ item.money }}</uni-td>
            <uni-td align="center">{{ item.recharge_money }}</uni-td>
          </uni-tr>
        </uni-table>

      </view>
    </view>
    <!-- <view class="btn-ground"> -->
    <!-- <view class="btn-ground-left" @click="$common.to({ url: 'withdrawal' })">立即提现</view> -->
    <!-- #ifdef APP-PLUS || H5-->
    <!-- <view class="btn-ground-right" @click="sharePoster">立即邀请</view> -->
    <!-- #endif -->

    <!-- #ifdef MP-WEIXIN  -->
    <!-- <view class="btn-ground-right" @click="handleInvite">立即邀请</view> -->
    <!-- #endif -->
    <!-- </view> -->

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
    <PosterCanvas ref="childCanvas" @handleSuccess='canvasSuccess' :localPosterCover="localPosterCover"
      :shareUrl="codeShareUrl" />
  </view>
</template>

<script>
import {
  saveImageToPhotosAlbum
} from '@/uni_modules/sakura-canvas/js_sdk/utils/util'
import PosterCanvas from './components/PosterCanvas.vue'
export default {
  data () {
    return {
      tableData: [],
      loading: false,
      range: [],
      share_ma: '',
      url: '',
      share_bg: '',
      userInfo: null,
      show: false,
      showPoster: false,
      posterImage: '',
      codeShareUrl: '', // 小程序二维码
      appShareUrl: '', // app分享
      localPosterCover: '',
      h5LocalPosterCover: '',
      mainbg: '',
      sysConfig: '',
      userInfo: '',
      startTime: '',
      endTime: '',
    }
  },
  watch: {
    range (newval) {
      console.log('范围选:', this.range);
      this.startTime = this.range[0]
      this.endTime = this.range[1]
      this.getMyTeam()
    },
  },
  components: {
    PosterCanvas,
  },
  onLoad () {
    // this.$store.dispatch('getAppConfig').then((res) => {
    //   console.log(res);
    //   uni.getImageInfo({
    //     src: res.data.poster_bg,
    //     success: (image) => {
    //       this.localPosterCover = image.path;
    //     },
    //     fail (err) {
    //       console.log(err);
    //     }
    //   });
    // })
    this.getMyTeam()
  },
  onShow () {
    let userInfo = uni.getStorageSync('userInfo')
    if (!userInfo) {
      uni.navigateTo(
        {
          url: '/pages/mine/login'
        }
      )
    }
    this.$store.dispatch('getAppConfig').then((res) => {
      console.log(res);
      this.sysConfig = res.data;
      this.mainbg = res.data.share_bg
      uni.getImageInfo({
        src: res.data.poster_bg,
        success: (image) => {
          this.localPosterCover = image.path;
        },
      });
    })
    this.$store.dispatch('getUserInfo').then(res => {
      console.log(res)
      this.userInfo = res.data
      this.codeShareUrl = res.data.codeShareUrl
      this.share_ma = res.data.invite_code
      this.url = res.data.share_url
    })
  },
  methods: {
    // 复制
    copyUrl (e) {
      this.$copy({
        content: e,
        success (res) {
          uni.showToast({
            title: '推广链接已复制',
            icon: 'success'
          })
        }
      })
    },
    openDate () {
      this.timeShow = true
    },
    timeConfirm (e) {
      this.date = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`
      console.log(e);
    },
    timeCancel (e) {
      console.log(e);
    },
    getMyTeam () {
      this.req({
        url: '/v1/user/myteam',
        data: {
          start_time: this.startTime,
          end_time: this.endTime
        },
        success: res => {
          console.log(res)
          if (res.code == 200) {
            this.tableData = res.data
            // this.$common.toast({
            //   title: res.msg,
            //   icon: 'success',
            //   duration: 500,
            //   success: res => {
            //   }
            // })
          }
        }
      })
    },
    sharePoster () {
      this.show = false
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
      this.show = true
    },
    // 获取编辑图片
    // 复制链接
    copy () {
      if (this.url == "") {
        uni.showToast({
          title: '出错了',
          icon: 'none'
        })
        return
      }
      let dizhi = decodeURIComponent(this.url)
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
page {
  background-color: #222333;
}

.invite {
  width: 100%;
  position: relative;
  background-color: #fff;
  // background: url('https://www.img.xcooo.cn/uploads/2024/03/9b87da3b50474ff9.jpg') no-repeat;
  background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  background-size: 100% 100%;
  background: #222333;

  .bg {
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
  }

  &-earnings {
    width: 100%;
    left: 30rpx;
    box-sizing: border-box;
    top: 0;
    z-index: 9;
    display: flex;
  }

  ::v-deep .uni-table {
    background-color: #222333 !important;

    .uni-table-th {
      color: #fff;
    }

    .uni-table-tr {
      background-color: #222333 !important;
    }

    .uni-table-td {
      color: #fff;
    }
  }

  .earnings-list {
    // text-align: center;
    margin-top: 20rpx;
    margin-left: 30rpx;

    &-text {
      padding-top: 15rpx;
      font-size: 31rpx;
      color: #fff;
      font-weight: bold;
    }

    &-url {
      display: flex;

      .url-text {
        font-size: 16px;
        color: #fff;
        font-weight: 400;
        word-wrap: break-word;
      }

      .copy-text {
        padding: 0.5px 5px;
        background-color: #b778ce;
        color: #fff;
        border: 1px solid;
        border-radius: 10rpx;
        display: inline;
        flex-shrink: 0;
        margin: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    &-image {
      width: 150rpx;
      height: 150rpx;
      border-radius: 30rpx;
    }

  }

  .invite-step {

    // position: absolute;
    // box-sizing: border-box;
    // top: 0;
    margin: 40rpx 0;

    z-index: 9;
    // margin-top: 1620rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;

    image {
      width: 100%;
    }
  }

  .invite-info {
    border-top: 1rpx solid #ccc;
    padding-top: 10rpx;
    display: flex;

    width: 100%;
    height: 100rpx;
    justify-content: space-around;

    // align-items: center;
    .info-date {
      width: 550rpx;
      height: 20rpx;
    }

    .info-title {
      line-height: 70rpx;
      font-size: 32rpx;
      font-weight: bold;
      color: #fff;
    }

    .invite-content {
      width: 100%;

    }
  }

}

.btn-ground-right {
  background: #6f5bd6 !important;
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