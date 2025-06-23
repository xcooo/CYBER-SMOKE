<!--
 * @Date: 2022-07-22 14:25:38
 * @LastEditTime: 2022-12-09 10:59:14
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <web-view :src="optionsData.url" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      optionsData: ''
    }
  },
  onLoad(options) {
    this.optionsData = options
  }
}
</script>

<style lang="scss"></style>
