<template>
  <view class="roomDetail">
    <view class="nav">
      <uni-nav-bar color="#fff" leftIcon="left" backgroundColor="transparent" :border="false" :statusBar="true"
        :fixed="true" :title="roomInfo.title">
        <view slot="left" class="nav-left" @click="back">
          <image class="" src="../../static/home/arrow.png" mode="widthFix" lazy-load="false" binderror="" bindload="" />
        </view>
        <view slot="right" class="nav-right" @click="rule">
          规则
        </view>
      </uni-nav-bar>
    </view>

    <view class="banner">
      <swiper class="swiper" easing-function="linear" circular :current="currentBanner" :indicator-dots="false"
        :autoplay="false" :interval="100" :duration="1000" @change="handleSwiperChange">
        <swiper-item v-for="(item, index) in awardList" :key="item.id">
          <view class="swiper-item">
            <image class="gd-img" :src="item.thumb" mode="widthFix" lazy-load="false" binderror="" bindload="" />
          </view>
        </swiper-item>
      </swiper>
      <!-- <view class="free-play" @click="tryPlay">
        <view class="free-play-bg">
          <image class="" src="../../static/home/11.png" mode="widthFix" lazy-load="false" binderror="" bindload="" />
        </view>
        <view class="free-play-img">
          <image class="" src="../../static/home/12.png" mode="widthFix" lazy-load="false" binderror="" bindload="" />
        </view>
      </view> -->
    </view>

    <swiper class="swiper swiper2" easing-function="linear" circular :current="currentBanner" :indicator-dots="false"
      :autoplay="false" :interval="100" :duration="1000" @change="handleSwiperChange">
      <swiper-item v-for="(item, index) in awardList" :key="item.id">
        <view class="swiper-item">
          <view class="gd-info">
            <view class="gd-title">{{ item.title }}</view>
            <view class="gd-price">奖品价值 <text>￥{{ item.price }}</text></view>
          </view>
        </view>
      </swiper-item>
    </swiper>

    <view class="gd-desc">抽赏存在概率性, 请谨慎购买 <text @click="goRule">发货须知</text></view>

    <view class="shop-list">
      <view class="shop-list-rate">
        <view class="shop-list-left">
          每轮拳赛必有一人成为拳王
        </view>
        <view class="recode-btn" @click="zs">开赏记录</view>
      </view>

      <view class="room-desc">奖品预览 <text>抽中后在以下奖品中随机获得一件</text></view>

      <view class="list-rate">
        <view class="recode-btn">拳王宝箱</view>
        <view class="list" v-for="(item, index) in highMarkList" :key="index">
          <image class="" :src="item.icon" mode="widthFix" lazy-load="false" binderror="" bindload="" />
          <view class="list-text" :class="['ratebg' + index]">
            {{ item.rate }}%
          </view>
        </view>
      </view>
      <scroll-view class="" :scroll-x="true">
        <view class="mh-goods-list">
          <view class="mh-goods-list-item" v-for="(item, index) in highBoxList" :key="index">
            <view class="mh-goods-img-wrap" :style="{ backgroundImage: `url(${item.image})` }"
              @click="openDetailPop(item)">

              <image class="mh-goods-img" :src="item.thumb" lazy-load="false" binderror="" bindload="" />

              <image class="mh-goods-rate" :src="item.mark_icon" mode="widthFix" lazy-load="false" binderror=""
                bindload="" />
            </view>
            <view class="mh-goods-price">拳王宝箱</view>
            <view class="mh-goods-price">售价:￥{{ item.price }}</view>
          </view>
        </view>
      </scroll-view>

      <view class="list-rate">
        <view class="recode-btn">拳手宝箱</view>
        <view class="list" v-for="(item, index) in lowerMarkList" :key="index">
          <image class="" :src="item.icon" mode="widthFix" lazy-load="false" binderror="" bindload="" />
          <view class="list-text" :class="['ratebg' + index]">
            {{ item.rate }}%
          </view>
        </view>
      </view>
      <scroll-view class="" :scroll-x="true">
        <view class="mh-goods-list">
          <view class="mh-goods-list-item" v-for="(item, index) in lowerBoxList" :key="index">
            <view class="mh-goods-img-wrap" :style="{ backgroundImage: `url(${item.image})` }"
              @click="openDetailPop(item)">

              <image class="mh-goods-img" :src="item.thumb" lazy-load="false" binderror="" bindload="" />

              <image class="mh-goods-rate" :src="item.mark_icon" mode="widthFix" lazy-load="false" binderror=""
                bindload="" />
            </view>
            <view class="mh-goods-price">拳手宝箱</view>
            <view class="mh-goods-price">售价:￥{{ item.price }}</view>
          </view>
        </view>
      </scroll-view>

      <view class="yaoqing-wrap">
        <view class="yaoqing-desc">车位<text>{{ roomInfo.isAddNum?roomInfo.isAddNum:0 }}</text>/{{ roomInfo.num?roomInfo.num:0 }}人</view>
        <view class="yaoqing-list">
          <view class="yaoqing-item" v-for="(item, index) in roomInfo.players">
            <view class="yaoqing-img">
              <image :src="item.avatar" mode="widthFix" lazy-load="false" binderror="" bindload="" />
            </view>
            <view class="yaoqing-text" :class="[item.id ? 'yaoqing-orange' : '']">{{ item.desc }}</view>
          </view>
        </view>

        <view class="yaoqing-btn">
          <view class="btn" @click="copyUrl" v-if="roomInfo.is_full != 1">
            立即邀好友
          </view>
        </view>
      </view>
    </view>

    <view class="shangche">
      <template v-if="roomInfo.is_full == 0">
        <view class="che-btn" @click="shangche">我要上车</view>
      </template>
      <template v-else>
        <!-- 如果房间已满 -->
        <!-- 1.判断用户是否是拳王或者拳手 -->
        <!-- 2.判断用户是否已经领过奖品了 -->
        <template v-if="roomStatus == 1">
          <template v-if="!existingOrder">
            <view class="shangche-box-img" @click="openBox">
              <image class="" src="../../static/home/win.png" mode="widthFix" lazy-load="false" binderror=""
                bindload="" />
            </view>
            <view class="shangche-box-text">恭喜获得拳王宝箱</view>
          </template>
          <view class="che-btn btn-complate">{{ roomStatusText }}</view>
        </template>
        <template v-if="roomStatus == 2">
          <template v-if="!existingOrder">
            <view class="shangche-box-img" @click="openBox">
              <image class="" src="../../static/home/loser.png" mode="widthFix" lazy-load="false" binderror=""
                bindload="" />
            </view>
            <view class="shangche-box-text">恭喜获得拳手宝箱</view>
          </template>
          <view class="che-btn btn-complate">{{ roomStatusText }}</view>
        </template>

      </template>

    </view>

    <u-popup v-model="showOrder" mode="bottom" border-radius="16" height="30%" closeable>
      <view class="order">
        <view class="order-title">加入车队</view>
        <view class="order-pay">
          <view class="order-type">
          余额抵扣
          </view>
          <view class="order-price">
            -￥{{ room_price }}<text style="margin-left:5px">(余额:{{ money }})</text>
          </view>
        </view>
        <view class="order-btn">
          <view class="order-submit" @click="submitPay">立即上车</view>
        </view>
      </view>
    </u-popup>

    <u-popup v-model="show" mode="bottom" border-radius="16" height="70%" closeable>
      <view class="zs-wrap">
        <view class="zs-title">拳王PK结果</view>
        <template v-if="roomInfo.is_full == 1">
          <view class="zs-item">
            <view class="zs-info">
              <image class="zs-img" src="../../static/home/win.png" mode="widthFix" lazy-load="false" binderror=""
                bindload="" />
              <view>拳王得主</view>
            </view>
            <view class="prize-info">
              <view class="user-name">
                {{ win_user.nickName }}
              </view>
              <view class="get">
                获得了
              </view>
              <view class="prize-name">
                拳王宝箱
              </view>
              <view class="award-log-right" @click="lookAward(0)">
                <image class="prize-img" src="../../static/home/win.png" mode="widthFix" lazy-load="false" binderror=""
                  bindload="" />
              </view>
            </view>
          </view>

          <view class="zs-item" v-for="(item, index) in loserList">
            <view class="zs-info">
              <image class="zs-img" src="../../static/home/loser.png" mode="widthFix" lazy-load="false" binderror=""
                bindload="" />
              <view>普通宝箱得主</view>
            </view>
            <view class="prize-info">
              <view class="user-name">
                {{ item.user.nickName }}
              </view>
              <view class="get">
                获得了
              </view>
              <view class="prize-name">
                <!-- {{ item.award.title }} -->
                普通宝箱
              </view>
              <view class="award-log-right" @click="lookAward(1)">
                <image class="prize-img" src="../../static/home/loser.png" mode="widthFix" lazy-load="false" binderror=""
                  bindload="" />
              </view>
            </view>
          </view>
        </template>
        <template v-else>
          <view class="run"><u-loading size="60" mode="flower"></u-loading><text class="run-text">正在组队中...</text></view>

          <view class="run-desc">加入当前房间, 获取超值大奖</view>
        </template>
      </view>
    </u-popup>

    <u-popup v-model="showRes" mode="bottom" border-radius="16" height="70%" closeable>
      <view class="res-wrap">
        <view class="res-title">赏池中奖概率</view>
        <view class="list-rate">
          <view class="list" v-for="(item, index) in boxList" :key="index">
            <image @click="lookAward(index)" class="" :src="item.icon" mode="widthFix" lazy-load="false" binderror=""
              bindload="" />

            <view class="list-name">
              {{ item.name }}
            </view>
            <view class="list-text" :class="['ratebg' + index]">
              <template v-if="index == 0">
                概率: {{ roomInfo.num == 2 ? '50%' : '20%' }}
              </template>
              <template v-else>
                概率:{{ roomInfo.num == 2 ? '50%' : '80%' }}
              </template>
            </view>
          </view>

        </view>
        <view class="res-btn">
          <view class="btn" @click="openBox" v-if="roomStatus == 0">{{ roomStatusText }}</view>
          <view class="btn btn-complate" v-else-if="roomStatus == 1">{{ roomStatusText }}</view>
          <view class="btn btn-complate" v-else-if="roomStatus == 2">{{ roomStatusText }}</view>
        </view>
      </view>
    </u-popup>

    <!-- 奖品弹窗 -->
    <u-popup v-model="showAward" mode="bottom" border-radius="16" height="70%" closeable>
      <view class="award-wrap">
        <view class="award-title">{{ awardTitle }}</view>
        <view class="card_wrap">
          <view class="c_item" v-for="(item, index) in boxAwardList" :key="index">
            <view class="mh-goods-img-wrap" :style="{ backgroundImage: `url(${item.image})` }">
              <image class="mh-goods-img" :src="item.thumb" lazy-load="false" binderror="" bindload="" />

              <image class="mh-goods-rate" :src="item.mark_icon" mode="widthFix" lazy-load="false" binderror=""
                bindload="" />
            </view>
            <view class="goods-title">{{ item.title }}</view>
            <view class="goods-price">售价:￥{{ item.price }} </view>
          </view>
        </view>
      </view>
    </u-popup>

    <!-- 登录弹窗 -->
    <uni-popup ref="loginPopup" type="center">
      <view class="tiploginShow-view">
        <view class="tiploginShow-view-0">
          您还未登录
        </view>
        <view class="tiploginShow-view-1">
          请登录以后再进行此操作~
        </view>
        <view class="tiploginShow-view-2" @click="$common.to({ url: '/pages/mine/login' })">
          前往登录
        </view>
        <view class="tiploginShow-view-3" @click="$refs.loginPopup.close()">
          暂不登录
        </view>

      </view>
    </uni-popup>

    <u-popup v-model="showRule" mode="center" width="80%" border-radius="20">
      <view class="rule-wrap">
        <view class="rule-title">规则说明</view>
        <view class="rule-content" v-html="room_rule">
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
const switchMp3 = 'https://www.img.xcooo.cn/uploads/2024/02/17887756404cea30.mp3'
const switchMusic = uni.createInnerAudioContext();
export default {
  name: 'roomlist',
  components: {

  },
  data () {
    return {
      room_id: '',
      box_id: '',
      currentBanner: 0,
      boxInfo: {},
      markList: [

      ],
      boxList: [
        {
          icon: '../../static/home/win.png',
          name: '车神宝箱'
        },
        {
          icon: '../../static/home/loser.png',
          name: '普通宝箱'
        },
      ],
      awardList: [],
      show: false,
      roomInfo: {
      },
      room_price: 0,
      money: 0,
      showOrder: false,
      win_user: {},
      high_award: {},
      loserList: {},
      is_full: 0,
      userInfo: '',
      invite_code: '',
      showRes: false,
      showAward: false,
      awardTitle: '',
      boxAwardList: [],
      // 开启宝箱
      roomStatus: 0,
      roomStatusText: '',
      existingOrder: false,
      // 拳王宝箱
      highBoxList: [],
      // 普通宝箱
      lowerBoxList: [],
      showRule: false,
      room_rule: '',
      highMarkList: [],
      lowerMarkList: []
    }
  },
  computed: {
  },
  onLoad (options) {
    switchMusic.src = switchMp3
  },
  onShow () {
    let pages = getCurrentPages();
    // 数组中索引最大的页面--当前页面
    let currentPage = pages[pages.length - 1];
    // 打印出当前页面中的 options
    let options = currentPage.options
    this.room_id = options.room_id
    this.box_id = options.box_id
    this.is_full = options.is_full

    let invite_code = options.invite_code
    if (invite_code) {
      uni.setStorageSync('invite_code', invite_code);
    }
    this.getData()
    this.init()

  },
  methods: {
    rule () {
      this.showRule = true
    },
    openBox () {
      this.req({
        url: '/v1/room/openBox',
        data: {
          room_id: this.room_id,
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.$common.to({
              type: 1,
              url: '/pages/index/draw',
              query: {
                id: this.box_id,
                order_sn: res.data.order_sn,
                drawNum: 1,
                car_type: res.data.car_type
              }
            })

          } else {
            this.$common.toast({
              title: res.msg
            })
          }
        }
      })
    },
    lookAward (index) {
      this.showAward = true
      let car_type = 1
      switch (index) {
        case 0:
          this.awardTitle = '拳王宝箱奖品概览'
          car_type = 1
          break
        case 1:
          this.awardTitle = '普通宝箱奖品概览'
          car_type = 2
          break
      }
      this.req({
        url: '/v1/room/getAwardList',
        data: {
          box_id: this.box_id,
          car_type: car_type
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.boxAwardList = res.data.map(item => {
              if (item.mark_id == 33) {
                item.image = '../../static/home/grade1.png'
              } else if (item.mark_id == 34) {
                item.image = '../../static/home/grade2.png'
              }
              else if (item.mark_id == 35) {
                item.image = '../../static/home/grade3.png'
              } else if (item.mark_id == 36) {
                item.image = '../../static/home/grade4.png'
              }
              return item
            })
          }
        }
      })
    },
    copyUrl () {
      if (!this.userInfo) {
        this.$refs.loginPopup.open('center')
        return
      }
      let invite_code = this.userInfo.invite_code
      let baseURL = window.location.protocol + "//" + window.location.host
      let url = baseURL + '/#/pages/box/roomDetail?room_id=' + this.room_id + '&box_id=' + this.box_id + '&is_full=' + this.is_full + '&invite_code=' + invite_code
      this.$copy({
        content: url,
        success (res) {
          uni.showToast({
            title: '分享链接已复制',
            icon: 'success'
          })
        }
      })
    },
    getRoomInfo () {
      this.req({
        url: '/v1/room/data',
        data: {
          room_id: this.room_id
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.roomInfo = res.data
            if (this.roomInfo.is_full == 1) {
              if (this.userInfo.id) {
                // 判断房间状态
                this.checkRoomStatus()
                // 获取奖品
                this.getPrize()
              }
            }
          }
        }
      })
    },
    checkRoomStatus () {
      this.req({
        url: '/v1/room/checkRoomStatus',
        data: {
          room_id: this.room_id,
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.roomStatus = res.data.room_status
            this.roomStatusText = res.data.room_status_text
            this.existingOrder = res.data.existingOrder
          } else {
            this.$common.toast({
              title: res.msg
            })
          }
        }
      })
    },
    getPrize () {
      this.req({
        url: '/v1/room/getPrize',
        data: {
          room_id: this.room_id
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.win_user = res.data.win_user
            this.high_award = res.data.high_award
            this.loserList = res.data.loserList
          }
        }
      })
    },
    init () {
      this.$store.dispatch('getUserInfo').then(res => {
        this.money = res.data.money
        this.userInfo = res.data
        this.getRoomInfo()
      })
      this.$store.dispatch('getAppConfig').then((res) => {
        console.log(res);
        this.room_price = res.data.room_price
        this.room_rule = res.data.room_rule
      })
    },
    shangche () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      console.log(this.userInfo)
      if (!this.userInfo) {
        this.$refs.loginPopup.open('center')
        return
      }
      this.showOrder = true
    },
    submitPay () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      let data = {
        room_id: this.room_id,
      }
      this.req({
        url: '/v1/room/addRoom',
        data,
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.$common.toast({
              title: res.msg
            })
            this.showOrder = false
            this.showRes = false
            this.getRoomInfo()
          } else {
            this.$common.toast({
              title: res.msg
            })
          }
        }
      })
    },
    zs () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.show = true
    },
    getData () {
      return new Promise((resolve, reject) => {
        this.req({
          url: '/v1/box/info',
          data: {
            id: this.box_id
          },
          Loading: true,
          success: res => {
            if (res.code == 200) {
              this.boxInfo = res.data.box
              this.awardList = res.data.awardList.map(item => {
                if (item.mark_id == 33) {
                  item.image = '../../static/home/grade1.png'
                } else if (item.mark_id == 34) {
                  item.image = '../../static/home/grade2.png'
                }
                else if (item.mark_id == 35) {
                  item.image = '../../static/home/grade3.png'
                } else if (item.mark_id == 36) {
                  item.image = '../../static/home/grade4.png'
                }
                return item
              })

              this.highBoxList = this.awardList.filter(item => {
                return item.car_type == 1
              })

              this.lowerBoxList = this.awardList.filter(item => {
                return item.car_type == 2
              })

              this.markList = res.data.box ? res.data.box.markList : []
              this.highMarkList = res.data.box ? res.data.box.highMarkList : []
              this.lowerMarkList = res.data.box ? res.data.box.lowerMarkList : []
              resolve()
            }
          }
        })
      })
    },
    handleSwiperChange (event) {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      const current = event.detail.current;
      this.currentBanner = current;
    },
    goRule () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.$common.to({ url: '/pages/index/rule?id=3' })
    },
    back () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.$common.to({
        url: '/pages/box/roomlist'
      })
    },
  },
}
</script>

<style lang='scss' scoped>
.roomDetail {
  background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  background-size: 100vw 100%;
  background-repeat: no-repeat;
  min-height: calc(100vh - 50px);

  .nav {
    ::v-deep .uni-navbar__header {
      padding: 0;
    }

    ::v-deep .uni-nav-bar-text {
      font-size: 30px;
      font-family: xcooo;
    }

    .nav-left {
      image {
        width: 70px;
      }
    }

    .nav-right {
      font-size: 16px;
      margin-right: 40rpx;
    }
  }


  .banner {
    margin-top: 100rpx;
    height: 17.71875rem;
    background: url(https://oyfiles.oss-cn-shanghai.aliyuncs.com/ouya-v2/blindBox/headerBg2.png) no-repeat 50% 0%/50rem auto;

    position: relative;

    .free-play {
      width: 62px;
      height: 62px;
      position: absolute;
      right: 26px;
      bottom: 0;
      z-index: 2;

      .free-play-bg {
        width: 62px;
        height: 62px;
        -webkit-animation: xuanzhuan 3s linear infinite;
        animation: xuanzhuan 3s linear infinite;

        image {
          width: 100%;
          height: 100%;
        }

        @keyframes xuanzhuan {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }

          25% {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
          }

          50% {
            -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
          }

          75% {
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg);
          }

          100% {
            -webkit-transform: rotate(1turn);
            transform: rotate(1turn);
          }
        }

      }

      .free-play-img {
        width: 41px;
        height: 41px;
        position: relative;
        top: -46px;
        left: 10px;

        image {
          width: 100%;
          height: 100%;
        }

      }
    }

  }

  .swiper {
    width: 100%;
    height: 100%;
    position: relative;

    .swiper-item {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;

      .gd-img {
        width: 197px;
        height: 197px;
        -webkit-animation: bLine 3s linear infinite;
        animation: bLine 3s linear infinite;

        image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }



      @keyframes bLine {
        0% {
          transform: translateY(0);
        }

        50% {
          -webkit-transform: translateY(10px);
          transform: translateY(10px);
        }

        100% {
          -webkit-transform: translateY(0);
          transform: translateY(0);
        }
      }
    }
  }

  .swiper2 {
    height: 100rpx;

    .gd-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .gd-title {
        color: #3cbcc1;
        margin-bottom: 20rpx;
        text-align: center;
      }

      .gd-price {
        color: #fff;
        text-align: center;

        text {
          color: yellow;
        }
      }
    }
  }

  .gd-desc {
    margin-top: 20rpx;
    text-align: center;
    color: #9d9db8;

    text {
      margin-left: 20rpx;
      color: #3cbcc1;
    }
  }

  .room-desc {
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    margin-top: 30rpx;
    margin-bottom: 20rpx;

    text {
      font-size: 16px;
      font-weight: 400;
      margin-left: 20rpx;
    }

  }

  .shop-list {
    box-sizing: border-box;
    overflow: hidden;
    margin: 30rpx 20rpx;
    padding-bottom: 200rpx;


    .shop-list-rate {
      // background-color: rgba(166, 171, 191, .2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10rpx 10rpx;
      border: 2rpx solid #3cbcc1;

      .recode-btn {
        color: #fff;
        font-size: 14px;
        padding: 10rpx 8rpx;
        background-image: linear-gradient(180deg, #6a4dff, #0dd9ff);
      }

      .shop-list-left {
        color: #fff;
        margin-left: 15rpx;
        flex: 1;
      }

    }

    .mh-goods-list {
      padding: 20rpx 0;
      display: flex;
      // flex-wrap: wrap;
      justify-content: flex-start;

      .mh-goods-list-item {
        position: relative;
        flex: 1;
        // background-color: rgba(0, 0, 0, .2);
        width: calc((100% - 20px) / 3);
        max-width: calc((100% - 20px) / 3);
        text-align: center;
        margin-right: 15px;
        margin-bottom: 10px;

        .mh-goods-img-wrap {
          background-size: 100% 100%;
          padding: 30rpx 3px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          color: #fff;
        }

        // &:nth-child(3n) {
        //   margin-right: 0;
        // }

        .mh-goods-rate {
          width: 62px;
          height: 62px;
          position: absolute;
          top: 1px;
          left: 1px;
          z-index: 9;
        }

        .mh-goods-img {
          width: 93px;
          height: 93px;
        }

        .mh-goods-name {
          color: #fff;
          width: 100%;
          font-size: 12px;
          margin-top: 7px;
          display: -webkit-box;
          text-align: left;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }


      }

      .mh-goods-price {
        font-size: 12px;
        font-weight: 700;
        color: #fff;
        margin-top: 5px;
        width: 100%;
        text-align: center;

        text {
          color: #a2c2bd;
          font-size: 9px;
        }
      }
    }
  }

  .list-rate {
    height: 78px;
    // background-color: rgba(166, 171, 191, .2);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10rpx 10rpx;
    border: 2rpx solid #3cbcc1;

    .recode-btn {
      color: #fff;
      font-size: 14px;
      padding: 10rpx 8rpx;
      background-image: linear-gradient(180deg, #6a4dff, #0dd9ff);
      margin-right: 20rpx;
    }


    .list {
      text-align: center;
      color: #fff;
      width: 17%;
      margin-right: 20rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      // text-align: center;

      image {
        width: 77px;
      }

      .list-text {
        padding: 4rpx 10rpx;
        margin-top: 2px;
        font-size: 14px;
        border-radius: 3px;
      }

      .ratebg0 {
        background-image: linear-gradient(270deg, brown, #d2691e);
      }

      .ratebg1 {
        background-image: linear-gradient(270deg, #9400d3, #8a2be2);
      }

      .ratebg2 {
        background-image: linear-gradient(270deg, #ee7600, #ee9a00);
      }

      .ratebg3 {
        background-image: linear-gradient(270deg, #00eea7, #00beee);
      }
    }
  }

  .yaoqing-wrap {
    border: 2rpx solid #3cbcc1;
    padding: 20rpx 20rpx;

    .yaoqing-desc {
      color: #fff;
      font-size: 16px;
      margin-bottom: 40rpx;

      text {
        margin-left: 20rpx;
        color: orange;
      }
    }

    .yaoqing-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      width: 100%;

      .yaoqing-item {
        color: #fff;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        margin: 0 5px 15px 0; // 间隙为5px
        width: calc((100% - 20px) / 5); // 这里的20px = (分布个数5-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
        min-width: calc((100% - 20px) / 5); // 加入这两个后每个item的宽度就生效了
        max-width: calc((100% - 20px) / 5); // 加入这两个后每个item的宽度就生效了


        &:nth-child(5n) {
          margin-right: 0;
        }

        .yaoqing-img {
          display: flex;
          justify-content: center;

          image {
            width: 80rpx;
            border-radius: 50%;
          }
        }

        .yaoqing-text {
          margin-top: 10rpx;
          text-align: center;
        }

        .yaoqing-orange {
          color: orange;
        }

      }
    }

    .yaoqing-btn {
      display: flex;
      justify-content: center;

      .btn {
        width: 300rpx;
        background: linear-gradient(270deg, #fccf4c, #705cff, #25b6b6);
        border-radius: 40rpx;
        padding: 20rpx 40rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
    }
  }


  .shangche {
    position: fixed;
    bottom: 100rpx;
    width: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;

    .shangche-box-img {
      width: 400rpx;

      image {
        width: 100%;
      }
    }

    .shangche-box-text {
      color: orange;
      font-size: 20px;
      font-weight: 700;
      margin: 20rpx 0;
    }

    .che-btn {
      background: linear-gradient(270deg, #039aff, #705cff, #af38ff);
      width: 80%;
      color: #fff;
      padding: 20rpx 40rpx;
      text-align: center;
      font-size: 20px;
      border-radius: 40rpx;
    }


  }

  .btn-complate {
    background: orange !important;
  }

  .zs-wrap {
    padding-bottom: 40rpx;
    background-color: #222333;
    min-height: 100%;
    padding: 40rpx;

    .run {
      text-align: center;
      color: #fff;
      font-size: 24px;
      font-weight: 700;
      margin-top: 200rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      .run-text {
        margin-left: 20rpx;
      }


    }

    .run-desc {
      text-align: center;
      color: #fff;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 100rpx
    }

    .zs-title {
      color: #fff;
      font-size: 24px;
      font-weight: 700;
      font-family: xcooo;
      text-align: center;
      margin-bottom: 40rpx;
    }

    .zs-item {
      color: #fff;
      margin-bottom: 100rpx;

      .zs-info {
        display: flex;
        align-items: center;

        .zs-img {
          width: 100rpx;
          margin-right: 20rpx;
        }
      }

      .prize-info {
        margin-top: 20rpx;
        display: flex;
        align-items: center;
        border: 4rpx solid;
        border-image: linear-gradient(270deg, #039aff, #705cff, #af38ff) 2 2;
        padding: 10rpx 20rpx;

        .user-name {
          max-width: 150rpx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .get {
          margin: 0 20rpx;
          flex-shrink: 0;
        }

        .prize-name {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex: 1;
          width: 95%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .award-log-right {
          .prize-img {
            width: 100rpx;
            margin-left: 20rpx;
          }
        }


      }
    }
  }

  .order {
    background-color: #222333;
    min-height: 100%;
    padding: 0 30rpx;
    padding-bottom: 40rpx;

    .order-title {
      color: #fff;
      font-size: 24px;
      text-align: center;
      font-family: xcooo;
      padding: 30rpx 0;
    }

    .order-pay {
      display: flex;
      justify-content: space-between;
      color: #fff;
      margin: 40rpx 0;
      font-size: 18px;
    }

    .order-btn {
      display: flex;
      justify-content: center;
    }

    .order-price {
      color: orange;

    }

    .order-submit {
      width: 100%;
      background: linear-gradient(270deg, #039aff, #705cff, #af38ff);
      border-radius: 40rpx;
      padding: 20rpx 40rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }


  }

}

.tiploginShow-view {
  width: 260px;
  background-color: #fff;
  border-radius: 15px;
  padding: 15px;
  box-sizing: border-box;

  .tiploginShow-view-0 {
    text-align: center;
    font-size: 16px;
    color: #131313;
  }

  .tiploginShow-view-1 {
    text-align: center;
    font-size: 12px;
    margin-top: 10px;
    color: #2c2c2c;
  }

  .tiploginShow-view-2 {
    width: 208px;
    height: 41px;
    background-color: #0079fe;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto 10px;
  }

  .tiploginShow-view-3 {
    text-align: center;

  }
}

.res-wrap {
  padding-bottom: 40rpx;
  background-color: #222333;
  min-height: 100%;
  padding: 40rpx;

  .res-title {
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    font-family: xcooo;
    text-align: center;
    margin-bottom: 40rpx;
  }

  .list-rate {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .list {
      text-align: center;
      color: #fff;
      margin-right: 40rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      image {
        width: 200rpx;
      }

      .list-text {
        padding: 4rpx 10rpx;
        margin-top: 2px;
        font-size: 14px;
        border-radius: 3px;

      }

      .list-name {
        margin: 20rpx 0;
      }

      .ratebg0 {
        background-image: linear-gradient(270deg, brown, #d2691e);
      }

      .ratebg1 {
        background-image: linear-gradient(270deg, #9400d3, #8a2be2);
      }

      .ratebg2 {
        background-image: linear-gradient(270deg, #ee7600, #ee9a00);
      }

      .ratebg3 {
        background-image: linear-gradient(270deg, #00eea7, #00beee);
      }


    }

  }

  .res-btn {
    display: flex;
    justify-content: center;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 200rpx;
    width: 100%;

    .btn {
      color: #fff;
      font-size: 18px;
      font-weight: 700;
      padding: 30rpx 200rpx;
      border-radius: 10rpx;
      background-image: linear-gradient(180deg, #6a4dff, #0dd9ff);

    }
  }

}

.award-wrap {
  padding-bottom: 40rpx;
  background-color: #222333;
  min-height: 100%;
  padding: 40rpx;

  .award-title {
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    font-family: xcooo;
    text-align: center;
    margin-bottom: 40rpx;
  }

  .card_wrap {
    // 大盒子
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start; // 替代原先的space-between布局方式
  }

  .c_item {
    position: relative;
    flex: 1;
    // background-color: rgba(0, 0, 0, .2);
    width: calc((100% - 20px) / 3);
    max-width: calc((100% - 20px) / 3);
    text-align: center;
    color: #fff;

    margin-right: 15px;
    margin-bottom: 10px;


    &:nth-child(3n) {
      // 去除第3n个的margin-right
      margin-right: 0;
    }

    .mh-goods-img-wrap {
      background-size: 100% 100%;
      padding: 40rpx 3px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      color: #fff;

      .mh-goods-img {
        width: 93px;
        height: 93px;
      }
    }

    .goods-title {
      margin: 20rpx 0;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      white-space: nowrap;
    }

    .goods-price {}

    .mh-goods-rate {
      width: 62px;
      height: 62px;
      position: absolute;
      top: 1px;
      left: 1px;
      z-index: 9;
    }


  }
}

.rule-wrap {
  padding: 30rpx;
  background: #222333;
  color: #fff;

  .rule-title {
    font-size: 20px;
    font-family: xcooo;
    margin-bottom: 30rpx;
    text-align: center;
    border-radius: 30rpx;
  }

  .rule-content {}
}
</style>