<!--
 * @Date: 2022-05-09 18:46:12
 * @LastEditTime: 2022-12-10 10:11:28
 * @Description: 新建/修改收货地址
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar
      :title="title"
      color="#333"
      leftIcon="left"
      backgroundColor="#fff"
      :border="false"
      :statusBar="true"
      :fixed="true"
      @clickLeft="$common.back()"
    ></uni-nav-bar>

    <!-- <u-gap height="22"></u-gap> -->
    <view class="form-item">
      <view class="form-item-content">
        <view class="label">收货人</view>

        <view class="right">
          <input
            v-model="formData.name"
            placeholder="请填写收货人姓名"
            placeholder-class="input-placeholder"
          />
        </view>
      </view>
    </view>

    <view class="form-item">
      <view class="form-item-content border">
        <view class="label">手机号码</view>

        <view class="right">
          <input
            v-model="formData.mobile"
            placeholder="请填写收货人手机号"
            placeholder-class="input-placeholder"
          />
        </view>
      </view>
    </view>

    <view class="form-item">
      <view class="form-item-content border">
        <view class="label">所在地区</view>

        <view class="right">
          <input
            v-model="area"
            placeholder="选择地区"
            placeholder-class="input-placeholder"
            @click="openAddress"
          />

          <uni-icons type="right" color="#999999" size="16" />
        </view>
      </view>
    </view>

    <view class="form-item textarea">
      <view class="form-item-content border">
        <view class="label">详细地址</view>

        <view class="right">
          <textarea
            maxlength="100"
            v-model="formData.site"
            placeholder="街道门牌号、楼牌号等"
            placeholder-class="textarea-placeholder"
          />
        </view>
      </view>
    </view>

    <u-gap height="22"></u-gap>

    <view class="form-item default">
      <view class="form-item-content">
        <view class="label">设为默认收货地址</view>
        <view class="right">
          <evan-switch
            v-model="formData.status"
            active-color="#000000"
            :size="24"
            :active-value="1"
            :inactive-value="2"
          ></evan-switch>
        </view>
      </view>
    </view>

    <view @click="submitAddress" class="save-btn">保存收货地址</view>

    <!-- 地址选择器 -->
    <lb-picker
      ref="areaPicker"
      mode="multiSelector"
      confirm-color="#333"
      :list="list"
      :level="3"
      @confirm="addressConfirm"
    ></lb-picker>
  </view>
</template>

<script>
import LbPicker from '@/components/lb-picker'
import addressData from '../../common/area-data-min'
export default {
  components: {
    LbPicker
  },
  data() {
    return {
      optionsData: '',
      list: addressData,
      title: '新建地址',
      formData: {
        id: '',
        name: '',
        mobile: '',
        province: '',
        city: '',
        area: '',
        site: '',
        status: 2
      },
      area: '',
      areaList: []
    }
  },
  onLoad(options) {
    this.optionsData = options

    if (options.id) {
      this.title = '修改地址'
      this.getData()
    }
  },
  onReady() {
    uni.setNavigationBarTitle({ title: this.title })
  },
  methods: {
    /**
     * @description: 获取地址详情
     * @param {*}
     * @return {*}
     */
    getData() {
      this.req({
        url: '/v1/address/info',
        data: {
          id: this.optionsData.id
        },
        success: res => {
          console.log(res)
          if (res.code == 200) {
            Object.keys(this.formData).map(item => {
              this.formData[item] = res.data[item]
            })
            this.area = `${this.formData.province} ${this.formData.city} ${this.formData.area}`
          }
        }
      })
    },

    /**
     * @description: 提交地址
     * @param {*}
     * @return {*}
     */
    submitAddress() {
      if (this.formData.name == '') {
        uni.showToast({
          title: '请输入姓名',
          icon: 'none'
        })
        return
      }
      if (this.formData.mobile == '') {
        uni.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
        return
      }
      if (
        this.formData.province == '' ||
        this.formData.city == '' ||
        this.formData.area == ''
      ) {
        uni.showToast({
          title: '请选择地址',
          icon: 'none'
        })
        return
      }
      if (this.formData.site == '') {
        uni.showToast({
          title: '请输入详细地址',
          icon: 'none'
        })
        return
      }

      console.log(this.formData)
      // return

      this.req({
        url: '/v1/address/store',
        data: this.formData,
        success: res => {
          console.log(res)
          if (res.code == 200) {
            this.$common.toast({
              title: res.msg,
              icon: 'success',
              duration: 500,
              success: res => {
                this.$common.back()
              }
            })
          }
        }
      })
    },

    /**
     * @description: 确认选择地址
     * @param {*} e
     * @return {*}
     */
    addressConfirm(e) {
      console.log(e)
      let arr = e.item.map(item => item.label) // 城市

      this.formData.province = arr[0]
      this.formData.city = arr[1]
      this.formData.area = arr[2]

      this.area = arr.join(' ')
    },

    /**
     * @description: 关闭地址选择器
     * @param {*}
     * @return {*}
     */
    closeAddress() {
      this.$refs.areaPicker.hide()
    },

    /**
     * @description: 打开地址选择器
     * @param {*}
     * @return {*}
     */
    openAddress() {
      this.$refs.areaPicker.show()
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  .form-item {
    padding: 0 30rpx;
    height: 100rpx;

    background: #ffffff;
    &-content {
      height: 100%;
      display: flex;
      align-items: center;
      &.border {
        border-top: 1px solid #eeeeee;
      }
      .label {
        width: 166rpx;
        font-size: 32rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #222222;
      }
      .right {
        width: calc(100% - 166rpx);
        display: flex;
        align-items: center;
        input,
        textarea {
          flex: 1;
          font-size: 28rpx;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #333333;
        }
        .icon {
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
  }
  .textarea {
    height: auto;
    padding: 0 30rpx;
    .form-item-content {
      padding: 30rpx 0;
      align-items: flex-start;
      .right {
        textarea {
          height: 200rpx;
        }
      }
    }
  }
  .default {
    .form-item-content {
      justify-content: space-between;
      .label {
        width: 100%;
      }
      .right {
        width: auto;
      }
    }
  }
  .save-btn {
    margin: 88rpx auto;
    width: 690rpx;
    height: 88rpx;
    background: #000;
    border-radius: 888rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 32rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
