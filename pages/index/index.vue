<!--
 * @Date: 2022-11-21 11:38:47
 * @LastEditTime: 2025-04-26 13:39:57
 * @Description: 首页
-->
<template>
  <view class="page-wrap common_bg common-img">
    <!-- 状态栏 -->
    <view class="status-bar common_bg common-img" :style="{
      height: `${sysConfig.statusBarHeight}px`,
      width: '100%',
    }
      "></view>

    <view :style="{
      width: '100%'
    }
      "></view>

    <u-gap height="100"></u-gap>

    <view class="page-wrap-header common_bg " :style="{
      top: `${sysConfig.statusBarHeight}px`,
    }
      ">
      <view class="mall">商城</view>
      <view class="serach-mall">
        <u-input v-model="keywords" :clearable="false" :type="type" :border="border" border-color="#705cff"
          placeholder="搜索商品" @change="keywordsChange" />
        <view class="icon" @click="search">
          <image src="https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01i5d8yQ24NdcXgFg9D_!!2200676927379.png"
            mode="scaleToFill" />
        </view>
      </view>
    </view>

    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getList" :down="downOption"
      :up="upOption">
      <swiper v-if="swiperList.length > 0" class="banner" autoplay :circular="true">
        <swiper-item v-for="( item, i ) of  swiperList " :key="i">
          <view @click="$common.bannerTo(item)" class="swiper-pic">
            <cimage :src="item.thumb" mode="widthFix" />
          </view>
        </swiper-item>
      </swiper>
      <!-- 商品分类 -->
      <template v-if="classifyList.length > 0">
        <view class="cate-wrap">
          <view class="cate-item" :class="[currentIndex == index ? 'cate-item-active' : '']"
            v-for="(item, index) in classifyList" @click="toClassify(index)">
            <!-- <cimage :src="item.thumb" mode="widthFix" /> -->
            {{ item.title }}
          </view>
        </view>
      </template>


      <view class="goods-list">
        <!-- 左列 -->
        <view class="goods-list-col">
          <template v-for="( item, i ) in  listData ">
            <view @click="toMallDetail(item)" v-if="i % 2 == 0" :key="i" class="goods-list-col-item">
              <view class="pic">
                <cimage :src="item.thumb" mode="scaleToFill" />
              </view>

              <!-- <view class="tag-list">
                <view class="tag-list-item zheng">正品保障</view>

                <view class="tag-list-item">{{ item.cat_desc }}</view>
              </view> -->

              <view class="name hang1">
                {{ item.title }}
              </view>

              <view class="price-num">
                <view class="price">
                  ¥
                  <text>
                    {{ item.price }}

                    <!-- <text>¥{{ item.old_price }}</text> -->
                  </text>
                </view>
                <!-- <view class="money">
                  <view class="other-view-img">
                    <image class="" src="https://www.img.xcooo.cn/uploads/2024/02/231fcebf5c7a968d.png" mode="widthFix"
                      lazy-load="false" binderror="" bindload="" />
                  </view>{{ item.money }}
                </view> -->
              </view>
            </view>
          </template>
        </view>

        <!-- 右列 -->
        <view class="goods-list-col">
          <template v-for="( item, i ) in  listData ">
            <view @click="toMallDetail(item)" v-if="i % 2 != 0" :key="i" class="goods-list-col-item">
              <view class="pic">
                <cimage :src="item.thumb" mode="scaleToFill" />
              </view>

              <!-- <view class="tag-list">
                <view class="tag-list-item zheng">正品保障</view>

                <view class="tag-list-item">{{ item.cat_desc }}</view>
              </view> -->

              <view class="name hang1">
                {{ item.title }}
              </view>

              <view class="price-num">
                <view class="price">
                  ¥
                  <text>
                    {{ item.price }}

                    <!-- <text>¥{{ item.old_price }}</text> -->
                  </text>
                </view>
                <!-- <view class="money">
                  <view class="other-view-img">
                    <image class="" src="https://www.img.xcooo.cn/uploads/2024/02/231fcebf5c7a968d.png" mode="widthFix"
                      lazy-load="false" binderror="" bindload="" />
                  </view>{{ item.money }}
                </view> -->
              </view>
            </view>
          </template>
        </view>
      </view>
    </mescroll-body>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      // 下拉刷新的配置(可选, 绝大部分情况无需配置)
      downOption: {
        auto: false
      },
      // 上拉加载的配置(可选, 绝大部分情况无需配置)
      upOption: {
        auto: false,
        page: {
          size: 10 // 每页数据的数量,默认10
        }
      },
      listData: [],
      classCur: 0,
      swiperList: [],
      cardList: [],
      classifyList: [],
      type: 'text',
      border: false,
      currentIndex: 0,
      cat_id: '',
      keywords: '',
      TimeId: -1,
    }
  },

  computed: {
    ...mapGetters(['sysConfig'])
  },

  onShareAppMessage () {
    return {
      title: `开盲盒 赢好礼!`,
      // imageUrl: this.pageData.box.thumb,
      path: `/pages/index/index`
    }
  },

  onLoad (options) { },

  onReady () {
    this.downCallback()
  },
  watch: {
    keywords (value) {
      if (!value.trim()) {
        return
      }
      clearTimeout(this.TimeId)
      // 注意这里的定时器中用的是箭头函数, this指向当前对象, 不是window
      this.TimeId = setTimeout(() => {
        this.mescroll.resetUpScroll()
        this.mescroll.scrollTo(0, 0)
      }, 1000)
    }
  },
  methods: {
    toMallDetail (item) {
      this.$common.to({
        url: '/package/mall/mall-detail',
        query: {
          id: item.id
        }
      })
    },
    getClassify () {
      this.req({
        url: '/v1/shop/cat',
        data: {},
        Loading: true,
        success: res => {
          if (res.code == 200) {
            if (res.data.length > 0) {
              let arr = []
              this.classifyList = res.data
              this.classifyList.unshift({ id: '', title: '全部' })
              console.log(this.classifyList)
            }
          }
        }
      })
    },
    async downCallback () {
      /* 获取轮播图 */
      this.$common.getBanner(2).then(res => {
        this.swiperList = res
      })
      /* 获取分类 */
      this.getClassify()
      /* 获取分类下方卡片列表 */
      // this.$common.getBanner(2).then(res => {
      //   this.cardList = res
      // })
      this.mescroll.resetUpScroll()
      this.mescroll.scrollTo(0, 0)
    },
    getList ({ num, size }) {
      this.req({
        url: '/v1/shop/list',
        data: {
          page: num,
          per_page: size,
          cat_id: this.cat_id,
          keywords: this.keywords
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
    search () {
      this.mescroll.resetUpScroll()
      this.mescroll.scrollTo(0, 0)
    },
    toClassify (i) {
      this.currentIndex = i
      this.cat_id = this.classifyList[i].id

      this.mescroll.resetUpScroll()
      this.mescroll.scrollTo(0, 0)
    },
    classChange (e) {
      console.log(e)
      this.classCur = e.detail.current
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f2faef;
}

.common-img {
  // background: url('https://www.img.xcooo.cn/uploads/2024/03/9b87da3b50474ff9.jpg');
  // background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  // background-size: 100vw 100%;
  background: linear-gradient(to bottom, #eefde8, #ffffff);
  background-repeat: no-repeat;
  // min-height: calc(100vh - 50px);
}

.page-wrap {
  min-height: 100vh;
  // padding-bottom: 150rpx;
  background-color: #f2faef;

  .status-bar {
    // background: #fff;
    background-size: 100% auto;
    position: fixed;
    left: 0;
    width: 100%;
    box-sizing: border-box;
  }


  &-header {
    height: 88rpx;
    display: flex;
    align-items: center;
    padding-left: 30rpx;
    background-size: 100% auto;
    position: fixed;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 10;

    .mall {
      position: relative;
      margin-right: 20rpx;
      font-size: 20px;
      font-weight: 700;
      color: #000;

      &::after {
        position: absolute;
        content: "";
        left: 50%;
        bottom: 0;
        width: 2.4375rem;
        height: .375rem;
        background: linear-gradient(90deg, rgba(143, 20, 204, .7) 0%, rgba(41, 68, 204, .7) 100%);
        transform: translate(-50%)
      }
    }

    .serach-mall {
      width: 500rpx;
      height: 60rpx;
      padding: 0 30rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 4rpx solid;
      // border-image: linear-gradient(270deg, #039aff, #705cff, #af38ff) 2 2;
      border-color: #8b8d8a;
      border-radius: 40rpx;

      ::v-deep .u-input__input {
        // color: #333;
      }

      .icon {
        width: 40rpx;
        height: 40rpx;
      }
    }

    .input-box {
      // border-radius: 999rpx;
      background: #212231;
      width: 400rpx;
      height: 56rpx;
      padding: 0 30rpx;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #b2b2b2;
      border: 4rpx solid;
      border-image: linear-gradient(270deg, #039aff, #705cff, #af38ff) 2 2;


      .icon {
        width: 30rpx;
        height: 30rpx;
      }
    }
  }

  .banner {
    width: 100%;
    height: 300rpx;
    // #ifdef MP-WEIXIN
    margin: 30rpx auto 0;
    // #endif 


    swiper-item {
      display: flex;
      justify-content: center;

      .swiper-pic {
        width: 690rpx;
        height: 100%;
        border-radius: 10rpx;
        overflow: hidden;
      }
    }
  }

  .cate-wrap {
    display: flex;
    padding: 30rpx 30rpx;

    .cate-item {
      color: #333;
      font-size: 18px;
      flex: 1;
      // margin-right: 50rpx;

      &:last-child {
        margin-right: 0;
      }
    }

    .cate-item-active {
      color: #705cff;
      color: #000;
    }
  }

  .classify {
    width: 100%;
    height: 50rpx;
    margin-top: 40rpx;

    swiper-item {
      box-sizing: border-box;
      padding: 0 30rpx;
      display: flex;

      .item {
        width: 106rpx;

        &-pic {
          width: 100%;
          height: 106rpx;
        }

        .title {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #fff;
          text-align: center;
          margin-top: 10rpx;
        }
      }

      .item+.item {
        margin-left: 40rpx;
      }
    }
  }

  .dot-list {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10rpx;

    &-item {
      width: 10rpx;
      height: 10rpx;
      background: #e1e1e1;
      border-radius: 100rpx;
      margin: 0 4rpx;
      transition: all 0.3s;

      &.act {
        width: 20rpx;
        background: #000000;
      }
    }
  }

  .card-list {
    width: 690rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background: #fff;
    margin: 20rpx auto 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 1rpx 30rpx 30rpx;

    &-item {
      margin-top: 30rpx;
      width: 300rpx;
      height: 122rpx;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      box-sizing: border-box;
      padding-left: 15rpx;
      padding-right: 140rpx;

      .title {
        font-size: 26rpx;
        font-family: Source Han Sans CN;
        font-weight: 800;
        color: #051a2b;
      }

      .desc {
        font-size: 22rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #051a2b;
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
        border-radius: 30rpx;
        overflow: hidden;
        background: #fff;
        margin-bottom: 30rpx;
        padding-bottom: 30rpx;
        box-shadow: 0 8rpx 15rpx rgba(0, 0, 0, 0.1);

        .pic {
          height: 340rpx;
          margin-bottom: 20rpx;
        }

        .tag-list {
          padding: 1rpx 15rpx 0;
          display: flex;
          flex-flow: row wrap;

          &-item {
            border-radius: 20rpx;
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
          padding: 20rpx 30rpx;

          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333;
        }

        .price-num {
          padding: 0rpx 30rpx;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: center;

          .price {
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ff1668;

            text {
              font-size: 20px;
              margin-left: 5rpx;

              text {
                margin-left: 10rpx;
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                text-decoration: line-through;
                color: #edc736;
              }
            }
          }

          .money {
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #edc736;
            display: flex;
            align-items: center;

            image {
              width: 30rpx;
              margin-right: 5rpx;
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


</style>
