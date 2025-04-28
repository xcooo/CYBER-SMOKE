<!--
 * @Date: 2022-11-24 15:30:01
 * @LastEditTime: 2024-01-25 11:41:37
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <view v-if="pageLoading" class="page-wrap-loading common_bg" :style="{
      backgroundImage: `url(${imgBaseUrl}${'/static/gif/loading.gif'})`
    }"></view>

    <uni-nav-bar color="#fff" leftIcon="left" backgroundColor="transparent" :border="false" :statusBar="true"
      :fixed="false" @clickLeft="$common.back()"></uni-nav-bar>

    <view class="page-wrap-hd common_bg" :style="{
      backgroundImage: `url(${imgBaseUrl}${'/static/img/box_page_bg.png'})`,
      marginTop: `calc(0px - ${sysConfig.statusBarHeight}px - 44px)`
    }">
      <!-- 弹幕 -->
      <view class="barrage-wrap" :style="{
        top: `calc(${sysConfig.statusBarHeight}px + 44px)`
      }">
        <lff-barrage :style="{
          width: '100%'
        }" background="linear-gradient(to right,rgba(230,83,109, 0.9),rgba(230,83,109, 0.1))" type="rightToLeft"
          ref="detailBarrage" height="120" :maxTop="0"></lff-barrage>
      </view>

      <template v-if="pageData">
        <!-- 试玩按钮 -->
        <view @click="tryPlay" class="try-play">
          <cimage src="/static/gif/click.gif" mode="scaleToFill" />

          试玩
        </view>

        <!-- 右侧按钮列表 -->
        <view class="btn-list-r">
          <!-- <view class="btn relative">
            <button class="hide" open-type="share"></button> -->
          <view @click="openSharePop" class="btn">
            <view class="icon">
              <cimage src="/static/icon/share.png" mode="scaleToFill" />
            </view>

            <view class="title">分享</view>
          </view>

          <view @click="$common.to({ url: '/package/mine/bag' })" class="btn">
            <view class="icon">
              <cimage src="/static/icon/box.png" mode="scaleToFill" />
            </view>

            <view class="title">盒柜</view>
          </view>

          <view @click="$common.toRule(2)" class="btn">
            <view class="icon">
              <cimage src="/static/icon/rule.png" mode="scaleToFill" />
            </view>

            <view class="title">规则</view>
          </view>

          <view @click="$common.back()" class="btn">
            <view class="icon">
              <cimage src="/static/icon/more.png" mode="scaleToFill" />
            </view>

            <view class="title">更多</view>
          </view>
        </view>

        <!-- 商品轮播图 -->
        <swiper @change="swiperChange" class="img-list" autoplay circular>
          <swiper-item @click="openDetailPop(item)" v-for="(item, i) in pageData.awardList" :key="i">
            <view class="pic float">
              <cimage :src="item.thumb" mode="scaleToFill" />

              <cimage class="gif" src="/static/gif/shan_dian.gif" mode="scaleToFill" />
            </view>

            <view class="type-tag">
              <cimage :src="pageData.awardList[swiperCur].mark_icon" mode="scaleToFill" />
            </view>

            <view class="prize-title hang2">
              {{ pageData.awardList[swiperCur].title }}
            </view>

            <view class="price">
              ¥
              <text>{{ pageData.awardList[swiperCur].price }}</text>
            </view>
          </swiper-item>
        </swiper>

        <view class="all-type">
          <view v-for="(item, i) in pageData.box.markList" :key="i" class="all-type-item">
            <text :style="{
              color: item.color
            }">
              {{ item.title }}:
            </text>

            {{ item.rate }}%
          </view>
        </view>
      </template>
    </view>

    <view v-if="pageData" class="prize-card">
      <view class="prize-card-title">
        <view class="text">
          以下商品随机得一件

          <view @click="$common.to({ url: '/package/mine/tou-su' })" class="tou-su">
            投诉举报

            <uni-icons type="right" color="#999999" size="12" />
          </view>
        </view>
      </view>

      <view class="wrap-list">
        <gbro-marquee broadcastType="mould" direction="left" :viewHeight="162" :imgdata="pageData.awardList"
          :broadcastStyle="{ speed: 80 }" style="width: 100%">
          <block v-for="c in 2" :key="c">
            <!--在小程序里遇到一个坑不能使用两个slot 所有统一复制一份做衔接 -->
            <view @click="openDetailPop(a)" v-for="(a, b) in pageData.awardList" :key="b" class="pic">
              <view class="tag" :style="{
                background: a.mark_color
              }">
                {{ a.mark_title }}
              </view>

              <cimage :src="a.thumb" />
            </view>
          </block>
        </gbro-marquee>
      </view>

      <!-- <scroll-view class="prize-card-wrap" scroll-x>
        <view class="wrap-content">
          <view class="wrap-list">
            <view
              v-for="(item, i) in pageData.awardList"
              :key="i"
              class="wrap-list-item"
            >
              <view class="pic">
                <cimage :src="item.thumb" mode="scaleToFill" />

                <view
                  :style="{
                    background: item.mark_color
                  }"
                  class="tag"
                >
                  {{ item.mark_title }}
                </view>
              </view>

              <view class="title hang1">
                {{ item.title }}
              </view>

              <view class="price">
                ¥
                <text>{{ item.price }}</text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view> -->
    </view>

    <u-gap height="20"></u-gap>

    <!-- 评论 -->
    <!--    <view class="comment-card">
      <view class="comment-card-hd">
        <view class="title">收货评价({{ commentTotal }})</view>

        <view v-if="commentTotal > 0" @click="toComment" class="all-btn">
          查看全部

          <uni-icons type="right" color="#b0b0b0" size="12" />
        </view>
      </view>

      <view v-for="(item, i) in commentList" :key="i" class="comment-card-bd">
        <view class="user-info">
          <view class="avatar">
            <cimage :src="item.avatar" mode="scaleToFill" />
          </view>

          <view class="info">
            <view class="name hang1">{{ item.nickName }}</view>

            <view class="star">
              <uni-rate
                :size="18"
                :value="item.star"
                readonly
                color="#cccccc"
                active-color="#fe2f3c"
              />
            </view>
          </view>
        </view>

        <view class="goods-name">
          {{ item.title }}
        </view>

        <view class="word">
          {{ item.content }}
        </view>

        <view class="img-list">
          <view
            @click="$common.previewImg(a)"
            v-for="(a, b) in item.thumb"
            :key="b"
            class="img-list-item"
          >
            <cimage :src="a" mode="scaleToFill" />
          </view>
        </view>
      </view> -->
    <!-- </view> -->

    <u-gap height="20"></u-gap>

    <view class="bao-card">
      <view class="bao-card-hd">保底商品池(共{{ baoTotal }}款)</view>

      <view class="rate-list">
        <view @click="baoChange(i)" v-for="(item, i) in baoList" :key="i" class="rate-list-item" :class="{
          act: rateCur == i
        }">
          <view class="title">{{ item.title }}</view>

          <view class="rate">{{ item.rate }}%</view>
        </view>
      </view>
    </view>

    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getList" :down="downOption"
      :up="upOption">
      <view class="bao-list">
        <view @click="openDetailPop(item)" v-for="(item, i) in listData" :key="i" class="bao-list-item">
          <view class="pic">
            <cimage :src="item.thumb" mode="scaleToFill" />

            <view :style="{
              background: item.mark_color
            }" class="tag">
              <view>{{ item.mark_title }}</view>
            </view>
          </view>

          <view class="name hang1">
            {{ item.title }}
          </view>

          <view class="price-num">
            <view class="price">
              参考价
              <text>
                ¥
                <text>{{ item.price }}</text>
              </text>
            </view>
          </view>
        </view>
      </view>
    </mescroll-body>

    <view v-if="pageData" class="bt-btns">
      <!-- <view class="sm-btn relative">
        <button class="hide" open-type="contact"></button>

        <view class="icon">
          <cimage src="/static/icon/ke_fu.png" mode="scaleToFill" />
        </view>

        <view class="title">客服</view>
      </view> -->

      <view @click="confirmSubmit(0)" class="buy common_bg" :style="{
        backgroundImage: `url(${imgBaseUrl}${'/static/img/buy_now.png'})`
      }">
        <view>立即开盒</view>

        <view class="price">¥{{ pageData.box.price }}</view>
      </view>

      <view @click="openRedBagPop" class="open common_bg" :style="{
        backgroundImage: `url(${imgBaseUrl}${'/static/img/open_red_bag.png'})`
      }">
        开红包
      </view>
    </view>

    <!-- 分享弹窗 -->
    <uni-popup ref="sharePop" type="center">
      <view v-if="pageData" class="share-pop">
        <view class="share-pop-content">
          <view class="share-pop-content-hd">邀好友下单 赚积分开红包</view>

          <view class="num-title">
            本盒可赚

            <text>{{ pageData.box && pageData.box.send_coin }}</text>

            点积分
          </view>

          <view class="share-pop-content-bd">
            <view class="bag-list">
              <view v-for="(item, i) in 3" :key="i" class="bag-list-item bag-move">
                <view class="pic">
                  <cimage src="/static/img/red_bag1.png" mode="scaleToFill" />
                </view>

                <!-- <view class="title">普通红包</view>

                <view class="money">最高可得288元</view> -->
              </view>

              <!-- <view class="bag-list-item"> -->
              <!-- <view class="pic"> -->
              <!-- <cimage -->
              <!-- src="/static/img/red_bag_high.png" -->
              <!-- mode="scaleToFill" -->
              <!-- /> -->
              <!-- </view> -->

              <!-- <view class="title">超级红包</view> -->

              <!-- <view class="money">最高可得2888元</view> -->
              <!-- </view> -->
            </view>

            <view class="max-num">开启红包最多可得888余额</view>
          </view>

          <!-- <u-divider
            color="#952416"
            border-color="#952416"
            :half-width="100"
            bg-color="transparent"
            :margin-top="50"
          >
            邀请好友
          </u-divider> -->

          <view class="share-pop-content-ft">
            <view class="share-btn relative common_bg" :style="{
              backgroundImage: `url(${imgBaseUrl}${'/static/img/share_btn_bg.png'})`
            }">
              <button class="hide" open-type="share"></button>

              分享到群聊
            </view>

            <!-- <view class="btn-item relative">
              <button class="hide" open-type="share"></button>

              <view class="icon">
                <cimage src="/static/icon/wei_xin1.png" mode="scaleToFill" />
              </view>

              <view class="title">分享好友</view>
            </view>

            <view @click="getSharePic" class="btn-item">
              <view class="icon">
                <cimage src="/static/icon/hai_bao1.png" mode="scaleToFill" />
              </view>

              <view class="title">分享海报</view>
            </view> -->
          </view>

          <view class="get-people">已有50000+人获得超值福利</view>
        </view>

        <view @click="closeSharePop" class="share-pop-close">
          <cimage src="/static/icon/close1.png" mode="scaleToFill" />
        </view>
      </view>
    </uni-popup>

    <!-- 开红包弹窗 -->
    <uni-popup ref="redBagPop" type="bottom">
      <view v-if="pageData" class="red-bag-pop common_bg" :style="{
        backgroundImage: `url(${imgBaseUrl}${'/static/img/red_bag_bg.png'})`
      }">
        <view @click="getRule(11)" class="rule fixed-btn">规则</view>

        <view @click="$common.to({ url: '/package/box/log-invite' })" class="log fixed-btn">
          记录
        </view>

        <view class="red-bag-pop-content">
          <view class="red-bag-pop-content-bd">
            <view class="top-title common_bg" :style="{
              backgroundImage: `url(${imgBaseUrl}${'/static/img/title_line1.png'})`
            }">
              超值现金红包
            </view>

            <view class="num-title">
              <view class="icon">
                <cimage src="/static/icon/integral.png" mode="scaleToFill" />
              </view>

              {{ redBagConfig.coin }} | 每{{
                redBagConfig.open_redpack_coin
              }}积分可开启一次 最高{{ redBagConfig.redpack_max_money }}元
            </view>

            <view class="bag-list">
              <view @click="openBagOpen" v-for="(item, i) in 3" :key="i" class="bag-list-item bag-move">
                <view class="pic">
                  <cimage src="/static/img/red_bag1.png" mode="scaleToFill" />
                </view>

                <!-- <view class="title">普通红包</view>

                <view class="money">最高可得288元</view> -->
              </view>

              <!-- <view class="bag-list-item">
                <view class="pic">
                  <cimage
                    src="/static/img/red_bag_high.png"
                    mode="scaleToFill"
                  />
                </view>

                <view class="title">超级红包</view>

                <view class="money">最高可得2888元</view>
              </view> -->
            </view>

            <view @click="openBagOpen" class="open-bag btn-change">
              <view>开启红包</view>

              <view>(剩余可开{{ redBagConfig.redpack_times }}次)</view>
            </view>
          </view>

          <view class="red-bag-pop-content-ft">
            <view class="ft-title">
              <view class="line">
                <cimage src="/static/img/title_line.png" mode="scaleToFill" />
              </view>

              <view class="ft-title-content">邀请好友</view>
            </view>

            <view class="btn-list">
              <view class="btn-item relative">
                <button class="hide" open-type="share"></button>

                <view class="icon">
                  <cimage src="/static/icon/wei_xin1.png" mode="scaleToFill" />
                </view>

                <view class="title">分享好友</view>
              </view>

              <view @click="getSharePic" class="btn-item">
                <view class="icon">
                  <cimage src="/static/icon/hai_bao2.png" mode="scaleToFill" />
                </view>

                <view class="title">分享海报</view>
              </view>
            </view>
          </view>
        </view>

        <!-- <view @click="closeSharePop" class="red-bag-pop-close">
          <cimage src="/static/icon/close1.png" mode="scaleToFill" />
        </view> -->
      </view>
    </uni-popup>

    <uni-popup ref="orderPop" type="bottom">
      <view v-if="orderData" class="order-pop">
        <view class="order-pop-hd">
          支付后请在“我的-盒柜”内进行手动发货

          <view @click="closeOrderPop" class="close icon">
            <cimage src="/static/icon/close2.png" mode="scaleToFill" />
          </view>
        </view>

        <view class="order-pop-bd">
          <!-- 开盒数量 -->
          <view class="row">
            <view class="title">开盒数量</view>

            <view class="right"></view>
          </view>

          <view class="btn-list">
            <view @click="changeBuyType(i)" v-for="(item, i) in btnList" :key="i" class="btn-list-item" :class="{
              act: btnCur == i
            }">
              {{ item.title }}
            </view>
          </view>

          <view class="row">
            <view class="title">支付金额</view>

            <view class="right">
              <view class="price">
                ¥
                <text>{{ orderData.discount.total_money }}</text>
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
                <cimage :src="item.icon" mode="scaleToFill" />
              </view>

              <view class="title">{{ item.title }}</view>

              <view class="icon">
                <cimage v-if="payTypeCur == i" src="/static/icon/check1_act.png" mode="scaleToFill" />

                <cimage v-else src="/static/icon/check1.png" mode="scaleToFill" />
              </view>
            </view>
          </view>

          <view v-if="orderData.discount.money_dis * 1 > 0" class="row">
            <view class="title">余额抵扣</view>

            <view class="right">
              <view class="price red">
                -
                <text>{{ orderData.discount.money_dis }}</text>
              </view>
            </view>
          </view>

          <view class="agree">
            <view class="title">
              阅读并同意

              <text @click="$common.toRule(2)">《抽盒规则》</text>
            </view>

            <evan-switch v-model="agree" active-color="#000" :size="20" :active-value="true"
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

    <!-- 海报弹窗 -->
    <uni-popup ref="picPop" type="center">
      <view class="pic-pop">
        <view class="pic-pop-hd">
          <cimage :src="shareData" mode="scaleToFill" />
        </view>

        <view @click="saveImg" class="pic-pop-ft">保存到相册</view>
      </view>
    </uni-popup>

    <uni-popup ref="detailPop" type="bottom">
      <view class="detail-pop">
        <view class="detail-pop-hd">
          商品详情
          <view @click="closeDetailPop" class="icon close">
            <cimage src="/static/icon/close2.png" mode="scaleToFill" />
          </view>
        </view>

        <scroll-view class="detail-pop-bd" scroll-y>
          <view class="detail-pic">
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

            <view class="rate">概率{{ curDetail.show_rate }}%</view>
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

    <uni-popup ref="bagOpen" type="center">
      <view v-if="redBagConfig" class="bag-open">
        <view class="header-title">· 恭喜获得 ·</view>

        <view class="bag-title">幸运红包</view>

        <view class="bag-money">
          <view class="tag">最高</view>

          <view class="money">
            {{ redBagConfig.redpack_max_money }}
            <text>元</text>
          </view>
        </view>

        <view @click="submitOpenRedBag" class="open-btn common_bg" :style="{
          backgroundImage: `url(${imgBaseUrl}${'/static/img/red_bag_btn_bg.png'})`
        }">
          点击开启
        </view>

        <view class="open-mutiple">
          可开{{ redBagConfig.redpack_times }}次({{
            redBagConfig.redpack_times * redBagConfig.open_redpack_coin
          }}积分)
        </view>

        <view @click="closeBagOpen" class="close icon">
          <cimage src="/static/icon/close1.png" mode="scaleToFill" />
        </view>
      </view>
    </uni-popup>

    <uni-popup ref="bagRes" type="center">
      <view v-if="redOpenRes" class="bag-res common_bg" :style="{
        backgroundImage: `url(${imgBaseUrl}${'/static/img/red_bag_res_bg.png'})`
      }">
        <view class="bag-money">
          {{ redOpenRes.money }}
          <text>元</text>
        </view>

        <view class="tag">已存入应用钱包内</view>

        <view @click="toWithdrawal" class="open-btn common_bg" :style="{
          backgroundImage: `url(${imgBaseUrl}${'/static/img/red_bag_btn_bg.png'})`
        }">
          钱包提现
        </view>

        <view @click="closeBagRes" class="close icon">
          <cimage src="/static/icon/close1.png" mode="scaleToFill" />
        </view>
      </view>
    </uni-popup>

    <uni-popup ref="rulePop" type="center">
      <view v-if="ruleData" class="rule-pop">
        <view class="rule-pop-hd">{{ ruleData.title }}</view>

        <scroll-view scroll-y class="rule-pop-bd">
          <view v-html="ruleData.editor" class="content"></view>
        </scroll-view>

        <view v-if="ruleType == 'red_bag'" @click="closeRulePop" class="rule-pop-ft">
          <view class="btn">我知道了</view>
        </view>

        <view v-if="ruleType == 'buy'" @click="closeRulePop" class="rule-pop-ft">
          <view @click="closeRulePop" class="btn dis">拒绝</view>

          <view @click="confirmBuyRule" class="btn">同意规则</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { pathToBase64, base64ToPath } from '../../js_sdk/mmmm-image-tools/index'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      optionsData: '',
      pageLoading: true,
      // 下拉刷新的配置(可选, 绝大部分情况无需配置)
      downOption: {
        auto: false,
        use: false
      },
      // 上拉加载的配置(可选, 绝大部分情况无需配置)
      upOption: {
        auto: false,
        page: {
          size: 20 // 每页数据的数量,默认10
        }
      },
      listData: [],
      baoTotal: 0,
      baoList: [
        {
          id: '',
          title: '全部',
          rate: 100
        }
      ],
      rateCur: 0,
      barrageTimer: null,
      btnList: [],
      btnCur: 0,
      payTypeList: [

        // #ifdef H5 || MP
        {
          id: 3,
          icon: 'https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/wei_xin.png',
          title: '微信支付'
        },
        // {
        //   id: 4,
        //   icon: 'https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/alipay.png',
        //   title: '支付宝支付'
        // }
        // #endif
        // {
        //   id: 2,
        //   icon: '',
        //   title: '余额支付'
        // }
      ],
      payTypeCur: 0,
      agree: true,
      pageData: '',
      logList: [],
      barrageCur: 0,
      swiperCur: 0,
      commentList: [],
      commentTotal: 0,
      orderData: '',
      ruleData: '',
      shareData: '',
      curDetail: '',
      ruleData: '',
      redBagConfig: '',
      redOpenRes: '',
      ruleType: '',
      userInfo: '',
      // #ifdef H5
      checkTimer: null,
      cancelTimer: null,
      // #endif
    }
  },

  computed: {
    ...mapGetters(['sysConfig'])
  },

  onShareAppMessage () {
    let userInfo = uni.getStorageSync('userInfo')
    return {
      title: `快来抽取${this.pageData.box.title}!`,
      imageUrl: this.pageData.box.thumb,
      path: `/package/box/box-detail?id=${this.pageData.box.id}&userId=${(userInfo && userInfo.id) || ''
        }`
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

    console.log(this.optionsData, '-----')

    uni.$on('again', data => {
      this.confirmSubmit(0)
    })

    this.$store.dispatch('getUserInfo').then(res => {
      console.log(res)
      this.userInfo = res.data
    })

    // #ifdef H5
    let order_info = uni.getStorageSync('order_info_box')
    // let order_info = {provider: 'alipay', order_sn: 'C916652564524855'}
    console.log(order_info, '这里是打印的订单信息')
    if (order_info) {
      this.checkPayStatus(order_info)
    }
    // #endif
  },

  async onReady () {
    this.getComment()
    this.getDraw()
    this.$common.getRule(3, true).then(res => {
      this.ruleData = res
    })
    this.getLog()
    await this.getData()
    this.mescroll.resetUpScroll()
    this.mescroll.scrollTo(0, 0)
    console.log('pageReady')
    this.$nextTick(() => {
      setTimeout(() => {
        this.pageLoading = false
      }, 1000)
    })
  },

  onUnload () {
    clearInterval(this.barrageTimer)
    clearInterval(this.checkTimer)
    clearInterval(this.cancelTimer)
    this.barrageTimer = null
    console.log('移除事件')
    this.cancelCheckPayStatus()
    uni.$off('again')
  },

  methods: {
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
                      type: 1, url: '/pages/index/draw', query: {
                        id: res.data.id,
                        order_sn: order_info.order_sn,
                        drawNum: res.data.box_num
                      }
                    })
                  }
                })
                break;
              case 203:
                _this.cancelCheckPayStatus()
                this.$common.toast({ title: '支付失败', icon: 'none', duration: 500 })
                break;
            }
          }
        })
      }, 2 * 1000)

      _this.cancelTimer = setTimeout(() => {
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
    /**
     * @description: 确认购买规则
     * @return {*}
     */
    confirmBuyRule () {
      this.agree = true
      this.closeRulePop()
    },

    /**
     * @description: 去提现
     * @return {*}
     */
    toWithdrawal () {
      this.closeBagRes()
      this.$common.to({
        url: '/package/mine/withdrawal'
      })
    },

    /**
     * @description: 开启红包
     * @return {*}
     */
    submitOpenRedBag (e) {
      if (this.redBagConfig.redpack_times * 1 <= 0) {
        return
      }
      this.closeBagOpen()

      this.req({
        url: '/v1/redpack/open',
        data: {},
        Loading: false,
        success: res => {
          if (res.code == 200) {
            this.redOpenRes = res.data
            this.openBagRes()
            this.getRedBagConfig(true)
          }
        }
      })
    },

    /**
     * @description: 获取红包配置
     * @return {*}
     */
    getRedBagConfig (Loading = false) {
      return new Promise((resolve, reject) => {
        this.req({
          url: '/v1/config/redpack',
          data: {},
          Loading,
          success: res => {
            if (res.code == 200) {
              this.redBagConfig = res.data

              resolve()
            }
          }
        })
      })
    },

    /**
     * @description: 关闭规则弹窗
     * @return {*}
     */
    closeRulePop () {
      this.$refs.rulePop.close()
    },

    /**
     * @description: 打开规则弹窗
     * @return {*}
     */
    openRulePop () {
      this.$refs.rulePop.open()
    },

    /**
     * @description: 获取规则
     * @return {*}
     */
    getRule (e) {
      this.$common.getRule(e).then(res => {
        this.ruleData = res
        this.ruleType = 'red_bag'

        this.openRulePop()
      })
    },

    /**
     * @description: 关闭获得红包弹窗
     * @return {*}
     */
    closeBagRes () {
      this.$refs.bagRes.close()
    },

    /**
     * @description: 打开获得红包弹窗
     * @return {*}
     */
    openBagRes () {
      this.$refs.bagRes.open()
    },

    /**
     * @description: 关闭开启红包弹窗
     * @return {*}
     */
    closeBagOpen () {
      this.$refs.bagOpen.close()
    },

    /**
     * @description: 打开开启红包弹窗
     * @return {*}
     */
    openBagOpen () {
      if (this.redBagConfig.redpack_times * 1 <= 0) {
        this.$common.toast({
          title: '积分不足'
        })
        return
      }
      this.$refs.bagOpen.open()
    },

    /**
     * @description: 关闭详情弹窗
     * @return {*}
     */
    closeDetailPop () {
      this.$refs.detailPop.close()
    },

    /**
     * @description: 打开详情弹窗
     * @return {*}
     */
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

    /**
     * @description: 保存图片
     * @param {*} e
     * @return {*}
     */
    saveImg () {
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
     * @description: 关闭海报弹窗
     * @return {*}
     */
    closePicPop () {
      this.$refs.picPop.close()
    },

    /**
     * @description: 打开海报弹窗
     * @return {*}
     */
    openPicPop () {
      this.closeSharePop()
      this.closeRedBagPop()
      this.$refs.picPop.open()
    },

    /**
     * @description: 获取海报
     * @return {*}
     */
    getSharePic () {
      this.req({
        url: '/v1/luckbox/share/poster',
        data: {
          id: this.pageData.box.id,
          // #ifdef H5
          type: 'h5'
          // #endif
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
    getList ({ num, size }) {
      this.req({
        url: '/v1/box/award',
        data: {
          page: num,
          per_page: size,
          box_id: this.optionsData.id,
          mark_id: this.baoList[this.rateCur].id
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.baoTotal = res.data.totals
            if (num == 1) {
              this.listData = []
            }

            this.listData = [...this.listData, ...res.data.data]
            this.mescroll.endBySize(res.data.data.length, res.data.total)
          }
        }
      })
    },

    /**
     * @description: 保底奖品切换
     * @param {*} e
     * @return {*}
     */
    baoChange (e) {
      this.rateCur = e
      this.listData = []
      this.mescroll.resetUpScroll()
    },

    /**
     * @description: 试玩
     * @return {*}
     */
    tryPlay () {
      this.$common.to({
        url: '/pages/index/draw',
        query: {
          id: this.pageData.box.id,
          drawNum: 1,
          type: 'play'
        }
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

    /**
     * @description: 确认/提交订单
     * @param {*} e 0:确认订单,1:提交订单
     * @return {*}
     */
    async confirmSubmit (e) {
      if (this.btnList.length == 0) {
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
        id: this.pageData.box.id,
        draw_id: this.btnList[this.btnCur].id,
        invite_user_id: this.optionsData.userId || '',
        pay_type: this.payTypeList[this.payTypeCur].id,
        submit: e
      }

      this.req({
        url: '/v1/box/order',
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
                const params = { ...res.data, returnUrl: `/package/box/box-detail?id=${this.optionsData.id}` }
                this.$common.orderPay(params).then(res1 => {
                  if (res1 == 'success') {
                    this.$common.toast({
                      title: '支付成功',
                      icon: 'success',
                      duration: 1500,
                      success: () => {
                        this.$common.to({
                          type: 1,
                          url: '/pages/index/draw',
                          query: {
                            id: this.pageData.box.id,
                            order_sn: res.data.order_sn,
                            drawNum: this.orderData.box.num
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
                      url: '/pages/index/draw',
                      query: {
                        id: this.pageData.box.id,
                        order_sn: res.data.order_sn,
                        drawNum: this.orderData.box.num
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
     * @description: 获取评论
     * @return {*}
     */
    getComment () {
      this.req({
        url: '/v1/box/rating',
        data: {
          id: this.optionsData.id,
          page: 1,
          per_page: 1
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.commentList = res.data.data
            this.commentTotal = res.data.total
          }
        }
      })
    },

    /**
     * @description: 轮播图切换
     * @param {*} e
     * @return {*}
     */
    swiperChange (e) {
      this.swiperCur = e.detail.current
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

            this.runBarrage()
          }
        }
      })
    },

    /**
     * @description: 获取数据
     * @return {*}
     */
    getData () {
      return new Promise((resolve, reject) => {
        this.req({
          url: '/v1/box/info',
          data: {
            id: this.optionsData.id
          },
          Loading: true,
          success: res => {
            if (res.code == 200) {
              this.pageData = res.data

              this.baoList.push(...res.data.box.markList)
              resolve()
            }
          }
        })
      })
    },

    /**
     * @description: 前往评论列表
     * @return {*}
     */
    toComment () {
      this.$common.to({
        url: '/package/box/comment-list',
        query: {
          id: this.pageData.box.id
        }
      })
    },

    /**
     * @description: 选择购买类型
     * @param {*} e
     * @return {*}
     */
    changeBuyType (e) {
      this.btnCur = e

      this.confirmSubmit(0)
    },

    /**
     * @description: 切换支付方式
     * @return {*}
     */
    changePayType (e) {
      this.payTypeCur = e

      // this.confirmSubmit(0)
    },

    /**
     * @description: 关闭订单弹窗
     * @return {*}
     */
    closeOrderPop () {
      this.$refs.orderPop.close()
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
     * @description: 关闭红包弹窗
     * @return {*}
     */
    closeRedBagPop () {
      this.$refs.redBagPop.close()
    },

    /**
     * @description: 打开红包弹窗
     * @return {*}
     */
    async openRedBagPop () {
      // Promise.all([this.getRedBagConfig(), this.$store.dispatch('getUserInfo')])
      //   .then(res => {
      //     console.log(res)
      //     this.$refs.redBagPop.open()
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      await this.getRedBagConfig()
      this.$refs.redBagPop.open()
    },

    /**
     * @description: 关闭分享弹窗
     * @return {*}
     */
    closeSharePop () {
      this.$refs.sharePop.close()
    },

    /**
     * @description: 打开分享弹窗
     * @return {*}
     */
    openSharePop () {
      this.$refs.sharePop.open()
    },

    /**
     * @description: 发送弹幕
     * @param {*}
     * @return {*}
     */
    runBarrage () {
      this.barrageTimer = setInterval(() => {
        if (this.logList.length > 0) {
          this.$refs.detailBarrage.add({
            head_pic: this.logList[this.barrageCur].avatar,
            name: this.logList[this.barrageCur].nickName,
            times: this.logList[this.barrageCur].times,
            markTitle: this.logList[this.barrageCur].mark_title,
            prize: this.logList[this.barrageCur].thumb
          })
          this.barrageCur += 1
          if (this.barrageCur == this.logList.length) {
            this.barrageCur = 0
          }
        }
      }, 3000)
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  padding-bottom: 120rpx;

  ::v-deep.uni-navbar__content {
    z-index: 99;
  }

  @keyframes float {
    0% {
      transform: translateY(0rpx);
    }

    50% {
      transform: translateY(20rpx);
    }

    100% {
      transform: translateY(0rpx);
    }
  }

  .float {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes bagMove {
    0% {
      transform: translateY(10rpx);
    }

    50% {
      transform: translateY(-10rpx);
    }

    100% {
      transform: translateY(10rpx);
    }
  }

  .bag-move {
    animation-name: bagMove;
    animation-duration: 3s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }

  @keyframes btnChange {
    0% {
      transform: scale(1, 1);
    }

    50% {
      transform: scale(1.08, 1.08);
    }

    100% {
      transform: scale(1, 1);
    }
  }

  .btn-change {
    animation: btnChange 3s ease-in-out infinite;
  }

  &-loading {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    background: #fbfbfb;

    background-position: center center;
    background-size: 100% auto;
  }

  &-hd {
    position: relative;
    width: 100%;
    height: 944rpx;
    box-sizing: border-box;
    padding: 200rpx 0 30rpx;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;

    .barrage-wrap {
      width: 100%;
      height: 50rpx;
      position: absolute;
      // bottom: 50rpx;
      left: 0;
      z-index: 10;
      pointer-events: none;
    }

    .try-play {
      position: absolute;
      left: 0;
      top: 470rpx;
      z-index: 1;
      width: 88rpx;
      height: 112rpx;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 0 10rpx 10rpx 0;
      overflow: hidden;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

      cimage {
        width: 80rpx;
        height: 70rpx;
        // margin: auto;
      }

      font-size: 22rpx;
      font-family: Source Han Sans CN;
      font-weight: 800;
      color: #293540;
    }

    .btn-list-r {
      position: absolute;
      z-index: 1;
      right: 24rpx;
      top: 180rpx;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;

      .btn {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;

        .icon {
          width: 60rpx;
          height: 60rpx;
        }

        .title {
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #293540;
        }
      }

      .btn+.btn {
        margin-top: 30rpx;
      }
    }

    .img-list {
      width: 100%;
      height: 650rpx;
      margin-top: 50rpx;

      swiper-item {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;

        .pic {
          width: 340rpx;
          height: 340rpx;
          position: relative;

          .gif {
            position: absolute;
            width: 150%;
            height: 150%;
            left: -25%;
            top: -25%;
            z-index: 1;
          }
        }

        .type-tag {
          width: 382rpx;
          height: 58rpx;
          margin-top: 40rpx;
        }

        .prize-title {
          margin-top: 30rpx;
          width: 400rpx;
          height: 88rpx;
          text-align: center;

          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #293540;
          line-height: 44rpx;
        }

        .price {
          font-size: 24rpx;
          font-family: Source Han Sans CN;
          font-weight: 800;
          color: #293540;

          text {
            font-size: 38rpx;
          }
        }
      }
    }

    .all-type {
      width: 100%;
      box-sizing: border-box;
      // padding: 0 50rpx;
      display: flex;
      justify-content: space-evenly;

      &-item {
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;

        text {
          color: #ee5c5e;
        }
      }
    }
  }

  .prize-card {
    background: #fff;
    border-radius: 10rpx 10rpx 0 0;
    padding: 30rpx;

    &-title {
      display: flex;
      justify-content: center;

      .text {
        position: relative;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #293540;

        .tou-su {
          display: flex;
          align-items: center;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 30rpx;
          white-space: nowrap;

          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
        }
      }
    }

    .wrap-list {
      width: 100%;
      margin-top: 30rpx;
      // height: 162rpx;

      .pic {
        position: relative;
        width: 162rpx;
        height: 162rpx;
        box-sizing: border-box;
        border: 1rpx solid #e5e5e5;
        margin: 0 5rpx;

        .tag {
          padding: 2rpx 8rpx;
          border-radius: 20rpx 0 0 0;
          position: absolute;
          z-index: 1;
          right: 0;
          bottom: 0;
          background: #ee5c5e;
          color: #fff;
        }
      }
    }

    .prize-card-wrap {
      // padding: 0 30rpx;
      width: 100%;
      box-sizing: border-box;
      margin-top: 30rpx;

      .wrap-content {
        display: inline-block;
      }
    }
  }

  .comment-card {
    background: #fff;
    padding: 30rpx;

    &-hd {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: 32rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #293540;
      }

      .all-btn {
        display: flex;
        align-items: center;

        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #b0b0b0;
      }
    }

    &-bd {
      margin-top: 30rpx;

      .user-info {
        display: flex;
        align-items: center;

        .avatar {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
          overflow: hidden;
        }

        .info {
          padding-left: 10rpx;

          .name {
            width: 300rpx;
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #293540;
          }

          .star {
            margin-top: 10rpx;
          }
        }
      }

      .goods-name {
        margin-top: 20rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #b5b5b5;
        line-height: 33rpx;
      }

      .word {
        margin-top: 30rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 47rpx;
      }

      .img-list {
        display: flex;
        padding: 1rpx 0 0;
        flex-flow: row wrap;

        &-item {
          width: 140rpx;
          height: 140rpx;
          margin-top: 20rpx;
          margin-right: 20rpx;
        }
      }
    }
  }

  .bao-card {
    padding: 30rpx;
    background: #fff;

    &-hd {
      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #293540;
    }

    .rate-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30rpx;

      &-item {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;

        .title {
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
        }

        .rate {
          width: 130rpx;
          height: 44rpx;
          border-radius: 888rpx;
          background: transparent;
          margin-top: 10rpx;
          line-height: 44rpx;
          text-align: center;

          font-size: 26rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
        }
      }

      &-item.act {
        .title {
          color: #f5a532;
        }

        .rate {
          background: #f7a532;
          color: #fff;
        }
      }
    }
  }

  .bao-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 1rpx 30rpx 40rpx;

    &-item {
      width: 340rpx;
      border-radius: 10rpx;
      overflow: hidden;
      background: #ffffff;
      margin-top: 20rpx;

      .pic {
        height: 340rpx;
        position: relative;

        .tag {
          position: absolute;
          left: 10rpx;
          bottom: 0;

          padding: 8rpx 20rpx;
          border-radius: 8rpx;
          background: #f43336;
          transform: skew(-14deg);

          view {
            transform: skew(14deg);

            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
          }
        }
      }

      .name {
        padding: 10rpx 15rpx;

        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }

      .price-num {
        padding: 0 15rpx 10rpx;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;

        .price {
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #666666;

          text {
            font-weight: bold;
            padding-left: 6rpx;
            font-size: 24rpx;
            color: #f67a29;

            text {
              font-size: 32rpx;
            }
          }
        }

        .num {
          font-size: 20rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
        }
      }
    }
  }

  .bt-btns {
    position: fixed;
    z-index: 10;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 30rpx;
    // align-items: center;
    box-sizing: border-box;
    padding-top: 10rpx;
    width: 100%;
    height: 120rpx;
    background: #fff;

    .buy {
      width: 400rpx;
      height: 90rpx;
      // padding-top: 30rpx;
      text-align: center;
      box-sizing: border-box;
      justify-content: space-around;
      // align-items: center;
      line-height: 90rpx;

      font-size: 32rpx;
      font-family: YouSheBiaoTiHei;
      font-weight: bold;
      font-style: italic;
      color: #ffffff;
      display: flex;

      .price {
        font-size: 24rpx;
        font-family: Source Han Sans CN;
        font-weight: 800;
        color: #ffffff;

        text {
          font-size: 32rpx;
        }
      }
    }

    .open {
      width: 280rpx;
      height: 90rpx;
      line-height: 90rpx;
      text-align: center;

      font-size: 32rpx;
      font-family: YouSheBiaoTiHei;
      font-weight: bold;
      font-style: italic;
      color: #ffffff;
    }

    .sm-btn {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      margin-top: 10rpx;

      .icon {
        width: 50rpx;
        height: 50rpx;
      }

      .title {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        // margin-top: 10rpx;
      }
    }
  }

  .share-pop {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    &-content {
      width: 630rpx;
      background: linear-gradient(269deg, #f6f1f7, #fdece2, #fce9ed);
      border-radius: 20rpx;
      box-sizing: border-box;
      padding: 50rpx 40rpx;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;

      &-hd {
        font-size: 40rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #952416;
      }

      .num-title {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #952416;
        margin-top: 30rpx;

        text {
          color: #fe2b32;
        }
      }

      &-bd {
        width: 100%;
        margin-top: 30rpx;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        border: 4rpx solid #fad3ba;
        padding: 40rpx 0 30rpx;

        .bag-list {
          display: flex;
          width: 100%;
          justify-content: space-around;
          // margin-top: 50rpx;

          &-item {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
            width: 126rpx;
            height: 164rpx;
            // border: 4rpx solid #fad3ba;
            box-sizing: border-box;

            .pic {
              width: 100%;
              height: 100%;
            }

            .title {
              font-size: 32rpx;
              font-family: PingFang SC;
              font-weight: bold;
              color: #952416;
              padding: 10rpx 0;
            }

            .money {
              font-size: 24rpx;
              font-family: PingFang SC;
              font-weight: 500;
              color: #952416;
            }
          }
        }

        .max-num {
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #952416;
          margin-top: 30rpx;
        }
      }

      ::v-deep.u-divider-line {
        border-width: 4rpx;
      }

      ::v-deep.u-divider-text {
        font-weight: bold;
      }

      &-ft {
        display: flex;
        align-items: center;
        // width: 360rpx;
        justify-content: space-around;
        margin-top: 50rpx;

        .share-btn {
          width: 372rpx;
          height: 106rpx;
          line-height: 106rpx;
          text-align: center;

          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffffff;
        }

        .btn-item {
          display: flex;
          flex-flow: column nowrap;
          align-items: center;

          .icon {
            width: 80rpx;
            height: 80rpx;
          }

          .title {
            margin-top: 10rpx;

            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #952416;
          }
        }
      }

      .get-people {
        margin-top: 10rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #893425;
      }
    }

    &-close {
      width: 62rpx;
      height: 62rpx;
      margin-top: 100rpx;
    }
  }

  .red-bag-pop {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background-size: 100% auto;
    padding-top: 270rpx;
    position: relative;

    .fixed-btn {
      width: 60rpx;
      height: 60rpx;
      text-align: center;
      line-height: 60rpx;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      position: absolute;
      right: 30rpx;
      top: 80rpx;
      z-index: 10;

      font-size: 20rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;

      &.log {
        top: 170rpx;
      }
    }

    &-content {
      width: 710rpx;
      background: #efd8d5;
      border-radius: 20rpx 20rpx 0 0;
      box-sizing: border-box;
      // padding: 50rpx 40rpx;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;

      &-bd {
        width: 100%;
        padding: 30rpx 0;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        border-radius: 20rpx;
        background: #fff;

        .top-title {
          padding: 0 30rpx;
          font-size: 42rpx;
          font-family: YouSheBiaoTiHei;
          font-weight: bold;
          font-style: italic;
          color: #73341c;
          background-size: 100% auto;
          background-position: 0 center;
        }

        .num-title {
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #73341c;
          font-weight: bold;
          line-height: 40rpx;
          display: flex;
          margin-top: 30rpx;

          .icon {
            width: 40rpx;
            height: 40rpx;
          }

          text {
            color: #fe2b32;
          }
        }

        .bag-list {
          display: flex;
          width: 660rpx;
          justify-content: space-around;
          margin: 40rpx auto 0;
          padding: 50rpx 0;
          background: rgba(233, 202, 171, 0.3);
          border-radius: 10rpx;
          border: 2rpx solid #eeb9ae;

          &-item {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
            width: 156rpx;
            height: 200rpx;

            .pic {
              width: 100%;
              height: 100%;
            }

            .title {
              font-size: 32rpx;
              font-family: PingFang SC;
              font-weight: bold;
              color: #952416;
              padding: 10rpx 0;
            }

            .money {
              font-size: 24rpx;
              font-family: PingFang SC;
              font-weight: 500;
              color: #952416;
            }
          }
        }

        .open-bag {
          width: 429rpx;
          height: 100rpx;
          background: linear-gradient(8deg, #fc2c3d, #ff4b54);
          border-radius: 54rpx;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-evenly;
          align-items: center;
          margin-top: 30rpx;

          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;

          view+view {
            font-size: 24rpx;
          }
        }
      }

      &-ft {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        width: 100%;
        margin-top: 30rpx;
        padding-top: 30rpx;
        border-radius: 20rpx 20rpx 0 0;
        background: #fff;

        .ft-title {
          position: relative;
          width: 300rpx;

          .line {
            width: 100%;
            height: 4rpx;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-100%);
          }

          &-content {
            position: relative;
            z-index: 1;
            text-align: center;

            font-size: 32rpx;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #7f442c;
          }
        }

        .btn-list {
          display: flex;
          padding: 30rpx 0 40rpx;

          .btn-item {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;

            .icon {
              width: 80rpx;
              height: 80rpx;
            }

            .title {
              margin-top: 10rpx;

              font-size: 24rpx;
              font-family: PingFang SC;
              font-weight: bold;
              color: #952416;
            }
          }

          .btn-item+.btn-item {
            margin-left: 150rpx;
          }
        }
      }
    }

    &-close {
      width: 62rpx;
      height: 62rpx;
      margin-top: 100rpx;
    }
  }

  .order-pop {
    background: #fff;
    border-radius: 10rpx 10rpx 0 0;
    padding: 1rpx 30rpx;

    &-hd {
      height: 100rpx;
      position: relative;
      line-height: 100rpx;
      text-align: center;

      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;

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
          color: #333333;
        }

        .right {
          .price {
            font-size: 28rpx;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #333333;

            text {
              font-size: 34rpx;
            }
          }

          .gray {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
          }

          .red {
            color: #ff4f4d;
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
          color: #333333;
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
          color: #333333;

          text {
            color: #cc0000;
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
      background: #000000;
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

      .money {
        font-weight: bold;
        font-size: 24rpx;

        text {
          font-size: 32rpx;
        }
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

  .bag-open {
    width: 500rpx;
    border-radius: 40rpx;
    border: 4rpx solid #f3c7b6;
    background: linear-gradient(270deg, #fb2c32, #fa3b50);
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding: 40rpx 0;
    position: relative;

    .header-title {
      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }

    .bag-title {
      margin-top: 40rpx;
      font-size: 36rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }

    .bag-money {
      display: flex;
      align-items: center;
      margin-top: 60rpx;

      .tag {
        width: 43rpx;
        padding: 8rpx 0;
        text-align: center;
        border: 1rpx solid #ffffff;

        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 26rpx;
      }

      .money {
        font-size: 70rpx;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #ffffff;
        margin-left: 20rpx;

        text {
          font-size: 28rpx;
          font-weight: normal;
        }
      }
    }

    .open-btn {
      width: 318rpx;
      height: 92rpx;
      text-align: center;
      line-height: 92rpx;
      margin-top: 80rpx;

      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #7c2f11;
    }

    .open-mutiple {
      width: 318rpx;
      height: 92rpx;
      box-sizing: border-box;
      padding: 0 20rpx;
      border-radius: 999rpx;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20rpx;
      border: 2rpx solid #fff;
      word-wrap: break-word;
      word-break: break-all;

      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }

    .close {
      width: 62rpx;
      height: 62rpx;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 200%);
    }
  }

  .bag-res {
    width: 540rpx;
    height: 644rpx;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    box-sizing: border-box;
    padding: 130rpx 0 40rpx;
    position: relative;

    .bag-money {
      font-size: 70rpx;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #d73335;

      text {
        font-size: 28rpx;
        font-weight: normal;
      }
    }

    .tag {
      margin-top: 50rpx;
      width: 311rpx;
      height: 46rpx;
      background: #fad9b3;
      border-radius: 23rpx;
      line-height: 46rpx;
      text-align: center;

      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #b36445;
    }

    .open-btn {
      width: 318rpx;
      height: 92rpx;
      text-align: center;
      line-height: 92rpx;
      margin-top: 180rpx;

      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #7c2f11;
    }

    .close {
      width: 62rpx;
      height: 62rpx;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 200%);
    }
  }

  .rule-pop {
    width: 570rpx;
    border-radius: 10rpx;
    background: #fff;
    padding: 0 30rpx 30rpx;

    &-hd {
      padding: 30rpx 0;
      text-align: center;

      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }

    &-bd {
      max-height: 50vh;

      .content {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
        line-height: 44rpx;
      }
    }

    &-ft {
      margin: 50rpx auto 0;
      display: flex;
      justify-content: space-around;

      .btn {
        width: 220rpx;
        height: 66rpx;
        background: #000000;
        border: 1rpx solid #000;
        box-sizing: border-box;
        border-radius: 33rpx;
        line-height: 66rpx;
        text-align: center;

        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;

        &.dis {
          background: #ffffff;
          border-color: #efefef;
          color: #969698;
        }
      }
    }
  }
}
</style>
