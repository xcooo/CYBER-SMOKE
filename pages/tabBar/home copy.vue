<template>
  <view>
    <cus-tabbar :current-page="0"></cus-tabbar>
    <!-- #ifdef MP-WEIXIN -->
    <!-- <view :style="{ height: `${sysConfig.statusBarHeight - 5}px` }">
    </view> -->
    <!-- #endif -->
    <view class="home-page">
      <view class="top-head">
        <view class="title-wrap">
          <view class="title-img">
            星城一番赏
          </view>
        </view>

        <view class="banner">
          <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="false" :interval="interval"
            :duration="duration" v-if="swiperList.length > 0">
            <swiper-item v-for="(item, index) in swiperList" :key="index" @click="$common.bannerTo(item)">
              <view class="swiper-item">
                <image :src="item.thumb" mode="widthFix" lazy-load="false" class="swiper-img" />
              </view>
            </swiper-item>
          </swiper>
        </view>


        <!-- 弹幕 -->
        <view class="barrage-wrap" :style="{
          top: `calc(${sysConfig.statusBarHeight}px + 44px)`
        }">
          <lff-barrage :style="{
            top: '-70rpx',
            width: '100%'
          }" background="linear-gradient(to right,rgba(230,83,109, 0.9),rgba(230,83,109, 0.1))" type="rightToLeft"
            ref="detailBarrage" height="120" :maxTop="0"></lff-barrage>
        </view>

        <view class="notice-view">
          <u-notice-bar mode="horizontal" color="#333" :speed="100" :list="popContent"></u-notice-bar>
        </view>
      </view>
      <view class="cate-wrap">
        <view class="cate-item" :class="[currentIndex == index ? 'cate-item-active' : '']"
          v-for="(item, index) in cateList" :key="item.id" @click="changeIndex(item, index)">

          <!-- 图标 -->
          <image class="cate-icon" :src="item.icon" mode="aspectFit" />

          <!-- 文字 -->
          <view class="cate-title">{{ item.title }}</view>
        </view>
      </view>
      <view class="content-wrap">
        <!-- 热门专区 -->
        <section class="hot-zone">
          <view class="hot-zone__content">
            <scroll-view scroll-x="true" class="scroll-view">
              <view class="hot-zone__list">
                <view class="hot-zone__item" v-for="(item, index) in items" :key="index">
                  <image :src="item.image" class="hot-zone__item-image" mode="aspectFill" />
                  <view class="hot-zone__item-title">{{ item.title }}</view>
                  <view class="hot-zone__item-price">¥{{ item.price }}</view>
                </view>
              </view>
            </scroll-view>
          </view>
        </section>

        <!-- 一番赏 -->
        <section class="raffle-zone">
          <header class="raffle-zone__header">
            <h2 class="raffle-zone__title">一番赏</h2>
            <view class="raffle-zone__more">查看更多<u-icon name="arrow-right" color="#e53e38" size="28"></u-icon></view>
          </header>
          <div class="raffle-zone__content">
            <scroll-view scroll-x="true" class="scroll-view">
              <div class="raffle-zone__list">
                <article class="raffle-zone__item" v-for="(item, index) in listData" :key="index" @click="toDetail(item)">
                  <img :src="item.thumb" class="raffle-zone__item-image" alt="Item Image" />
                  <div class="raffle-zone__item-title">{{ item.title }}</div>
                  <div class="raffle-zone__item-price">¥{{ item.price }}</div>
                </article>
              </div>
            </scroll-view>
          </div>
        </section>

        <!-- 潮玩福袋 -->
        <section class="raffle-zone">
          <header class="raffle-zone__header">
            <h2 class="raffle-zone__title">潮玩福袋</h2>
            <view class="raffle-zone__more">查看更多<u-icon name="arrow-right" color="#e53e38" size="28"></u-icon></view>
          </header>
          <div class="raffle-zone__content">
            <scroll-view scroll-x="true" class="scroll-view">
              <div class="raffle-zone__list">
                <article class="raffle-zone__item" v-for="(item, index) in items" :key="index">
                  <img :src="item.image" class="raffle-zone__item-image" alt="Item Image" />
                  <div class="raffle-zone__item-title">{{ item.title }}</div>
                  <div class="raffle-zone__item-price">¥{{ item.price }}</div>
                </article>
              </div>
            </scroll-view>
          </div>
        </section>

        <!-- 每日福利 -->
        <section class="raffle-zone">
          <header class="raffle-zone__header">
            <h2 class="raffle-zone__title">每日福利</h2>
            <view class="raffle-zone__more">查看更多<u-icon name="arrow-right" color="#e53e38" size="28"></u-icon></view>
          </header>
          <div class="raffle-zone__content">
            <scroll-view scroll-x="true" class="scroll-view">
              <div class="raffle-zone__list">
                <article class="raffle-zone__item" v-for="(item, index) in items" :key="index">
                  <img :src="item.image" class="raffle-zone__item-image" alt="Item Image" />
                  <div class="raffle-zone__item-title">{{ item.title }}</div>
                  <div class="raffle-zone__item-price">¥{{ item.price }}</div>
                </article>
              </div>
            </scroll-view>
          </div>
        </section>


        <!-- 分类 -->
        <section class="tabs-container">
          <view class="tabs">
            <view class="tab-item" v-for="(tab, index) in tabs" :key="index" :class="{ 'active': activeTab === index }"
              @click="setActiveTab(index)">
              {{ tab }}
            </view>
          </view>
        </section>

        <mescroll-body ref="mescrollRef" height="400" @init="mescrollInit" @down="downCallback" @up="getList"
          :down="downOption" :up="upOption">
          <view class="list-container">
            <view class="list-item" v-for="(item, index) in listData" :key="index" @click="toDetail(item)">
              <image :src="item.thumb" class="item-image" mode="aspectFill" />
              <view class="item-title">{{ item.title }}</view>
              <view class="item-price"><text>¥</text><text class="price">{{ item.price }}</text></view>
            </view>
          </view>
        </mescroll-body>
      </view>
    </view>
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
          title: '每日签到',
          icon: 'https://img.alicdn.com/imgextra/i2/2200676927379/O1CN015MRxWp24NdcWPKP0W_!!2200676927379.png'
        },
        {
          id: 2,
          title: '福利抽选',
          icon: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01eReg4C24NdcV2j2X0_!!2200676927379.png'
        },
        {
          id: 3,
          title: '满开福袋',
          icon: 'https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01yrwmQu24NdcWCwFy0_!!2200676927379.png'
        },
        {
          id: 4,
          title: '一番赏',
          icon: 'https://img.alicdn.com/imgextra/i3/2200676927379/O1CN011HF0aB24NdcXAt9o1_!!2200676927379.png'
        },
        {
          id: 5,
          title: '对对碰',
          icon: 'https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01Tt1OW624NdcQD9If5_!!2200676927379.png'
        }
      ],
      is_new: '',
      barrageTimer: null,
      barrageCur: 0,
      items: [
        { title: '我是标题', price: '10.99', image: 'https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01Ai90vI24NdXObsaGE_!!2200676927379.png' },
        { title: '我是标题我是标题我是标题我是标题', price: '15.99', image: 'https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01Ai90vI24NdXObsaGE_!!2200676927379.png' },
        { title: '我是标题我是标题', price: '20.99', image: 'https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01Ai90vI24NdXObsaGE_!!2200676927379.png' },
        { title: '我是标题', price: '$20.99', image: 'https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01Ai90vI24NdXObsaGE_!!2200676927379.png' },
        { title: 'Item 3', price: '20.99', image: 'https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01Ai90vI24NdXObsaGE_!!2200676927379.png' },
        // Add more items as needed
      ],
      tabs: ['潮玩', '满开赏', '一番赏'], // 标签内容
      activeTab: 0, // 默认激活标签
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
      this.popContent = [res.data.pop_con]
      if (res.data.bg_music) {
        bgMusic.src = res.data.bg_music
        bgMusic.autoplay = false;
        bgMusic.loop = false;
      }
    })
  },
  onShow () {
    this.getSwiperList()
    this.getLog()
    this.getList({ num: 1, size: 20 })
  },
  onUnload () {
    // bgMusic.pause()
    clearInterval(this.barrageTimer)
    this.barrageTimer = null
  },
  computed: {
    ...mapGetters(['sysConfig'])
  },
  methods: {
    setActiveTab (index) {
      this.activeTab = index;
    },
    changeIndex (item, index) {
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
      // uni.setClipboardData({
      //   data: 'https://www.cwhm1.xcooo.cn/#/',
      //   success: function () {
      //     uni.getClipboardData({
      //       success: function (res) {
      //         uni.showToast({
      //           title: '链接复制成功',
      //           icon: 'success',
      //           duration: 3000
      //         });
      //       }
      //     })
      //   }
      // });
      // this.show = true
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
        type: 1
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
      // this.$nextTick(() => {
      //   console.log(switchMusic)
      //   if (switchMusic) {
      //     switchMusic.play()
      //   }
      // })
      this.$common.to({
        url: '/pages/box/kaixiang',
        query: {
          id: item.id
        }
      })
    },
    goRoom () {
      this.$common.to({
        url: '/pages/box/roomlist'
      })
    },
    goTower () {
      this.$common.to({
        url: '/pages/box/tower'
      })
      // this.$common.to({
      //   url: '/pages/box/test'
      // })
    },
    getLog () {
      this.req({
        url: '/v1/box/log',
        data: {},
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.logList = res.data
            this.runBarrage()
          }
        }
      })
    },
    runBarrage () {
      this.barrageTimer = setInterval(() => {
        console.log(this.logList.length)
        if (this.logList.length > 0) {
          this.$nextTick(() => {
            this.$refs.detailBarrage.add({
              // head_pic: this.logList[this.barrageCur].avatar,
              head_pic: this.logList[this.barrageCur].avatar,
              title: this.logList[this.barrageCur].title,
              name: this.logList[this.barrageCur].nickName,
              times: this.logList[this.barrageCur].times,
              markTitle: this.logList[this.barrageCur].mark_title,
              prize: this.logList[this.barrageCur].thumb
            })
            this.barrageCur += 1
            if (this.barrageCur == this.logList.length) {
              this.barrageCur = 0
            }
          })
        }
      }, 3000)
    },
  },
}
</script>

<style lang='scss' scoped>
page {
  background: #fefacb;
}

.content-wrap {
  padding: 0 20rpx;
  padding-bottom: 200rpx;
}

.cate-wrap {
  display: flex;
  justify-content: space-around;
  padding: 20rpx 0;
  background: linear-gradient(to bottom, #feb2ae, #fefacb);
}

.cate-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24rpx;
  color: #333;
}

.cate-item-active {
  // color: #fdffa5;
}

.cate-icon {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 10rpx;
}

.cate-title {
  text-align: center;
}

.home-page {

  .top-head {
    background: url("https://img.alicdn.com/imgextra/i1/2200676927379/O1CN014ICM8j24NdcWWacE8_!!2200676927379.png") no-repeat;
    zoom: 1;
    background-size: cover;
    padding: 0 20rpx;
    // background-size: 100vw 100%;
    // -webkit-background-size: 100vw 100%;
    // -o-background-size: 100vw 100%;
    // min-height: calc(100vh - 50px);
  }



  .xc-icon-setUp {
    .xc-header-icon {
      width: 400rpx;
      height: 20rpx;
    }
  }


  .title-wrap {
    display: flex;
    align-items: center;

    .music-view {
      width: 60rpx;
      margin-right: 20rpx;
    }

    .title-img {
      // width: 200rpx;
      font-size: 50rpx;
      color: #fefacb;
      font-weight: 700;
    }
  }

  .swiper {
    width: 100%;
    height: 350rpx;
    margin: 20rpx 0;
  }

  .swiper-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .template-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }

    .swiper-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
    }
  }

  .barrage-wrap {
    position: relative;
  }

  .notice-view {
    position: relative;
    margin-top: 100rpx;
    padding: 5rpx;
    background: #fff;
    border-radius: 40rpx;

    ::v-deep .u-type-warning-light-bg {
      // background: url('https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01Os5AxC24NdWqqcdWy_!!2200676927379.png') no-repeat;
      // background-size: 100vw 100%;
      background: #fdffa5;
      border-radius: 40rpx;
    }

    ::v-deep .u-notice-bar {
      padding: 20rpx 44rpx !important;
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

.banner {
  position: relative;
}

.wind-list {
  position: absolute;
  top: -7px;
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
    width: 49%;
    height: 200rpx;
  }
}

.hot-zone {

  &__content {
    background: url('https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01W8vkmU24NdcY3fdXk_!!2200676927379.png') no-repeat;
    background-size: 100% 100%;
    padding: 10px;
    padding-top: 80rpx;

  }

  &__list {
    display: flex;
  }

  &__item {
    display: flex;
    flex-direction: column;
    min-width: 31.33%;
    margin-right: 20rpx;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    border-radius: 16rpx;

    &:hover {
      transform: scale(1.05);
    }


    &-image {
      width: 100%;
      height: 200rpx;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }


    &-title {
      font-size: 26rpx;
      color: #000;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      font-weight: 700;
      margin-top: 10rpx;
      padding: 0 10rpx;
    }

    &-price {
      font-size: 26rpx;
      color: #e74c3c;
      margin-top: 10rpx;
      font-weight: 700;
      padding: 0 10rpx;
      padding-bottom: 10rpx;
    }


  }

  .scroll-view {
    white-space: nowrap;
    display: flex;
    justify-content: flex-start;
  }
}

// 一番赏
.raffle-zone {
  background: #fff5ee;
  border: 2rpx solid #ffdf9e;
  border-radius: 20rpx;
  margin-top: 20rpx;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 20rpx;
  }

  .raffle-zone__title {
    color: #e53e38;
  }

  .raffle-zone__more {
    color: #e53e38;
  }

  &__content {
    padding: 10px;
  }

  &__list {
    display: flex;
  }

  &__item {
    display: flex;
    flex-direction: column;
    min-width: 31.33%;
    margin-right: 20rpx;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    border-radius: 16rpx;

    &:hover {
      transform: scale(1.05);
    }

    &-image {
      width: 100%;
      height: 200rpx;
      border-top-left-radius: 16rpx;
      border-top-right-radius: 16rpx;
    }

    &-title {
      font-size: 26rpx;
      color: #000;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      font-weight: 700;
      margin-top: 10rpx;
      padding: 0 10rpx;
    }

    &-price {
      font-size: 26rpx;
      color: #e74c3c;
      margin-top: 10rpx;
      font-weight: 700;
      padding: 0 10rpx;
      padding-bottom: 10rpx;
    }
  }

  .scroll-view {
    white-space: nowrap;
    display: flex;
    justify-content: flex-start;
  }
}

// 分类
.tabs-container {
  .tabs {
    display: flex;
    align-items: flex-start;
    padding: 10rpx;
  }

  .tab-item {
    font-size: 40rpx;
    color: #f29c81;
    font-weight: 700;
    padding: 10rpx 20rpx;
    cursor: pointer;
    transition: color 0.3s ease;
    // width: 100%; /* 使标签项宽度占满容器 */

    &.active {
      color: #e53e38;
      font-weight: bold;
    }

  }
}

// 列表项目
.list-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  padding: 20rpx;
}

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
  padding:0 20rpx;
}

.item-price {
  font-size: 24rpx;
  color: #e53e38;
  padding:20rpx 20rpx;
  font-weight: 700;
  .price {
    font-size: 32rpx;
  }
}
</style>