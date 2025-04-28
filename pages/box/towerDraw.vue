<!--
 * @Date: 2022-12-08 13:46:18
 * @LastEditTime: 2024-06-09 19:26:31
 * @Description: content
-->
<template>
  <view>
    <!-- 状态栏 -->
    <!-- <view class="status-bar common_bg" :style="{
      height: `${sysConfig.statusBarHeight}px`,
      width: '100%',
      backgroundImage: `url(${imgBaseUrl}${'/static/img/draw_page_bg.png'})`
    }"></view> -->
    <view class="page-wrap common_bg" :style="{
      backgroundImage: `url(${imgBaseUrl}${'/static/img/draw_page_bg.png'})`
    }">
      <template v-if="!animateSet && !popShow">
        <!-- <u-gap height="88"></u-gap> -->
        <view class="draw-wrap" :style="{
          opacity: initOk ? 1 : 0
        }">
          <view class="line">
            <view class="icon">
              <cimage src="/static/icon/dot.png" mode="scaleToFill" />
            </view>

            <view class="icon">
              <cimage src="/static/icon/dot.png" mode="scaleToFill" />
            </view>

            <view class="line-inner"></view>
          </view>

          <view class="draw-wrap-hd common_bg" :style="{
            backgroundImage: `url(${imgBaseUrl}${'/static/img/draw_hd_bg.png'})`
          }">
            <view class="title" v-if="drawNum == 1">一发入魂</view>
            <view class="title" v-else-if="drawNum == 2">幸运二连</view>
            <view class="title" v-else-if="drawNum == 3">霸气三连</view>
            <view class="title" v-else-if="drawNum == 4">欧气四连</view>
            <view class="title" v-else-if="drawNum == 5">五连绝世</view>
            <view class="title" v-else>豪气{{ drawNum | drawNum }}连</view>
            <!-- <view class="title" v-if="drawNum == 20">二十连绝世</view> -->
          </view>

          <view class="draw-wrap-bd">
            <view v-for="(item, i) in drawList" :key="i" class="row" :style="{
              transform: `translateX(${item.translate}px)`,
              'transition-property': drawState == 'start' ? 'all' : 'none',
              'transition-duration': `${item.duration}s`
            }">
              <view v-for="(a, b) in item.list" :key="b" class="row-item">
                <view class="pic" :style="{
                  backgroundImage: `url(${a.thumb})`
                }"></view>

                <view class="bar" :style="{ background: a.bgColor }"></view>
              </view>
            </view>
          </view>

          <view class="draw-wrap-ft common_bg" :style="{
            backgroundImage: `url(${imgBaseUrl}${'/static/img/draw_ft_bg.png'})`
          }"></view>
        </view>

        <view class="ft-btn">
          <view @click="stop" v-if="drawState == 'start'" class="btn">跳过</view>

          <view v-else class="btn hide"></view>
        </view>
      </template>

      <scroll-view class="prize-pop-wrap" v-else scroll-y>
        <view class="prize-pop common_bg" :style="{
          backgroundImage: `url(${imgBaseUrl}${'/static/img/draw_page_bg.png'})`
        }">
          <uni-nav-bar color="#fff" leftIcon="left" backgroundColor="transparent" :border="false" :statusBar="true"
            :fixed="true" @clickLeft="back()"></uni-nav-bar>

          <view class="open-title common_bg" :style="{
            backgroundImage: `url(${imgBaseUrl}${'/static/img/gong_xi_huo_de.png'})`
          }"></view>

          <view v-if="prizeResult.length == 1" class="prize-box">
            <view v-for="(item, i) in prizeResult" :key="i" class="prize-box-list">
              <view class="prize-box-item common_bg upin" :style="{
                backgroundImage: `url(${item.mark_bg_thumb})`
              }">
                <view class="pic">
                  <cimage :src="item.thumb" mode="scaleToFill" />
                </view>
                <view class="zhengming-wrap">
                  <cimage class="zhengming-img" v-if="item.type == 2" src="/static/web/zhengming1.png"
                    mode="scaleToFill" />
                  <cimage class="zhengming-img" v-if="item.type == 3" src="/static/web/zhengming2.png"
                    mode="scaleToFill" />
                </view>
                <view class="title hang1" v-if="item.type == 1">
                  {{ item.title }}
                </view>

                <view class="price" v-if="item.type == 1">
                  参考价:

                  <text>
                    ¥

                    <text>{{ item.price }}</text>
                  </text>
                </view>
              </view>
              <view class="dissolve_btn-wrap">
                <view class="dissolve_btn" @click="duihuan(item.order_list_id)"
                  v-if="!item.is_hs && optionsData.type != 'play'">
                  <!-- <view class="dissolve-title">掉落钻石: {{ item.diamond }}</view> -->
                  <view class="dissolve-price">退货星币: {{ item.return_price }}</view>
                </view>
                <view class="dissolve_btn dissolve_has_btn" v-if="item.is_hs" disabled>已退货</view>
              </view>
            </view>

          </view>

          <view v-else-if="prizeResult.length == 2" class="prize-box three">
            <view v-for="(item, i) in prizeResult" :key="i" class="prize-box-list">
              <view class="prize-box-item common_bg upin" :style="{
                backgroundImage: `url(${item.mark_bg_thumb})`,
                'animation-delay': `${i * 0.2}s`
              }">
                <view class="pic">
                  <cimage :src="item.thumb" mode="scaleToFill" />
                </view>

                <view class="title hang1">
                  {{ item.title }}
                </view>

                <view class="price">
                  参考价:

                  <text>
                    ¥

                    <text>{{ item.price }}</text>
                  </text>
                </view>
              </view>
              <view class="dissolve_btn" @click="duihuan(item.order_list_id)"
                v-if="!item.is_hs && optionsData.type != 'play'">
                <view class="dissolve-title">退货</view>
                <view class="dissolve-price">星币: {{ item.return_price }}</view>
              </view>
              <view class="dissolve_btn dissolve_has_btn" v-if="item.is_hs || is_hsa" disabled>已退货</view>
            </view>

          </view>

          <view v-else-if="prizeResult.length == 3" class="prize-box three">
            <view v-for="(item, i) in prizeResult" :key="i" class="prize-box-list">
              <view class="prize-box-item common_bg upin" :style="{
                backgroundImage: `url(${item.mark_bg_thumb})`,
                'animation-delay': `${i * 0.2}s`
              }">
                <view class="pic">
                  <cimage :src="item.thumb" mode="scaleToFill" />
                </view>
                <view class="zhengming-wrap">
                  <cimage class="zhengming-img" v-if="item.type == 2" src="/static/web/zhengming1.png"
                    mode="scaleToFill" />
                  <cimage class="zhengming-img" v-if="item.type == 3" src="/static/web/zhengming2.png"
                    mode="scaleToFill" />
                </view>
                <view class="title hang1" v-if="item.type == 1">
                  {{ item.title }}
                </view>
                <view class="price" v-if="item.type == 1">
                  参考价:
                  <text>
                    ¥
                    <text>{{ item.price }}</text>
                  </text>
                </view>
              </view>
              <view class="dissolve_btn-wrap">
                <view class="dissolve_btn" @click="duihuan(item.order_list_id)"
                  v-if="!item.is_hs && optionsData.type != 'play'">
                  <!-- <view class="dissolve-title">掉落钻石: {{ item.diamond }}</view> -->
                  <view class="dissolve-price">退货星币: {{ item.return_price }}</view>
                </view>
                <view class="dissolve_btn dissolve_has_btn" v-if="item.is_hs || is_hsa" disabled>已退货</view>
              </view>

            </view>
          </view>

          <view v-else-if="prizeResult.length == 4" class="prize-box five">
            <view v-for="(item, i) in prizeResult" :key="i">
              <view class="prize-box-item common_bg upin" :style="{
                backgroundImage: `url(${item.mark_bg_thumb})`,
                'animation-delay': `${i * 0.2}s`
              }">
                <view class="pic">
                  <cimage :src="item.thumb" mode="scaleToFill" />
                </view>

                <view class="title hang1">
                  {{ item.title }}
                </view>

                <view class="price">
                  参考价:

                  <text>
                    ¥

                    <text>{{ item.price }}</text>
                  </text>
                </view>
              </view>
            </view>
            <view class="dissolve_btn" @click="duihuan(item.order_list_id)"
              v-if="!item.is_hs && optionsData.type != 'play'">
              <view class="dissolve-title">退货</view>
              <view class="dissolve-price">星币: {{ item.return_price }}</view>
            </view>
            <view class="dissolve_btn dissolve_has_btn" v-if="item.is_hs" disabled>已退货</view>
          </view>

          <view v-else-if="prizeResult.length == 5" class="prize-box five">
            <view v-for="(item, i) in prizeResult" :key="i" class="prize-box-list">
              <view class="prize-box-item common_bg upin" :style="{
                backgroundImage: `url(${item.mark_bg_thumb})`,
                'animation-delay': `${i * 0.2}s`
              }">
                <view class="pic">
                  <cimage :src="item.thumb" mode="scaleToFill" />
                </view>
                <view class="zhengming-wrap">
                  <cimage class="zhengming-img" v-if="item.type == 2" src="/static/web/zhengming1.png"
                    mode="scaleToFill" />
                  <cimage class="zhengming-img" v-if="item.type == 3" src="/static/web/zhengming2.png"
                    mode="scaleToFill" />
                </view>
                <view class="title hang1" v-if="item.type == 1">
                  {{ item.title }}
                </view>

                <view class="price" v-if="item.type == 1">
                  参考价:
                  <text>
                    ¥
                    <text>{{ item.price }}</text>
                  </text>
                </view>
              </view>
              <view class="dissolve_btn-wrap">
                <view class="dissolve_btn" @click="duihuan(item.order_list_id)"
                  v-if="!item.is_hs && optionsData.type != 'play'">
                  <!-- <view class="dissolve-title">掉落钻石: {{ item.diamond }}</view> -->
                  <view class="dissolve-price">退货星币: {{ item.return_price }}</view>
                </view>
                <view class="dissolve_btn dissolve_has_btn" v-if="item.is_hs" disabled>已退货</view>
              </view>
            </view>

          </view>

          <view v-else class="prize-box tenth">
            <view v-for="(item, i) in prizeResult" :key="i" class="prize-box-list">
              <view class="prize-box-item common_bg upin" :style="{
                backgroundImage: `url(${item.mark_bg_thumb})`,
                'animation-delay': `${i * 0.2}s`
              }">
                <view class="pic">
                  <cimage :src="item.thumb ? item.thumb : ''" mode="scaleToFill" />
                </view>
                <view class="zhengming-wrap">
                  <cimage class="zhengming-img" v-if="item.type == 2" src="/static/web/zhengming1.png"
                    mode="scaleToFill" />
                  <cimage class="zhengming-img" v-if="item.type == 3" src="/static/web/zhengming2.png"
                    mode="scaleToFill" />
                </view>
                <view class="title hang1" v-if="item.type == 1">
                  {{ item.title }}
                </view>

                <view class="price" v-if="item.type == 1">
                  参考价:

                  <text>
                    ¥
                    <text>{{ item.price }}</text>
                  </text>
                </view>
              </view>
              <view class="dissolve_btn-wrap">
                <view class="dissolve_btn" @click="duihuan(item.order_list_id)"
                  v-if="!item.is_hs && optionsData.type != 'play'">
                  <!-- <view class="dissolve-title">掉落钻石: {{ item.diamond }}</view> -->
                  <view class="dissolve-price">退货星币: {{ item.return_price }}</view>
                </view>
                <view class="dissolve_btn dissolve_has_btn" v-if="item.is_hs" disabled>已退货</view>
              </view>
            </view>
          </view>

          <view class="total-diamond">
            特殊奖励-幸运石: {{ total_diamond }}
          </view>

          <view class="ft-btn">

            <view v-if="optionsData.type != 'play'" @click="toBag" class="btn">
              去赏袋
            </view>
            <!-- <view v-if="optionsData.type != 'play'" @click="duihuan('-1')" class="btn" disabled>
              <view class="">{{ is_hsa != false ? '退货成功' : '全部退货' }}</view>
              <view class="total_return_price">星币: {{ total_return_price }}</view>
            </view> -->
            <view @click="again" class="btn again-btn">知道了</view>

            <view v-if="optionsData.type == 'play'" @click="back" class="btn">
              来把真的
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 攀登证明 -->
    <u-popup v-model="climbShow" mode="center" border-radius="16" height="35%" width="80%" :closeable="false"
      :mask-close-able="false">
      <view class="zsbox">
        <view class="zs-title">提示</view>
        <view class="zs-tip">恭喜您抽中<span class="zs-margin">「攀登!」</span>赏品，是否继续前进?</view>
        <view class="zs-btn-wrap">
          <view class="zs-btn zs-btn-01" @click="cacelPandeng">
            稍等一会
          </view>
          <view class="zs-btn zs-btn-02" @click="submitPandeng">
            前进
          </view>
        </view>
      </view>
    </u-popup>

    <!-- 通关证明 -->
    <u-popup v-model="topShow" mode="center" border-radius="16" height="35%" width="80%" :closeable="false"
      :mask-close-able="false">
      <view class="zsbox">
        <view class="zs-title">提示</view>
        <view class="zs-tip">您已通关全部层级，正式踏入封神榜</view>
        <view class="zs-btn-wrap">
          <view class="zs-btn zs-btn-01" @click="cacelTop">
            稍等一会
          </view>
          <view class="zs-btn zs-btn-02" @click="submitTop">
            前进
          </view>
        </view>
      </view>
    </u-popup>

    <!-- 滑落证明 -->
    <u-popup v-model="fallShow" mode="center" border-radius="16" height="35%" width="85%" :closeable="false"
      :mask-close-able="false">
      <view class="zsbox">
        <view class="zs-title">提示</view>
        <view class="zs-tip">
          很遗憾，您抽中了「滑落」赏品! 因该赏品位于您当前最高层记录的赏品，您将会从当前层数降低一层.是否消耗
          <image class="diamond-img" src="../../static/image/xr.png" mode="widthFix" lazy-load="false" binderror=""
            bindload="" />{{ box_diamond }}颗维持当前层数?
          <view class="zs-de">当前拥有: 幸运石 {{ diamonds }} 颗</view>
        </view>

        <view class="zs-btn-wrap">
          <view class="zs-btn zs-btn-01" @click="cacelFall">
            取消
          </view>
          <view class="zs-btn zs-btn-02" @click="submitFall">
            确定
          </view>
        </view>
      </view>
    </u-popup>

    <!-- 首通奖励 -->
    <u-popup v-model="firstRewardPopup" mode="center" border-radius="16" height="35%" width="85%" :closeable="false"
      :mask-close-able="false">
      <view class="reward-popup-wrap">
        <view class="popup-title">恭喜获得首通奖励</view>
        <scroll-view scroll-y>
          <view class="reward-list">
            <view class="reward-item">
              <view class="reward-content">
                <view class="reward-info">
                  <view class="reward-description">{{ firstRewardInfo.title }}</view>
                  <view class="reward-description">￥{{ firstRewardInfo.price }}</view>
                </view>
                <view class="reward-thumb">
                  <img :src="firstRewardInfo.thumb" alt="reward thumbnail" />
                </view>
              </view>
            </view>
            <view class="zs-btn-wrap">
              <view class="zs-btn zs-btn-01" @click="cacelFirstRewardPopup">
                取消
              </view>
              <view class="zs-btn zs-btn-02" @click="submitFirstRewardPopup">
                确定
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
const switchMp3 = 'https://www.img.xcooo.cn/uploads/2024/02/17887756404cea30.mp3'
const switchMusic = uni.createInnerAudioContext();
const endMp3 = 'https://www.img.xcooo.cn/uploads/2024/02/e34d00f058366888.mp3'
const ingMp3 = 'https://www.img.xcooo.cn/uploads/2024/02/efa9b5a3ac2ae0cb.mp3'
const endMusic = uni.createInnerAudioContext();
const ingMusic = uni.createInnerAudioContext();
export default {
  data () {
    return {
      climbShow: false,
      fallShow: false,
      topShow: false,
      firstRewardPopup: false,
      firstRewardInfo: {},
      is_hsa: false,
      optionsData: '',
      drawNum: 5,
      /* 每行奖品长度 */
      rowLenght: 30,
      /* 抽奖转动时间 */
      duration: 0,
      initOk: false, // 是否已完成初始化
      minLen: 15, // 抽奖列表长度
      drawState: 'stop', // 抽奖状态
      drawTimer: null, // 抽奖定时器
      itemWidth: 0, // 每个奖品的宽度
      /* 奖品弹窗显示 */
      popShow: false,
      drawList: [],
      /* 中奖列表 */
      prizeResult: [],
      all: false,
      animateSet: true,
      total_return_price: 0,
      diamonds: 0,
      box_diamond: 0,
      current_layer: 0,
      total_diamond: 0
    }
  },

  computed: {
    ...mapGetters(['sysConfig', 'ingMusic', 'allMusic'])
  },
  onLoad (options) {
    this.optionsData = options
    console.log(this.optionsData)
    this.drawNum = options.drawNum
    endMusic.src = endMp3
    // ingMusic.src = ingMp3
    switchMusic.src = switchMp3
  },
  onShow () {
    this.getData()
  },
  onUnload () {
    this.ingMusic.stop()
    endMusic.stop()
  },
  filters: {
    drawNum (value) {
      console.log(value)
      const arr = { 6: '六', 7: '七', 8: '八', 9: '九', 10: '十' }
      return arr[value]
    }
  },
  methods: {
    cacelTop () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.topShow = false
      this.$common.back()
    },
    // 用户登顶
    submitTop () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.req({
        url: '/v1/tower/order/userTop',
        Loading: true,
        success: async res => {
          if (res.code == 200) {
            this.topShow = false
            this.$common.to({
              url: '/pages/box/rank'
            })
          }
        }
      })
    },
    cacelPandeng () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.climbShow = false
      this.$common.back()
    },
    // 用户攀登
    submitPandeng () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.req({
        url: '/v1/tower/order/climb',
        data: {
          box_id: this.optionsData.id
        },
        Loading: true,
        success: async res => {
          if (res.code == 200) {
            this.climbShow = false
            this.current_layer = res.data.layer
            if (res.data.receivedFirstReward) {
              // 展示首通奖励
              this.firstRewardPopup = true
              this.firstRewardInfo = res.data.firstRewardInfo
            } else {
              // 直接返回
              this.$common.to({
                url: '/pages/box/towerDetail',
                query: {
                  layer: this.current_layer
                }
              })
            }

          }
        }
      })

    },
    cacelFirstRewardPopup () {
      this.firstRewardPopup = false
      this.$common.to({
        url: '/pages/box/towerDetail',
        query: {
          layer: this.current_layer
        }
      })
    },
    submitFirstRewardPopup () {
      this.firstRewardPopup = false
      this.$common.to({
        url: '/pages/box/towerDetail',
        query: {
          layer: this.current_layer
        }
      })
    },
    cacelFall () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.req({
        url: '/v1/tower/order/cancelFall',
        data: {

        },
        Loading: true,
        success: async res => {
          if (res.code == 200) {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              mask: true,
              success: () => {
                this.fallShow = false
                this.$common.to({
                  url: '/pages/box/towerDetail',
                  query: {
                    layer: res.data.layer
                  }
                })
              }
            })
          }
        }
      })
    },
    submitFall () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.req({
        url: '/v1/tower/order/submitFall',
        data: {
          box_id: this.optionsData.id
        },
        Loading: true,
        success: async res => {
          if (res.code == 200) {
            this.fallShow = false
            this.$common.to({
              url: '/pages/box/towerDetail',
              query: {
                layer: res.data.layer
              }
            })
          }
        }
      })
    },
    back () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.checkOrderAward()
      // this.$common.back()
    },
    /**
     * @description: 再来一次
     * @return {*}
     */
    again () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      if (this.optionsData.type == 'play') {
        this.popShow = false
        this.initOk = false
        this.drawList = []
        this.getData()
      } else {
        // uni.$emit('again', {})
        // this.$common.back()
        this.checkOrderAward()
      }
    },
    /**
     * @description: 去提货
     * @return {*}
     */
    toBag () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      getApp().globalData.tabCur = 0
      uni.switchTab({
        url: '/pages/tabBar/bag',
      });
    },
    // 检查是否存在攀登和滑落证明和登顶证明
    checkOrderAward () {
      return new Promise((resolve, reject) => {
        let url = '/v1/tower/checkOrderAward'
        let data = {
          order_sn: this.optionsData.order_sn,
          box_id: this.optionsData.id,
          layer: this.optionsData.layer,
        }
        this.req({
          url,
          data,
          Loading: false,
          success: res => {
            if (res.code == 200) {
              this.climbShow = res.data.has_climb_award
              this.fallShow = res.data.has_fall_award
              this.topShow = res.data.topShow

              this.diamonds = res.data.diamonds
              this.box_diamond = res.data.box_diamond
              if (!this.climbShow && !this.fallShow && !this.topShow) {
                this.$common.back()
              }
              resolve()
            }
          }
        })
      })
    },
    /**
     * @description: 开奖
     * @return {*}
     */
    openBox () {
      return new Promise((resolve, reject) => {
        let url = '/v1/box/order/award'
        let data = {}

        if (this.optionsData.type == 'play') {
          url = '/v1/box/order/tryplay'
          data.id = this.optionsData.id
        } else {
          data.order_sn = this.optionsData.order_sn
        }

        this.req({
          url,
          data,
          Loading: false,
          success: res => {
            if (res.code == 200) {
              this.prizeResult = res.data.list
              console.log(this.prizeResult)

              this.total_return_price = res.data.total_return_price
              this.total_diamond = res.data.total_diamond
              this.drawNum = res.data.list.length
              resolve()
            }
          }
        })
      })
    },

    /**
     * @description: 获取数据
     * @return {*}
     */
    getData () {
      this.req({
        url: '/v1/box/info',
        data: {
          id: this.optionsData.id,
          car_type: this.optionsData.car_type ? this.optionsData.car_type : ''
        },
        Loading: true,
        success: async res => {
          if (res.code == 200) {
            await this.openBox()
            this.init({ list: res.data.awardList })
          }
        }
      })
    },
    /**
     * @description: 粉碎商品
     * @param {*}
     * @return {*}
     */
    duihuan (id) {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      let arr = Array.from(Object.values(this.prizeResult), x => x);
      if (this.is_hsa != false) {
        this.$common.toast({
          title: '已全部退货了',
          icon: 'error',
          duration: 600
        })
        return
      }
      if (id == '-1') {
        let ids = [];
        this.all = true;
        arr.forEach((val, index) => {
          ids.push(val.order_list_id);
        })
        id = ids

      }
      this.req({
        url: '/v1/user/ship/box/dissolveByOrderListId',
        data: {
          id: id
        },
        success: res => {
          if (res.code == 200) {
            this.$common.toast({
              title: res.msg,
              icon: 'success',
              duration: 600,
              success: () => {
                if (this.all) {
                  this.is_hsa = true
                }
                arr.forEach((val, index) => {
                  if (val.order_list_id == id || this.all) {
                    val.is_hs = true;
                  }
                })
                this.prizeResult = arr

                // 返回到上一页
                this.$common.back()
              }
            })
          }
        }
      })
    },
    /**
     * @description: 停止滚动
     * @param {*} res
     * @return {*}
     */
    stop () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.drawState = 'stop'
      this.drawTimer && clearTimeout(this.drawTimer)
      this.drawTimer = null
      // this.duration = 0

      /* 停止滚动 */
      this.drawList = this.drawList.map(item => {
        item.duration = 0
      })

      this.ingMusic.stop()
      endMusic.play()
      this.popShow = true
    },

    /**
     * @description: 抽奖
     * @param {*} res 中奖位置
     * @return {*}
     */
    draw (res) {
      console.log(res, 111);
      if (this.drawState == 'start') {
        console.warn('正在抽奖中')
        return
      }
      console.log('开始了', res)
      this.drawState = 'start'
      res.forEach(v => {
        if (v.mark_title == '传说') {
          v.bgColor = '#fc474e'
        } else if (v.mark_title == '史诗') {
          v.bgColor = '#4534fe'
        }
        else if (v.mark_title == '稀有') {
          v.bgColor = '#f8c84c'
        }
        else if (v.mark_title == '高级') {
          v.bgColor = '#81beff'
        }
      })
      this.prizeResult = res
      let arr = JSON.parse(JSON.stringify(this.drawList))
      arr.map((item, i) => {
        /* 设置滚动位置 */
        item.translate = (item.list.length - 3) * this.itemWidth * -1

        /* 将中奖奖品放入抽奖列表中 */
        item.list[item.list.length - 3] = res[i]

        // item.list.forEach(v => {
        //   if (v.mark_title == '传说') {
        //     v.bgColor = '#de0220'
        //   } else if (v.mark_title == '史诗') {
        //     v.bgColor = '#220732'
        //   }
        //   else if (v.mark_title == '稀有') {
        //     v.bgColor = '#bb9e11'
        //   }
        //   else if (v.mark_title == '高级') {
        //     v.bgColor = '#082b51'
        //   }
        // })
      })

      this.drawList = arr

      console.log('即将停止')
      /* 动画结束后停止 */

      this.ingMusic.startTime = 0.9
      this.ingMusic.stop()
      this.ingMusic.play()
      this.drawTimer = setTimeout(() => {
        this.stop()
      }, this.duration)
    },

    /**
     * @description: 初始化
     * @param {*} list  滚动列表
     * @param {*} duration  抽奖转动时间
     * @return {*}
     */
    init ({ list, duration = 9000 }) {
      let prizeList = JSON.parse(JSON.stringify(list))

      /* 如果奖品列表长度不满每行长度,补满 */
      if (prizeList.length < this.rowLenght) {
        for (let i = 0; prizeList.length < this.rowLenght; i++) {
          if (i == list.length) {
            i = 0
          }

          prizeList.push(list[i])
        }
        /* 奖品列表长度大于每行长度,截取对应长度 */
      } else {
        prizeList = prizeList.slice(0, this.rowLenght)
      }

      let arr2 = []
      /* 根据抽奖次数生成二维数组 */
      for (let i = 0; i < this.drawNum; i++) {
        /* 对数组进行打乱,并插入 */
        let list = JSON.parse(JSON.stringify(prizeList)).sort(() => {
          return Math.random() < 0.5 ? 1 : -1
        })

        /* 随机向数组中插入一个元素 */
        if (i % 2 == 0) {
          list.push(list[Math.floor(Math.random() * list.length)])
        }

        arr2.push({ list })
      }

      this.$nextTick(() => {
        this.duration = this.animateSet == true ? 0 : duration

        if (this.animateSet) {
          this.initOk = true
          endMusic.play()
          setTimeout(() => {
            this.draw(this.prizeResult)
          }, 100)
        } else {
          const query = uni.createSelectorQuery().in(this)
          query
            .select('.draw-wrap-bd')
            .boundingClientRect(data => {
              this.itemWidth = data.width

              arr2.map(item => {
                item.translate = data.width * -2
                item.duration = duration / 1000

              })

              this.drawList = arr2

            })
            .exec(res => {
              this.initOk = true

              setTimeout(() => {
                this.draw(this.prizeResult)
              }, 100)
            })
        }

      })
    }
  }
}
</script>

<style lang="scss">
@keyframes zoom-in {
  0% {
    transform: scale(0, 0);
    opacity: 0;
  }

  100% {
    transform: scale(1, 1);
    opacity: 1;
  }
}

.zoom-in {
  animation: zoom-in 0.5s;
}

@keyframes upin {
  0% {
    transform: translateY(-100vh);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.upin {
  animation-name: upin;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.page-wrap {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  min-height: 100vh;
  overflow-x: hidden;

  ::v-deep.uni-navbar {
    position: fixed;
  }

  ::v-deep.uni-navbar__content {
    top: 0;
  }

  .draw-wrap {
    position: relative;

    .line {
      position: absolute;
      z-index: 10;
      left: 50%;
      top: 140rpx;
      width: 50rpx;
      height: calc(100% - 168rpx);
      transform: translateX(-50%);
      box-sizing: border-box;
      padding: 24rpx 0;
      display: flex;
      justify-content: center;

      .icon {
        position: absolute;
        z-index: 1;
        width: 50rpx;
        height: 50rpx;
        left: 0;
        top: 0;
      }

      .icon+.icon {
        top: auto;
        bottom: 0;
      }

      &-inner {
        width: 4rpx;
        height: 100%;
        background: #ffffff;
      }
    }

    &-hd {
      width: 100%;
      height: 230rpx;
      text-align: center;
      box-sizing: border-box;
      padding-top: 90rpx;

      .title {
        font-size: 40rpx;
        font-weight: bold;
        transform: skew(-10deg);
        color: #ffffff;
        text-shadow: 1rpx 4rpx 20rpx rgba(87, 103, 229, 1);
      }
    }

    &-bd {
      width: 150rpx;
      margin: 0 auto;
      transform: translate3d(0, 0, 0);
      perspective: 1000;

      .row {
        width: 100%;
        height: 150rpx;
        display: flex;

        &-item {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;

          &:nth-child(4n-3) {
            .bar {
              background: #4534fe;
            }
          }

          &:nth-child(4n-2) {
            .bar {
              background: #fc474e;
            }
          }

          &:nth-child(4n-1) {
            .bar {
              background: #81beff;
            }
          }

          &:nth-child(4n) {
            .bar {
              background: #f8c84c;
            }
          }

          .pic {
            width: 150rpx;
            height: 150rpx;
            box-sizing: border-box;
            padding: 34rpx;
            position: relative;
            z-index: 2;
            background-size: 82rpx 82rpx;
            background-repeat: no-repeat;
            background-position: center center;
          }

          .bar {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30rpx;
            transform: skew(-10deg);
            box-shadow: inset 0rpx 5rpx 1rpx 0rpx rgba(255, 255, 255, 0.23),
              inset 0rpx 0rpx 5rpx 0rpx rgba(0, 0, 0, 0.5);
          }
        }
      }
    }

    &-ft {
      width: 100%;
      height: 168rpx;
      margin-top: -40rpx;
    }
  }

  .total-diamond {
    display: flex;
    justify-content: center;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30rpx;
  }

  .ft-btn {
    display: flex;
    justify-content: space-around;
    flex-flow: wrap;



    .btn {
      width: 303rpx;
      background: #000000;
      border-radius: 10rpx;
      text-align: center;
      box-shadow: inset 0 0 40rpx 0 #61708f;

      font-size: 30rpx;
      font-weight: bold;
      font-style: italic;
      color: #ffffff;
      padding: 12rpx 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .total_return_price {
        font-size: 14px;
        font-style: normal;
        margin-top: 5rpx;
      }


      &.hide {
        opacity: 0;
      }


    }

    .again-btn {
      padding: 30rpx 0;
    }

    .btn+.btn {
      color: #ff6666;
    }

    .btn+.btn+.btn {
      margin-top: 20rpx;
      color: #55aaff;
    }
  }

  .prize-pop-wrap {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;

    .prize-pop {
      width: 100vw;
      min-height: 100vh;
      z-index: 10;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;

      .open-title {
        width: 100%;
        height: 116rpx;
      }

      .prize-box {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        padding: 40rpx 0;
        padding-bottom: 20rpx;

        .prize-box-list {
          margin-bottom: 30rpx;
        }

        &-item {
          width: 400rpx;
          height: 500rpx;
          box-sizing: border-box;
          padding-top: 120rpx;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          transform: translateY(-100vh);
          margin-bottom: 20rpx;
          position: relative;

          .pic {
            width: 200rpx;
            height: 200rpx;
          }

          .zhengming-wrap {
            width: 100px;
            height: 25px;
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

          .title {
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            width: 100%;
            box-sizing: border-box;
            padding: 30rpx 30rpx;
            text-align: center;
          }

          .price {
            width: 100%;
            box-sizing: border-box;
            padding: 0 30rpx;

            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            text-align: center;

            text {
              font-size: 24rpx;
              font-weight: bold;

              text {
                font-size: 32rpx;
              }
            }
          }

        }

        .dissolve_btn-wrap {
          display: flex;
          justify-content: center;

          .dissolve_btn {

            width: 90%;
            color: #fff;
            background: #000000;
            box-shadow: inset 0 0 40rpx 0 #61708f;
            border-radius: 10rpx;
            font-size: 14px;
            color: #ffffff;
            padding: 15rpx 0rpx;
            text-align: center;

            .dissolve-title {
              margin-bottom: 10rpx;
            }

            .dissolve-price {}
          }

          .dissolve_has_btn {
            font-size: 40rpx;
            font-style: italic;
            font-weight: 700;
            padding: 20rpx 0;
          }
        }

      }

      .three {
        .prize-box-list {
          margin-bottom: 30rpx;
        }

        .prize-box-item {
          width: 300rpx;
          height: 350rpx;
          padding-top: 70rpx;
          margin-right: 20rpx;
          margin-bottom: 20rpx;

          .pic {
            width: 170rpx;
            height: 170rpx;
          }

          .title {
            font-size: 22rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            padding: 14rpx 30rpx;
          }

          .price {
            font-size: 20rpx;
            padding: 0rpx 30rpx;

            text {
              font-size: 20rpx;

              text {
                font-size: 24rpx;
              }
            }
          }
        }

        .dissolve_btn-wrap {
          display: flex;
          justify-content: center;

          .dissolve_btn {
            // width: 250rpx;
            width: 90%;
            color: #fff;
            background: #000000;
            box-shadow: inset 0 0 40rpx 0 #61708f;
            border-radius: 10rpx;
            font-size: 14px;
            color: #ffffff;
            padding: 12rpx 0rpx;
            text-align: center;

            .dissolve-title {
              margin-bottom: 10rpx;
            }

            .dissolve-price {}
          }

          .dissolve_has_btn {
            font-size: 40rpx;
            font-style: italic;
            font-weight: 700;
            padding: 20rpx 0;
          }
        }


      }

      .five {
        padding: 40rpx 0rpx;

        .prize-box-list {
          margin-bottom: 30rpx;

          &:nth-child(3n) {
            .prize-box-item {
              margin-right: 0;
            }
          }
        }

        .prize-box-item {
          width: 230rpx;
          height: 300rpx;
          padding-top: 70rpx;
          margin-right: 20rpx;
          margin-bottom: 20rpx;

          .pic {
            width: 120rpx;
            height: 120rpx;
          }

          .title {
            font-size: 18rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            padding: 10rpx 20rpx;
          }

          .price {
            font-size: 16rpx;
            padding: 0rpx 20rpx;

            text {
              font-size: 16rpx;

              text {
                font-size: 18rpx;
              }
            }
          }

        }

        .dissolve_btn-wrap {
          display: flex;
          justify-content: center;

          .dissolve_btn {
            width: 220rpx;
            color: #fff;
            background: #000000;
            box-shadow: inset 0 0 40rpx 0 #61708f;
            border-radius: 10rpx;
            font-size: 14px;
            color: #ffffff;
            padding: 12rpx 0rpx;
            text-align: center;

            .dissolve-title {
              margin-bottom: 10rpx;
            }

            .dissolve-price {}
          }

          .dissolve_has_btn {
            font-size: 40rpx;
            font-style: italic;
            font-weight: 700;
            padding: 20rpx 0;
          }
        }
      }

      .tenth {
        padding: 40rpx 0rpx;

        .prize-box-list {
          // margin-bottom: 30rpx;
          width: 20%;
          height: 300rpx;
          padding: 5px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;

          // &:nth-child(3n) {
          //   .prize-box-item {
          //     margin-right: 0;
          //   }
          // }
        }

        .prize-box-item {
          // width: 230rpx;
          // height: 300rpx;
          // padding-top: 70rpx;
          // margin-right: 20rpx;
          // margin-bottom: 20rpx;

          width: 100%;
          position: relative;
          background-position: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: 50rpx;

          .zhengming-wrap {
            width: 60px;
            height: 20px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 10px;

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

          .pic {
            // width: 120rpx;
            // height: 120rpx;
            width: 60%;
            height: 60%;
          }

          .title {
            font-size: 18rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            padding: 10rpx 20rpx;
          }



          .price {
            font-size: 16rpx;
            padding: 0rpx 20rpx;

            text {
              font-size: 16rpx;

              text {
                font-size: 18rpx;
              }
            }
          }


        }

        .dissolve_btn-wrap {
          display: flex;
          justify-content: center;

          .dissolve_btn {
            width: 90%;
            color: #fff;
            background: #000000;
            box-shadow: inset 0 0 40rpx 0 #61708f;
            border-radius: 10rpx;
            font-size: 14px;
            color: #ffffff;
            padding: 12rpx 0rpx;
            text-align: center;

            .dissolve-title {
              margin-bottom: 10rpx;
            }

            .dissolve-price {
              font-size: 12px;
            }
          }

          .dissolve_has_btn {
            font-size: 40rpx;
            font-style: italic;
            font-weight: 700;
            padding: 20rpx 0;
          }
        }


      }

    }
  }

}

.zsbox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 15px;
}

.zs-title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.zs-tip {
  text-align: center;
  font-size: 16px;
  margin: 20px 0;

  .diamond-img {
    vertical-align: middle;
    /* 垂直对齐 */
    width: 30rpx;
    /* 根据需要调整图片大小 */
    height: auto;
    margin: 0 5px;
    /* 根据需要调整左右间距 */
  }
}

.zs-de {
  margin-top: 30rpx;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
}



.zs-btn-wrap {
  display: flex;
  justify-content: space-between;

  .zs-btn {
    background: #333;
    width: 200rpx;
    padding: 20rpx 30rpx;
    color: #fff;
    text-align: center;
    border-radius: 40rpx;
  }

  .zs-btn-01 {
    background: #333;
    color: #fff;
  }

  .zs-btn-02 {
    background: #fee7b6;
    color: #333;
  }
}
</style>

<style lang="scss">
.reward-popup-wrap {
  padding: 20px;
  color: #fff;
  background-color: #1e1e1e;
  padding-bottom: 80rpx;
  height: 100%;

}

.popup-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.reward-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.reward-item {
  display: flex;
  flex-direction: column;
  background-color: #2a2a2a;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.reward-rank {
  font-size: 20px;
  font-weight: bold;
  color: #00ff00;
  margin-bottom: 10px;
}

.reward-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reward-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reward-title {
  font-size: 18px;
  font-weight: bold;
}

.reward-description {
  font-size: 16px;
  color: #bbb;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.reward-thumb {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin-left: 20rpx;
  flex-shrink: 0;
}

.reward-thumb img {
  max-width: 100%;
  max-height: 100%;
}
</style>