<!--
 * @Date: 2022-12-07 14:57:46
 * @LastEditTime: 2025-04-30 12:06:10
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar title="盒柜" color="#000" backgroundColor="#effdea" :border="false" :statusBar="true" :fixed="true">
      <block slot="right">
        <view @click="$common.to({
          url: '/package/mine/zz',
        })">转赠记录</view>
      </block>
    </uni-nav-bar>

    <view class="tab-list" :style="{
      top: `calc(${sysConfig.statusBarHeight}px + 44px)`
    }">
      <view @click="tabChage(i)" v-for="(item, i) in tabList" :key="i" class="tab-list-item" :class="{
        act: tabCur == i
      }">
        {{ item.title }}
      </view>
    </view>

    <!-- <scroll-view class="btn-list-wrap" scroll-x :style="{
      top: `calc(${sysConfig.statusBarHeight}px + 44px + 88rpx)`
    }">
      <view class="btn-list-wrap-content">
        <view class="btn-list">
          <view @click="btnChange(i)" v-for="(item, i) in btnList" :key="i" class="btn-list-item" :class="{
            act: btnCur == i
          }">
            {{ item.title }}
          </view>
        </view>
      </view>
    </scroll-view> -->

    <u-gap height="76"></u-gap>

    <view class="list" v-if="listData.length">
      <view v-for="(item, i) in listData" :key="i" class="list-item">
        <view class="list-item-wrap">
          <view class="cart_chk_warp" v-if="tabCur == 0">
            <u-checkbox-group @change="hangldeItemChange">
              <u-checkbox v-model="item.checked"></u-checkbox>
            </u-checkbox-group>
          </view>
          <view class="card-item">
            <view class="list-item-hd">
              <view class="pic">
                <cimage :src="item.thumb" mode="scaleToFill" />

                <view :style="{
                  background: item.mark_color
                }" class="tag">
                  {{ item.mark_title }}
                </view>
              </view>
              <view class="info">
                <view class="title hang2">
                  {{ item.title }}
                </view>
                <view class="title return_wrap">
                  <view class="return_price">
                    <image class="return-img" src="https://www.img.xcooo.cn/uploads/2024/02/231fcebf5c7a968d.png"
                      mode="widthFix" lazy-load="false" binderror="" bindload="" />可退货余额: {{ item.total_return_price }}
                  </view>
                  <view class="return_num">X {{ item.total }}</view>
                </view>
                <view class="return_total">
                  <u-number-box :min="1" v-model="item.num" :max="item.total"
                    @change="totalChange(item, $event)"></u-number-box>
                </view>
              </view>
            </view>
            <view class="list-item-bd">
              <template v-if="tabCur == 0">
                <view @click="openDhModel(item)" v-if="item.type == 1" class="btn">
                  退货
                </view>

                <view @click="toSend(item)" class="btn">提货</view>
              </template>

              <view @click="toDetail(item)" v-if="tabCur == 1 || tabCur == 4" class="btn">
                查看详情
              </view>

              <template v-if="tabCur == 2">
                <view @click="toExpress(item)" class="btn">查看物流</view>

                <view @click="openModel(item)" class="btn">确认收货</view>
              </template>

              <view @click="toComment(item)" v-if="tabCur == 3 &&
                item.type == 1 &&
                (item.mark_id == 1 || item.mark_id == 2)
                " class="btn">
                去评价
              </view>

              <view @click="buyAgain(item)" v-if="tabCur == 4 && item.type == 1 && item.is_change == 0" class="btn">
                再次购买
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <template v-else>
      <view class="empty-list">
        <u-empty text="暂无数据~" mode="list"></u-empty>
      </view>
    </template>
    <template v-if="tabCur == 0">
      <view class="btn-bootm">
        <view class="btn btn-01" :style="{ 'background-image': 'url(' + `${imgBaseUrl}/static/web/06.png` + ')' }"
          @click="allChecked">{{ all ? '反选' : '全选' }}</view>
      </view>
      <view class="btn-bootm">
        <view class="btn btn-02" :style="{ 'background-image': 'url(' + `${imgBaseUrl}/static/web/06.png` + ')' }"
          @click="zsong">赠送</view>
      </view>
      <view class="btn-bootm">
        <view class="btn btn-04" :style="{ 'background-image': 'url(' + `${imgBaseUrl}/static/web/06.png` + ')' }"
          @click="rongjie">退货</view>
      </view>
      <view class="btn-bootm">
        <!-- <image class="btn btn-03" @click="tihuo" src="../../static/web/07.png" mode="widthFix" lazy-load="false"
          binderror="" bindload="" /> -->
        <!-- <view class="btn btn-03" @click="tihuo">提货</view> -->
      </view>
    </template>

    <u-popup v-model="zsShow" mode="center" border-radius="16" height="30%" :closeable="true" @close="closeZz">
      <view class="zsbox">
        <view class="zs-title">请输入对方ID</view>
        <view class="zs-input-wrap">
          <u-field class="zs-input" v-model="zsid" placeholder="请输入对方ID"></u-field>
        </view>

        <view class="zs-tip">注: 一旦转赠成功不可撤回, 请谨慎操作!</view>

        <view class="zs-btn-wrap">
          <view class="zs-btn zs-btn-01" @click="cacelZs">
            取消
          </view>
          <view class="zs-btn zs-btn-02" @click="zsSubmit">
            确定
          </view>
        </view>
      </view>
    </u-popup>

    <u-modal v-model="showModel" :title="'提示'" :content="'请确认是否已收到货'" :show-cancel-button="true"
      @confirm="submitGet"></u-modal>

    <u-modal v-model="showRj" :title="'提示'" @confirm="duihuan" content="退货根据市场成本变化，一经退货无法撤销，请确认是否退货？"
      :show-cancel-button="true"></u-modal>

    <u-popup v-model="rjShow" mode="bottom" border-radius="16" height="50%" :closeable="true" @close="closeRj">
      <view class="rj-wrap">
        <view class="rj-title">退货确认单</view>
        <view class="rj-desc">确定要退货选中的赏品吗?</view>
        <view class="rj-mall">
          <view class="rj-shop">
            <view class="rj-shop-title">
              已选赏品
            </view>
            <view class="rh-shop-num">
              共<text>{{ totalNum }}</text>件
            </view>
          </view>
          <scroll-view class="ri-shop-scroll" scroll-x>
            <view class="ri-shop-list">
              <view class="ri-shop-item" v-for="(item, index) in checkedList" :key="index">
                <view class="rj-shop-img-wrap">
                  <image class="ri-shop-img" :src="item.thumb" mode="widthFix" lazy-load="false" binderror=""
                    bindload="" />
                </view>
                <view class="rj-shop-num">x{{ item.num }}</view>
                <view class="rj-shop-title">{{ item.title }}</view>
                <view class="rj-shop-money">可退货余额: {{ item.total_return_price }}</view>
              </view>

            </view>
          </scroll-view>
        </view>
        <view class="rj-bottom">
          <view class="rj-money">
            <image class="ri-bottom-img" src="https://www.img.xcooo.cn/uploads/2024/02/231fcebf5c7a968d.png"
              mode="widthFix" lazy-load="false" binderror="" bindload="" />可退货余额: {{ totalPrice.toFixed(2) }}
          </view>
          <view class="rj-btn" @click="duihuan">
            确认退货
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  data () {
    return {
      optionsData: '',
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
        empty: {
          use: true, // 是否显示空布局
          // icon: "../../static/home/empty.png", // 图标路径
          tip: '这里什么都没有~', // 提示
          fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
          top: "100rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
          zIndex: 99 // fixed定位z-index值
        },
      },
      listData: [],
      tabList: [{
        id: 0,
        title: '待提货'
      },
      {
        id: 1,
        title: '待发货'
      },
      {
        id: 2,
        title: '已发货'
      },
      // {
      //   id: 3,
      //   title: '已完成'
      // },
      {
        id: 4,
        title: '已完成'
      },
      ],
      tabCur: 0,
      btnList: [],
      btnCur: 0,
      canRefresh: false,
      curItem: '',
      showModel: false,
      showRj: false,
      zsShow: false,
      zsid: '',
      userInfo: '',
      // ---------分割线----------
      // 全选
      all: false,
      rjShow: false,
      // 总数
      totalNum: 0,
      // 总价格
      totalPrice: 0,
      checkedList: []
    }
  },

  computed: {
    ...mapGetters(['sysConfig'])
  },

  onLoad (options) {
    this.optionsData = options
    // this.tabCur = options.tabCur ?? 0
  },

  onShow () {
    this.tabCur = getApp().globalData.tabCur ?? 0
    // this.canRefresh && this.mescroll.resetUpScroll()
    // this.canRefresh && this.mescroll.scrollTo(0, 0)
    // this.canRefresh = true
    this.$store.dispatch('getUserInfo').then(res => {
      this.userInfo = res.data
    })

    this.init()
  },
  watch: {
    rjShow (val) {
      console.log(val)
      if (!val) {
        this.totalNum = 0
        this.totalPrice = 0
        this.checkedList = []
      }
    }
  },

  methods: {
    resetParams () {
      this.listData = []
      this.rjShow = false
      this.totalNum = 0
      this.totalPrice = 0
      this.checkedList = []
    },
    // 步进器 
    totalChange (item, e) {
      // 当前数量
      let value = e.value
      item.total_return_price = this.preciseMultiply(item.return_price, value)
    },
    // 自定义函数来处理浮点数乘法精度问题
    preciseMultiply (a, b) {
      const factor = Math.pow(10, 10);
      let num = (Math.round(a * factor) * Math.round(b * factor)) / (factor * factor);
      return num.toFixed(2)
    },
    // 自定义函数来处理浮点数加法精度问题
    preciseAdd (a, b) {
      function toInteger (floatNum) {
        var str = floatNum.toString();
        var dotPos = str.indexOf('.');
        var len = str.length - (dotPos + 1);
        var factor = Math.pow(10, len);
        var intNum = Math.round(floatNum * factor);
        return { intNum, factor };
      }

      var aInt = toInteger(a);
      var bInt = toInteger(b);

      var maxFactor = Math.max(aInt.factor, bInt.factor);
      var result = (aInt.intNum * (maxFactor / aInt.factor)) + (bInt.intNum * (maxFactor / bInt.factor));
      return result / maxFactor;
    },
    closeRj () {
      this.rjShow = false
    },
    // 批量溶解
    rongjie () {
      // this.all = true
      let flag = this.listData.some(item => item.checked)
      if (!flag) {
        this.$common.toast({
          title: '请选择要退货的赏品',
          icon: 'none',
          duration: 1500,
        })
        return
      }
      this.checkedList = this.listData.filter(item => item.checked)

      this.checkedList.forEach(v => {
        // 计算总数
        this.totalNum = this.preciseAdd(this.totalNum, v.num)
        // 计算总退货价格
        let itemPrice = this.preciseMultiply(v.num, v.return_price)
        this.totalPrice = this.preciseAdd(this.totalPrice, itemPrice)
      })

      this.rjShow = true
    },
    closeZz () {
      this.zsShow = false
      this.zsid = ''
    },
    cacelZs () {
      this.zsShow = false
      this.zsid = ''
    },
    zsSubmit () {
      if (this.zsid == '') {
        this.$common.toast({
          title: '请输入对方ID',
          icon: 'none',
          duration: 1500,
        })
        return
      }
      let goods_id = []
      this.checkedList.forEach((item, index) => {
        for (let i = 1; i <= item.num; i++) {
          goods_id.push(item.goods_id)
        }
      })
      this.req({
        url: '/v1/user/ship/echargez',
        data: {
          zsid: this.zsid,
          goods_id
        },
        Loading: true,
        success: (res) => {
          if (res.code == 200) {
            this.$common.toast({
              title: '赠送成功',
              icon: 'success',
              duration: 1500,
              success: () => {
                this.zsShow = false
                this.init()
              }
            })
          }
        }
      })
    },
    zsong () {
      let newArr = this.listData.filter(item => item.checked)
      if (newArr.length == 0) {
        this.$common.toast({
          title: '请选择至少一个赏品',
          icon: 'none',
          duration: 1500,
        })
        return
      }
      this.zsShow = true
      this.checkedList = newArr
    },
    allChecked () {
      this.all = !this.all
      this.listData.forEach(item => {
        item.checked = this.all
      })
    },
    tihuo () {
      // if (this.userInfo.level == 3) {
      //   this.$common.toast({
      //     title: '主播暂时不能发货',
      //     icon: 'none',
      //     duration: 1500,
      //   })
      //   return
      // }
      let newArr = this.listData.filter(item => {
        if (item.checked) {
          return item
        }
      })
      if (newArr.length == 0) {
        this.$common.toast({
          title: '暂无可提货商品',
          icon: 'none',
          duration: 1500,
          success: () => {
          }
        })
        return
      }
      let ids = newArr.map(item => item.id).join(',')
      this.$common.to({
        url: '/package/mine/bag-send',
        query: {
          id: ids
        }
      })
      console.log(newArr)
    },
    async init () {
      await this.getTab()
    },
    /**
     * @description: 再次购买
     * @param {*} item
     * @return {*}
     */
    buyAgain (item) {
      this.$common.to({
        url: '/package/box/box-detail',
        query: {
          id: item.box_id
        }
      })
    },

    /**
     * @description: 打开确认收货弹窗
     * @param {*} item
     * @return {*}
     */
    openModel (item) {
      this.curItem = item
      this.showModel = true
    },
    /**
     * @description: 打开确认收货弹窗
     * @param {*} item
     * @return {*}
     */
    openDhModel (item) {
      this.curItem = item
      this.showRj = true
    },
    hangldeItemChange (e) {
      console.log(e)
    },
    /**
     * @description: 去置换商品
     * @return {*}
     */
    toExchange (item) {

    },

    /**
     * @description: 去评价
     * @param {*} item
     * @return {*}
     */
    toComment (item) {
      this.$common.to({
        url: '/package/mine/comment',
        query: {
          id: item.id,
          title: item.title
        }
      })
    },

    /**
     * @description: 确认收货
     * @param {*}
     * @return {*}
     */
    submitGet () {

      this.req({
        url: '/v1/user/ship/box/receipt',
        data: {
          goods_id: this.curItem.goods_id,
          num: this.curItem.num,
          status: this.curItem.status
        },
        success: res => {
          if (res.code == 200) {
            this.$common.toast({
              title: res.msg,
              icon: 'success',
              duration: 600,
              success: () => {
                this.resetParams()
                this.getList()
              }
            })
          }
        }
      })
    },

    /**
     * @description: 粉碎商品
     * @param {*}
     * @return {*}
     */
    duihuan () {
      let goods_id = []
      if (this.checkedList.length > 0) {
        // 处理奖品id
        this.checkedList.forEach((item, index) => {
          for (let i = 1; i <= item.num; i++) {
            goods_id.push(item.goods_id)
          }
        })
      } else {
        for (let i = 1; i <= this.curItem.num; i++) {
          goods_id.push(this.curItem.goods_id)
        }
      }

      this.req({
        url: '/v1/user/ship/box/dissolveByGoodsId',
        data: {
          goods_id
        },
        success: res => {
          if (res.code == 200) {
            this.$common.toast({
              title: res.msg,
              icon: 'success',
              duration: 600,
              success: () => {
                this.listData = []
                this.rjShow = false
                this.getList()
              }
            })
          }
        }
      })
    },

    /**
     * @description: 商品等级切换
     * @param {*} e
     * @return {*}
     */
    btnChange (e) {
      this.btnCur = e
      this.resetParams()
      this.getList()
    },

    /**
     * @description: 获取奖品类型
     * @return {*}
     */
    getTab () {
      return new Promise((resolve, reject) => {
        this.req({
          url: '/v1/box/mark',
          data: {},
          Loading: true,
          success: res => {
            if (res.code == 200) {
              this.btnList = res.data.map(item => {
                if (item.id == 1) {
                  item.title = '传说'
                }
                if (item.id == 4) {
                  item.title = '高级'
                }
                return item
              })
              this.getList()
              resolve()
            }
          }
        })
      })
    },

    /**
     * @description: 前往发货
     * @return {*}
     */
    toSend (item) {
      this.$common.to({
        url: '/package/mine/bag-send',
        query: {
          goods_id: item.goods_id,
          num: item.num
        }
      })
    },

    /**
     * @description: 获取商品列表数据
     * @param {*}
     * @return {*}
     */
    getList () {
      this.req({
        url: '/v1/user/award',
        data: {
          status: this.tabList[this.tabCur].id,
          mark_id: this.btnList[this.btnCur].id
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            let newArr = res.data.map(item => {
              // if (item.type != 4 && item.mark_id == 1) {
              //   item.mark_title = '传说'
              // }
              // if (item.type != 4 && item.mark_id == 4) {
              //   item.mark_title = '高级'
              // }
              return { ...item, checked: false, num: item.total }
            })

            this.listData = newArr
          } else {
          }
        }
      })
    },

    /**
     * @description: 物流详情
     * @return {*}
     */
    toExpress (item) {
      this.$common.to({
        url: '/package/mine/bag-express',
        query: {
          id: item.id
        }
      })
    },

    /**
     * @description: 订单详情
     * @return {*}
     */
    toDetail (item) {
      this.$common.to({
        url: '/package/mine/bag-order-detail',
        query: {
          goods_id: item.goods_id,
          status: item.status,
          num: item.num
        }
      })
    },

    /**
     * @description: tab切换
     * @param {*} e
     * @return {*}
     */
    tabChage (e) {
      this.tabCur = e
      getApp().globalData.tabCur = e
      this.resetParams()
      this.getList()
      // this.mescroll.resetUpScroll()
      // this.mescroll.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  // background: url("https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01B5oy6T24NdWgIw6JR_!!2200676927379.png") no-repeat;
  // background-size: 100% 100%;
  // max-height: 100vh;
  // overflow: hidden;
  // overflow-y: scroll;
  background: #effceb;
  background: #effdea;
}

.page-wrap {
  // background: url("https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01B5oy6T24NdWgIw6JR_!!2200676927379.png") no-repeat;
  // background-size: 100% 100%;
  max-height: 100vh;
  overflow: hidden;
  overflow-y: scroll;

  ::v-deep .uni-nav-bar-text {
    font-size: 36rpx;
    font-family: xcooo;
  }

  ::v-deep .uni-navbar__header-btns-right {
    font-size: 16px;
    width: 80px !important;
    color: #705cff;
  }

  .tab-list {
    height: 88rpx;
    padding: 0 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 10;
    // background: linear-gradient(to right, #ccb9fe, #bca3fe, #cfb9fc, #d4c0fd, #d7c9fe, #decffe, #f0e6ff);
    // background: url("https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01B5oy6T24NdWgIw6JR_!!2200676927379.png") no-repeat;
    // background-size: 100% 100%;
    background: #dbf7cb;
    background: #effdea;
    // background: linear-gradient(to right, #5dfda1, #baf828);


    &-item {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333;
      transition: all 0.3s;

      &.act {
        font-size: 32rpx;
        font-weight: bold;
        color: #000;
      }
    }
  }

  .btn-list-wrap {
    width: 100%;
    height: 88rpx;
    position: fixed;
    z-index: 10;
    left: 0;
    box-sizing: border-box;
    padding: 0 30rpx;
    background: #222333;

    &-content {
      display: inline-block;
      height: 100%;

      .btn-list {
        display: flex;
        align-items: center;
        height: 100%;

        &-item {
          width: 122rpx;
          height: 60rpx;
          background: #f5f5f5;
          border-radius: 5rpx;
          line-height: 60rpx;
          text-align: center;
          box-sizing: border-box;
          border: 1rpx solid #f5f5f5;
          background: #222333;

          font-size: 26rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #fff;

          &.act {
            border: 1rpx solid #6b57dc;
            color: #6b57dc;
            background: #fff;
          }
        }

        &-item+.btn-list-item {
          margin-left: 20rpx;
        }
      }
    }
  }

  .list {
    padding: 1rpx 30rpx 40rpx;
    // background: #f4f4fe;
    // background: #222333;
    // background: url("https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01B5oy6T24NdWgIw6JR_!!2200676927379.png") no-repeat;
    // background-size: 100% 100%;
    padding-bottom: 250rpx;
    min-height: 100vh;

    &-item {
      border-radius: 20rpx;
      padding: 20rpx;
      margin-top: 30rpx;
      // background: rgba(0, 0, 0, 0.6);
      border: 2rpx solid #132c1f;
      // border-image: linear-gradient(270deg, #039aff, #705cff, #af38ff) 2 2;
      background: linear-gradient(to right, #5dfda1, #baf828);
      box-shadow: 2rpx 5rpx 2rpx 2rpx #209200;

      .list-item-wrap {
        background: #e1fee9;
        display: flex;
        align-items: center;
        border-radius: 20rpx;
        padding: 40rpx;

        ::v-deep .u-checkbox__icon-wrap {
          border-color: #6c5bde;
        }
      }

      .card-item {
        flex: 1;
      }

      &-hd {
        display: flex;
        padding-bottom: 30rpx;

        .pic {
          width: 166rpx;
          height: 166rpx;
          border-radius: 20rpx;
          box-sizing: border-box;
          border: 1rpx solid #f7f7f7;
          position: relative;

          .tag {
            position: absolute;
            z-index: 1;
            padding: 2rpx 10rpx;
            border-radius: 20rpx 0 0 0;
            right: 0;
            bottom: 0;
            background: #0d6bc9;
            background: #a8f93f;

            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: bold;
          }
        }

        .info {
          width: calc(100% - 166rpx);
          box-sizing: border-box;
          padding-left: 20rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .title {
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: 500;
            margin-bottom: 20rpx;
          }

          .return_wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .return_price {
              font-size: 14px;
              color: orange;
              display: flex;
              align-items: center;

              .return-img {
                width: 30rpx;
                margin-right: 10rpx;
              }
            }

            .return_num {
              font-size: 14px;
            }


          }

          .return_total {
            ::v-deep .u-icon-disabled {
              background: linear-gradient(to right, #5dfda1, #baf828) !important;
              color: #333 !important;
            }

            ::v-deep .u-icon-minus {
              background: linear-gradient(to right, #5dfda1, #baf828) !important;
              color: #333 !important;
            }

            ::v-deep .u-icon-plus {
              background: linear-gradient(to right, #5dfda1, #baf828) !important;
              color: #333 !important;
            }

            ::v-deep .u-number-input {
              background: none !important;
              color: #000 !important;
            }
          }

        }
      }

      &-bd {
        padding-top: 30rpx;
        border-top: 1rpx solid #ededed;
        display: flex;
        justify-content: flex-end;

        .btn {
          width: 148rpx;
          height: 58rpx;
          background: #ffffff;
          border: 2rpx solid #6c5bde;
          border-radius: 50rpx;
          box-sizing: border-box;
          line-height: 58rpx;
          text-align: center;

          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;

          &:last-child {
            background: #6c5bde;
            background: linear-gradient(to right, #5dfda1, #baf828);
            color: #000;
          }
        }

        .btn+.btn {
          margin-left: 30rpx;
        }
      }
    }
  }
}

.zsbox {
  width: 600rpx;
  padding-top: 40rpx;
  padding: 20rpx 40rpx;

  .zs-input-wrap {
    margin: 30rpx 0;
  }

  .zs-input {
    background-color: #eee;
    border-radius: 40rpx;
    color: #333;
  }

  .zs-title {
    margin-top: 20rpx;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
  }

  .zs-tip {
    text-align: center;
    margin-bottom: 40rpx;
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
}

.btn-bootm {
  .btn {
    position: fixed;
    bottom: 100px;
    z-index: 1;
    right: 30rpx;
    width: 200rpx;
  }

  .btn-01 {
    bottom: 400px;
    background-size: 100% 100%;
    width: 60px;
    height: 60px;
    color: #fff;
    ;
    font-size: 17px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-02 {
    bottom: 300px;
    background-size: 100% 100%;
    width: 60px;
    height: 60px;
    color: #fff;
    ;
    font-size: 17px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-03 {
    bottom: 120px;
    right: 20px;
    background-size: 100% 100%;
    width: 160px;
    height: 50px;
    color: #fff;
    font-size: 17px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-04 {
    bottom: 200px;
    background-size: 100% 100%;
    width: 60px;
    height: 60px;
    color: #fff;
    ;
    font-size: 17px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.rj-wrap {
  padding: 40rpx;
  padding-bottom: 40rpx;
  background-color: #222333;
  min-height: 100%;

  .rj-title {
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    position: relative;
    margin-bottom: 40rpx;
  }

  .rj-desc {
    color: #98999e;
    font-size: 14px;
    text-align: center;
  }

  .rj-mall {
    margin-top: 40rpx;
    background-color: #05060a;
    padding: 30rpx;
    border-radius: 20rpx;


    .rj-shop {
      display: flex;
      justify-content: space-between;
      color: #fff;

      .rj-shop-title {}

      .rh-shop-num {
        text {
          color: orange;
        }
      }
    }

  }

  .ri-shop-list {
    margin-top: 20rpx;
    color: #fff;
    display: flex;

    .ri-shop-item {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-right: 20rpx;
      flex-shrink: 0;

      .rj-shop-img-wrap {

        .ri-shop-img {
          width: 100rpx;
        }
      }


      .rj-shop-num {}

      .rj-shop-title {
        max-width: 200rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 10rpx 0;
      }

      .rj-shop-money {
        font-size: 12px;
        color: #999a9e;
      }
    }
  }

  .rj-bottom {
    margin-top: 100rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    .rj-money {
      display: flex;
      align-items: center;

      .ri-bottom-img {
        width: 30rpx;
        margin-right: 5rpx;
      }
    }

    .rj-btn {
      background: linear-gradient(270deg, #039aff, #705cff, #af38ff);
      color: #fff;
      padding: 10rpx 40rpx;
      font-size: 16px;
      border-radius: 20rpx;
    }
  }
}

.empty-list {
  min-height: 80vh;
  margin-top: 300rpx;
}
</style>