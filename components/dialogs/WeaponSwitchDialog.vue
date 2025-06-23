<template>
  <u-popup v-model="localShow" mode="center" border-radius="20"
    :custom-style="{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }">
    <view class="weapon-box">
      <view class="weapon-header">
        <u-icon class="close-icon" name="close" color="#333" size="38" @click="close"></u-icon>
        <view class="weapon-title">切换武器</view>
      </view>
      <view class="weapon-content">
        <view class="weapon-list">
          <view class="weapon-item" v-for="(weapon, index) in filteredWeapons" :key="index"
            :class="{ active: currentWeapon === weapon.id }" @click="selectWeapon(weapon)">
            <image :src="weapon.image" mode="aspectFit" class="weapon-image"></image>
            <view class="weapon-info">
              <view class="weapon-name">{{ weapon.name }}</view>
              <view class="weapon-power">火力值：{{ weapon.power }}</view>
              <view class="weapon-desc">{{ weapon.description }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  name: 'WeaponSwitchDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    is_normal: {
      type: Boolean,
      default: false
    },
    is_laser: {
      type: Boolean,
      default: false
    },
    is_shotgun: {
      type: Boolean,
      default: false
    },
    weapons: {
      type: Array,
      default: () => []
    },
    currentWeapon: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      localShow: this.show
    }
  },
  watch: {
    show (val) {
      this.localShow = val
    },
    localShow (val) {
      this.$emit('update:show', val)
    }
  },
  computed: {
    filteredWeapons () {
      return this.weapons.filter(weapon => {
        if (weapon.type === 'normal' && this.is_normal) return true
        if (weapon.type === 'laser' && this.is_laser) return true
        if (weapon.type === 'shotgun' && this.is_shotgun) return true
        return false
      })
    }
  },
  methods: {
    close () {
      this.localShow = false
    },
    selectWeapon (weapon) {
      this.$emit('select', weapon)
      this.close()
    }
  }
}
</script>


<style lang="scss" scoped>
.weapon-box {
  width: 650rpx;
  background: linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%);
  border-radius: 30rpx;
  padding: 40rpx;

  .rules-header,
  .prizes-header,
  .weapon-header {
    position: relative;
    text-align: center;
    margin-bottom: 40rpx;

    .close-icon {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 40rpx;
      height: 40rpx;
    }

    .rules-title,
    .prizes-title,
    .weapon-title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      background: linear-gradient(90deg, #FF6B6B 0%, #FF8E8E 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}


.weapon-list {
  .weapon-item {
    display: flex;
    align-items: center;
    padding: 20rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &.active {
      background: #FFF0F0;
      border: 2rpx solid #FF6B6B;
    }

    .weapon-image {
      width: 100rpx;
      height: 100rpx;
      margin-right: 20rpx;
    }

    .weapon-info {
      flex: 1;

      .weapon-name {
        font-size: 28rpx;
        font-weight: bold;
        color: #333;

      }

      .weapon-power {
        font-size: 24rpx;
        color: #FF6B6B;
        font-weight: 500;
        margin: 10rpx 0;
      }

      .weapon-desc {
        font-size: 24rpx;
        color: #999;
      }
    }
  }
}
</style>