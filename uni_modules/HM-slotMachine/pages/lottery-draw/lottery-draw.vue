<template>
	<view class="content">
		<view class="sm">
			<HM-slotMachine ref="HMslotMachine"></HM-slotMachine>
		</view>
		<view class="start" @tap="start">
			<text>开 始</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				prizeList:[
					{name:'iPhone13',value:'iPhone',img:'/uni_modules/HM-slotMachine/static/1.png'},
					{name:'airPods3',value:'airPods',img:'/uni_modules/HM-slotMachine/static/2.png'},
					{name:'行李箱',value:'luggage',img:'/uni_modules/HM-slotMachine/static/3.png'},
					{name:'风筒',value:'dryer',img:'/uni_modules/HM-slotMachine/static/4.png'},
					{name:'平行车',value:'balanceCar',img:'/uni_modules/HM-slotMachine/static/5.png'},
					{name:'iPad5',value:'iPad',img:'/uni_modules/HM-slotMachine/static/6.png'}
				]
			}
		},
		onLoad() {
			
		},
		onReady() {
			// init(options)初始化抽奖组件
			// options参数说明
			// prizeList 奖品列表，结构看上面
			// defaultResults 默认显示奖品 初始化完成默认显示的奖品
			// duration 总抽奖时长 毫秒
			// direction 滚动方向 up|down
			this.$refs.HMslotMachine.init({
				prizeList:this.prizeList,
				defaultResults:['iPhone','iPhone','iPhone'],
				duration:4000,
				direction:'up'
			})
		},
		methods: {
			start(){
				// roll(options)开始摇奖
				// 参数说明
				// results 开奖结果，结构[value,value,value] value为奖品数据的value值
				// success 开奖回调 e={results} results为开奖结果数据
				this.$refs.HMslotMachine.roll({
					results:this.getResults(),
					success:(e)=>{
						
						console.log("success e: ",e);
					}
				})
			},
			getResults(){
				// 生成随机的抽奖结果 实际应用应该ajax请求后台，让后台返回开奖结果
				let max = this.prizeList.length-1;
				let arr = [Math.floor(Math.random() * (max - 1 + 1) + 1),Math.floor(Math.random() * (max - 1 + 1) + 1),Math.floor(Math.random() * (max - 1 + 1) + 1)];
				return [
					this.prizeList[arr[0]].value,
					this.prizeList[arr[1]].value,
					this.prizeList[arr[2]].value
				]
			}
		}
	}
</script>

<style lang="scss"> 
page{
	background-image: linear-gradient(to top,#8F1E70, #51279A);
	min-height: calc(100vh - var(--window-bottom) - var(--window-top));
}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		.sm{
			margin-top: 200rpx;
		}
		.start{
			width: 70%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #f29c11;
			border-radius: 40rpx;
			margin-top: 30rpx;
			box-shadow: 0 1px 2px rgba($color: #51279A, $alpha: 1);
			border-bottom: solid 3px #8d5805;
			box-sizing: border-box;
			text{
				font-size: 20px;
				font-weight: bold;
				color: #b51c06;
				text-shadow: 1px 1px 1px #f2e811;
			}
		}
	}

	
</style>
