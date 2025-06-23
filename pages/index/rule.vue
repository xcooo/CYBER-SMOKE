<!--
 * @Date: 2022-09-24 16:54:52
 * @LastEditTime: 2024-05-10 11:18:19
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <view class="top_money">
      <view class="content" v-html="ruleData.editor"></view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      optionsData: '',
      ruleData: ''
    }
  },

  onLoad (options) {
    this.optionsData = options
  },

  async onReady () {
    if (this.optionsData.id) {
      let data = await this.$common.getRule(this.optionsData.id)

      if (data.editor) {
        data.editor = data.editor.replace(
          /\<img/gi,
          '<img style="width: 100%;vertical-align: middle;"'
        )
      }
      uni.setNavigationBarTitle({ title: data.title })
      this.ruleData = data
    }
  },

  methods: {}
}
</script>

<style lang="scss">
.page-wrap {
  padding: 0 10rpx;
  background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  background-size: 100% 100%;
  min-height: calc(100vh - 50px);
  background: #222333;
  background: #fff;


  .content {
    width: 100%;
    box-sizing: border-box;
    padding: 10rpx;
    font-size: 18px;
    color: #fff;
    color: #333;
  }
}
</style>
