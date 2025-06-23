<template>
	<view class="lottery_container">
		<view class="grid_wrap">
			<view class="lottery_wrap">
				<ul class="lottery_grid">
					<li v-for="(item, index) in grid_info_arr" :class="{ active: current_index == index && index != 8 }" :key="index"
					 @click="luck_draw" :data-index="index">
						<image v-if="index != 8" class="grid_img" mode='aspectFit' :src="item.img" alt="">
							{{ index == 8 ? '抽奖' : item.name }}
					</li>
				</ul>
			</view>
			<view class="lottery_wrap_border">
				<ul v-for="(item, index) in 4" :key="index">
					<li v-for="(item, index) in 12" :key="index"></li>
				</ul>
			</view>
		</view>
		<!-- 抽奖完成弹出的窗口 -->
		<!-- <view class="lottery_finish_wrap">
			
		</view> -->
	</view>

</template>

<script>
	import LotteryDraw from './SJ-LotteryDraw.js';
	let grid_info = [{
			img: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			name: "手机"
		},
		{
			img: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			name: "零食包"
		},
		{
			img: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			name: "口红"
		},
		{
			img: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			name: "谢谢参与"
		},
		{
			img: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			name: "压缩饼干"
		},
		{
			img: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			name: "水杯"
		},
		{
			img: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			name: "QQ糖"
		},
		{
			img: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			name: "耳机"
		},
		{
			img: "../../static/SJ-LotteryDraw/SJ-LotteryDraw.png",
			name: "谢谢参与"
		},
	];
	export default {
		data() {
			return {
				current_index: -1,
				zhuantype:true,
			};
		},
		props: {
			grid_info_arr: {
				type: Array,
				default: function() {
					return grid_info
				}
			},
			num: {
				type: Number,
				default: 0
			},
		},
		onLoad() {
			
		},

		methods: {
			luck_draw(event) {
				if(this.num==0){
					uni.showToast({
						icon:'none',
						title:'暂无抽奖次数'
					})
					return
				}
				let index = event.currentTarget.dataset.index;
				let that = this;
				if (index == 8 && that.zhuantype) {
					that.zhuantype=false
					// 点击抽奖之后知道获奖位置，修改父组件中lottery_draw_param的值
					this.$emit('get_winingIndex', function(res){
						console.log(res);
						let lottery_draw_param=res;
						let win = new LotteryDraw({
								domData: that.grid_info_arr,
								...lottery_draw_param
							},
							function(index, count) {
								that.current_index = index;
								console.log()
								if (lottery_draw_param.winingIndex == index && lottery_draw_param.totalCount == count) {
									that.zhuantype=true
									that.$emit('luck_draw_finish', that.grid_info_arr[index])
									// console.log('抽到了')
								}
							}
						);
					});
					
				}
			}
		}
	};
</script>

<style scoped lang="css">
	@import './SJ-LotteryDraw.css';
</style>
