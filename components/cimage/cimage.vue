<!--
 * @Date: 2022-11-21 14:05:40
 * @LastEditTime: 2022-12-27 13:52:59
 * @Description: 图片组件,方便设置默认路径
-->
<template>
  <view class="c_image">
    <image :src="imgUrl" :mode="mode" />
  </view>
</template>

<script>
export default {
  name: 'cimage',

  props: {
    src: {
      type: String,
      default: ''
    },

    mode: {
      type: String,
      default: 'scaleToFill'
    }
  },

  computed: {
    imgUrl() {
      if (this.src.indexOf('http') != -1 || this.src.indexOf('base64') != -1) {
        return this.src
      } else {
        return this.src ? this.imgBaseUrl + this.src : ''
      }
    }
  },

  data() {
    return {}
  }
}
</script>

<style lang="scss"></style>
