<template>
  <view>
    <uni-nav-bar color="#333" leftIcon="left" backgroundColor="#fff" :border="false" :statusBar="true" :fixed="true"
      title="公证详情" @clickLeft="back">
    </uni-nav-bar>
    <image class="" src="https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01ZccGZB24NdcrJH7oV_!!2200676927379.jpg"
      mode="widthFix" lazy-load="false" binderror="" bindload="" />
  </view>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {

    }
  },
  computed: {
  },
  methods: {
    back () {
      uni.switchTab({
        url: '/pages/tabBar/home',
      });
    },
  },
}
</script>

<style lang='scss' scoped></style>