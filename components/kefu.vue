<template>
	<view class="bigBox" v-if="isShow">
		<view>
			<view class="bgbox">
				<view class="off">
					<u-icon name="close-circle" size="40" color="#fff" @click="$emit('cusEvent', false)"></u-icon>
					<!-- <image src="../static/image/off.png"  mode=""></image> -->
				</view>
				<view class="content">
					<image class="ma" :src="data" mode=""></image>
					<view class="yi">微信扫一扫</view>
					<!-- <view class="bian er">QQ群号：{{data.qqgroup}}</view>
					<view class="er">联系电话：{{data.lxphone}}</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "kefu",
		props: ['isShow'],
		data() {
			return {
				data:'',
			};
		},
		methods:{
			getKf(){
				this.$http({
					url: "index.php/api/index/getSetting",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},

				}).then(res => {
					console.log(res,"客服");
					if (res.data.code == 1) {
						this.data = res.data.data.kfimg
						
					} else {
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			}
		}

	}
</script>

<style>
	.bigBox {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999999;
	}

	.bgbox {
		background: url('https://img.50api.cn/dingdang/lianxiBg.png') no-repeat;
		background-size: 560rpx 724rpx;
		width: 560rpx;
		height: 724rpx;
	}

	.off {
		text-align: right;
		padding: 30rpx;
		box-sizing: border-box;
	}
	.off image{
		width: 33rpx;
		height: 34rpx;
	}

	.content {
		margin-top: 130rpx;
		text-align: center;
	}

	.ma {
		width: 300rpx;
		height: 300rpx;
	}

	.yi {
		font-size: 34rpx;
		color: #999;
		line-height: 50rpx;
		margin-top: 40rpx;
	}

	.bian {
		margin-top: 30rpx;
	}

	.er {
		font-size: 32rpx;
		line-height: 46rpx;
	}
</style>
