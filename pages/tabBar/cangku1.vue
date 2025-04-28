<template>
	<view class="container">
    <cus-tabbar :current-page="3"></cus-tabbar>
		<u-navbar :is-back="false" title=" " :border-bottom="false">
			<view class="slot-wrap">
				<u-tabs-swiper ref="tabs" :list="list" @change="change" :current="current" active-color="#2AC2B3"
					:is-scroll="false"></u-tabs-swiper>
			</view>
		</u-navbar>

		<swiper duration="300" class="swiper-box" :current="swiperCurrent" @change="changeIdx">
			<swiper-item>
				<scroll-view scroll-y class="scroll-view">
					<u-sticky>
						<view class="topbtns">
							<view class="topbtn" :class="isSelect?'active':''" @click="all"> 全部
							</view>
						<!-- 	<view class="topbtn" :class="!isSelect?'active':''" @click="yiduihuan()"> 已兑换
							</view> -->
						</view>
					</u-sticky>
					<!-- <u-empty text="仓库空空" :show="dataBuffer" mode="order"></u-empty> -->
					<view class="goodsList" v-if="smallTit == 0">
						<view class="list" v-for="(item,idx) in goodsList" :key="idx">
							<view class="goods">
								<image :src="item.goods_image" mode=""></image>
								<view class="info">
									<view class="tit">{{item.goods_name}}</view>
									<view class="bi" v-if="item.status == 'bag'">可兑换：<text>{{item.luyck}}</text>幸运币</view>
									<view class="time" v-else>兑换时间：{{item.hstime}}</view>
								</view>
							</view>
							<view class="tip" v-if="item.status == 'bag'">
								<!-- <view class="tit">
									提示:请在<text>2022/11/02 00:00:00</text>前提取，过期不能提货，只能兑换
								</view> -->
								<view class="btns n-flex-row">
									<view class="btn ti" @click="tihuo(item)"> 提货 </view>
									<view class="btn dui" @click="isagain(item.id)" v-if="cardList.length != 0"> 重抽 </view>
									<view class="againbox" v-if="item.luyck > 0">
										<view class="again" v-if="isOne == 0">
											得重抽卡*1
										</view>
										<view class="btn dui" @click="duihuan(item)"> 兑换 </view>
									</view>
								</view>
							</view>
						</view>
						<u-empty text="暂无数据" mode="list" :show="nullShow" margin-top="400"></u-empty>
					</view>

					<view class="goodsList" v-if="smallTit == 1">
						<view class="list" v-for="(item,idx) in goodsList" :key="idx">
							<view class="goods" style="border: none;">
								<image :src="item.goods_image" mode=""></image>
								<view class="info">
									<view class="tit">{{item.goods_name}}</view>
									<view class="time">兑换时间：{{item.hstime}}</view>
								</view>
							</view>

						</view>
						<u-empty text="暂无数据" mode="list" :show="nullShow" margin-top="400"></u-empty>
					</view>
				</scroll-view>
			</swiper-item>
			
			<swiper-item>
				<scroll-view scroll-y class="scroll-view">
					<view class="goodsList">
						<view class="list" v-for="(item,idx) in boxList" :key="idx">
							<view class="goods">
								<image :src="item.box_banner_images" mode=""></image>
								<view class="info">
									<view class="tit">{{item.box_name}}</view>
									
								</view>
							</view>
							<view class="tip">
								
								<view class="btns n-flex-row">
									<view class="btn dui" @click="kai(item.id,item.boxfl_id)"> 开箱 </view>
									
								</view>
							</view>
						</view>
					</view>
					<u-empty text="暂无数据" mode="list" :show="mangheShow"></u-empty>
				</scroll-view>
			</swiper-item>
		</swiper>
		<view class="newagain" v-if="isOne == 0">
			新人首次兑换，额外得重抽卡*1
		</view>
		<u-modal v-model="show" @confirm="confirm" content="该商品已成功兑换为盲盒,前往盒柜查看"></u-modal>
		<u-modal v-model="againshow" :show-cancel-button="true" @confirm="again" content="是否使用重抽卡重抽该商品"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nullShow: false,
				mangheShow:false,
				list: [{
					name: '商品'
				}, {
					name: '盒柜'
				}],
				current: 0,
				swiperCurrent: 0,
				dataBuffer: true,
				isSelect: true,
				smallTit: 0,
				goodsList: [],
				isOne:'0',
				boxList:[],
				cardList:[],
				show:false,
				againshow:false,
				againId:'',
			}
		},
		onLoad() {
			uni.$on('sc',(data) => {
				if(data == 0){
					this.current = 0
				}
				if(data == 1){
					this.current = 1
				}
			})
		},
		onUnload() {
			uni.$off('sc')
		},
		onShow() {
			this.all()
			this.getBox()
			this.getCard()
		},
		methods: {
			kai(id,boxfl_id){
				uni.navigateTo({
					url: '/pages/home/luckbox'
				})
				setTimeout(() => {
					uni.$emit('kaidata', {
						id: id,
						boxfl_id:boxfl_id,
					})
				},600)
				
				
			},
			isagain(id){
				this.againId = id
				this.againshow = true
			},
			// 重抽
			again(id){
				if(this.cardList.length == 0){
					this.$tip.tip("没有可使用的重抽卡")
					return
				}
				this.$http({
					url: "index.php/api/index/getCard",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data:{
						cardid:this.cardList[0].id,
						id:this.againId
					}
				}).then(res => {
					console.log(res,"重抽");
					if (res.data.code == 1) {
						this.show = true
					}
				}).catch(err => {});
			},
			// 获取重抽卡
			getCard() {
				this.$http({
					url: "index.php/api/index/getCards",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
				}).then(res => {
					console.log(res,"ka");
					if (res.data.code == 1) {
						this.cardList = res.data.data
					}
				}).catch(err => {});
			},
			getBox(){
				this.$http({
					url: "index.php/api/user/getBox",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
				}).then(res => {
					console.log(res,"盲盒");
					if (res.data.code == 1) {
						if (res.data.data.length == 0) {
							this.mangheShow = true
						} else {
							this.mangheShow = false
						}
						console.log("调用盲盒");
						this.boxList = res.data.data
						
					} else {
						this.boxList = []
						this.mangheShow = true
					}
				}).catch(err => {});
			},
			// 前往盒柜
			confirm(){
				this.getBox()
				this.current = 1
				this.swiperCurrent = 1
			},
			// 全部
			all() {
				this.isSelect = true;
				this.smallTit = 0
				this.getData(0)
			},
			// 已兑换
			yiduihuan() {
				this.isSelect = false;
				this.smallTit = 1
				this.getData(1)
			},
			getData(sta) {
				uni.showLoading({
					title: "加载中"
				})
				this.goodsList = []
				this.$http({
					url: "index.php/api/order/getMhOrder",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						status: sta
					}
				}).then(res => {
					uni.hideLoading()
					console.log(res,"商品");
					if (res.data.code == 1) {
						if (res.data.data.length == 0) {
							this.nullShow = true
						} else {
							this.nullShow = false
						}
						this.goodsList = res.data.data.list
						this.isOne = res.data.data.cck
					} else {
						this.nullShow = true
						// this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			},
			change(index) {
				this.current = index;
				this.swiperCurrent = index;
			},
			// 页面改变
			changeIdx(idx) {
				this.current = idx.detail.current
				this.swiperCurrent = idx.detail.current
				this.getList()
			},
			getList() {

			},
			tihuo(item){
				let data = {
					image:item.goods_image,
					name:item.goods_name,
					yunfei:item.delivery_fee
				}
				uni.setStorageSync('tihuo',data)
				uni.navigateTo({
					url:'/pages/cangku/confirmOrder?id='+item.id
				})
			},
			duihuan(item) {
				let data = {
					image:item.goods_image,
					name:item.goods_name,
					price:item.luyck
				}
				uni.setStorageSync('dui',data)
				uni.navigateTo({
					url: '/pages/cangku/duihuan?id='+item.id
				})
			},
		}
	}
</script>

<style>
	@import url("../../static/css/cangku.css");
</style>
