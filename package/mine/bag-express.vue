<!--
 * @Date: 2022-05-10 11:14:51
 * @LastEditTime: 2023-02-07 15:40:31
 * @Description: 物流详情
-->
<template>
  <view v-if="pageData" class="page-wrap">
    <uni-nav-bar
      title="物流详情"
      color="#333"
      leftIcon="left"
      backgroundColor="#fff"
      :border="false"
      :statusBar="true"
      :fixed="true"
      @clickLeft="$common.back()"
    ></uni-nav-bar>

    <view class="hd-info">
      <view class="img">
        <cimage :src="pageData.thumb" mode="scaleToFill" />
        <view class="img-tip">共计{{ pageData.num }}件</view>
      </view>
      <view class="info">
        <view class="status">
          物流状态：
          <text>{{ pageData.express.deliverystatus_desc }}</text>
        </view>
        <view class="company">快递公司：{{ pageData.express.expName }}</view>
        <view class="order-num">
          快递单号：{{ pageData.express.number }}
          <view @click="copy" class="copy">复制</view>
        </view>
      </view>
    </view>
    <u-gap height="30"></u-gap>
    <view v-if="pageData.express.list.length > 0" class="list-wrap">
      <template v-for="(item, index) in pageData.express.list">
        <trackNode
          :key="index"
          :is-first="index === pageData.express.list.length - 1"
          :is-newest="index === 0"
          :is-main-node="false"
          :node-data="item"
        ></trackNode>
      </template>
    </view>
    <view class="no-express" v-else>
      对不起,目前暂未查询到该笔运单的物流跟踪信息!建议直接联系物流公司了解详情
    </view>
  </view>
</template>

<script>
import trackNode from '../../components/etherealwheat-track/trackNode.vue'
export default {
  components: { trackNode },
  data() {
    return {
      optionsData: '',
      pageData: '',
      tracesData: [
        {
          status: '包裹已被吴亦发同学签收', // 节点描述
          time: '2019-10-24 15: 27: 16',
          phone: '', // 电话
          statusName: '已签收', // 节点标题
          isMainNode: false // 是否主节点，主节点前方展示icon
        },
        {
          status: '由派送员蔡小坤同志配送，电话：',
          time: '2019-10-24 15: 26: 41',
          phone: '16677778888',
          statusName: '运输中',
          isMainNode: false
        },
        {
          status: '已到XXX小区快递点',
          time: '2019-10-24 15: 26: 41',
          phone: '',
          statusName: '运输中',
          isMainNode: false
        },
        {
          status: '已到海宁集散中心',
          time: '2019-10-24 15: 26: 18',
          phone: '',
          statusName: '运输中',
          isMainNode: false
        },
        {
          status: '已到杭州集散中心',
          time: '2019-10-24 15: 26: 07',
          phone: '',
          statusName: '运输中',
          isMainNode: false
        },
        {
          status: '包裹已到达余杭区集散中心',
          time: '2019-10-24 15: 25: 54',
          phone: '',
          statusName: '运输中',
          isMainNode: false
        },
        {
          status: '快递员已上门取件',
          time: '2019-10-24 15: 25: 17',
          phone: '',
          statusName: '已揽收',
          isMainNode: false
        },
        {
          status: '等待快递员上门揽件',
          time: '2019-10-24 15: 25: 00',
          phone: '',
          statusName: '已发货',
          isMainNode: false
        },
        {
          status: '您的包裹正在打包',
          time: '2019-10-24 15: 24: 00',
          phone: '',
          statusName: '待发货',
          isMainNode: false
        },
        {
          status: '订单支付成功，等待商家发货',
          time: '2019-10-24 15: 22: 30',
          statusName: '已支付',
          isMainNode: false
        },
        {
          status: '订单提交成功',
          time: '2019-10-24 15: 22: 00',
          statusName: '已下单',
          isMainNode: false
        }
      ]
    }
  },
  onLoad(options) {
    this.optionsData = options
    this.getData()
  },
  methods: {
    /**
     * @description: 获取物流详情
     * @param {*}
     * @return {*}
     */
    getData() {
      this.req({
        url: '/v1/user/ship/box/express',
        data: this.optionsData,
        success: res => {
          if (res.code == 200) {
            this.pageData = res.data
          }
        }
      })
    },

    /**
     * @description: 复制
     * @param {*}
     * @return {*}
     */
    copy() {
      this.$copy({
        content: this.pageData.express.number,
        success(res) {
          console.log(res)
          uni.showToast({
            title: res,
            icon: 'success'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  padding-bottom: 40rpx;

  img {
    width: 100%;
    height: 100%;
  }
  .hd-info {
    padding: 30rpx;
    background: #fff;
    display: flex;
    justify-content: space-between;
    width: 690rpx;
    margin: 30rpx auto 0;
    border-radius: 10rpx;

    .img {
      width: 160rpx;
      height: 160rpx;
      background: #dddddd;
      border: 1rpx solid #eeeeee;
      border-radius: 10rpx;
      overflow: hidden;
      box-sizing: border-box;

      position: relative;
      &-tip {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 36rpx;
        background: #000;
        text-align: center;

        font-size: 24rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: 36rpx;
      }
    }
    .info {
      width: calc(100% - 160rpx);
      box-sizing: border-box;
      padding-left: 20rpx;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      .status {
        font-size: 28rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #333333;
        text {
          color: #e41440;
        }
      }
      .company,
      .order-num {
        font-size: 24rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #999999;
      }
      .order-num {
        display: flex;
        align-items: center;
        .copy {
          margin-left: 20rpx;
          padding: 3rpx 10rpx;

          background: #333333;
          border-radius: 99px;

          font-size: 20rpx;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }
  .list-wrap {
    padding: 30rpx;
    background: #fff;
    width: 690rpx;
    margin: 0 auto;
    border-radius: 10rpx;
  }

  .no-express {
    width: 100%;
    height: 300rpx;
    padding: 0 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 26rpx;
    color: #999;
  }
}
</style>
