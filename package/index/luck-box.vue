<!--
 * @Date: 2022-12-03 10:37:24
 * @LastEditTime: 2022-12-29 15:22:01
 * @Description: content
-->
<template>
  <view v-if="pageData" class="page-wrap">
    <view
      class="page-wrap-hd common_bg"
      :style="{
        backgroundImage: `url(${imgBaseUrl}${'/static/img/luck_box_bg.png'})`
      }"
    >
      <uni-nav-bar
        color="#fff"
        leftIcon="left"
        backgroundColor="transparent"
        :border="false"
        :statusBar="true"
        :fixed="false"
        @clickLeft="$common.back()"
      ></uni-nav-bar>

      <view
        class="countdown-wrap common_bg"
        :style="{
          backgroundImage: `url(${imgBaseUrl}${'/static/img/countdown_bg.png'})`,
          marginTop: `calc(277rpx - ${sysConfig.statusBarHeight}px - 44px)`
        }"
      >
        兑换后请在

        <u-count-down
          separator-size="28"
          font-size="28"
          color="#F42A4B"
          separator-color="#F42A4B"
          :show-days="false"
          bg-color="transparent"
          :timestamp="countdown"
          @end="timeEnd"
        ></u-count-down>

        后开启盲盒
      </view>
    </view>

    <view
      @click="$common.toRule(9)"
      class="fixed-rule-btn"
      :style="{
        top: `calc(${sysConfig.statusBarHeight}px + 280rpx)`
      }"
    >
      规则
    </view>

    <view class="choose-card">
      <view class="choose-card-hd">第{{ pageData.term.title }}期幸运盲盒</view>

      <view class="choose-card-bd">
        <view @click="$common.toRule(9)" class="title">
          所有盲盒均有奖励 幸运盲盒基础奖励最高·规则

          <uni-icons
            :style="{
              fontWeight: 'normal'
            }"
            type="right"
            color="#FB4A3A"
            size="14"
          />
        </view>

        <view class="desc">
          {{ userInfo.coin }}点,每{{ pageData.term.need_coin }}点积分兑换1个盲盒
        </view>

        <view class="box-list">
          <view
            v-for="(item, i) in pageData.number"
            :key="i"
            class="box-list-item common_bg"
            :style="{
              backgroundImage: `url(${imgBaseUrl}${
                item.buy_num > 0
                  ? '/static/img/box_act.png'
                  : '/static/img/box.png'
              })`
            }"
          >
            <view v-if="item.buy_num > 0" class="dot">{{ item.buy_num }}</view>

            <view class="num">{{ item.number }}</view>

            <view class="title">号盲盒</view>
          </view>
        </view>

        <view @click="openChoosePop" class="choose-btn">选择盲盒</view>

        <view class="btn-list">
          <view
            @click="$common.to({ url: '/package/index/luck-prize' })"
            class="btn"
          >
            本期奖励
          </view>

          <view @click="getTask" class="btn">积分任务</view>
        </view>
      </view>
    </view>

    <view class="give-card">
      <view class="give-card-hd">
        <view class="icon">
          <cimage src="/static/icon/gift.png" mode="scaleToFill" />
        </view>

        <view class="title">隐藏超值送</view>

        <view class="progress-wrap">
          <cmd-progress
            :percent="
              (pageData.term.luckbox_progress / pageData.term.hiden_need) * 100
            "
            :show-info="false"
            stroke-color="#FD462A"
            :stroke-width="10"
          ></cmd-progress>

          <view class="num">
            {{ pageData.term.luckbox_progress }}/{{ pageData.term.hiden_need }}
          </view>
        </view>

        <view @click="openYinPop" class="to-progress">查看进度</view>
      </view>

      <view class="give-card-bd">
        <view class="title">
          连续获得{{ pageData.term.hiden_need }}次幸运盲盒

          <text>额外必得</text>

          以下隐藏款商品
        </view>

        <scroll-view scroll-x class="prize-list-wrap">
          <view class="prize-list-content">
            <view class="prize-list">
              <view
                v-for="(item, i) in pageData.hiden_award"
                :key="i"
                class="prize-list-item"
              >
                <view class="pic">
                  <cimage :src="item.thumb" mode="scaleToFill" />
                </view>

                <view class="title hang1">
                  {{ item.title }}
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>

    <view class="btn-card">
      <view
        @click="toPage(item)"
        v-for="(item, i) in btnList"
        :key="i"
        class="btn-card-item"
      >
        <view class="icon">
          <cimage :src="item.icon" mode="scaleToFill" />
        </view>

        <view class="title">{{ item.title }}</view>
      </view>
    </view>

    <view v-if="pageData.last" class="prev-box">
      <view class="prev-box-hd">第{{ pageData.last.title }}期开盒</view>

      <view class="prev-box-bd">
        <view class="title">
          共有

          <text>{{ pageData.last.join_num }}</text>

          人参与
        </view>

        <view
          class="prize-box common_bg flot"
          :style="{
            backgroundImage: `url(${imgBaseUrl}${'/static/icon/jiang_pai.png'})`
          }"
        >
          <view
            class="box common_bg"
            :style="{
              backgroundImage: `url(${imgBaseUrl}${'/static/img/box_act.png'})`
            }"
          >
            <view class="num">{{ pageData.last.luck_number }}</view>

            <view class="title">号盲盒</view>
          </view>
        </view>

        <view v-if="pageData.last.award" class="prize-card">
          <view class="prize-card-hd">恭喜用户名得隐藏款商品</view>

          <view class="prize-card-bd">
            <view class="pic">
              <cimage :src="pageData.last.award.thumb" mode="scaleToFill" />
            </view>

            <view class="info">
              <view class="title hang1">
                {{ pageData.last.award.title }}
              </view>

              <view class="price">
                商品价值：
                <text>
                  ¥

                  <text>{{ pageData.last.award.price }}</text>
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 选择盒子弹窗 -->
    <uni-popup ref="choosePop" type="bottom">
      <view class="choose-pop">
        <view class="choose-pop-hd">
          <cimage src="/static/img/box_dui_huan_title.png" mode="scaleToFill" />
        </view>

        <view class="choose-pop-bd">
          <view class="bd-title">
            <view class="icon">
              <cimage src="/static/icon/integral.png" mode="scaleToFill" />
            </view>

            {{ userInfo.coin }}点,每{{
              pageData.term.need_coin
            }}点积分兑换1个盲盒
          </view>

          <scroll-view class="box-list" scroll-y>
            <view
              v-for="(item, i) in pageData.number"
              :key="i"
              class="box-list-item"
            >
              <view
                class="box common_bg"
                :style="{
                  backgroundImage: `url(${imgBaseUrl}${'/static/img/box_act.png'})`
                }"
              >
                <view class="num">{{ item.number }}</view>

                <view class="title">号盲盒</view>
              </view>

              <view class="info">
                <view class="title">{{ item.number }}号盲盒</view>

                <view class="num">本期已选x{{ item.buy_num }}</view>
              </view>

              <view @click="openBuyPop(item)" class="btn">立刻选择</view>
            </view>
          </scroll-view>
        </view>
      </view>
    </uni-popup>

    <!-- 购买弹窗 -->
    <uni-popup ref="buyPop" type="center">
      <view class="buy-pop">
        <view class="buy-pop-bd">
          <view
            class="box common_bg"
            :style="{
              backgroundImage: `url(${imgBaseUrl}${'/static/img/box_large_act.png'})`
            }"
          >
            <view class="num">{{ curItem.number }}</view>

            <view class="title">号盲盒</view>
          </view>

          <view class="price">
            <view class="icon">
              <cimage src="/static/icon/integral.png" mode="scaleToFill" />
            </view>

            {{ pageData.term.need_coin }}点
          </view>

          <view class="balance">
            拥有{{ userInfo.coin }}点,剩余积分可选{{
              Math.floor(userInfo.coin / pageData.term.need_coin)
            }}个
          </view>

          <view class="num-box">
            <view @click="jian" class="icon">
              <cimage src="/static/icon/jian.png" mode="scaleToFill" />
            </view>

            <input @blur="checkBuyNum" v-model="buyNum" />

            <view @click="jia" class="icon">
              <cimage src="/static/icon/jia.png" mode="scaleToFill" />
            </view>
          </view>

          <view class="already">
            已选{{ buyNum }}次,消耗{{ pageData.term.need_coin * buyNum }}积分
          </view>

          <view @click="$common.noDouble(submitBuy)" class="confirm-btn">
            确认选择
          </view>
        </view>

        <view @click="closeBuyPop" class="close icon">
          <cimage src="/static/icon/close1.png" mode="scaleToFill" />
        </view>
      </view>
    </uni-popup>

    <!-- 兑换成功弹窗 -->
    <uni-popup ref="sucPop" type="center">
      <view @click="closeSucPop" class="suc-pop">
        <view class="suc-pop-hd">恭喜你兑换成功</view>

        <view
          class="suc-pop-bd common_bg"
          :style="{
            backgroundImage: `url(${imgBaseUrl}${'/static/img/prize_light.png'})`
          }"
        >
          <view
            class="light-title common_bg"
            :style="{
              backgroundImage: `url(${imgBaseUrl}${'/static/img/prize_light_title.png'})`
            }"
          >
            请在{{ pageData.term.end_times }}后开启盲盒
          </view>

          <view
            class="box common_bg"
            :style="{
              backgroundImage: `url(${imgBaseUrl}${'/static/img/box_large_act.png'})`
            }"
          >
            <view class="num">{{ curItem.number }}</view>

            <view class="title">号盲盒</view>
          </view>
        </view>

        <view class="suc-pop-ft">
          获得{{ curItem.number }}号盲盒x{{ buyNum }}
        </view>
      </view>
    </uni-popup>

    <!-- 任务弹窗 -->
    <uni-popup ref="taskPop" type="bottom">
      <view class="task-pop">
        <view class="task-pop-hd">
          积分任务

          <view @click="closeTaskPop" class="close icon">
            <cimage src="/static/icon/close2.png" mode="scaleToFill" />
          </view>
        </view>

        <view class="task-pop-bd">
          <view
            @click="$common.to({ url: '/package/index/my-log' })"
            class="ji-fen"
          >
            <view class="icon">
              <cimage src="/static/icon/integral.png" mode="scaleToFill" />
            </view>

            积分明细

            <uni-icons
              :style="{
                fontWeight: 'normal'
              }"
              type="right"
              color="#333333"
              size="14"
            />
          </view>

          <scroll-view class="task-list" scroll-y>
            <view class="task-list-item">
              <view class="pic">
                <cimage src="/static/icon/qian_dao.png" mode="scaleToFill" />
              </view>

              <view class="info">
                <view class="title">
                  <view class="title-text">每期签到</view>

                  <view class="ji-num">
                    <view class="icon">
                      <cimage
                        src="/static/icon/integral.png"
                        mode="scaleToFill"
                      />
                    </view>

                    <view class="number">
                      每次{{ taskData.sign_points_min }}-{{
                        taskData.sign_points_max
                      }}点
                    </view>
                  </view>
                </view>

                <view class="num">
                  专属福利,每日{{ taskData.sign_times }}次
                </view>
              </view>

              <view v-if="taskData.is_sign == 1" class="btn dis">立即签到</view>

              <view v-else @click="signIn" class="btn">立即签到</view>
            </view>

            <view class="task-list-item">
              <view class="pic">
                <cimage src="/static/icon/yao_xin.png" mode="scaleToFill" />
              </view>

              <view class="info">
                <view class="title">
                  <view class="title-text">邀请新用户</view>

                  <view class="ji-num">
                    <view class="icon">
                      <cimage
                        src="/static/icon/integral.png"
                        mode="scaleToFill"
                      />
                    </view>

                    <view class="number">
                      最高{{ taskData.invite_user_get_points }}点
                    </view>
                  </view>
                </view>

                <view class="num">
                  好友每选1期盒子返1次,{{ taskData.invite_user_times }}次返完
                </view>
              </view>

              <!-- <view class="btn relative">
                <button class="hide" open-type="share"></button>

                立即邀请
              </view> -->
              <view @click="getList" class="btn">立即邀请</view>
            </view>

            <view class="task-list-item">
              <view class="pic">
                <cimage src="/static/icon/li_he.png" mode="scaleToFill" />
              </view>

              <view class="info">
                <view class="title">
                  <view class="title-text">邀好友开盒</view>

                  <view class="ji-num">
                    <view class="icon">
                      <cimage
                        src="/static/icon/integral.png"
                        mode="scaleToFill"
                      />
                    </view>

                    <view class="number">
                      最高{{ taskData.invite_open_box_piints_max }}点
                    </view>
                  </view>
                </view>

                <view class="num">好友每开1次可获得1次iFeng</view>
              </view>

              <view @click="getList" class="btn">立即邀请</view>
            </view>
          </scroll-view>
        </view>
      </view>
    </uni-popup>

    <!-- 积分奖励弹窗 -->
    <uni-popup ref="jiPop" type="center">
      <view class="ji-pop">
        <view class="icon">
          <cimage src="/static/icon/ji_fen.png" mode="scaleToFill" />
        </view>

        <view class="title">恭喜获积分奖励</view>

        <view class="ji-num">
          233

          <text>点</text>
        </view>

        <view @click="closeJiPop" class="get-btn">开心收下</view>
      </view>
    </uni-popup>

    <!-- 隐藏福利 -->
    <uni-popup ref="yinPop" type="center">
      <view class="yin-pop">
        <view class="yin-pop-hd">隐藏专属福利</view>

        <view class="yin-pop-bd">
          <view class="get-num">已有500+人领取到隐藏款商品</view>

          <scroll-view scroll-x class="prize-list-wrap">
            <view class="prize-list-content">
              <view class="prize-list">
                <view
                  v-for="(item, i) in pageData.hiden_award"
                  :key="i"
                  class="prize-list-item"
                >
                  <view class="pic">
                    <cimage :src="item.thumb" mode="scaleToFill" />
                  </view>

                  <view class="title hang1">
                    {{ item.title }}
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>

          <view class="pop-progress">
            <cmd-progress
              :percent="
                (pageData.term.luckbox_progress / pageData.term.hiden_need) *
                100
              "
              :show-info="false"
              stroke-color="#FD462A"
              :stroke-width="12"
            ></cmd-progress>
          </view>

          <view class="desc">
            连续获得{{ pageData.term.luckbox_progress }}次幸运盲盒,连续{{
              pageData.term.hiden_need
            }}次免费领
          </view>

          <view
            v-if="pageData.term.luckbox_progress == pageData.term.hiden_need"
            @click="getYin"
            class="close-btn"
          >
            立即领取
          </view>

          <view v-else @click="closeYinPop" class="close-btn">继续选盒</view>
        </view>
      </view>
    </uni-popup>

    <!-- 邀请好友弹窗 -->
    <uni-popup ref="friendPop" type="bottom">
      <view
        class="friend-pop common_bg"
        :style="{
          backgroundImage: `url(${imgBaseUrl}${'/static/img/friend_pop_bg.png'})`
        }"
      >
        <view class="friend-pop-hd">
          <view @click="closeFriendPop" class="close icon">
            <cimage src="/static/icon/close2.png" mode="scaleToFill" />
          </view>

          <view class="title">邀好友开盒</view>

          <view class="title">得超值积分奖励</view>
        </view>

        <view class="friend-pop-bd">
          <view class="notice">
            <view class="notice-wrap">
              <u-notice-bar
                type="none"
                mode="horizontal"
                color="#333333"
                :speed="160"
                font-size="26"
                :list="['邀请好友开盒,得超值积分奖励']"
              ></u-notice-bar>
            </view>

            <view @click="openRulePop" class="notice-detail">
              详细说明

              <uni-icons
                :style="{
                  fontWeight: 'normal'
                }"
                type="right"
                color="#CC0000"
                size="12"
              />
            </view>
          </view>

          <scroll-view scroll-y class="list">
            <view
              @click="openSharePop(item)"
              v-for="(item, i) in boxList"
              :key="i"
              class="list-item"
            >
              <view class="pic">
                <cimage :src="item.thumb" mode="scaleToFill" />
              </view>

              <view class="info">
                <view class="title hang1">
                  {{ item.title }}
                </view>

                <!-- <view class="ji-num">
                  <view class="icon">
                    <cimage src="/static/icon/integral.png" mode="scaleToFill" />
                  </view>

                  233点积分
                </view> -->

                <view class="price-num">
                  <view class="price">
                    ¥

                    <text>{{ item.price }}</text>
                  </view>

                  <view class="buy-num">{{ item.sales }}人开盒</view>
                </view>

                <scroll-view scroll-x class="prize-list-wrap">
                  <view class="prize-list-wrap-content">
                    <view class="prize-list">
                      <view
                        v-for="(a, b) in item.awardList"
                        :key="b"
                        class="prize-list-item"
                      >
                        <cimage :src="a" mode="scaleToFill" />
                      </view>
                    </view>
                  </view>
                </scroll-view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </uni-popup>

    <!-- 分享弹窗 -->
    <uni-popup ref="sharePop" type="bottom">
      <view class="share-pop">
        <view class="share-pop-item relative">
          <button open-type="share" class="hide"></button>

          <view class="icon">
            <cimage src="/static/icon/wei_xin1.png" mode="scaleToFill" />
          </view>

          <view class="title">分享好友</view>
        </view>

        <view @click="getSharePic" class="share-pop-item">
          <view class="icon">
            <cimage src="/static/icon/hai_bao.png" mode="scaleToFill" />
          </view>

          <view class="title">分享海报</view>
        </view>
      </view>
    </uni-popup>

    <!-- 海报弹窗 -->
    <uni-popup ref="picPop" type="center">
      <view class="pic-pop">
        <view class="pic-pop-hd">
          <cimage :src="shareData" mode="scaleToFill" />
        </view>

        <view @click="saveImg" class="pic-pop-ft">保存到相册</view>
      </view>
    </uni-popup>

    <!-- 邀请好友规则弹窗 -->
    <uni-popup ref="rulePop" type="center">
      <view v-if="ruleData" class="rule-pop">
        <view class="rule-pop-hd">{{ ruleData.title }}</view>

        <scroll-view scroll-y class="rule-pop-bd">
          <view v-html="ruleData.editor" class="rule-content"></view>
        </scroll-view>
      </view>
    </uni-popup>

    <!-- 上期奖品弹窗 -->
    <uni-popup ref="prizePop" type="center">
      <view @click="closePrizePop" class="prize-pop">
        <view class="prize-pop-hd">本期幸运盲盒</view>

        <view
          class="prize-pop-bd common_bg"
          :style="{
            backgroundImage: `url(${imgBaseUrl}${'/static/img/prize_light.png'})`
          }"
        >
          <view
            class="light-title common_bg"
            :style="{
              backgroundImage: `url(${imgBaseUrl}${'/static/img/prize_light_title.png'})`
            }"
          >
            第{{ pageData.last.title }}期
            {{ pageData.last.luck_number }}号盲盒升级为幸运盲盒
          </view>

          <view
            class="box common_bg"
            :style="{
              backgroundImage: `url(${imgBaseUrl}${'/static/img/box_large_act.png'})`
            }"
          >
            <view class="num">{{ pageData.last.luck_number }}</view>

            <view class="title">号盲盒</view>
          </view>
        </view>

        <view @click="toLog" class="prize-pop-ft">点击查看</view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { pathToBase64, base64ToPath } from '../../js_sdk/mmmm-image-tools/index'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      boxCur: 0,
      btnList: [
        {
          id: 1,
          icon: '/static/icon/ji_fen_ren_wu.png',
          title: '积分任务'
        },
        {
          id: 2,
          icon: '/static/icon/he_gui_ti_huo.png',
          title: '盒柜提货',
          url: '/package/mine/bag'
        },
        {
          id: 3,
          icon: '/static/icon/wo_de_qian_bao.png',
          title: '我的钱包',
          url: '/package/mine/wallet'
        },
        {
          id: 4,
          icon: '/static/icon/wo_de_ji_lu.png',
          title: '我的记录',
          url: '/package/index/my-log'
        }
      ],
      buyNum: 1,
      countdown: 0,
      pageData: '',
      configData: '',
      /* 当前选择的盒子 */
      curItem: '',
      canRefresh: false,
      /* 任务数据 */
      taskData: '',
      boxList: [],
      shareItem: '',
      shareData: '',
      detailData: '',
      ruleData: ''
    }
  },

  computed: {
    ...mapGetters(['sysConfig', 'userInfo'])
  },

  onShareAppMessage() {
    let userInfo = uni.getStorageSync('userInfo')
    let title = ''
    let pic = ''
    let path = ''
    if (this.shareItem) {
      title = `快来抽取幸运豪礼!`

      pic = this.shareItem.thumb

      path = `/package/box/box-detail?id=${this.shareItem.id}&userId=${
        (userInfo && userInfo.id) || ''
      }&parent_id=${(userInfo && userInfo.id) || ''}`
    } else {
      title = `快来免费领取幸运盲盒,抽豪礼!`

      pic = this.imgBaseUrl + '/static/img/luck_box_bg.png'

      path = `/package/index/luck-box?parent_id=${
        (userInfo && userInfo.id) || ''
      }`
    }
    return {
      title,
      imageUrl: pic,
      path
    }
  },

  onReady() {
    // this.openChoosePop()
    // this.openBuyPop()
    // this.openSucPop()
    // this.openTaskPop()
    // setTimeout(() => {
    //   this.openJiPop()
    // }, 1000)
    // this.openYinPop()
    // this.openFriendPop()
    // this.openSharePop()
    // this.openPicPop()
    // setTimeout(() => {
    //   this.openPrizePop()
    // }, 1000)
  },

  async onLoad(options) {
    await this.getData()
    // this.getAward()
  },

  onShow() {
    this.$store.dispatch('getUserInfo')

    this.canRefresh && this.getData()
    this.canRefresh = true
  },

  methods: {
    /**
     * @description: 倒计时结束
     * @return {*}
     */
    timeEnd() {
      uni.showLoading({
        title: '开奖中',
        mask: true
      })

      setTimeout(() => {
        uni.hideLoading()
        this.getData()
      }, 1000)
    },

    /**
     * @description: 查看记录
     * @return {*}
     */
    toLog() {
      this.closePrizePop()
      this.$common.to({
        url: '/package/index/my-log'
      })
    },

    /**
     * @description: 获取中奖详情
     * @param {*} item
     * @return {*}
     */
    getPrizeDetail(item) {
      this.req({
        url: '/v1/luckbox/log/info',
        data: {
          term_id: item.id
        },
        Loading: false,
        success: res => {
          if (res.code == 200) {
            this.detailData = res.data

            this.openDetailPop()
          }
        }
      })
    },

    /**
     * @description: 保存图片
     * @param {*} e
     * @return {*}
     */
    saveImg() {
      uni.showLoading({
        title: '保存中',
        mask: true
      })
      base64ToPath(this.shareData).then(res => {
        uni.saveImageToPhotosAlbum({
          filePath: res,
          success: result => {
            uni.hideLoading()
            this.closePicPop()

            this.$common.toast({
              title: '保存成功,请前往相册查看'
            })
          },
          fail: error => {
            uni.hideLoading()
            this.$common.toast({
              title: '保存失败'
            })
          }
        })
      })
    },

    /**
     * @description: 获取海报
     * @return {*}
     */
    getSharePic() {
      this.req({
        url: '/v1/luckbox/share/poster',
        data: {
          id: this.shareItem.id
        },
        Loading: false,
        success: res => {
          if (res.code == 200) {
            this.shareData = res.data

            this.openPicPop()
          }
        }
      })
    },

    /**
     * @description: 获取商品列表数据
     * @param {*}
     * @return {*}
     */
    getList() {
      this.req({
        url: '/v1/box/list',
        data: {
          page: 1,
          per_page: 20
        },
        Loading: false,
        success: res => {
          if (res.code == 200) {
            this.boxList = res.data.data

            this.openFriendPop()
          }
        }
      })
    },

    /**
     * @description: 领取隐藏款
     * @return {*}
     */
    getYin() {
      this.req({
        url: '/v1/luckbox/hide/receive',
        data: {
          term_id: this.pageData.term.term_id
        },
        success: res => {
          if (res.code == 200) {
            this.closeYinPop()
            this.$common.toast({
              title: res.msg,
              duration: 500,
              success: () => {
                this.getData()
              }
            })
          }
        }
      })
    },

    /**
     * @description: 签到
     * @return {*}
     */
    signIn() {
      this.req({
        url: '/v1/luckbox/sign',
        data: {
          term_id: this.pageData.term.term_id
        },
        success: res => {
          if (res.code == 200) {
            this.$common.toast({
              title: res.msg,
              duration: 500,
              success: () => {
                this.getTask()
                this.getData()
              }
            })
          }
        }
      })
    },

    /**
     * @description: 获取任务
     * @return {*}
     */
    getTask() {
      this.req({
        url: '/v1/luckbox/task/info',
        data: {
          term_id: this.pageData.term.term_id
        },
        success: res => {
          if (res.code == 200 && res.data) {
            this.taskData = res.data
            this.openTaskPop()
          }
        }
      })
    },

    /**
     * @description: 获取上期奖品
     * @return {*}
     */
    getAward() {
      this.req({
        url: '/v1/luckbox/log/info',
        data: {
          term_id: this.pageData.term.term_id
        },
        success: res => {
          if (res.code == 200) {
            this.openPrizePop()
          }
        }
      })
    },

    /**
     * @description: 购买盒子
     * @return {*}
     */
    submitBuy() {
      this.req({
        url: '/v1/luckbox/join',
        data: {
          term_id: this.pageData.term.term_id,
          number: this.curItem.number,
          num: this.buyNum
        },
        success: res => {
          if (res.code == 200) {
            this.closeBuyPop()

            this.$common.toast({
              title: res.msg,
              duration: 500,
              success: () => {
                this.getData()
                this.$store.dispatch('getUserInfo')
                this.openSucPop()
              }
            })
          }
        }
      })
    },

    /**
     * @description: 获取页面数据
     * @return {*}
     */
    getData() {
      return new Promise((resolve, reject) => {
        this.req({
          url: '/v1/luckbox/index',
          data: {},
          success: res => {
            if (res.code == 200) {
              this.countdown = 0
              this.pageData = res.data
              setTimeout(() => {
                this.countdown = res.data.term.end_time
                // this.countdown = 5
                resolve()
              }, 0)

              if (res.data && res.data.notice) {
                this.getAward()
              }
            }
          }
        })
      })
    },

    /**
     * @description: 跳转页面
     * @param {*} e
     * @return {*}
     */
    toPage(e) {
      let url = ''
      switch (e.id) {
        case 1:
          this.getTask()
          break

        default:
          url = e.url || ''
          break
      }

      if (url) {
        this.$common.to({
          url
        })
      }
    },

    /**
     * @description: 验证购买数量
     * @return {*}
     */
    checkBuyNum() {
      let max = Math.floor(this.userInfo.coin / this.pageData.term.need_coin)

      if (this.buyNum <= 1) {
        this.buyNum = 1
      }

      if (this.buyNum >= max) {
        this.buyNum = max
      }
    },

    /**
     * @description: 兑换数量减
     * @return {*}
     */
    jian() {
      if (this.buyNum <= 1) {
        this.buyNum = 1
        return
      }

      this.buyNum -= 1
    },

    /**
     * @description: 兑换数量加
     * @return {*}
     */
    jia() {
      let max = Math.floor(this.userInfo.coin / this.pageData.term.need_coin)
      if (this.buyNum >= max) {
        this.buyNum = max
        return
      }

      this.buyNum += 1
    },

    /**
     * @description: 关闭上期奖品弹窗
     * @return {*}
     */
    closePrizePop() {
      this.$refs.prizePop.close()
    },

    /**
     * @description: 打开上期奖品弹窗
     * @return {*}
     */
    openPrizePop() {
      this.$refs.prizePop.open()
    },

    /**
     * @description: 关闭海报弹窗
     * @return {*}
     */
    closePicPop() {
      this.$refs.picPop.close()
    },

    /**
     * @description: 打开海报弹窗
     * @return {*}
     */
    openPicPop() {
      this.closeSharePop()
      this.$refs.picPop.open()
    },

    /**
     * @description: 关闭分享弹窗
     * @return {*}
     */
    closeSharePop() {
      this.$refs.sharePop.close()
    },

    /**
     * @description: 打开分享弹窗
     * @return {*}
     */
    openSharePop(item) {
      this.shareItem = item
      this.closeFriendPop()
      this.$refs.sharePop.open()
    },

    /**
     * @description: 关闭规则弹窗
     * @return {*}
     */
    closeRulePop() {
      this.$refs.rulePop.close()
    },

    /**
     * @description: 打开规则弹窗
     * @return {*}
     */
    openRulePop() {
      this.$common.getRule(8).then(res => {
        this.ruleData = res

        this.$refs.rulePop.open()
      })
    },

    /**
     * @description: 关闭邀请好友弹窗
     * @return {*}
     */
    closeFriendPop() {
      this.closeTaskPop()
      this.$refs.friendPop.close()
    },

    /**
     * @description: 打开邀请好友弹窗
     * @return {*}
     */
    openFriendPop() {
      this.$refs.friendPop.open()
    },

    /**
     * @description: 关闭隐藏福利弹窗
     * @return {*}
     */
    closeYinPop() {
      this.$refs.yinPop.close()
    },

    /**
     * @description: 打开隐藏福利弹窗
     * @return {*}
     */
    openYinPop() {
      this.$refs.yinPop.open()
    },

    /**
     * @description: 关闭积分奖励弹窗
     * @return {*}
     */
    closeJiPop() {
      this.$refs.jiPop.close()
    },

    /**
     * @description: 打开积分奖励弹窗
     * @return {*}
     */
    openJiPop() {
      this.$refs.jiPop.open()
    },

    /**
     * @description: 关闭任务弹窗
     * @return {*}
     */
    closeTaskPop() {
      this.$refs.taskPop.close()
    },

    /**
     * @description: 打开任务弹窗
     * @return {*}
     */
    openTaskPop() {
      this.$refs.taskPop.open()
    },

    /**
     * @description: 关闭成功弹窗
     * @return {*}
     */
    closeSucPop() {
      this.$refs.sucPop.close()
    },

    /**
     * @description: 打开成功弹窗
     * @return {*}
     */
    openSucPop() {
      this.$refs.sucPop.open()
    },

    /**
     * @description: 关闭购买弹窗
     * @return {*}
     */
    closeBuyPop() {
      this.$refs.buyPop.close()
    },

    /**
     * @description: 打开购买弹窗
     * @return {*}
     */
    openBuyPop(item) {
      this.buyNum = 1
      this.curItem = item
      this.closeChoosePop()

      this.$refs.buyPop.open()
    },

    /**
     * @description: 关闭选择盲盒弹窗
     * @return {*}
     */
    closeChoosePop() {
      this.$refs.choosePop.close()
    },

    /**
     * @description: 打开选择盲盒弹窗
     * @return {*}
     */
    openChoosePop() {
      this.$refs.choosePop.open()
    }
  }
}
</script>

<style lang="scss">
@keyframes flot {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-30rpx);
  }

  100% {
    transform: translateY(0);
  }
}

.flot {
  animation: flot 2s ease-in-out infinite;
}

.page-wrap {
  min-height: 100vh;
  background: linear-gradient(0deg, #fff3e6, #fef3e4);
  padding-bottom: 40rpx;

  .fixed-rule-btn {
    position: fixed;
    right: 0;
    // top: 300rpx;
    background: linear-gradient(
      to right,
      rgba(253, 223, 158, 0.9),
      rgba(253, 223, 158, 0.4)
    );
    padding: 4rpx 20rpx;
    border-radius: 999rpx 0 0 999rpx;

    font-size: 26rpx;
    font-weight: bold;
    color: #f42a4b;
  }

  &-hd {
    width: 750rpx;
    height: 696rpx;

    .countdown-wrap {
      margin-top: 277rpx;
      width: 100%;
      height: 84rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #763a1f;
      line-height: 28rpx;
    }
  }

  .choose-card {
    margin: 30rpx auto 0;
    padding: 20rpx 30rpx;
    width: 690rpx;
    background: linear-gradient(180deg, #f84b48, #fffbe4);
    border-radius: 20rpx;

    &-hd {
      padding: 20rpx 0 30rpx;
      text-align: center;

      font-size: 36rpx;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #fefbf2;
    }

    &-bd {
      padding: 30rpx 40rpx 60rpx;
      border-radius: 20rpx;
      background: #fefbf2;

      .title {
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #fb4a3a;
      }

      .desc {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #763a1f;
        text-align: center;
        margin-top: 30rpx;
      }

      .box-list {
        display: flex;
        flex-flow: row wrap;
        padding: 1rpx 0 0;

        &-item {
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          width: 92rpx;
          height: 122rpx;
          box-sizing: border-box;
          padding-top: 24rpx;
          margin-top: 30rpx;
          margin-left: 22rpx;
          position: relative;

          .dot {
            position: absolute;
            right: 0;
            top: 0;
            padding: 0 10rpx;
            border-radius: 999px;
            background: #f42a4b;
            color: #fff;
            font-size: 24rpx;
            line-height: 32rpx;
            text-align: center;
            z-index: 1;
            transform: translate(40%, -50%);
          }

          .num {
            font-size: 44rpx;
            font-family: Source Han Sans CN;
            font-weight: 800;
            color: #666666;
          }

          .title {
            font-size: 20rpx;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #666666;
          }
        }

        &-item:nth-child(5n-4) {
          margin-left: 0;
        }
      }

      .choose-btn {
        width: 100%;
        height: 88rpx;
        background: linear-gradient(181deg, #fd462a, #ff8500);
        border-radius: 44rpx;
        margin: 50rpx auto 0;
        line-height: 88rpx;
        text-align: center;

        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }

      .btn-list {
        display: flex;
        justify-content: space-between;

        .btn {
          width: 244rpx;
          height: 66rpx;
          background: #fef0d6;
          border: 1rpx solid #8c7d61;
          border-radius: 33rpx;
          line-height: 66rpx;
          text-align: center;
          margin-top: 40rpx;

          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #763a1f;
        }
      }
    }
  }

  .give-card {
    width: 690rpx;
    background: linear-gradient(180deg, #f84b48, #fffbe4);
    border-radius: 20rpx;
    margin: 30rpx auto 0;
    padding: 30rpx;

    &-hd {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .icon {
        width: 52rpx;
        height: 52rpx;
      }

      .title {
        font-size: 34rpx;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #fefbf2;
      }

      .progress-wrap {
        display: flex;
        align-items: center;
        // line-height: 24rpx;

        ::v-deep.cmd-progress {
          width: 156rpx;
        }

        ::v-deep.cmd-progress-outer {
          line-height: 0;
        }

        ::v-deep.cmd-progress-inner {
          background: rgba(255, 255, 255, 0.7);
        }

        .num {
          margin-left: 10rpx;
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #fefbf2;
        }
      }

      .to-progress {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #fefbf2;
      }
    }

    &-bd {
      padding: 30rpx 30rpx 60rpx;
      border-radius: 20rpx;
      background: #fefbf2;
      margin-top: 30rpx;

      .title {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #763a1f;
        text-align: center;

        text {
          color: #e53530;
        }
      }

      .prize-list-wrap {
        width: 100%;
        margin-top: 60rpx;

        .prize-list-content {
          display: inline-block;

          .prize-list {
            display: flex;

            &-item {
              width: 166rpx;

              .pic {
                width: 166rpx;
                height: 166rpx;
                border: 2rpx solid #f0d4bc;
                box-sizing: border-box;
              }

              .title {
                width: 100%;
                margin-top: 14rpx;
                text-align: center;

                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #763a1f;
              }
            }

            &-item + .prize-list-item {
              margin-left: 34rpx;
            }
          }
        }
      }
    }
  }

  .btn-card {
    margin: 30rpx auto 0;
    width: 690rpx;
    // height: 205rpx;
    display: flex;
    background: #fefbf2;
    border: 2rpx solid #f0d4bc;
    border-radius: 20rpx;
    box-sizing: border-box;
    padding: 40rpx 30rpx;

    &-item {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      width: 25%;

      .icon {
        width: 80rpx;
        height: 80rpx;
      }

      .title {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-top: 6rpx;
      }
    }
  }

  .prev-box {
    width: 690rpx;
    margin: 30rpx auto 0;
    border-radius: 20rpx;
    padding: 0 30rpx 30rpx;
    background: linear-gradient(180deg, #f84b48, #fffbe4);

    &-hd {
      padding: 40rpx 0;
      text-align: center;

      font-size: 36rpx;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #fefbf2;
    }

    &-bd {
      border-radius: 20rpx;
      padding: 30rpx 30rpx 50rpx;
      background: #fefbf2;

      .title {
        text-align: center;

        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #763a1f;

        text {
          color: #e53530;
        }
      }

      .prize-box {
        width: 358rpx;
        height: 358rpx;
        box-sizing: border-box;
        padding-top: 160rpx;
        margin: 130rpx auto 0;

        .box {
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          width: 92rpx;
          height: 122rpx;
          box-sizing: border-box;
          padding-top: 24rpx;
          margin: 0 auto;

          .num {
            font-size: 44rpx;
            font-family: Source Han Sans CN;
            font-weight: 800;
            color: #666666;
          }

          .title {
            font-size: 20rpx;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #666666;
          }
        }
      }

      .prize-card {
        border-radius: 20rpx;
        background: #fefbf2;
        border: 2rpx solid #f0d4bc;
        border-radius: 20rpx;
        padding: 30rpx;
        margin-top: 40rpx;

        &-hd {
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #989898;
        }

        &-bd {
          margin-top: 30rpx;
          display: flex;

          .pic {
            width: 106rpx;
            height: 106rpx;
            box-sizing: border-box;
            background: #ffffff;
            border: 2rpx solid #f0d4bc;
            border-radius: 10rpx;
          }

          .info {
            width: calc(100% - 106rpx);
            box-sizing: border-box;
            padding-left: 20rpx;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;

            .title {
              text-align: left;
              font-size: 26rpx;
              font-family: PingFang SC;
              font-weight: bold;
              color: #8f4721;
            }

            .price {
              font-size: 24rpx;
              font-family: PingFang SC;
              font-weight: 500;
              color: #8f4721;

              text {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #dd1717;

                text {
                  font-size: 32rpx;
                }
              }
            }
          }
        }
      }
    }
  }

  .choose-pop {
    &-hd {
      width: 100%;
      height: 186rpx;
    }

    &-bd {
      background: #fefbf2;
      border-radius: 20rpx 20rpx 0 0;
      margin-top: -20rpx;
      position: relative;
      z-index: 1;
      padding: 40rpx 30rpx 40rpx;

      .bd-title {
        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
          width: 30rpx;
          height: 30rpx;
        }

        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #763a1f;
      }

      .box-list {
        max-height: 50vh;
        padding: 1rpx 0 0;

        &-item {
          padding: 20rpx 30rpx;
          margin-top: 30rpx;
          background: #fefbf2;
          border: 2rpx solid #f0d4bc;
          border-radius: 10rpx;
          display: flex;
          align-items: center;

          .box {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            width: 92rpx;
            height: 122rpx;
            box-sizing: border-box;
            padding-top: 24rpx;

            .num {
              font-size: 44rpx;
              font-family: Source Han Sans CN;
              font-weight: 800;
              color: #666666;
            }

            .title {
              font-size: 20rpx;
              font-family: Source Han Sans CN;
              font-weight: bold;
              color: #666666;
            }
          }

          .info {
            flex: 1;
            padding-left: 40rpx;
            padding-right: 30rpx;

            .title {
              font-size: 28rpx;
              font-family: PingFang SC;
              font-weight: bold;
              color: #333333;
            }

            .num {
              margin-top: 10rpx;
              font-size: 24rpx;
              font-family: PingFang SC;
              font-weight: 500;
              color: #999999;
            }
          }

          .btn {
            width: 160rpx;
            height: 66rpx;
            background: #f43a39;
            border-radius: 33rpx;
            line-height: 66rpx;
            text-align: center;

            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ffffff;
          }
        }
      }
    }
  }

  .buy-pop {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    &-bd {
      width: 570rpx;
      border-radius: 20rpx;
      background: #fefbf2;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      box-sizing: border-box;
      padding: 0 30rpx 50rpx;

      .box {
        width: 176rpx;
        height: 236rpx;
        margin-top: -170rpx;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        box-sizing: border-box;
        padding-top: 50rpx;

        .num {
          font-size: 85rpx;
          font-family: Source Han Sans CN;
          font-weight: 800;
          color: #976328;
        }

        .title {
          font-size: 39rpx;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #976328;
        }
      }

      .price {
        display: flex;
        align-items: center;

        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #763a1f;
        margin-top: 30rpx;

        .icon {
          width: 30rpx;
          height: 30rpx;
          margin-right: 10rpx;
        }
      }

      .balance {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #763a1f;
        margin-top: 30rpx;
      }

      .num-box {
        display: flex;
        align-items: center;
        margin-top: 70rpx;

        .icon {
          width: 50rpx;
          height: 50rpx;
        }

        input {
          width: 180rpx;
          margin: 0 10rpx;
          font-size: 44rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #e41717;
          text-align: center;
        }
      }

      .already {
        margin-top: 40rpx;

        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #763a1f;
      }

      .confirm-btn {
        width: 412rpx;
        height: 100rpx;
        background: linear-gradient(0deg, #fe2c2f, #fa6579);
        border-radius: 50rpx;
        line-height: 100rpx;
        text-align: center;
        margin-top: 50rpx;

        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
    }

    .close {
      width: 60rpx;
      height: 60rpx;
      margin-top: 70rpx;
    }
  }

  .suc-pop {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);

    &-hd {
      font-size: 60rpx;
      font-weight: bold;
      // font-style: italic;
      transform: skew(-10deg);
      color: transparent;

      background: linear-gradient(0deg, #f9e6b8 0%, #f5e9db 99.609375%);
      background-clip: text;
    }

    &-bd {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      width: 552rpx;
      height: 572rpx;
      padding: 1rpx 0 0;

      .light-title {
        width: 642rpx;
        height: 58rpx;
        text-align: center;
        line-height: 58rpx;
        margin-top: 20rpx;

        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #f5e9d7;
      }

      .box {
        width: 176rpx;
        height: 236rpx;
        margin-top: 120rpx;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        box-sizing: border-box;
        padding-top: 50rpx;

        .num {
          font-size: 85rpx;
          font-family: Source Han Sans CN;
          font-weight: 800;
          color: #976328;
        }

        .title {
          font-size: 39rpx;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #976328;
        }
      }
    }

    &-ft {
      font-size: 20rpx;
      font-family: PingFang SC;
      // font-weight: bold;
      color: #ffffff;
      margin-top: 20rpx;
    }
  }

  .task-pop {
    border-radius: 20rpx 20rpx 0 0;
    background: #fdfaf3;
    padding: 0 30rpx 40rpx;

    &-hd {
      position: relative;
      padding: 30rpx 0;
      text-align: center;

      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #9d370a;

      .close {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 40rpx;
        height: 40rpx;
      }
    }

    &-bd {
      .ji-fen {
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;

        .icon {
          width: 40rpx;
          height: 40rpx;
          margin-right: 10rpx;
        }
      }

      .task-list {
        padding: 1rpx 0 0;

        &-item {
          padding: 40rpx 20rpx;
          margin-top: 30rpx;
          background: #fefbf2;
          border: 2rpx solid #f0d4bc;
          border-radius: 10rpx;
          display: flex;
          align-items: center;

          .pic {
            width: 80rpx;
            height: 80rpx;
          }

          .info {
            flex: 1;
            padding: 0 20rpx;

            .title {
              display: flex;
              // align-items: center;

              &-text {
                font-size: 32rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #7e3b1a;

                white-space: nowrap;
              }

              .ji-num {
                display: flex;
                align-items: center;
                margin-left: 10rpx;

                .icon {
                  width: 40rpx;
                  height: 40rpx;
                  // margin-right: 10rpx;
                }

                .number {
                  font-size: 24rpx;
                  font-family: PingFang SC;
                  font-weight: 500;
                  color: #cc0000;
                  word-break: break-all;
                  word-wrap: break-word;
                  flex: 1;
                }
              }
            }

            .num {
              margin-top: 10rpx;
              font-size: 24rpx;
              font-family: PingFang SC;
              font-weight: 500;
              color: #999999;
            }
          }

          .btn {
            width: 160rpx;
            height: 66rpx;
            background: #f43a39;
            border-radius: 33rpx;
            line-height: 66rpx;
            text-align: center;

            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ffffff;

            &.dis {
              background: #999999;
            }
          }
        }
      }
    }
  }

  .ji-pop {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    border-radius: 20rpx;
    background: #fefbf2;
    width: 570rpx;
    padding: 0 0 60rpx;

    .icon {
      width: 274rpx;
      height: 210rpx;
      margin-top: -125rpx;
    }

    .title {
      margin-top: 30rpx;

      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #763a1f;
    }

    .ji-num {
      font-size: 62rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #e41717;
      margin-top: 70rpx;

      text {
        font-size: 42rpx;
      }
    }

    .get-btn {
      margin-top: 80rpx;
      width: 412rpx;
      height: 100rpx;
      background: linear-gradient(0deg, #fe2c2f, #fa6579);
      border-radius: 50rpx;
      line-height: 100rpx;
      text-align: center;

      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
    }
  }

  .yin-pop {
    border-radius: 20rpx;
    width: 570rpx;
    padding: 1rpx 30rpx 40rpx;
    background: #fbf3e8;

    &-hd {
      padding: 40rpx 0;

      font-size: 40rpx;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #763a1f;
      text-align: center;
    }

    &-bd {
      .get-num {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ff3333;
        text-align: center;
      }

      .prize-list-wrap {
        width: 100%;
        margin-top: 60rpx;

        .prize-list-content {
          display: inline-block;

          .prize-list {
            display: flex;

            &-item {
              width: 154rpx;

              .pic {
                width: 154rpx;
                height: 154rpx;
                border: 2rpx solid #f0d4bc;
                box-sizing: border-box;
              }

              .title {
                width: 100%;
                margin-top: 14rpx;
                text-align: center;

                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #763a1f;
              }
            }

            &-item + .prize-list-item {
              margin-left: 24rpx;
            }
          }
        }
      }

      .pop-progress {
        width: 462rpx;
        margin: 30rpx auto 0;

        ::v-deep.cmd-progress-outer {
          line-height: 0;
        }

        ::v-deep.cmd-progress-inner {
          background: #fbead8;
        }
      }

      .desc {
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #763a1f;
        margin-top: 20rpx;
        text-align: center;
      }

      .close-btn {
        margin: 30rpx auto 0;
        width: 412rpx;
        height: 100rpx;
        background: linear-gradient(0deg, #fe2c2f, #fa6579);
        border-radius: 50rpx;
        text-align: center;
        line-height: 100rpx;

        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }

  .friend-pop {
    width: 100%;

    &-hd {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      position: relative;
      padding: 40rpx 0;

      .close {
        width: 50rpx;
        height: 50rpx;
        position: absolute;
        right: 20rpx;
        top: 30rpx;
      }

      .title {
        font-size: 51rpx;
        font-family: TsangerYuMo;
        font-weight: bold;
        color: #051a2b;
        text-shadow: 0 0 10rpx #fff;
      }

      .title + .title {
        margin-top: 10rpx;
      }
    }

    &-bd {
      .notice {
        display: flex;
        align-items: center;
        background: #fff;
        border-radius: 10rpx;
        width: 690rpx;
        margin: 20rpx auto 0;
        box-sizing: border-box;
        padding: 10rpx 0;
        padding-right: 20rpx;

        &-wrap {
          width: 550rpx;
        }

        &-detail {
          display: flex;
          align-items: center;

          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #cc0000;
          line-height: 24rpx;
        }
      }

      .list {
        height: 60vh;
        width: 690rpx;
        margin: 30rpx auto 0;
        ::v-deep.uni-scroll-view-content::after {
          content: '';
          display: block;
          height: 1rpx;
          width: 100%;
        }

        &-item {
          padding: 30rpx;
          border-radius: 10rpx;
          background: #fff;
          display: flex;
          margin-bottom: 30rpx;

          .pic {
            width: 234rpx;
            height: 234rpx;
            background: #ffffff;
            border: 1rpx solid #f2f2f2;
            border-radius: 10rpx;
            overflow: hidden;
            box-sizing: border-box;
          }

          .info {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            width: calc(100% - 234rpx);
            box-sizing: border-box;
            padding-left: 20rpx;

            .title {
              font-size: 32rpx;
              font-family: PingFang SC;
              font-weight: bold;
              color: #333333;
            }

            .ji-num {
              display: flex;
              font-size: 24rpx;
              font-family: PingFang SC;
              font-weight: 500;
              color: #cc0000;
              line-height: 30rpx;

              .icon {
                width: 30rpx;
                height: 30rpx;
              }
            }

            .price-num {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .price {
                font-size: 24rpx;
                font-family: Source Han Sans CN;
                font-weight: bold;
                color: #333333;

                text {
                  font-size: 34rpx;
                }
              }

              .buy-num {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
              }
            }

            .prize-list-wrap {
              line-height: 0;

              &-content {
                display: inline-block;
                height: 60rpx;

                .prize-list {
                  display: flex;

                  &-item {
                    width: 60rpx;
                    height: 60rpx;
                    background: #ffffff;
                    border: 1rpx solid #f2f2f2;
                    box-sizing: border-box;
                    border-radius: 5rpx;
                    overflow: hidden;
                  }

                  &-item + .prize-list-item {
                    margin-left: 20rpx;
                  }
                }
              }
            }
          }
        }

        // &-item + .list-item {
        //   margin-top: 30rpx;
        // }
      }
    }
  }

  .share-pop {
    border-radius: 20rpx 20rpx 0 0;
    background: #fff;
    padding: 50rpx 0;
    display: flex;
    justify-content: space-around;

    &-item {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      position: relative;

      .icon {
        width: 80rpx;
        height: 80rpx;
      }

      .title {
        margin-top: 10rpx;
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
      }
    }
  }

  .pic-pop {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    &-hd {
      width: 515rpx;
      height: 769rpx;
    }

    &-ft {
      margin-top: 40rpx;
      width: 312rpx;
      height: 88rpx;
      background: linear-gradient(0deg, #fe2c2f, #fa6579);
      border-radius: 999rpx;
      text-align: center;
      line-height: 88rpx;

      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
    }
  }

  .rule-pop {
    border-radius: 10rpx;
    background: #fff;
    width: 570rpx;
    padding: 0 30rpx 40rpx;

    &-hd {
      text-align: center;
      padding: 40rpx 0;

      font-size: 34rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }

    &-bd {
      max-height: 50vh;

      .rule-content {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
        line-height: 49rpx;
      }
    }
  }

  .prize-pop {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);

    &-hd {
      font-size: 60rpx;
      font-weight: bold;
      // font-style: italic;
      transform: skew(-10deg);
      color: transparent;

      background: linear-gradient(0deg, #f9e6b8 0%, #f5e9db 99.609375%);
      background-clip: text;
    }

    &-bd {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      width: 552rpx;
      height: 572rpx;
      padding: 1rpx 0 0;

      .light-title {
        width: 642rpx;
        height: 58rpx;
        text-align: center;
        line-height: 58rpx;
        margin-top: 20rpx;

        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #f5e9d7;
      }

      .box {
        width: 176rpx;
        height: 236rpx;
        margin-top: 120rpx;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        box-sizing: border-box;
        padding-top: 50rpx;

        .num {
          font-size: 85rpx;
          font-family: Source Han Sans CN;
          font-weight: 800;
          color: #976328;
        }

        .title {
          font-size: 39rpx;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #976328;
        }
      }
    }

    &-ft {
      width: 412rpx;
      height: 100rpx;
      background: linear-gradient(0deg, #fe2c2f, #fa6579);
      border-radius: 50rpx;
      line-height: 100rpx;
      text-align: center;

      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
    }
  }
}
</style>
