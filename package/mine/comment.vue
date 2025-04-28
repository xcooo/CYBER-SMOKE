<!--
 * @Date: 2022-12-13 18:34:50
 * @LastEditTime: 2022-12-22 10:32:42
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar
      title="评价"
      color="#333"
      leftIcon="left"
      backgroundColor="#fff"
      :border="false"
      :statusBar="true"
      :fixed="true"
      @clickLeft="$common.back()"
    ></uni-nav-bar>

    <view class="page-wrap-hd">
      <view class="goods-title">对 {{ optionsData.title }} 的评价</view>

      <view class="rate">
        <view class="rate-title">总体</view>

        <view class="rate-wrap">
          <uni-rate
            :size="18"
            v-model="rate"
            color="#cccccc"
            active-color="#fe2f3c"
          />
        </view>

        <view class="rate-status">{{ rateWords }}</view>
      </view>
    </view>

    <u-gap height="20"></u-gap>

    <view class="page-wrap-bd">
      <view class="title-num">
        <view class="title">
          <text>*</text>

          商品评价
        </view>

        <view class="num">{{ comment.length }}/{{ maxLength }}</view>
      </view>

      <textarea
        v-model="comment"
        placeholder="从多个角度评价宝贝,可以帮助更多想买的人"
      />

      <view class="img-list">
        <view v-for="(item, i) in imgList" :key="i" class="img-list-item">
          <view @click="del(i)" class="close icon">
            <cimage src="/static/icon/close.png" mode="scaleToFill" />
          </view>

          <cimage :src="item" mode="scaleToFill" />
        </view>

        <view
          v-if="imgList.length < 4"
          @click="upImg"
          class="img-list-item upload"
        >
          <cimage src="/static/icon/photo.png" mode="scaleToFill" />
        </view>
      </view>
    </view>

    <u-gap height="20"></u-gap>

    <view @click="toggleHide" class="page-wrap-ft">
      <view class="icon">
        <cimage
          v-if="hidden"
          src="/static/icon/check1_act.png"
          mode="scaleToFill"
        />

        <cimage v-else src="/static/icon/check1.png" mode="scaleToFill" />
      </view>

      匿名评价
    </view>

    <view @click="$common.noDouble(submit)" class="submit-btn">提交</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      optionsData: '',
      maxLength: 300,
      rate: 5,
      comment: '',
      hidden: false,
      imgList: []
    }
  },

  computed: {
    rateWords() {
      if (this.rate == 1) {
        return '非常差'
      }
      if (this.rate == 2) {
        return '差'
      }
      if (this.rate == 3) {
        return '一般'
      }
      if (this.rate == 4) {
        return '满意'
      }
      if (this.rate == 5) {
        return '非常满意'
      }
    }
  },

  onLoad(options) {
    this.optionsData = options
  },

  methods: {
    /**
     * @description: 提交评价
     * @return {*}
     */
    submit() {
      if (!this.comment) {
        this.$common.toast({
          title: '请输入评价内容'
        })
        return
      }

      this.req({
        url: '/v1/user/ship/box/rating',
        data: {
          id: this.optionsData.id,
          star: this.rate,
          content: this.comment,
          thumb: this.imgList.join(','),
          is_hidden: this.hidden ? 1 : 2
        },
        success: res => {
          if (res.code == 200) {
            this.$common.toast({
              title: res.msg,
              icon: 'success',
              duration: 500,
              success: () => {
                this.$common.back()
              }
            })
          }
        }
      })
    },

    /**
     * @description: 上传图片
     * @return {*}
     */
    upImg() {
      uni.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        count: 1,
        success: ({ tempFilePaths, tempFiles }) => {
          this.req({
            url: '/v1/upload/image',
            file: tempFilePaths[0],
            fileName: 'image',
            success: res => {
              if (res.code == 200) {
                this.imgList.push(res.data)
              }
            }
          })
        },
        fail: error => {}
      })
    },

    /**
     * @description: 切换匿名
     * @return {*}
     */
    toggleHide() {
      this.hidden = !this.hidden
    },

    /**
     * @description: 删除图片
     * @param {*} e
     * @return {*}
     */
    del(e) {
      this.imgList.splice(e, 1)
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  &-hd {
    padding: 30rpx;
    background: #fff;

    .goods-title {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }

    .rate {
      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;

      display: flex;
      align-items: center;
      margin-top: 30rpx;

      &-wrap {
        padding: 0 20rpx;
      }
    }
  }

  &-bd {
    padding: 30rpx;
    background: #fff;

    .title-num {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;

        text {
          color: #cc0000;
          margin-right: 10rpx;
        }
      }

      .num {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
      }
    }

    textarea {
      margin-top: 30rpx;
      font-size: 20rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333;
      width: 100%;
    }

    .img-list {
      display: flex;
      flex-flow: row wrap;
      margin-top: 30rpx;

      &-item {
        width: 120rpx;
        height: 120rpx;
        background: #fafafa;
        box-sizing: border-box;
        position: relative;
        margin-right: 25rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
          width: 40rpx;
          height: 40rpx;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 1;
        }

        &.upload {
          padding: 20rpx;
        }
      }
    }
  }

  &-ft {
    padding: 30rpx;
    display: flex;
    align-items: center;
    background: #fff;

    .icon {
      width: 40rpx;
      height: 40rpx;
      margin-right: 10rpx;
    }

    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
  }

  .submit-btn {
    width: 690rpx;
    height: 88rpx;
    background: #000;
    border-radius: 999rpx;
    line-height: 88rpx;
    text-align: center;
    position: fixed;
    left: 30rpx;
    bottom: 40rpx;
    z-index: 10;

    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
