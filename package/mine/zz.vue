<template>
  <view class="zz">
    <uni-nav-bar title="转赠记录" color="#fff" leftIcon="left" backgroundColor="#222333" :border="false" :statusBar="true"
      :fixed="true" @clickLeft="back()"></uni-nav-bar>
    <mescroll-body ref="mescrollRef" height="400" @init="mescrollInit" @down="downCallback" @up="getList"
      :down="downOption" :up="upOption">
      <view class="award-log-item" v-for="(item, index) in listData" :key="index">
        <view class="award-top">
          <view class="award-log-left">
            <image class="award-log-img" :src="item.thumb" mode="widthFix" lazy-load="false" binderror="" bindload="" />
          </view>
          <view class="award-log-right">
            {{ item.title }}
          </view>
        </view>
        <view class="award-bottom">
          <view>获赠人ID: <text style="color:#e7daba;margin-left: 10px;">{{ item.zsuser }}</text></view>
          <view>{{ item.created_at }}</view>
        </view>
      </view>
    </mescroll-body>
  </view>
</template>

<script>
export default {
  name: 'zz',
  components: {

  },
  data () {
    return {
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
      listData: []
    }
  },
  created () {

  },
  mounted () {

  },
  onShow () {
    // this.getList({ num: 1, size: 20 })
  },
  computed: {
  },
  methods: {
    getList (num, size) {
      this.req({
        url: '/v1/user/echargezList',
        data: {
          page: num,
          per_page: size,
        },
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
    back () {
      uni.switchTab({
        url: '/pages/tabBar/bag',
      });

    }
  },
}
</script>

<style lang='scss' scoped>
page {
  background-color: #000;
  background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  background-size: 100% 100%;
  background: #222333;
}

.zz {
  padding: 20rpx 20rpx;
  padding-top: 0;

  .award-log-item {
    color: #fff;
    width: 100%;
    background: url('https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01PZkzwd24NdcoKRnBt_!!2200676927379.png') no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 200px;
    padding: 10px 20px;
    margin-bottom: 20rpx;
    margin-top: 20rpx;

    &:last-child {
      margin-bottom: 0;
    }

    .award-top {
      margin-top: 50px;
      border-bottom: 1px solid #eee;
      padding-bottom: 5px;
      display: flex;
    }

    .award-log-left {
      margin-right: 20rpx;

      .award-log-img {
        width: 60px;
        height: 60px;
        border-radius: 10rpx;
      }
    }

    .award-log-right {
      // flex: 1;
      width: 100%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .award-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20rpx;
    }

  }
}
</style>