<template>
  <view class="kaixiang">
    <view class="nav">
      <uni-nav-bar color="#fff" leftIcon="left" backgroundColor="transparent" :border="false" :statusBar="true"
        :fixed="true" :title="boxInfo.title">
        <view slot="left" class="nav-left" @click="back">
          <image class="" src="../../static/home/arrow.png" mode="widthFix" lazy-load="false" binderror="" bindload="" />
        </view>
      </uni-nav-bar>
      <view class="diamond-wrap">
          <view class="diamond">
            <image class="diamond-img" src="../../static/home/yaoshi.png" mode="widthFix" lazy-load="false" binderror=""
              bindload="" />
          </view>
          <view>{{ diamonds }}</view>
        </view>
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

    <!-- <view class="setAnimate">
      <view class="btn" :style="{ 'background-image': 'url(' + `${imgBaseUrl}/static/web/06.png` + ')' }"
        @click="setAnimate">设置
      </view>
    </view> -->

    <swiper class="swiper swiper2" easing-function="linear" circular :current="currentBanner" :indicator-dots="false"
      :autoplay="false" :interval="100" :duration="1000" @change="handleSwiperChange">
      <swiper-item v-for="(item, index) in awardList" :key="item.id">
        <view class="swiper-item">
          <view class="gd-info">
            <view class="gd-title">{{ item.title }}</view>
            <view class="gd-price">开盒价 <text>￥{{ boxInfo.price }}</text></view>
          </view>
        </view>
      </swiper-item>
    </swiper>

    <view class="gd-desc">抽赏存在概率性, 请谨慎购买 <text @click="goRule">发货须知</text></view>


    <view class="shop-list">
      <view class="shop-list-rate">
        <view class="list" v-for="(item, index) in markList" :key="index">
          <image class="" :src="item.icon" mode="widthFix" lazy-load="false" binderror="" bindload="" />
          <view class="list-text" :class="['ratebg' + index]">
            {{ item.rate }}%
          </view>
        </view>
        <view class="recode-btn" @click="zs">中奖记录</view>
      </view>

      <!-- <view class="mh-goods-list">
        <view class="mh-goods-list-item" :style="{ backgroundImage: `url(${item.image})` }"
          v-for="(item, index) in awardList" :key="index" @click="openDetailPop(item)">
          <image class="mh-goods-rate" :src="item.mark_icon" mode="widthFix" lazy-load="false" binderror="" bindload="" />

          <image class="mh-goods-img" :src="item.thumb" mode="widthFix" lazy-load="false" binderror="" bindload="" />

          <view class="zhengming-wrap">
            <cimage class="zhengming-img" v-if="item.type == 2" src="/static/web/zhengming1.png" mode="scaleToFill" />
            <cimage class="zhengming-img" v-if="item.type == 3" src="/static/web/zhengming2.png" mode="scaleToFill" />
          </view>

          <view class="mh-sale">{{ item.remaining_quantity }}/{{ item.initial_quantity }}</view>

          <view class="mh-sale">￥{{ item.price }}</view>

        </view>
      </view> -->
      <list-rate-section v-for="(mark, index) in marks" :key="index" :icon="mark.icon" :rate="mark.rate"
        :awards="mark.awards" />

    </view>

    <view class="luckbox">
      <view class="option ">
        <view class="row">
          <view class="chou" v-for="(item, index) in boxBtnList" :key="index" @click="changeBuyType(item.id)">
            <view class="chou-wrap">
              <view class="chou-title">
                <!-- {{ item.title }} -->
                <image class="chou-img" :src="item.img" mode="widthFix" lazy-load="false" binderror="" bindload="" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 开盒弹窗 -->
    <uni-popup ref="orderPop" type="bottom">
      <view v-if="orderData" class="order-pop">
        <view class="order-pop-hd">
          确认订单

          <view @click="closeOrderPop" class="close icon">
            <image src="../../static/home/close2.png" mode="scaleToFill" />
          </view>
        </view>

        <view class="order-pop-bd">
          <!-- 开盒数量 -->
          <!-- <view class="row">
            <view class="title">开盒数量</view>

            <view class="right"></view>
          </view> -->

          <!-- <view class="btn-list">
            <view @click="changeBuyType(i)" v-for="(item, i) in btnList" :key="i" class="btn-list-item" :class="{
              act: btnCur == i
            }">
              {{ item.title }}
            </view>
          </view> -->

          <view class="row">
            <view class="title">订单金额</view>

            <view class="right">
              <view class="price">
                ¥
                <text>{{ orderData.discount.total_money }}</text>
              </view>
            </view>
          </view>

          <view class="row">
            <view class="title">星币抵扣</view>

            <view class="right">
              <view class="price red">
                -
                <text>{{ orderData.discount.money_dis }}</text>
              </view>
            </view>
          </view>

          <view class="row">
            <view class="title">优惠券</view>

            <view class="right">
              <view class="price red" v-if="orderData.couponCount" @click="goCoupon">
                <template v-if="coupon_info && coupon_info.name">{{ coupon_info.name }}<u-icon name="arrow-right"
                    color="#d5b644" size="28"></u-icon></template>
                <template v-else> <text>{{ orderData.couponCount }}张可用</text><u-icon name="arrow-right" color="#d5b644"
                    size="28"></u-icon></template>
              </view>
              <view v-else class="empty-coupon" @click="goCoupon">
                暂无可用 <u-icon name="arrow-right" color="#d5b644" size="28"></u-icon>
              </view>
            </view>
          </view>

          <view class="row">
            <view class="title">获得数量</view>

            <view class="right">
              <view class="gray">随机获得{{ orderData.box.num }}件商品</view>
            </view>
          </view>

          <view class="pay-type">
            <view @click.stop="changePayType(i)" v-for="(item, i) in payTypeList" :key="i" class="pay-type-item">
              <view class="icon">
                <image :src="item.icon" mode="scaleToFill" />
              </view>

              <view class="title">{{ item.title }}</view>

              <view class="icon">
                <template v-if="payTypeCur == i">
                  <uni-icons type="checkbox-filled" color="#7768d5" size="25" />
                </template>
                <template v-else>
                  <uni-icons type="checkbox" color="#7768d5" size="25" />
                </template>
              </view>
            </view>
          </view>

          <view class="agree">
            <view class="title">
              阅读并同意
              <text @click="$common.toRule(2)">《抽盒规则》</text>
            </view>

            <evan-switch v-model="agree" active-color="#7768d5" inactive-color="#fff" :size="20" :active-value="true"
              :inactive-value="false"></evan-switch>
          </view>

          <!-- <view class="rule-title">{{ ruleData.title }}</view> -->

          <scroll-view class="rule-content" scroll-y>
            <view v-html="ruleData.editor"></view>
          </scroll-view>
        </view>

        <view @click="$common.noDouble(confirmSubmit, 1)" class="order-pop-ft">
          <view class="title">确认同意信息并支付</view>

          <view class="money">
            ¥
            <text>{{ orderData.discount.pay_money }}</text>
          </view>
        </view>
      </view>
    </uni-popup>

    <!-- 联系客服 -->
    <u-popup v-model="kefushow" mode="center" border-radius="16">
      <view class="bgbox">
        <view class="off" @click="kefushow = false">
          <uni-icons type="close" color="#fff" size="25" />
        </view>
        <view class="content">
          <view class="ma">
            <image class="" :src="wx_kefu" mode="widthFix" lazy-load="false" binderror="" bindload="" />
          </view>
        </view>
        <view class="yi">
          微信扫一扫
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

    <!-- 商品详情 -->
    <uni-popup ref="detailPop" type="bottom">
      <view class="detail-pop">
        <view class="detail-pop-hd">
          商品详情
          <view @click="closeDetailPop" class="icon close">
            <cimage src="/static/icon/close2.png" mode="scaleToFill" />
          </view>
        </view>

        <scroll-view class="detail-pop-bd" scroll-y>
          <view class="detail-pic" v-if="curDetail.thumb">
            <cimage :src="curDetail.thumb" mode="scaleToFill" />
          </view>

          <view class="detail-price">
            <view class="price">
              ¥
              <text>
                {{ curDetail.price }}

                <text>参考价</text>
              </text>
            </view>

            <!-- <view class="rate">概率{{ curDetail.show_rate }}%</view> -->
          </view>

          <view class="detail-title">
            <view class="detail-title-content hang2">
              <text :style="{
                background: curDetail.mark_color
              }">
                {{ curDetail.mark_title }}
              </text>

              {{ curDetail.title }}
            </view>
          </view>

          <u-gap height="20"></u-gap>

          <view class="zheng-tag">
            <cimage src="/static/img/zheng_pin1.png" mode="scaleToFill" />
          </view>

          <u-gap height="20"></u-gap>

          <view class="content-title">商品详情</view>

          <view v-html="curDetail.editor" class="content"></view>
        </scroll-view>
      </view>
    </uni-popup>

    <!-- 中赏记录 -->
    <u-popup v-model="zsPop" mode="bottom" border-radius="16" height="70%">
      <view class="zsbox-wrap">
        <view class="zsbox-top">
          <view class="zs-title">
            <view>中赏记录</view>
            <view class="zs-icon" @click="zsPop = false"><uni-icons type="closeempty" color="#fff" size="20"></uni-icons>
            </view>
          </view>

          <view class="zs-wrap">
            <view class="zs-items" :class="[currentItems == index ? 'activezs' : '']" @click="zsCu(index)"
              v-for="(item, index) in btnLists" :key="index">
              {{ item.title }}
            </view>
          </view>
        </view>

        <mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getBoxLogList" :down="downOption"
          :up="upOption">
          <view class="award-wrap">
            <view class="award-log-item" :style="{ backgroundImage: `url(${item.image})` }"
              v-for="(item, index) in boxLogList" :key="index">
              <view class="award-log-left">
                <view class="award-log-time">
                  {{ item.created_at }}
                </view>
                <view class="award-log-info">
                  {{ item.nickName }} 获得 <text class="award-name">{{ item.title }}</text>
                </view>
              </view>
              <view class="award-log-right">
                <image class="award-log-img" :src="item.thumb" mode="widthFix" lazy-load="false" binderror=""
                  bindload="" />
              </view>
            </view>
          </view>
        </mescroll-uni>
      </view>
    </u-popup>

    <!-- 优惠券 -->
    <u-popup v-model="couponPop" mode="bottom" border-radius="16" height="70%">
      <view class="coupon-wrap">
        <view class="coupon-title">优惠券列表</view>
        <view class="youhuicon">
          <view class="couList" v-for="(item, idx) in couponList" :key="idx">

            <view class="l" :class="[item.is_available ? '' : 'available']">
              <view class="aa">
                <text class="pri">￥{{ item.discount_amount }}</text>
                <view class="tiao">满减券</view>
              </view>
            </view>
            <view class="r">
              <view class="ll">
                <view class="t">{{ item.name }}</view>
                <view class="man">满{{ item.minimum_spend }}减{{ item.discount_amount }}元券</view>
                <view class="qi">{{ item.valid_from.substring(0, 11) }}至{{ item.valid_until.substring(0, 11) }} </view>
              </view>
              <view class="rr xx" v-if="item.is_available" @click="useCouPon(item)">使用</view>
              <view class="rr xx2" v-else>不可用</view>
            </view>
          </view>
        </view>
        <u-empty text="暂无优惠券" mode="coupon" :show="couponShow" margin-top="400"></u-empty>
      </view>
    </u-popup>

    <!-- 开盒动画 -->
    <u-popup v-model="setShow" mode="center" border-radius="16" :closeable="true" @close="closeSet">
      <view class="setbox">
        <view class="set-title">设置</view>
        <view class="set-tip">
          <view>
            跳过动画
          </view>
          <u-switch @change="changeAnimate" active-color="#7768d5" v-model="animateSet"></u-switch>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
const switchMp3 = 'https://www.img.xcooo.cn/uploads/2024/02/17887756404cea30.mp3'
const switchMusic = uni.createInnerAudioContext();
// const bg_music = 'https://img.50api.cn/dingdang/music.mp3'
const bg_music = ''
const bgMusic = uni.createInnerAudioContext();
import listRateSection from './components/listRateSection'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'kaixiang',
  components: {
    listRateSection
  },
  data () {
    return {
      muteBgMusic: false,
      kefushow: false,
      wx_kefu: '',
      optionsData: '',
      scrollTop: 0,
      boxBtnList: [
        {
          id: 1,
          num: 1,
          title: '一发入魂',
          img: '../../static/home/1_2.png',
        },
        {
          id: 3,
          num: 3,
          title: '霸气三连',
          img: '../../static/home/3_2.png'
        },
        {
          id: 5,
          num: 5,
          title: '五连绝世',
          img: '../../static/home/5_2.png'
        },
        {
          id: 6,
          num: 10,
          title: '十发真爽',
          img: '../../static/home/10_2.png'
        },
      ],
      markIconList: [
        'https://www.img.xcooo.cn/uploads/2024/03/198c2a7e10410c63.png',
        'https://www.img.xcooo.cn/uploads/2024/03/f7c171b8f3dabff6.png',
        'https://www.img.xcooo.cn/uploads/2024/03/7e0edd987451aae3.png'
      ],
      marks: [
      ],
      list: [
        '恭喜 微信用户获得路由器'
      ],
      boxInfo: {},
      // 赏等级列表
      markList: [],
      // 奖品
      awardList: [],
      orderData: '',
      // 购买方案
      btnCur: 0,
      // 支付类型
      payTypeCur: 0,
      payTypeList: [
        // #ifdef H5 || MP
        {
          id: 3,
          icon: '../../static/mine/wechat.png',
          title: '微信支付'
        },
        // {
        //   id: 4,
        //   icon: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01A3bNW324NdW9QBJvc_!!2200676927379.png',
        //   title: '支付宝支付'
        // }
        // #endif
        // {
        //   id: 2,
        //   icon: '',
        //   title: '余额支付'
        // }
      ],
      agree: true,
      ruleData: '',
      curDetail: '',
      is_epay: 0,
      currentBanner: 0,
      zsPop: false,
      boxLogList: [],
      btnLists: [
      ],
      currentItems: 0,
      // 下拉刷新的配置(可选, 绝大部分情况无需配置)
      downOption: {
        auto: false
      },
      // 上拉加载的配置(可选, 绝大部分情况无需配置)
      upOption: {
        auto: false,
        page: {
          size: 20 // 每页数据的数量,默认10
        },
        textNoMore: '-- END --'
      },
      couponList: [],
      couponPop: false,
      couponShow: false,
      coupon_info: {},
      animateSet: uni.getStorageSync('animateSet') ? uni.getStorageSync('animateSet') : false,
      setShow: false,
      diamonds: 0
    }
  },
  onLoad (options) {
    if (options.scene) {
      let arr = options.scene.split('_')
      this.optionsData = {
        userId: arr[1],
        id: arr[2]
      }
    } else {
      this.optionsData = options
    }

    switchMusic.src = switchMp3
    bgMusic.src = bg_music
    bgMusic.autoplay = true;
    bgMusic.loop = true;

    // #ifdef H5
    let order_info = uni.getStorageSync('order_info_box')
    // let order_info = {provider: 'alipay', order_sn: 'C916652564524855'}
    console.log(order_info, '这里是打印的订单信息')
    if (order_info) {
      this.checkPayStatus()
    }
    // #endif
  },
  onShow () {
    this.$store.dispatch('getUserInfo').then(res => {
      console.log(res)
      this.diamonds = res.data.diamonds
    })
    this.$store.dispatch('getAppConfig').then((res) => {
      console.log(res);
      this.is_epay = res.data.is_epay
      this.wx_kefu = res.data.wx_kefu

      // if (res.data.bg_music) {
      //   bgMusic.src = res.data.bg_music
      //   bgMusic.autoplay = true;
      //   bgMusic.loop = true;
      // }
    })


    // 清空优惠券信息
    this.coupon_info = {}
    this.getData()
  },
  watch: {
  },
  onUnload () {
    console.log('移除事件')
    clearInterval(this.barrageTimer)
    clearInterval(this.checkTimer)
    clearInterval(this.cancelTimer)
    this.barrageTimer = null
    this.cancelOrderPay()
    this.cancelCheckPayStatus()
    bgMusic.pause()
  },
  computed: {
    ...mapGetters(['sysConfig', 'userInfo']),
  },
  methods: {
    setAnimate () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.setShow = true
    },
    closeSet () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.setShow = false
    },
    changeAnimate (e) {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.animateSet = !!e
      uni.setStorageSync('animateSet', this.animateSet)
    },
    useCouPon (item) {
      this.coupon_info = item
      // 请求订单信息
      this.confirmSubmit(0)
      this.couponPop = false
    },
    goCoupon () {
      this.couponPop = true
      this.getUserCoupon()
    },
    getUserCoupon () {
      this.req({
        url: '/v1/coupon/order_coupons',
        data: {
          paymentAmount: this.orderData.discount.pay_money
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            if (res.data.length == 0) {
              this.couponShow = true
            } else {
              this.couponShow = false
            }
            this.couponList = res.data
          } else {
            this.couponShow = true
          }
        }
      })
    },
    zsCu (index) {
      this.currentItems = index
      this.boxLogList = []
      this.mescroll.resetUpScroll()
      this.mescroll.scrollTo(0, 0)
    },
    zs () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.zsPop = true
      this.getTab()
    },
    getBoxLogList ({
      num,
      size
    }) {
      this.req({
        url: '/v1/box/boxLogList',
        data: {
          id: this.optionsData.id,
          mark_id: this.btnLists.length ? this.btnLists[this.currentItems].id : 0,
          page: num,
          per_page: size
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            if (num == 1) {
              this.boxLogList = []
            }
            let newArr = res.data.data.map(item => {
              if (item.mark_id == 33) {
                item.image = '../../static/home/200.png'
              } else if (item.mark_id == 34) {
                item.image = '../../static/home/300.png'
              }
              else if (item.mark_id == 35) {
                item.image = '../../static/home/400.png'
              } else if (item.mark_id == 36) {
                item.image = '../../static/home/100.png'
              }
              return item
            })
            this.boxLogList = [...this.boxLogList, ...newArr]
            this.mescroll.endBySize(res.data.data.length, res.data.total)
          } else {
            this.mescroll.endBySize(0, 0)
          }
        }
      })
    },
    getTab () {
      return new Promise((resolve, reject) => {
        this.req({
          url: '/v1/box/mark',
          data: {
            type: 2
          },
          Loading: true,
          success: res => {
            if (res.code == 200) {
              this.btnLists = res.data.map(item => {
                if (item.id == 1) {
                  item.title = '传说'
                }
                if (item.id == 4) {
                  item.title = '高级'
                }
                return item
              })

              this.mescroll.resetUpScroll()
              this.mescroll.scrollTo(0, 0)
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
    checkPayStatus () {
      const _this = this

      const order_info = uni.getStorageSync('order_info_box')

      _this.checkTimer = setInterval(() => {
        console.log(order_info, '获取到的订单数据')

        // 查询订单
        this.req({
          url: '/v1/pay/orderStatus',
          data: {
            order_sn: order_info.order_sn
          },
          Loading: true,
          success: (res) => {
            switch (res.code) {
              case 200:
                _this.cancelCheckPayStatus()

                this.$common.toast({
                  title: '支付成功', icon: 'success', duration: 1500, success: () => {
                    this.$common.to({
                      type: 1, url: '/pages/box/towerDraw', query: {
                        id: res.data.id,
                        order_sn: order_info.order_sn,
                        drawNum: res.data.box_num,
                        layer: this.boxInfo.layer
                      }
                    })
                  }
                })
                break;
              case 203:
                _this.cancelOrderPay()
                _this.cancelCheckPayStatus()
                this.$common.toast({ title: '支付失败', icon: 'none', duration: 500 })
                break;
            }
          }
        })
      }, 2 * 1000)

      _this.cancelTimer = setTimeout(() => {
        _this.cancelOrderPay()
        _this.cancelCheckPayStatus();
      }, 60 * 1000)
    },
    cancelCheckPayStatus () {
      uni.removeStorageSync('order_info_box')
      // this.$common.toast({
      // 	title: '支付超时',
      // 	icon: 'none',
      // 	duration: 500
      // })
      if (this.checkTimer) {
        clearTimeout(this.checkTimer)
      }

      if (this.cancelTimer) {
        clearInterval(this.cancelTimer)
      }
    },
    // 取消支付
    cancelOrderPay () {
      const order_info = uni.getStorageSync('order_info_box')
      if (order_info.order_sn) {
        this.req({
          url: '/v1/pay/cancel',
          data: {
            order_sn: order_info.order_sn
          },
          Loading: true,
          success: (res) => {
            console.log(res)
          }
        })
      }
    },
    /**
* @description: 获取数据
* @return {*}
*/
    getData () {
      return new Promise((resolve, reject) => {
        this.req({
          url: '/v1/tower/info',
          data: {
            layer: this.optionsData.layer
          },
          Loading: true,
          success: res => {
            if (res.code == 200) {
              this.boxInfo = res.data.box
              this.awardList = res.data.awardList

              this.markList = res.data.box ? res.data.box.markList : []
              // 生成最终的 marks 数组
              this.marks = this.markList.map(mark => {
                return {
                  id: mark.id,
                  icon: mark.icon,
                  rate: mark.rate,
                  awards: this.awardList.filter(award => award.mark_id === mark.id)
                }
              })

              this.getDraw()
              resolve()
            }
          }
        })
      })
    },
    /**
* @description: 获取抽奖方式
* @return {*}
*/
    getDraw () {
      return new Promise((resolve, reject) => {
        this.req({
          url: '/v1/box/draw',
          data: {},
          Loading: true,
          success: res => {
            if (res.code == 200) {
              this.btnList = res.data
              resolve()
            }
          }
        })
      })
    },
    changePayType (e) {
      this.payTypeCur = e
    },
    changeBuyType (e) {
      this.btnCur = e
      this.confirmSubmit(0)
    },
    openBox () {
      this.confirmSubmit(0)
    },
    async confirmSubmit (e) {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      if (!this.userInfo) {
        this.$refs.loginPopup.open('center')
        return
      }
      if (this.btnList?.length == 0) {
        await this.getDraw()
      }

      if (e == 1 && !this.agree) {
        this.$common.toast({
          title: '请阅读并同意抽盒规则'
        })
        this.ruleType = 'buy'
        this.$common.getRule(3, true).then(res => {
          this.ruleData = res
          this.openRulePop()
        })
        return
      }

      let data = {
        id: this.boxInfo.id,
        draw_id: this.btnCur || '',
        invite_user_id: this.optionsData.userId || '',
        pay_type: this.payTypeList[this.payTypeCur].id,
        coupon_id: this.coupon_info?.id || '',
        submit: e
      }

      this.req({
        url: '/v1/tower/order',
        data,
        success: res => {
          if (res.code == 200) {
            if (e == 0) {
              this.orderData = res.data
              this.openOrderPop()
            } else {
              this.closeOrderPop()
              if (res.data.pay_money * 1 > 0) {
                // #ifdef H5 || MP
                const order_info = { order_sn: res.data.order_sn }
                uni.setStorageSync('order_info_box', order_info);
                this.checkPayStatus()
                // #endif
                const params = { ...res.data, is_epay: this.is_epay, returnUrl: `/pages/box/kaixiang?id=${this.boxInfo.id}` }
                this.$common.orderPay(params).then(res1 => {
                  if (res1 == 'success') {
                    this.$common.toast({
                      title: '支付成功',
                      icon: 'success',
                      duration: 1500,
                      success: () => {
                        this.$common.to({
                          type: 1,
                          url: '/pages/box/towerDraw',
                          query: {
                            id: this.boxInfo.id,
                            order_sn: res.data.order_sn,
                            drawNum: this.orderData.box.num,
                            layer: this.boxInfo.layer
                          }
                        })
                      }
                    })
                  }
                })
              } else {
                this.$common.toast({
                  title: '支付成功',
                  duration: 1500,
                  success: () => {
                    this.$common.to({
                      type: 1,
                      url: '/pages/box/towerDraw',
                      query: {
                        id: this.boxInfo.id,
                        order_sn: res.data.order_sn,
                        drawNum: this.orderData.box.num,
                        layer: this.boxInfo.layer
                      }
                    })
                  }
                })
              }
            }
          }
        }
      })
    },
    /**
* @description: 打开订单弹窗
* @return {*}
*/
    openOrderPop () {
      this.agree = true

      this.$refs.orderPop.open()
    },
    /**
 * @description: 关闭订单弹窗
 * @return {*}
 */
    closeOrderPop () {
      this.$refs.orderPop.close()
    },
    /**
* @description: 试玩
* @return {*}
*/
    tryPlay () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.$common.to({
        url: '/pages/index/draw',
        query: {
          id: this.boxInfo.id,
          drawNum: 1,
          type: 'play'
        }
      })
    },
    goMall () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      uni.switchTab({
        url: '/pages/index/index',
      });

    },
    upper: function (e) {
      // console.log(e)
    },
    lower: function (e) {
      // console.log(e)
    },
    scroll: function (e) {
      // console.log(e)
      this.scrollTop = e.detail.scrollTop
    },
    goInvite () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
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
    },
    // 玩法
    goRule () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.$common.to({ url: '/pages/index/rule?id=3' })
    },
    // 联系客服
    lxkefu () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.kefushow = true
    },
    openDetailPop (e) {
      this.curDetail = ''
      if (e.editor) {
        e.editor = e.editor.replace(
          /\<img/gi,
          '<img style="width: 100%;vertical-align: middle;"'
        )
      }

      this.curDetail = e
      this.$refs.detailPop.open()
    },
    closeDetailPop () {
      this.$refs.detailPop.close()
    },
    playMusic () {
      this.muteBgMusic = !this.muteBgMusic;
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      if (this.muteBgMusic) {
        bgMusic.play()
      } else {
        bgMusic.pause()
      }
    },
    noticeEnd (e) {
      console.log('123', e)
    },
    back () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })

      uni.navigateTo({
        url: '/pages/box/tower'
      });

    }
  },
}
</script>

<style lang='scss' scoped>
.kaixiang {
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

  .w-bg {
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
    position: relative;
    z-index: 7;
    padding-bottom: calc(constant(safe-area-inset-bottom) + 78px);
    padding-bottom: calc(env(safe-area-inset-bottom) + 78px);

    .tong {
      background: url('https://img.alicdn.com/imgextra/i4/2215984279448/O1CN013awXSu2JfEvQyxnJA_!!2215984279448.png');
      position: fixed;
      left: 0;
      top: 114px;
      width: 390px;
      background-size: 100% 100% !important;
      height: 41px;
      background-repeat: no-repeat !important;
      top: 78px;

      .text {
        padding: 0 15px;
        padding-right: 62px;
        box-sizing: border-box;
        position: relative;
      }

      .tong-image {
        position: absolute;
        width: 41px;
        right: 26px;
        top: 0px;
      }
    }



    .orderbox {
      background-color: #fff;
    }

    .orderbox-top {
      background-color: initial;
    }

  }

  .luckbox {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30rpx 20rpx;
    color: #999999;
    /* z-index: 100; */
    padding-bottom: env(safe-area-inset-bottom);
    background: url("../../static/home/tabbar-bg.png") no-repeat 50%/100% 100%;
    height: 200rpx;
    box-sizing: border-box;
  }

  .option {
    width: 100%;
    padding: 10px 0;

    .row {
      display: flex;
      justify-content: space-around;
      /* 均匀分布 */

      .chou {
        color: #000;
        background-size: 100%;
        width: 119px;
        display: flex;
        align-items: center;
        justify-content: center;
        /* 居中对齐 */
        text-align: center;
        height: 57px;
        margin: 0 10px;
        position: relative;
        flex-shrink: 0;
        border-radius: 10px;
        box-sizing: border-box;
        border: 1px solid #666;
        flex: 1;
        /* 均匀分布 */
        max-width: 150px;
        /* 限制按钮最大宽度 */
        margin: 0 5px;
        border: none;
        color: #fff;

        .chou-wrap {
          width: 100%;

          .chou-title {
            .chou-img {
              width: 150rpx;
              height: 100rpx;
            }
          }
        }
      }
    }
  }




  .luckbox-top {
    background: transparent;
  }

  .shop-list {
    box-sizing: border-box;
    // background-color: #5b46c6;
    // border-radius: 10px;
    overflow: hidden;
    margin: 30rpx 20rpx;
    padding-bottom: 200rpx;

    .shop-list-rate {
      height: 78px;
      // background-color: rgba(166, 171, 191, .2);
      display: flex;
      justify-content: center;
      align-items: center;
      // padding: 15px 5rpx;
      border: 2rpx solid #3cbcc1;
      margin-bottom: 30rpx;

      .recode-btn {
        color: #fff;
        font-size: 14px;
        padding: 10rpx 8rpx;
        background-image: linear-gradient(180deg, #6a4dff, #0dd9ff)
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

    // .mh-goods-list {
    //   padding: 20rpx 0;
    //   display: flex;
    //   flex-wrap: wrap;
    //   justify-content: flex-start;
    //   padding-bottom: 200rpx;

    //   .mh-goods-list-item {
    //     position: relative;
    //     flex: 1;
    //     margin: 0 10px 15px 0;
    //     background-color: rgba(0, 0, 0, .2);
    //     width: calc((100% - 20px) / 3);
    //     max-width: calc((100% - 20px) / 3);
    //     text-align: center;
    //     padding: 20rpx 3px;
    //     border-radius: 5px;
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: space-between;
    //     align-items: center;
    //     background-size: 100% 100%;

    //     &:nth-child(3n) {
    //       margin-right: 0;
    //     }

    //     .mh-goods-rate {
    //       width: 62px;
    //       height: 62px;
    //       position: absolute;
    //       top: 1px;
    //       left: 1px;
    //     }

    //     .mh-goods-img {
    //       width: 93px;
    //       height: 93px;
    //       margin-top: 20rpx;
    //     }

    //     .zhengming-wrap {
    //         width: 100px;
    //         height: 25px;
    //         position: absolute;
    //         left: 50%;
    //         transform: translateX(-50%);
    //         bottom: 30px;

    //         .zhengming-img {
    //           animation: bLine 3s linear infinite;
    //         }

    //         @keyframes bLine {

    //           0%,
    //           100% {
    //             transform: scale(1);
    //           }

    //           50% {
    //             transform: scale(1.2);
    //           }
    //         }
    //       }

    //     .mh-sale {
    //       background-color: rgba(0, 0, 0, 0.2);
    //       color: #fff;
    //       width: 100%;
    //     }

    //     .mh-goods-name {
    //       color: #fff;
    //       width: 100%;
    //       font-size: 12px;
    //       margin-top: 7px;
    //       display: -webkit-box;
    //       text-align: left;
    //       overflow: hidden;
    //       -webkit-box-orient: vertical;
    //       -webkit-line-clamp: 2;
    //     }

    //     .mh-goods-price {
    //       font-size: 12px;
    //       font-weight: 700;
    //       color: #fff;
    //       margin-top: 5px;
    //       width: 100%;
    //       text-align: left;

    //       text {
    //         color: #a2c2bd;
    //         font-size: 9px;
    //       }
    //     }
    //   }
    // }

    .list-rate {
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      // margin: 20rpx 0;
      // margin-bottom: 10rpx;

      .recode-btn {
        width: 150rpx;
      }

      .rate {}
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
          padding: 20rpx 3px;
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
          margin-top: 20rpx;
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

      .zhengming-wrap {
        width: 70px;
        height: 20px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 30px;

        .zhengming-img {
          animation: bLine 3s linear infinite;
        }

        @keyframes bLine {

          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.2);
          }
        }
      }

      .mh-sale {
        background-color: rgba(0, 0, 0, 0.2);
        color: #fff;
        width: 100%;
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

  .btmbox {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 40rpx;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    position: fixed;
    bottom: 0px;
    width: 100%;
    z-index: 10;

    .btn {
      width: 100%;
      border-radius: 7px;
      text-align: center;
      font-size: 18px;
      line-height: 78px;
      height: 78px;
      font-weight: 700;
      color: #c92a1c;
      background: url('https://img.alicdn.com/imgextra/i2/2215984279448/O1CN01sqNNxI2JfEvUzWn3Q_!!2215984279448.png') no-repeat;
      background-size: 100% 100%;
      background-position: top;


      .biankuan {}
    }
  }

}

.diamond-wrap {
  position: absolute;
  top: 100rpx;
  right: 40rpx;
  background-color: #000;
  padding: 0 20rpx;
  border-radius: 20rpx;
  color: #fff;
  display: flex;
  align-items: center;
  z-index: 10;
  // max-width: 150rpx;

  .diamond-img {
    width: 50rpx;
    margin-right: 10rpx;
  }
}
</style>

<style lang="scss">
.setbox {
  width: 600rpx;
  height: 250rpx;
  padding: 40rpx;
  background: #201e1e;
  color: #fff;

  .set-title {
    text-align: center;
    font-size: 18px;
    font-weight: 700;
  }

  .set-tip {
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-top: 40rpx;
  }

}

.setAnimate {
  position: fixed;
  right: 3px;
  top: 200px;
  z-index: 8;
  color: #fff;


  .btn {
    bottom: 200px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 70px;
    height: 70px;
    color: #fff;
    font-size: 17px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.bgbox {
  background: url('https://www.img.xcooo.cn/uploads/2024/02/d969aa4534f6b91e.png') no-repeat;
  background-size: 100% 100%;
  width: 540rpx;
  height: 680rpx;

  .off {
    text-align: right;
    padding: 15px;
    box-sizing: border-box;
  }

  .content {
    margin-top: 35px;
    text-align: center;
    display: flex;
    justify-content: center;

    .ma {
      width: 156px;
      height: 156px;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }

  .yi {
    text-align: center;
    font-size: 17px;
    color: #999;
    line-height: 26px;
    margin-top: 20px;
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



.order-pop {
  background: #222433;
  border-radius: 10rpx 10rpx 0 0;
  padding: 1rpx 30rpx;

  border-top-left-radius: 40rpx;
  border-top-right-radius: 40rpx;


  &-hd {
    height: 100rpx;
    position: relative;
    line-height: 100rpx;
    text-align: center;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #fff;

    .close {
      width: 40rpx;
      height: 40rpx;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &-bd {
    padding: 1rpx 0 0;

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30rpx;

      .title {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #fff;
      }

      .right {
        .price {
          font-size: 28rpx;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #d5b644;

          text {
            font-size: 34rpx;
          }
        }

        .empty-coupon {
          color: #d5b644;
        }

        .gray {
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
          color: #d5b644;
        }

        .red {
          color: #d5b644;
        }
      }
    }

    .btn-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: center;

      &-item {
        width: 130rpx;
        height: 69rpx;
        box-sizing: border-box;
        border-radius: 5rpx;
        border: 1rpx solid #bfbfbf;
        line-height: 69rpx;
        text-align: center;

        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #fff;
        margin-top: 20rpx;

        &.act {
          background: #000000;
          color: #fff;
          border-color: #000000;
        }
      }
    }

    .pay-type {
      margin-top: 30rpx;

      &-item {
        display: flex;
        align-items: center;
        height: 70rpx;

        .icon {
          width: 56rpx;
          height: 56rpx;
        }

        .title {
          flex: 1;
          padding: 0 10rpx;
          color: #fff;
        }
      }
    }

    .agree {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30rpx;

      .title {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #fff;

        text {
          color: #248da0;
        }
      }
    }

    .rule-content {
      max-height: 20vh;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #666666;
      margin-top: 40rpx;
    }
  }

  &-ft {
    width: 630rpx;
    height: 88rpx;
    // background: #000000;
    border-radius: 44rpx;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 0 30rpx;
    align-items: center;
    margin: 50rpx auto;

    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    background: url("../../static/home/btn-bg.png") no-repeat;
    background-size: 100vw 100%;

    .money {
      font-weight: bold;
      font-size: 24rpx;

      text {
        font-size: 32rpx;
      }
    }
  }
}

.detail-pop {
  background: #f2f2f2;
  border-radius: 10rpx 10rpx 0 0;
  overflow: hidden;

  &-hd {
    background: #f2f2f2;
    position: relative;
    // text-align: center;
    font-size: 32rpx;
    color: #333333;
    height: 80rpx;
    line-height: 80rpx;
    padding: 0 30rpx;

    .close {
      width: 40rpx;
      height: 40rpx;
      position: absolute;
      right: 20rpx;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &-bd {
    max-height: 60vh;
    min-height: 40vh;

    .detail-pic {
      width: 750rpx;
      height: 750rpx;
    }

    .detail-price {
      background: #fff;
      padding: 30rpx 30rpx 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .price {
        font-size: 24rpx;
        font-family: SourceHanSansCN;
        font-weight: 800;
        color: #333333;

        text {
          font-size: 38rpx;

          text {
            padding-left: 10rpx;

            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
          }
        }
      }

      .rate {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }
    }

    .detail-title {
      padding: 30rpx;
      background: #fff;

      &-content {
        text {
          padding: 2rpx 6rpx;

          font-size: 20rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffffff;
          margin-right: 10rpx;
        }

        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 43rpx;
      }
    }

    .zheng-tag {
      width: 100%;
      height: 100rpx;
    }

    .content-title {
      padding: 20rpx 30rpx;
      background: #fff;

      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }

    .content {
      background: #fff;
    }
  }
}

.zsbox-wrap {
  padding-bottom: 40rpx;
  background-color: #222333;
  min-height: 100%;

  .zsbox-top {
    padding: 20rpx;
    position: relative;
    z-index: 10;
    background-color: #222333;

    .zs-title {
      color: #fff;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      display: flex;
      justify-content: center;
      position: relative;
      margin-bottom: 40rpx;

      .zs-icon {
        position: absolute;
        right: 10px;
      }
    }

    .zs-wrap {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20rpx;

      .zs-items {
        color: #f8f8f8;
        width: 20%;
        text-align: center;
        padding: 10rpx;
        border-radius: 20rpx;
        background-color: #999;
        margin-right: 20rpx;
      }

      .activezs {
        background-color: #7768d5;
        color: #fff;
      }
    }
  }

  .zsend {
    color: #fff;
    text-align: center;
    margin: 50rpx;
  }

  .award-wrap {
    padding: 0 20rpx;
    padding-top: 120px;
  }

  .award-log-item {
    color: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    // background: url('@/static/web/319.png') no-repeat;
    background: url('https://xlcwmax.oss-cn-beijing.aliyuncs.com/aliyun/92a69c867c922ec3dffc06612a0cbd62.jpg') no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100px;
    padding: 10px 20px;
    padding-top: 25px;
    margin-bottom: 20rpx;
    position: relative;

    &:last-child {
      margin-bottom: 0;
    }

    .qishu {
      position: absolute;
      left: 0;
      top: 0;
      background-color: #8888e2;
      padding: 5rpx 10rpx;
      border-radius: 10rpx;
    }

    .award-log-left {
      flex: 1;
      width: 50%;

      .award-log-time {
        margin-bottom: 10px;
      }

      .award-log-info {
        font-size: 16px;
        width: 95%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        .award-name {
          color: #face5e;
          margin-left: 20rpx;

        }
      }
    }

    .award-log-right {
      .award-log-img {
        width: 60px;
        height: 60px;
        border-radius: 10rpx;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.coupon-wrap {
  padding-bottom: 40rpx;
  background-color: #222333;
  min-height: 100%;

  .coupon-title {
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    font-family: xcooo;
    text-align: center;
    padding: 40rpx 0;
  }
}

.youhuicon {
  padding: 20rpx;
  box-sizing: border-box;
}

.no {
  text-align: center;
  margin-top: 100rpx;
  font-size: 38rpx;
}

.youhuicon .couList {
  display: flex;
  border-radius: 6rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
}

.l {
  flex-shrink: 0;
  width: 200rpx;
  background-color: #6c58dc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.available {
  background-color: #999;
}


.youhuicon .couList .l .aa {
  font-size: 30rpx;
  color: #fff;
}

.youhuicon .couList .l .pri {
  font-size: 40rpx;
  color: #fff;
  text-align: center;
}

.youhuicon .couList .l .tiao {
  color: #fff;
  text-align: center;
  font-size: 16px;
  margin-top: 20rpx;
}

.count {
  color: #fff;
  font-size: 14px;
  margin-top: 20rpx;

  text {
    margin-right: 10rpx;
  }
}

.youhuicon .couList .r {
  background-color: #fff;
  width: 100%;
  padding: 20rpx;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #313131;
}

.youhuicon .couList .r .ll .t {
  font-size: 32rpx;
  color: #fff;
}

.man {
  margin-top: 20rpx;
  font-size: 14px;
  color: #fff;
}


.youhuicon .couList .r .use {
  margin: 8rpx 0;
}

.youhuicon .couList .r .qi {
  font-size: 24rpx;
  color: #999;
  margin-top: 20rpx;
}

.rr {
  color: #fff;
  background-color: orange;
  padding: 10rpx 20rpx;
  flex-shrink: 0;
  border-radius: 20rpx;
}

.xx {
  background-color: #6c58dc;
}

.xx2 {
  background-color: #999;
}
</style>