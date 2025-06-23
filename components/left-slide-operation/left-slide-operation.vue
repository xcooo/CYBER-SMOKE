<!-- 向左滑动 右边出现操作按钮 -->
<template>
	<view class="wrapper">
		<view
			:style="[Tactive == index ? leftStyle : '']"
			class="item-view"
			@touchstart="touchStart($event, index)"
			@touchmove="touchMove($event, index)"
			@touchend="touchEnd($event, index)"
			@click="itemClick(itemData, index)"
		>
			<slot></slot>
		</view>

		<view :style="[Tactive === index ? rightStyle : '']" class="delete" @click.stop="operation(itemData)">
			<image :style="operationImageStyle" :src="operationImageSrc" mode=""></image>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// item 数据
		itemData: {},

		// item 下标
		index: {
			type: Number,
			default: 0
		},

		// 操作按钮路劲
		operationImageSrc: {
			type: String,
			default: '../../static/del_icon.png'
		},

		// 操作按钮样式
		operationImageStyle: {
			type: String,
			default: 'width: 50rpx; height: 50rpx;'
		},

		// 是否允许滑动
		isSlide: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			startX: null, //起始位置
			startM: null,
			startE: null, //结束位置
			left: null,
			deleteBtn: 100,
			leftStyle: {},
			rightStyle: {},
			Tactive: 0
		};
	},
	methods: {
		operation(item) {
			this.init();
			this.$emit('operationCallBack', item);
		},

		itemClick(item, index) {
			this.leftStyle = {};
			this.rightStyle = {};
			var lastIndex = uni.getStorageSync('lastSlideIndex');
			this.$emit('itemClickCallBack', { lastSlideIndex: lastIndex, index: index, item: this.itemData });
		},

		init() {
			this.leftStyle = {};
			this.rightStyle = {};
		},

		touchStart(e, index) {
			if (!this.isSlide) {
				//不允许滑动
				return;
			}
			this.Tactive = index;
			this.startX = e.touches[0].clientX;
			var lastIndex = uni.getStorageSync('lastSlideIndex');
			this.$emit('itemTouchStart', { lastSlideIndex: lastIndex, item: this.itemData });
		},
		touchMove(e, index) {
			if (!this.isSlide) {
				//不允许滑动
				return;
			}
			this.startM = e.touches[0].clientX;
			this.left = this.startM - this.startX;
			if (this.left > this.deleteBtn) {
				//右滑     注意: 这里的100,是与删除div的width保持一致;
				// this.left = this.deleteBtn; //转成正数
				// this.left = 0;
			}

			//左滑
			if (this.left < -this.deleteBtn) {
				this.left = -this.deleteBtn; //转成正数
				this.rightStyle = { left: this.left + 'px' };
				var temp = this.deleteBtn + this.left;
				this.leftStyle = { left: temp + 'px' };
			}
		},
		touchEnd(e, index) {
			if (!this.isSlide) {
				//不允许滑动
				return;
			}
			if (this.left < this.deleteBtn) {
				//鼠标松开时, 如果长度小于.delete的width;
				this.left = -50;
				this.leftStyle = { left: this.left + 'px' };
				var temp = 0;
				this.rightStyle = { right: temp + 'px' };
				uni.setStorageSync('lastSlideIndex', index);
				this.$emit('itemTouchEnd', { index: index, item: this.itemData });
			}
		}
	}
};
</script>

<style scoped lang="scss">
.wrapper {
	width: 100%;
	margin-top: 10rpx;
	line-height: 100rpx;
	height: 100rpx;
	font-size: 14px;
	overflow: hidden;
	display: flex;
	position: relative;

	.item-view {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		/* padding: 0 30rpx; */
		width: 100%;
		height: 100%;
		background: #fff;
		color: black;
		position: absolute;
		left: 0;
		z-index: 3;
		transition: all 0.5s;
	}

	.delete {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: 0px;
		// width: 200rpx;
		width: 100rpx;
		height: 100%;
		background: #ffffff;
		color: #fff;
		text-align: end;
		transition: all 0.5s;
	}
}
</style>
