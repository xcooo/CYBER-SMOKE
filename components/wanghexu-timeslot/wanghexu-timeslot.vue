<template>
    <view>
		<view v-if="isShow" class="time_mask" :class="{'uni-timer-mask-show':timeMaskShow}"></view>
		<view v-if="isShow" class="yx_time_slot" :class="{'fadelogIn1':timeMaskShow}">
			<view class="time_top_box">
				<view class="time_close" @click="close">取消</view>
				<view class="time_text">{{title}}</view>
				<view class="time_comfirm" @click="confirm">确认</view>
			</view>
			<view class="typelist">
				<view class="typeobj" :class="{'typeobj_hover':typeIndex==index}" v-for="(item,index) in typeList" :key="index" @click="handleType(index)">
					<view class="text">{{item}}</view>
					<view class="line"></view>
				</view>
			</view>
			<!-- 时间选择 -->
			<view class="yx_timer_sel">
				<swiper class="sel_swiper" :current="typeIndex">
				    <swiper-item>
				        <view>
							<picker-view :value="startvalue" :indicator-style="indicatorStyle" @change="bindstartChange" class="sel_swiper-item">
							    <picker-view-column>
							        <view class="item" v-for="(item,index) in timeHour" :key="index">{{item}}时</view>
							    </picker-view-column>
							    <picker-view-column>
							        <view class="item" v-for="(item,index) in timeMin" :key="index">{{item}}分</view>
							    </picker-view-column>
							</picker-view>
						</view>
				    </swiper-item>
				    <swiper-item>
				        <view>
				    		<picker-view :value="endvalue" :indicator-style="indicatorStyle" @change="bindendChange" class="sel_swiper-item">
				    		    <picker-view-column>
				    		        <view class="item" v-for="(item,index) in timeHour" :key="index">{{item}}时</view>
				    		    </picker-view-column>
				    		    <picker-view-column>
				    		        <view class="item" v-for="(item,index) in timeMin" :key="index">{{item}}分</view>
				    		    </picker-view-column>
				    		</picker-view>
				    	</view>
				    </swiper-item>
				</swiper>
			</view>
			
		</view>
	</view>
</template>

<script>
export default {
	name:"time_slot",
	props: {
		title: {
		    type: String,
		    default: () => {
		       return "选择时间段";
		    }
		},
	},
    data() {
        return {
			timeMaskShow:false,//遮罩
			isShow:false,//显示
			typeList:["开始时间","结束时间"],
			typeIndex:0,//下标
			startvalue:[14,0],//默认下标，14时 00分
			endvalue:[15,0],//默认下标，15时 00分
			indicatorStyle: 'height: 50px;',
			// timeList:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
			timeHour:[],
			timeMin:[],//分钟可选项
        };
    },
    mounted() {
		//获取时分
		let timeHour = [] 
		let timeMin = [] 
		for (let i = 0; i < 24; i++) {
		    timeHour.push(this.formatNumber(i))
	    }
		for (let i = 0; i < 60; i++) {
		    timeMin.push(this.formatNumber(i))
		}
		this.timeHour = timeHour
		this.timeMin = timeMin
	},
    methods: {
		//看看是不是有两位数
		formatNumber(n) {
			n = n.toString()
			return n[1] ? n : '0' + n
		},
		//开始选择
		bindstartChange(e){
			console.log(e)
			this.startvalue = e.detail.value
		},
		//结束选择
		bindendChange(e){
			console.log(e)
			this.endvalue = e.detail.value
		},
        /**
         * 关闭弹窗
         */
        close() {
        	this.timeMaskShow = false
        	this.$nextTick(() => {
        		setTimeout(() => {
        			this.isShow = false
        			this.$emit('close')
        		}, 300)
        	})
        },
        /**
         * 确认按钮
         */
        confirm() {
			if(this.typeIndex==0){
				this.endvalue = [this.startvalue[0]+1,0]
				this.typeIndex = 1
			}else{
				if(this.startvalue[0]<this.endvalue[0] || (this.startvalue[0]==this.endvalue[0]&&this.startvalue[1]<this.endvalue[1])){
					var obj = {
						start:{
							hour:this.timeHour[this.startvalue[0]],
							min:this.timeMin[this.startvalue[1]]
						},
						end:{
							hour:this.timeHour[this.endvalue[0]],
							min:this.timeMin[this.endvalue[1]]
						}
					}
					this.$emit('confirm',obj)
					this.close()
				}else{
					uni.showToast({
						icon:"error",
						title:"结束时间要大于开始时间"
					})
				}
				
			}
        },
		/**
		 * 打开日历弹窗
		 */
		open() {
			this.typeIndex = 0
			this.isShow = true
			this.$nextTick(() => {
				setTimeout(() => {
					this.timeMaskShow = true
				}, 50)
			})
		},
		//栏目选择
		handleType(index){
			if(index!=this.typeIndex){
				if(index==1){
					this.endvalue = [this.startvalue[0]+1,0]
				}
				this.typeIndex = index
			}
		}
		
    }
};
</script>

<style lang="scss" scoped>
.time_mask {
	position: fixed;
	bottom: 0;
	top: 0;
	left: 0;
	right: 0;
	background-color: $uni-bg-color-mask;
	transition-property: opacity;
	transition-duration: 0.3s;
	opacity: 0;
	/* #ifndef APP-NVUE */
	z-index: 99;
	/* #endif */
}
.yx_time_slot{
	background-color: #FFFFFF;
	width: 100%;
	height: 750rpx;
	position: fixed;
	bottom: calc(var(--window-bottom));
	left: 0;
	right: 0;
	z-index: 99;
	transition-property: transform;
	transition-duration: 0.3s;
	transform: translateY(460px);
	.time_top_box{
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.time_close,.time_comfirm{
			width: 100rpx;
			color: #999999;
			font-size: 28rpx;
			font-weight: 400;
			text-align: center;
		}
		.time_comfirm{
			color: #4360F7;
		}
		.time_text{
			flex: 1;
			font-size: 30rpx;
			font-weight: 800;
			text-align: center;
		}
	}
}
.uni-timer-mask-show{
	opacity: 1;
}
/* 从下往上弹窗动画 */
.fadelogIn1 {
	// -webkit-animation: fadelogIn 0.5s;
	// animation: fadelogIn 0.5s;
	transform: translateY(0);
}
.typelist{
	width: 100%;
	height: 70rpx;
	display: flex;
	align-items: center;
	.typeobj{
		width: 158rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.text{
			height: 65rpx;
			line-height: 65rpx;
			font-size: 28rpx;
			color: #333333;
		}
		.line{
			width: 1rpx;
			height: 5rpx;
		}
	}
	.typeobj_hover{
		.text{
			font-weight: 600;
		}
		.line{
			width: 88rpx;
			transition: width .5s;
			background-color: #4360F7;
		}
	}
}
.yx_timer_sel{
	width: 100%;
	margin-top: 38rpx;
	.sel_swiper{
		// width: 80%;
		// margin: 0 auto;
		height: 500rpx;
	}
	.sel_swiper-item{
		height: 500rpx;
		.item {
		    height: 50px;
			display: flex;
		    align-items: center;
		    justify-content: center;
		    text-align: center;
		}
	}
}
</style>