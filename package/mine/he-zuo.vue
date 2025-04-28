<!--
 * @Date: 2022-11-23 11:29:22
 * @LastEditTime: 2022-12-16 15:40:30
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <view
      class="page-wrap-hd common_bg"
      :style="{
        backgroundImage: `url(${imgBaseUrl}${'/static/img/shang_wu_he_zuo.png'})`
      }"
    >
      <uni-nav-bar
        color="#fff"
        leftIcon="left"
        backgroundColor="transparent"
        :border="false"
        :statusBar="true"
        :fixed="true"
        @clickLeft="$common.back()"
      ></uni-nav-bar>
    </view>

    <scroll-view class="page-wrap-bd" scroll-y>
      <view v-html="ruleData.editor" class="page-wrap-bd-content"></view>
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      ruleData: ''
    }
  },

  computed: {
    ...mapGetters(['sysConfig'])
  },

  onLoad(options) {
    this.$common.getRule(6).then(res => {
      this.ruleData = res
    })
  }
}
</script>

<style lang="scss">
.page-wrap {
  height: 100vh;

  &-hd {
    width: 750rpx;
    height: 510rpx;
  }

  &-bd {
    height: calc(100vh - 510rpx + 40rpx);
    position: relative;
    z-index: 1;
    margin-top: -40rpx;
    background: #fff;
    border-radius: 40rpx 40rpx 0 0;

    &-content {
      padding: 30rpx 30rpx 40rpx;
    }
  }
}
</style>
