<template>
	<view class="container">
    <cus-tabbar :current-page="4"></cus-tabbar>
		<!-- <u-navbar :is-back="false" :border-bottom="false" :immersive="true" title="1 " :background="background"></u-navbar> -->
		<view class="head">
			<!-- #ifndef H5 -->
			<view class="" style="height: 40px;"></view>
			<!-- #endif -->
			<view class="topbtn">
				<view class="xiao" @click="$.to('/pages/my/news')">
					<u-badge type="error" :count="count" :offset="[0,-20]"></u-badge>
					<image src="../../static/image/xiaoxi.png" mode=""></image>
				</view>
				<view class="" @click="$.to('/pages/my/setUp')">
					<image src="../../static/image/setup.png" mode=""></image>
				</view>
			</view>

			<view class="userInfo" @click="$.to('/pages/my/userInfo')">
				<view class="left" v-if="isLogin">
					<image :src="userInfo.avatar" mode="aspectFill"></image>
					<view class="name">
						<view>
							<view class="userName">{{userInfo.nickname}}</view>
							<view class="denglu">ID:{{userInfo.id}}</view>
						</view>
					</view>
				</view>
				<view class="left" v-else @click.stop="$.to('/pages/my/login')">
					<image src="@/static/image/headPic.png" mode="aspectFill"></image>
					<view class="name">
						<view>
							<view class="userName">游客</view>
							<view class="denglu">点击头像去登录</view>
						</view>
					</view>
				</view>
				<view class="edit">
					<image src="http://mhimg.69box.cn/kaixiang/mf.png"></image>
					<text>编辑资料</text>
				</view>
			</view>

			<view class="jinebox">
				<!-- <view class="mx" @click="txmx">提现明细 ></view> -->
				<view class="box11">
					<view class="yue" @click="$.to('/pages/my/currency?sta=1')">
						<image src="../../static/image/xr.png" mode="aspectFill"></image>
						<view class="text">
							<view style="color: #5FA2B3;">幸运币 ></view>
							<view style="color: #fff;font-size: 25px;">{{ userInfo.score }}</view>
						</view>
					</view>
					<view class="yue" @click="$.to('/pages/my/currency?sta=2')">
						<image src="../../static/image/y2.png" mode="aspectFill"></image>
						<view class="text">
							<view style="color: #5FA2B3;">星石 ></view>
							<view style="color: #fff;font-size: 25px;">{{ userInfo.money }}</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view class="myOrder">
			<view class="title n-flex-row n-justify-between">
				<view>我的邀请</view>
			</view>
			<view class="orderList n-flex-row n-justify-between">
				<view class="list" @click="$.to('/pages/my/currency?sta=3')">
					<view>{{ userInfo.balance }}</view>
					<view>佣金余额</view>
				</view>
				<view class="list" @click="$.to('/pages/my/myTeam')">
					<view>{{ userInfo.xj_count }}</view>
					<view>下级数量</view>
				</view>
				<view class="list" @click="$.to('/pages/my/currency?sta=3')">
					<view>{{ userInfo.team_income_sum }}</view>
					<view>累计佣金</view>
				</view>
			</view>
		</view>
		<view class="orderbox">
			<view class="obox" @click="sc">
				<image src="../../static/image/xs.png" mode="aspectFill"></image>
				<text style="font-size:15px">商城</text>
			</view>
			<view class="obox" @click="mh">
				<image src="../../static/image/xp.png" mode="aspectFill"></image>
				<text style="font-size:15px">盲盒</text>
			</view>
		</view>

		<view class="myOrder">
			<view class="title n-flex-row n-justify-between">
				<view>我的订单</view>
				<view class="allorder" @click="$.to('/pages/my/order?idx=0')">全部订单 ></view>
			</view>
			<view class="orderList n-flex-row n-justify-between">
				<view class="list" @click="$.to('/pages/my/order?idx=1')">
					<u-badge type="error" :offset='[-10,0]' :count="jiaoBiao.dfk"></u-badge>
					<image src="../../static/image/mb.png" mode=""></image>
					<view>待付款</view>
				</view>
				<view class="list" @click="$.to('/pages/my/order?idx=2')">
					<u-badge type="error" :offset='[-10,0]' :count="jiaoBiao.dfh"></u-badge>
					<image src="../../static/image/me.png" mode=""></image>
					<view>待发货</view>
				</view>
				<view class="list" @click="$.to('/pages/my/order?idx=3')">
					<u-badge type="error" :offset='[-10,0]' :count="jiaoBiao.yfh"></u-badge>
					<image src="../../static/image/md.png" mode=""></image>
					<view>待收货</view>
				</view>
				<view class="list" @click="$.to('/pages/my/order?idx=4')">
					<image src="../../static/image/mw.png" mode=""></image>
					<view>已完成</view>
				</view>
				<!-- <view class="list">
					<image src="../../static/image/ma.png" mode=""></image>
					<view>售后</view>
				</view> -->
			</view>
		</view>

		<view class="myapp">
			<view class="tit">我的应用</view>
			<view class="applist n-flex-row n-wrap">
				<view class="list" @click="$.to('/pages/my/coupon')">
					<image src="../../static/image/m9.png" mode=""></image>
					<view>优惠券</view>
				</view>
				<view class="list" @click="$.to('/pages/my/address')">
					<image src="../../static/image/mc.png" mode=""></image>
					<view>地址管理</view>
				</view>
				
				<!-- #ifndef MP-WEIXIN -->
				<view class="list" @click="lxkefu">
					<image src="../../static/image/m_.png" mode=""></image>
					<view>联系客服</view>
				</view>
				<!-- #endif -->
				
				<!-- #ifdef MP-WEIXIN -->
				<button class="list kefu" open-type="contact">
					<image src="../../static/image/m_.png" mode=""></image>
					<view>联系客服</view>
				</button>
				<!-- #endif -->
				<!-- <view class="list">
					<image src="../../static/image/guan.png" mode=""></image>
					<view>企微福利官</view>
				</view> -->
				<view class="list" @click="$.to('/pages/my/yaoqing')">
					<image src="../../static/image/li.png" mode=""></image>
					<view>邀请有奖</view>
				</view>
				<view class="list" @click="$.to('/pages/my/myTeam')">
					<image src="../../static/image/friend.png" mode=""></image>
					<view>我的好友</view>
				</view>
				<view class="list" @click="$.to('/pages/my/qiandao')">
					<image src="../../static/image/qian.png" mode=""></image>
					<view>签到领盲盒</view>
				</view>
				<view class="list" @click="sdkshow = true">
					<image src="../../static/image/ma1.png" mode=""></image>
					<view>礼包码</view>
				</view>
			</view>
		</view>

		<u-popup v-model="sdkshow" mode="center" border-radius="16">
			<view class="cdkbox">
				<view class="tit">礼包码兑换</view>
				<u-input v-model="sdk" input-align="center" :border="true" placeholder="请输入礼包码" />
				<button @click="duihuan">确定</button>
			</view>
		</u-popup>
		<kefu :isShow='kfshow' ref="child" @cusEvent="hide"></kefu>
	</view>
</template>

<script>
	import kefu from '@/components/kefu.vue'
	export default {
		data() {
			return {
				background: {
					backgroundColor: '',
				},
				isLogin: false,
				userInfo: '',
				sdkshow: false,
				sdk: '',
				count: 0, //消息角标
				kfshow: false,
				jiaoBiao: '',
			}
		},
		components: {
			kefu
		},
		onLoad() {
			this.getUser()
			uni.$on('updataUser', () => {
				this.getUser();
			})
		},
		onShow() {
			this.getLogin()
			this.getUser()
			this.getNum()
		},
		onUnload() {
			uni.$off('updataUser');
		},
		methods: {
			getNum() {
				this.$http({
					url: "index.php/api/index/getNum",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},

				}).then(res => {
					console.log(res, "角标");
					if (res.data.code == 1) {
						var data = res.data.data
						this.jiaoBiao = {
							dfh: data.dfh,
							dfk: data.dfk,
							yfh: data.yfh
						}
					}
				}).catch(err => {});
			},
			hide() {
				this.kfshow = false
			},
			// 联系客服
			lxkefu() {
				this.$refs.child.getKf()
				this.kfshow = true
			},
			// 礼包码兑换
			duihuan() {
				if (this.sdk == "") {
					this.$tip.tip('请填写兑换码')
					return
				}
				this.$http({
					url: "index.php/api/user/getKami",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					},
					data: {
						kahao: this.sdk
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.$tip.tip('兑换成功')
						this.sdkshow = false
						this.getUser();
					} else {
						this.$tip.tip(res.data.msg)
					}
				}).catch(err => {});
			},
			getLogin() {
				if (uni.getStorageSync("userInfo")) {
					this.isLogin = true
				} else {
					this.isLogin = false
				}
			},
			getUser() {
				this.$http({
					url: "index.php/api/user/userinfo",
					header: {
						// "Content-Type": "application/json",
						"token": uni.getStorageSync("user").token
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.getLogin()
						this.userInfo = res.data.data
						console.log(this.userInfo);
						uni.setStorageSync('userInfo', res.data.data)
					}
				}).catch(err => {});
			},
			sc() {
				uni.switchTab({
					url: '/pages/tabBar/cangku'
				})
				setTimeout(() => {
					uni.$emit('sc', 0)
				}, 300)
			},
			mh() {
				uni.switchTab({
					url: '/pages/tabBar/cangku'
				})
				setTimeout(() => {
					uni.$emit('sc', 1)
				}, 300)
			},
		}
	}
</script>

<style>
	@import url("../../static/css/my.css");
</style>
