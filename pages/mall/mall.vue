<!--
 * @Date: 2022-11-21 15:10:35
 * @LastEditTime: 2022-12-27 14:07:53
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar
      title="品牌推荐"
      color="#333"
      leftIcon=""
      backgroundColor="#fff"
      :border="false"
      :statusBar="true"
      :fixed="true"
    ></uni-nav-bar>

    <view
      class="page-wrap-header"
      :style="{
        top: `${sysConfig.statusBarHeight + 44}px`
      }"
    >
      <view class="tab-wrap">
        <u-tabs
          :list="tabList"
          name="title"
          :current="tabCur"
          @change="tabChange"
          bg-color="transparent"
          font-size="28rpx"
          :height="60"
          active-color="#051A2B"
          inactive-color="#666666"
          :bar-width="48"
          :bar-height="5"
          :bold="false"
          :is-scroll="true"
          :bar-style="{
            background: '#051A2B'
          }"
        ></u-tabs>
      </view>

      <view @click="toggleSort" class="sort-btn">
        综合排序

        <view class="icon">
          <cimage
            v-if="sort == 1"
            src="/static/icon/top_act.png"
            mode="scaleToFill"
          />

          <cimage v-else src="/static/icon/bt_act.png" mode="scaleToFill" />
        </view>
      </view>
    </view>

    <!-- 顶部tab栏占位 -->
    <u-gap height="88"></u-gap>

    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="getList"
      :down="downOption"
      :up="upOption"
    >
      <view class="goods-list">
        <!-- 左列 -->
        <view class="goods-list-col">
          <template v-for="(item, i) in listData">
            <view
              @click="toMallDetail(item)"
              v-if="i % 2 == 0"
              :key="i"
              class="goods-list-col-item"
            >
              <view class="pic">
                <cimage :src="item.thumb" mode="scaleToFill" />
              </view>

              <view class="tag-list">
                <view class="tag-list-item zheng">正品保障</view>

                <view class="tag-list-item">{{ item.cat_desc }}</view>
              </view>

              <view class="name hang1">
                {{ item.title }}
              </view>

              <view class="price-num">
                <view class="price">
                  ¥
                  <text>
                    {{ item.price }}

                    <text>¥{{ item.old_price }}</text>
                  </text>
                </view>
              </view>
            </view>
          </template>
        </view>

        <!-- 右列 -->
        <view class="goods-list-col">
          <template v-for="(item, i) in listData">
            <view
              @click="toMallDetail(item)"
              v-if="i % 2 != 0"
              :key="i"
              class="goods-list-col-item"
            >
              <view class="pic">
                <cimage :src="item.thumb" mode="scaleToFill" />
              </view>

              <view class="tag-list">
                <view class="tag-list-item zheng">正品保障</view>

                <view class="tag-list-item">{{ item.cat_desc }}</view>
              </view>

              <view class="name hang1">
                {{ item.title }}
              </view>

              <view class="price-num">
                <view class="price">
                  ¥
                  <text>
                    {{ item.price }}

                    <text>¥{{ item.old_price }}</text>
                  </text>
                </view>
              </view>
            </view>
          </template>
        </view>
      </view>
    </mescroll-body>
	<u-popup v-model="tanchuang" mode="center">
		<view class="tanBox">
			<view class="pic">
				<image :src="pop_img" mode="widthFix"></image>
			</view>
			<view class="off">
				<image @click="tanchuang = false" src="https://mh.iqinhu.cn/uploads/upload/image/down.png" mode=""></image>
			</view>
		</view>
	</u-popup>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
		pop_img:'',
		tanchuang:false,
      // 下拉刷新的配置(可选, 绝大部分情况无需配置)
      downOption: {
        auto: false
      },
      // 上拉加载的配置(可选, 绝大部分情况无需配置)
      upOption: {
        auto: false,
        page: {
          size: 20 // 每页数据的数量,默认10
        }
      },
      listData: [],
      tabList: [],
      tabCur: 0,
      sort: 1
    }
  },

  computed: {
    ...mapGetters(['sysConfig'])
  },
	onLoad() {
		/*获取弹窗图*/
		this.$store.dispatch('getAppConfig').then((res)=>{
			console.log(res);
			this.pop_img = res.data.pop_image
			if(res.data.is_pop_open == 1){
				this.tanchuang = true
			}
		})
	},
  onShareAppMessage() {
    return {
      title: `开盲盒 赢好礼!`,
      // imageUrl: this.pageData.box.thumb,
      path: `/pages/mall/mall`
    }
  },

  async onReady() {
    await this.getTab()

    this.mescroll.resetUpScroll()
    this.mescroll.scrollTo(0, 0)
  },

  methods: {
    /**
     * @description: 获取品牌列表
     * @return {*}
     */
    getTab() {
      return new Promise((resolve, reject) => {
        this.req({
          url: '/v1/shop/brand',
          data: {},
          Loading: true,
          success: res => {
            if (res.code == 200) {
              this.tabList = res.data

              resolve()
            }
          }
        })
      })
    },

    /**
     * @description: 获取商品列表数据
     * @param {*}
     * @return {*}
     */
    getList({ num, size }) {
      this.req({
        url: '/v1/shop/list',
        data: {
          page: num,
          per_page: size,
          brand_id: this.tabList[this.tabCur].id,
          sort_type: this.sort
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
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
     * @description: 商城详情
     * @param {*} item
     * @return {*}
     */
    toMallDetail(item) {
      this.$common.to({
        url: '/package/mall/mall-detail',
        query: {
          id: item.id
        }
      })
    },

    /**
     * @description: 切换排序
     * @return {*}
     */
    toggleSort() {
      this.sort == 1 ? (this.sort = 3) : (this.sort = 1)

      this.listData = []
      this.mescroll.resetUpScroll()
      this.mescroll.scrollTo(0, 0)
    },

    /**
     * @description: tab切换
     * @param {*} e
     * @return {*}
     */
    tabChange(e) {
      this.tabCur = e
      this.listData = []
      this.mescroll.resetUpScroll()
      this.mescroll.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  &-header {
    position: fixed;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 10;
    height: 88rpx;
    padding: 0 30rpx 0 0;
    display: flex;
    align-items: center;
    background: #fff;

    .tab-wrap {
      flex: 1;
    }

    .sort-btn {
      display: flex;
      align-items: center;
      padding-left: 20rpx;

      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;

      .icon {
        width: 16rpx;
        height: 16rpx;
        margin-left: 10rpx;
      }
    }
  }

  .goods-list {
    display: flex;
    justify-content: space-between;
    padding: 14rpx 30rpx 10rpx;

    &-col {
      &-item {
        width: 340rpx;
        border-radius: 10rpx;
        overflow: hidden;
        background: #ffffff;
        margin-bottom: 30rpx;

        .pic {
          height: 340rpx;
        }

        .tag-list {
          padding: 1rpx 15rpx 0;
          display: flex;
          flex-flow: row wrap;

          &-item {
            border-radius: 5rpx;
            overflow: hidden;
            margin-right: 10rpx;
            margin-top: 10rpx;
            height: 40rpx;
            box-sizing: border-box;
            padding: 0 10rpx;
            display: flex;
            align-items: center;

            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #eb989c;
            border: 2rpx solid #eb989c;

            &.zheng {
              color: #fff;
              background: #333333;
              border-color: #333333;
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
            font-weight: bold;
            color: #333333;

            text {
              font-size: 32rpx;

              text {
                margin-left: 10rpx;
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                text-decoration: line-through;
                color: #999999;
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
  }
}
.tanBox .off image {
	width: 70rpx;
	height: 70rpx;
	display: inline-block;
}
.tanBox {
	width: 600rpx;
	text-align: center;
}

.tanBox .pic image {
	width: 100%;
}
</style>
