<template>
  <view>
    <!-- <cus-tabbar :current-page="0"></cus-tabbar> -->
    <!-- #ifdef MP-WEIXIN -->
    <!-- <view :style="{ height: `${sysConfig.statusBarHeight - 5}px` }">
    </view> -->
    <!-- #endif -->
    <view class="home-page">
      <view class="title-wrap">
        {{ site_title }}
      </view>

      <view class="notice-view">
        <u-notice-bar mode="horizontal" color="#8b8d8a" :speed="100" :list="popContent">
        </u-notice-bar>
        <!-- <image class="notice-more" src="../../static/home/deliveryNotice.png" lazy-load="false" binderror=""
          bindload="" /> -->
      </view>

      <view class="carousel-wrapper">
        <view class="carousel-background">
          <swiper class="carousel" circular :indicator-dots="indicatorDots" :autoplay="false" :interval="interval"
            :duration="duration" v-if="swiperList.length > 0">
            <swiper-item v-for="(item, index) in swiperList" :key="index" @click="$common.bannerTo(item)">
              <view class="carousel-item">
                <image :src="item.thumb" mode="widthFix" lazy-load="false" binderror="" bindload=""
                  class="carousel-img" />
              </view>
            </swiper-item>

          </swiper>

          <!-- <view class="wind-list">
            <view class="notice-main">
              <swiper class="notice-swiper" circular :indicator-dots="false" :autoplay="true" :interval="2000"
                :duration="1000" :vertical="true">
                <swiper-item v-for="(item, index) in logList" :key="item.id">
                  <view class="swiper-item">
                    <view class="notice-swiper-item">
                      <view class="list-item-view">
                        <view class="txxt-view">
                          <image class="user-pic" :src="item.avatar" mode="widthFix" lazy-load="false" binderror=""
                            bindload="" />
                          <view class="username">{{ item.nickName }}</view>
                          <view class="goods_name">获得({{ item.mark_title }}){{ item.title
                          }}</view>
                        </view>
                        <image class="good-img" :src="item.thumb" mode="widthFix" lazy-load="false" binderror=""
                          bindload="" />
                      </view>
                    </view>
                  </view>
                </swiper-item>
              </swiper>
            </view>
          </view> -->
        </view>
      </view>

      <view class="play-wrap">
        <view class="pd-img" @click="goRoom">
          <cimage src="https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01Y76eXS24NdcVmhMgk_!!2200676927379.png"
            mode="widthFix" />
        </view>
        <view class="pd-img" @click="goTower">
          <cimage src="https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01PjhSox24NdcQxFLPk_!!2200676927379.png"
            mode="widthFix" />
        </view>
      </view>

      <view class="menu-container">
        <view class="menu-item" v-for="(item, index) in menuList" :key="index" @click="goMenu(item)">
          <image class="menu-image" :src="item.url" mode="widthFix" />
        </view>
      </view>

      <view class="cate-wrap">
        <view class="cate-item" :class="[currentIndex == index ? 'cate-item-active' : '']"
          v-for="(item, index) in cateList" @click="changeIndex(item, index)">
          {{ item.title }}
        </view>
      </view>


      <mescroll-body ref="mescrollRef" height="400" @init="mescrollInit" @down="downCallback" @up="getList"
        :down="downOption" :up="upOption">
        <view class="list-container">
          <view class="list-item" v-for="(item, index) in listData" :key="index" @click="toDetail(item)">
            <image :src="item.thumb" class="item-image" mode="widthFix" />
            <view class="item-title">{{ item.title }}</view>
            <view class="item-price"><text>¥</text><text class="price">{{ item.price }}</text></view>
          </view>
        </view>
      </mescroll-body>
    </view>

    <!-- 进群 -->
    <u-popup v-model="kefushow" mode="center" border-radius="16">
      <view class="bgbox">
        <view class="content">
          <view class="ma">
            <image class="" :src="wx_group" mode="widthFix" lazy-load="false" binderror="" bindload="" />
          </view>
          <view class="yi">
            微信扫一扫
          </view>
        </view>
        <view class="off" @click="kefushow = false">
          <uni-icons type="close" color="#fff" size="45" />
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
const switchMp3 = 'https://www.img.xcooo.cn/uploads/2024/02/17887756404cea30.mp3'
const switchMusic = uni.createInnerAudioContext();
const bgMp3 = ''
const bgMusic = uni.createInnerAudioContext();
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {

  },
  data () {
    return {
      show: false,
      showHome: false,
      background: ['color1', 'color2', 'color3'],
      indicatorDots: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      logList: [],
      popContent: [],
      // 下拉刷新的配置(可选, 绝大部分情况无需配置)
      downOption: {
        use: false,
        auto: false
      },
      // 上拉加载的配置(可选, 绝大部分情况无需配置)
      upOption: {
        auto: true,
        page: {
          size: 20 // 每页数据的数量,默认10
        }
      },
      listData: [],
      optionsData: '',
      swiperList: [],
      muteBgMusic: true,
      currentIndex: 0,
      cateList: [
        {
          id: 1,
          title: '一番赏'
        },
        {
          id: 2,
          title: '无限赏',
        },
        {
          id: 999,
          title: '快乐发车',
        },
        // {
        //   id: 3,
        //   title: '全局赏',
        // },
        // {
        //   id: 4,
        //   title: '擂台赏',
        // },
        // {
        //   id: 5,
        //   title: '领主赏',
        // },
      ],
      is_new: '',
      site_title: '',
      menuList: [
        { type: 1, url: 'https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01uRkdPX24NdcZ5u7Vp_!!2200676927379.png' },
        { type: 2, url: 'https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01sIj9rw24NdcWm4MCW_!!2200676927379.png' },
        { type: 3, url: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN0173kj5C24NdcQxGPxq_!!2200676927379.png' },
        { type: 4, url: 'https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01Xq8mdT24NdcVtNaLl_!!2200676927379.png' }
      ],
      userInfo: '',
      kefushow: false,
      wx_group: ''
    }
  },
  onLoad (options) {
    this.optionsData = options
    // 推广码获取
    // console.log('参数', options)
    let invite_code = this.getUrlCode().invite_code
    if (invite_code) {
      uni.setStorageSync('invite_code', invite_code);
    }

    // 微信二维码undo
    if (options.scene) {
      let invite_code = decodeURIComponent(options.scene)
      let index = invite_code.indexOf('=') + 1
      if (index > 0) {
        invite_code = invite_code.slice(index, invite_code.length)
        uni.setStorageSync('invite_code', invite_code);
      } else {
        uni.setStorageSync('invite_code', invite_code);
      }
    }

    // #ifdef H5
    this.wxH5Code = this.getUrlCode().code // 截取code
    // console.log(this.wxH5Code)
    if (this.wxH5Code) {
      this.getOpenid() //获取openid
    }
    // #endif

    switchMusic.src = switchMp3

    this.$store.dispatch('getAppConfig').then((res) => {
      this.site_title = res.data.site_title
      this.wx_group = res.data.wx_group
      this.popContent = [res.data.pop_con]
      if (res.data.bg_music) {
        bgMusic.src = res.data.bg_music
        bgMusic.autoplay = false;
        bgMusic.loop = false;
      }
    })
  },
  onShow () {
    this.$store.dispatch('getUserInfo').then(res => {
      console.log(res)
      this.userInfo = res.data
    })
    this.getSwiperList()
    this.getLog()
    this.getList({ num: 1, size: 20 })
  },
  onUnload () {
    // bgMusic.pause()
  },
  computed: {
    ...mapGetters(['sysConfig'])
  },
  methods: {
    changeIndex (item, index) {
      if (item.id == 999) {
        this.$common.to({
          url: '/pages/box/roomlist'
        })
      } else {
        this.currentIndex = index
        if (item.sort) {
          if (item.sortType !== 4) {
            item.sortType = 4
          } else {
            item.sortType = 5
          }
        } else {
          this.cateList.map(item => {
            item.sortType = ''
          })
        }
        if (item.is_new) {
          this.is_new = 2
        } else {
          this.is_new = ''
        }
        this.listData = []
        this.mescroll.resetUpScroll()
        this.mescroll.scrollTo(0, 0)
      }

    },
    playMusic () {
      this.muteBgMusic = !this.muteBgMusic;
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      if (!this.muteBgMusic) {
        bgMusic.play()
      } else {
        bgMusic.pause()
      }
    },
    jump () {
      uni.navigateTo({
        url: '/pages/index/web-view?url=https://mp.weixin.qq.com/s?__biz=Mzg3NDY2Njg2MQ==&tempkey=MTI2N19WL29GSlhRMm9kWTBZNTdHeFNHR1U3X2RBaDMwNDIydVlnR3prQ2FDdnJmNGhxVDBORTV6MTY1QW9BWmNRalo5QTNVVmw2dUFyNVFLSWI2azRqZDFFV1FiXzRtOUJxNFhPRnVfaW01ekg2VGVqRGxyMktvdk9Kdlp4X2xmM1hmemI4c0xPLUc2S2JyeVlJYlBUOVBUTW1qOWhjdElpd1R2UFBBUDBnfn4%3D&chksm=4ecc0f3579bb8623030d4931b5f19995fae2b69ef8ed909f1cbbe68cda5e90a44102c5a93430#rd',
        success: (result) => {

        },
        fail: () => { },
        complete: () => { }
      });
    },
    jump2 () {
      console.log(123)
      uni.navigateTo({
        url: 'https://www.cwhm1.xcooo.cn/#/'
      })
    },
    getSwiperList () {
      /* 获取轮播图 */
      this.$common.getBanner(1).then(res => {
        this.swiperList = res
      })
    },
    getUrlCode () { //
      var url = location.search
      var theRequest = new Object()
      if (url.indexOf("?") != -1) {
        var str = url.substr(1)
        var strs = str.split("&")
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1])
        }
      }
      return theRequest
    },
    getOpenid () { //获取opendi
      this.req({
        url: '/v1/shop/wxLogin',
        data: {
          code: this.wxH5Code,
          invite_code: uni.getStorageSync('invite_code')
        },
        success: res => {
          if (res.code == 200) {
            if (res.code == 200) {
              uni.setStorageSync(
                'token',
                `${res.data.token_type}${res.data.access_token}`
              )

              // setTimeout(() => {
              //   uni.showToast({
              //     title: '登录成功',
              //     icon: 'success',
              //     mask: true
              //   })
              // }, 100)

              setTimeout(() => {
                this.pageTo('wxH5')
              }, 500)
            }
          }
        }
      })
    },
    /**
 * @description: 统一处理登录后页面跳转传参
 * @param {*}
 * @return {*}
 */
    pageTo (wx) {
      this.$store.dispatch('getUserInfo').then(() => {
        let pages = getCurrentPages()
        console.log(pages)

        console.log('this.optionsData', this.optionsData)
        let data = ''
        if (this.optionsData) {
          let query = this.optionsData
          if (this.optionsData.page == 'package/fuli/fuli-detail') {
            query.is_new = 1
          }
          data = query
        }
        /* 小程序码进入 */
        if (this.optionsData.scene) {
          let query = {}
          let arr = this.optionsData.scene.split('_')
          /**
           * 小程序码参数为 1_1_1 格式 参数间通过_分隔
           * 参数1为类型,之后参数为与后台约定的参数
           * 类型:
           * 1 幸运盒子 参数1为分享人id,参数2为盒子id
           * 未完待续...
           */
          if (arr[0] == 1) {
            query.userId = arr[1]
            query.id = arr[2]
          }
          data = query
        }
        if (wx) {
          // 清理 URL 中的参数部分
          this.clearUrlParams();
          uni.switchTab({
            url: '/pages/home/index'
          })
        }

        uni.redirectTo({
          url: `${this.optionsData.page}${this.$common.qs(this.optionsData)}`,
          fail: err => {
            console.log('跳转失败--', this.optionsData.page)
            uni.switchTab({
              url: `${this.optionsData.page}`
            })
          }
        })
      })
    },
    clearUrlParams () {
      // 获取当前 URL
      let url = window.location.href;
      // 找到 URL 中的参数部分
      let index = url.indexOf('?');
      if (index > -1) {
        // 移除参数部分
        url = url.substring(0, index);
      }
      // 使用 History API 替换当前 URL
      history.replaceState(null, '', url);
    },
    /**
* @description: 中奖记录
* @return {*}
*/
    getLog () {
      this.req({
        url: '/v1/box/log',
        data: {},
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.logList = res.data
          }
        }
      })
    },
    /**
* @description: 获取商品列表数据
* @param {*}
* @return {*}
*/
    getList ({
      num,
      size
    }) {

      let data = {
        page: num,
        per_page: size,
        sort_type: '',
        is_new: this.is_new,
        type: 1,
        box_type: this.cateList[this.currentIndex].id
      }
      if (this.cateList[this.currentIndex].id != 4) {
        data.sort_type = this.cateList[this.currentIndex].id
      } else {
        data.sort_type = this.cateList[this.currentIndex].sortType
      }
      this.req({
        url: '/v1/box/homeList',
        data,
        Loading: true,
        success: res => {
          if (res.code == 200) {
            if (num == 1) {
              this.listData = []
            }
            this.listData = [...this.listData, ...res.data.data]
            this.mescroll.endBySize(res.data.data.length, res.data.total)
          } else {
            this.mescroll.endBySize(0, 0)
          }
        }
      })
    },
    toDetail (item) {
      switch (item.box_type) {
        case 1:
          this.$common.to({
            url: '/pages/box/firstReward',
            query: {
              id: item.id
            }
          })
          break
        case 2:
          this.$common.to({
            url: '/pages/box/kaixiang',
            query: {
              id: item.id
            }
          })
          break
      }

    },
    goRoom () {
      this.$common.to({
        url: '/pages/rightTouch/list'
      })
    },
    goTower () {
      this.$common.to({
        url: '/pages/box/tower'
      })
    },
    goMenu (item) {
      console.log(item)
      switch (item.type) {
        case 1:
          this.$common.to({
            url: '/pages/index/sign',
          })
          break
        case 2:
          this.$common.to({
            type: 3,
            url: '/pages/tabBar/charts',
          })
          break
        case 3:
          if (!this.userInfo) {
            uni.showToast({
              title: '登录后再操作',
              icon: 'none',
              mask: true
            })
            return
          }
          let url
          if (this.userInfo.level == 2) {
            url = '/package/mine/daili'
          } else {
            url = '/package/mine/yaoqing'
          }
          this.$common.to({
            tabCur: 1,
            url,
          })
          break
        case 4:
          this.kefushow = true
          break
      }
    }
  },
}
</script>

<style lang='scss' scoped>
.cate-wrap {
  display: flex;
  margin: 20rpx 0;

  .cate-item {
    color: #777;
    font-size: 30rpx;
    font-weight: 700;
    margin-right: 20rpx;
    text-align: center;
    padding: 5rpx 15rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    padding-bottom: 10rpx;
    white-space: nowrap;
    /* 确保文字不换行 */
    position: relative;
    /* 设置为相对定位，为伪元素提供定位上下文 */

    &:last-child {
      margin-right: 0;
    }
  }

  .cate-item-active {
    color: #333333;
  }

  .cate-item-active::after {
    content: '';
    display: block;
    width: 60rpx;
    height: 10rpx;
    background-color: #333333;
    position: absolute;
    bottom: -5rpx;
    left: 50%;
    transform: translateX(-50%);
  }
}

.home-page {
  background: linear-gradient(to bottom, #eefde9, #00f2fe);
  background: linear-gradient(to bottom, #eefde8, #ffffff);
  padding: 0 30rpx;
  padding-top: 20rpx;


  .title-wrap {
    display: flex;
    align-items: center;
    color: #000;
    font-size: 40rpx;
    font-weight: 700;
    margin-bottom: 40rpx;
  }

  .notice-view {
    position: relative;

    ::v-deep .u-type-warning-light-bg {
      // background: url('https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01Os5AxC24NdWqqcdWy_!!2200676927379.png') no-repeat;
      // background-size: 100vw 100%;
      border: 2rpx solid #000;
      border-radius: 50rpx;
      background-color: #f8fdf6;
    }

    ::v-deep .u-notice-bar {
      padding: 20rpx 20rpx !important;
      padding-right: 40rpx !important;
    }

    .notice-more {
      width: 150rpx;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
    }

  }



  .box-wrap {
    margin-bottom: 20rpx;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .new-box-title {
    height: 82rpx;
    background: url('https://www.img.xcooo.cn/uploads/2024/03/a8a8919fa7bf9c39.png') no-repeat;
    background-size: 100% 100%;
    position: relative;

    .new-img {
      width: 62px;
      height: 62px;
      position: absolute;
      right: 15px;
      bottom: -30px;
    }
  }

  .box-list {
    width: 100%;
    height: 156px;
    margin: 15px auto;
    border-radius: 5px;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    padding: 13px 31px;
    background: url('https://www.img.xcooo.cn/uploads/2024/03/0c164d87c844fa6d.png') no-repeat;
    // background-size: 358px 156px;
    background-size: 100% 100%;
  }

  .new-box-content {
    height: 270rpx;
    box-sizing: border-box;
    border: 2px solid #cb5967;
    margin: 0;
    background: none;
  }

  .box-list-left {
    width: 104px;
    height: 104px;
    flex-shrink: 0;
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  .good-list-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .box-list-right-name-2 {
    margin-top: 20px;
    height: 40px;
    font-size: 14px;
    color: #000;
    font-weight: 700;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .box-list-right-Zprice-active {
    width: 156px;
    height: 41px;
    -webkit-animation: newBtn 2s linear infinite;
    animation: newBtn 2s linear infinite;
    margin-top: 5px;
    display: flex;
    margin-bottom: 36rpx;

    box-sizing: border-box;

    image {
      width: 100%;
      height: 100% !important;
    }
  }

  @keyframes newBtn {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1);
    }
  }

  .box-list-right-Zprice-image {
    width: 100%;
    height: 100%;
  }

  .price-view-0 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .product-price-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .price-view-0-right {
    font-size: 26rpx;
    color: #e20014;
    margin-left: 20rpx;
  }

  .box-list-right-Zprice-left {
    color: #cb5967;
    font-size: 12px;
    text-align: center;
    // background: url('https://img.alicdn.com/imgextra/i3/2215984279448/O1CN01NeifUh2JfEvWYT4jM_!!2215984279448.png') no-repeat;
    background-size: 100% 15px;
    margin-right: 20rpx;
  }

  .box-list-right-Zprice-right {
    font-size: 12px;
    color: #cb5967;
    // background: url('https://img.alicdn.com/imgextra/i3/2215984279448/O1CN01rX2qX22JfEvVkVh1w_!!2215984279448.png') no-repeat;
    background-size: 100% 15px;
  }



  .box-img-0 {
    height: 82rpx;
    width: 100%;
    margin-top: 10rpx;
    padding: 0 16rpx;
    padding-left: 0;
    display: flex;
    justify-content: space-between;
  }

  .box-img-0-view {
    width: 41px;
    height: 41px;
    background-color: #9400d3;
    border-radius: 5px;
    overflow: hidden;
  }

  .flip-box {
    position: relative;
    -webkit-animation: flip 4s linear infinite;
    animation: flip 4s linear infinite;

    .front {
      z-index: 2;
      -webkit-transform: rotateY(0deg);
      transform: rotateY(0deg);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;

      .front-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .back {
      -webkit-transform: rotateY(-180deg);
      transform: rotateY(-180deg);
      z-index: 1;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;

      .back-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }


  }

  @keyframes flip {
    0% {
      transform: rotateY(0deg);
    }

    50% {
      transform: rotateY(180deg);
    }

    100% {
      transform: rotateY(0deg);
    }
  }

  .show-more {
    background-color: #fff;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #222;
    background-color: hsla(0, 0%, 100%, .2);
    opacity: .9;
    border: 1rpx solid #de8bfb;
    color: #de8bfb;
    font-weight: 700;
  }

}

.xc-popup {

  // width: 540rpx;
  .link-wrap {
    width: 85vw;
    padding: 40rpx 20rpx;

    .link-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 20rpx;
      text-align: center;
    }

    .link-url {
      margin: 0 20rpx;
      color: #62C234;
      margin: 10rpx 0;
      display: block;
      word-break: break-all;
    }

    .link-desc {
      margin-bottom: 40rpx;
    }

    .link-btn {
      // margin: 0 20rpx;
    }
  }
}


.home2 {
  height: 100%;
}

.home-img {
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.carousel-wrapper {
  margin: 20rpx 0;
  width: 100%;
  height: 430rpx;
  background: url('https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01tjFpM424NdcXuqPIF_!!2200676927379.png') no-repeat center center;
  background: url('https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01AhqTji24NdccWFycV_!!2200676927379.png') no-repeat center center;
  background-size: cover;
}

.carousel-background {
  width: 100%;
  height: 100%;
  padding: 10rpx 20rpx;
  position: relative;
  top: 130rpx;

  .carousel {
    border-radius: 20rpx;
    overflow: hidden;
    transform: translateY(0);
  }

  .carousel-item {
    width: calc(100vw - 60rpx);
    height: calc(50vw - 30rpx);

    image {
      width: 100%;
      height: 100%;
    }
  }

}

.wind-list {
  position: absolute;
  top: -10rpx;
  width: 345px;
  height: 50px;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding-top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;

  .notice-main {
    width: 100%;

    .notice-swiper {
      height: 50px;
      line-height: 50px;

      .swiper-item {
        .notice-swiper-item {
          width: 100%;
          height: 100%;
          background-image: url('https://www.img.xcooo.cn/uploads/2024/02/0d14c37cd7a6649c.png');
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          padding: 0 40rpx;
          box-sizing: border-box;

          .list-item-view {
            display: flex;
            align-items: center;
            box-sizing: border-box;

            .txxt-view {
              display: flex;
              align-items: center;
              box-sizing: border-box;

              .user-pic {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                overflow: hidden;
              }

              .username {
                width: 72px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 12px;
                color: #fff;
              }

              .goods_name {
                width: 166px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 12px;
                color: #fff;
                text-align: left;
              }
            }

            .good-img {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              overflow: hidden;
              flex-shrink: 0;
            }
          }
        }
      }
    }
  }
}

.play-wrap {
  display: flex;
  justify-content: space-between;
  width: 100%;


  .pd-img {
    flex: 1;
  }
}

.menu-container {
  display: flex;
  align-items: center;
  padding: 20rpx 0;

  .menu-item {
    flex: 1;
  }

  .menu-image {
    width: 100%;
  }
}



// 列表项目
.list-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  padding: 20rpx;

  .list-item {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 10rpx;
    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);

  }

  .item-image {
    width: 100%;
    height: 200rpx;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .item-title {
    font-size: 28rpx;
    color: #333;
    margin-top: 20rpx;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 20rpx;
  }

  .item-price {
    font-size: 24rpx;
    color: #e53e38;
    padding: 20rpx 20rpx;
    font-weight: 700;

    .price {
      font-size: 32rpx;
    }
  }
}

::v-deep .u-mode-center-box {
  background: transparent;
}

.bgbox {
  background: url('https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01gTyc2924NdcXV2Wi1_!!2200676927379.png') no-repeat;
  background-size: 100% 100%;
  width: 540rpx;
  height: 680rpx;
  position: relative;

  .content {
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50%, -50%);

    .ma {
      width: 300rpx;
      height: 300rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }

  .yi {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    line-height: 26px;
    margin-top: 40rpx;
  }

  .off {
    text-align: right;
    padding: 15px;
    box-sizing: border-box;
    position: absolute;
    right: -7%;
    // bottom: -20%;
  }


}
</style>