<template>
	<view>
		<u-navbar title="我的团队">
		</u-navbar>
		<view class="wrap">
			<view class="chengyuan">
				<view class="yi">团队成员：<text>{{dataList.total_num}}</text>人</view>
				<view class="yaoNum">邀请码：{{num}}</view>
			</view>

			<u-tabs :list="list" active-color="#10B0B0" bg-color="" :is-scroll="false" :current="current" @change="change"></u-tabs>
			<view class="box" v-if="!show">
				<view class="list" v-for="(item,idx) in cylist" :key="idx">
					<image :src="item.avatar" mode=""></image>
					{{item.nickName}}
				</view>
			</view>
			<u-empty text="暂无成员" margin-top="200" mode="list" :show="show"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '一级成员'
				}, 
        // {
				// 	name: '二级成员'
				// },{
				// 	name: '三级成员'
				// }
      ],
				current: 0,
				cylist:[],//数据
				show:false,
				num:'',
				renNum:0,
				dataList:[],
				userInfo:[],
			}
		},
		onLoad() {
			if(this.userInfo.level != 2){
				
			}else{
				this.$common.to({
					url: '/package/mine/daili',
				})
			}
		},
		onShow() {
			this.$store.dispatch('getUserInfo').then(res => {
				this.userInfo = res.data
				this.num = res.data.invite_code
				this.dataList = res.data.total_xjnum
			  if(res.data.total_xjnum.total_num == 0){
			  	this.show = true
			  }else{
			  	this.show = false
			  }
			  this.cylist = res.data.total_xjnum.one_user_list
			})
		},
		methods: {
			change(index) {
				console.log(index);
				this.current = index;
				console.log(this.dataList);
				if(index == 0){
					if(this.dataList.one_user_list.length>0){
						this.show = false
					}else{
						this.show = true
					}
					this.cylist = this.dataList.one_user_list
					
				}else if(index == 1){
					if(this.dataList.two_user_list.length>0){
						this.show = false
					}else{
						this.show = true
					}
					this.cylist = this.dataList.two_user_list
				}else{
					if(this.dataList.three_user_list.length>0){
						this.show = false
					}else{
						this.show = true
					}
					this.cylist = this.dataList.three_user_list
				}
			},
			
		}
	}
</script>

<style>
	page{
		background-color: #EDF5F5;
	}
	.righttit{
		margin-right: 20rpx;
	}
	.wrap{
		padding: 0 20rpx;
		box-sizing: border-box;
		 padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */ 	
		 padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */ 
	}
	.chengyuan{
		background: url('https://img.50api.cn/dingdang/tuanduiBg.jpg') no-repeat;
		width: 710rpx;
		height: 190rpx;
		background-size: 710rpx 192rpx;
		border-radius: 16rpx;
		margin: 20rpx 0;
		color: #fff;
		text-align: center;
		padding-top: 2rpx;
	}
	.chengyuan .yi{
		margin-top: 40rpx;
	}
	.chengyuan text{
		font-size: 38rpx;
	}
	.chengyuan .yaoNum{
		margin-top: 20rpx;
	}
	.box{
		margin: 20rpx 0;
		border-radius: 16rpx;
		background-color: #fff;
		padding: 1rpx 20rpx;
		box-sizing: border-box;
	}
	.box .list{
		margin: 20rpx 0;
	}
	.box .list image{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 20rpx;
	}
</style>
