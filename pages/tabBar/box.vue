<template>
  <view class="bg container">
    <cus-tabbar :current-page="2"></cus-tabbar>
    <!-- #ifndef H5 -->
    <view class="" style="height: 40px;"></view>
    <!-- #endif -->

    <view class="top">
      <view class="left n-flex-row">
        <image src="https://www.img.xcooo.cn/uploads/2024/03/f58d1de326b195ec.png" mode="" @click="goMall"></image>
        <!-- <image src="https://img.alicdn.com/imgextra/i1/2215984279448/O1CN01asDwap2JfEvSfhFjl_!!2215984279448.png" mode=""
          @click="lingquan"></image> -->
      </view>
      <view class="right">
        <image src="https://www.img.xcooo.cn/uploads/2024/03/7305d7776b98ea1e.png" mode="" @click="goRule">
        </image>

        <!-- #ifndef MP-WEIXIN -->
        <image src="https://www.img.xcooo.cn/uploads/2024/03/c3d6e885fe743ad8.png" @click="lxkefu" mode=""></image>
        <!-- #endif -->

        <!-- #ifdef MP-WEIXIN -->
        <button class="kefu" open-type="contact"></button>
        <!-- #endif -->

        <image :class="muteBgMusic ? 'music stop' : 'music'"
          :src="muteBgMusic ? 'https://www.img.xcooo.cn/uploads/2024/03/5748856dc1511d9f.png' : 'https://www.img.xcooo.cn/uploads/2024/03/13ee4dc24e306be9.png'"
          mode="" @click="playMusic">
        </image>
      </view>
    </view>

    <!-- <view v-if="tong" class="tong" :style="{ 'background': 'url(' + tong.bg + ')' }">
      <view class="text">
        <u-notice-bar :volume-icon="false" color="#fff" type="none" mode="horizontal" :list="tong.text">
        </u-notice-bar>
      </view>
      <image :src="tong.mhimage" mode="widthFix"></image>
    </view> -->

    <!-- <audio src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3" :loop="true"></audio> -->

    <!-- 轮播图 -->
    <view class="lunbo">
      <view class="goods">
        <swiper circular style="height: 600rpx;" :current="swiperCurrent" @change="changeIdx">
          <swiper-item class="lunboitem" v-for="(item, idx) in boxData" :key="idx">
            <image @click="lookbox(item.id)" :src="item.thumb
              " mode="widthFix"></image>
          </swiper-item>
        </swiper>
      </view>
      <view class="qipao">
        <!-- #ifndef MP-WEIXIN -->
        <!-- 气泡 -->
        <prize-flying ref="qipao" v-if="boxData[this.swiperCurrent]" :key="`flying-${flyingKey}`"
          :box-id="boxData[this.swiperCurrent].id"></prize-flying>
        <!-- #endif -->

        <!-- #ifdef MP-WEIXIN -->
        <view class="prize-flying">
          <template v-for="(item, index) in flyLeftList">
            <view :class="['fly-prize', 'fly-left']" :style="{ animationDuration: flySpeed + 's' }">
              <image :src="item" mode=""></image>
            </view>
          </template>
          <template v-for="(item, index) in flyCenterList">
            <view :class="['fly-prize', 'fly-center']" :style="{ animationDuration: flySpeed + 's' }">
              <image :src="item" mode=""></image>
            </view>
          </template>
          <template v-for="(item, index) in flyRightList">
            <view :class="['fly-prize', 'fly-right']" :style="{ animationDuration: flySpeed + 's' }">
              <image :src="item" mode=""></image>
            </view>
          </template>
        </view>
        <!-- #endif -->
      </view>
      <view class="arrow n-flex-row n-justify-between">
        <image @click="prev" src="../../static/image/arrow-left.png" mode=""></image>
        <image @click="next" src="../../static/image/arrow-right.png" mode=""></image>
      </view>
      <image src="https://www.img.xcooo.cn/uploads/2024/03/5efe7f06306d8164.png" mode="widthFix" class="shou"></image>
      <view class="dizuobox">
        <image class="dizuo"
          src="https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01XcDDZm24NdWAJgy9y_!!2200676927379.gif"
          mode="widthFix"></image>
        <!-- https://www.img.xcooo.cn/uploads/2024/03/126adc53f0a956fc.gif -->
        <text class="price">￥<text class="num">{{ boxPrice }}</text>/个</text>
      </view>
      <!-- <view class="maxBox">
        <view class="maxyou" v-if="maxYou">
          {{ maxYou }}
        </view>
      </view> -->
    </view>

    <!-- 轮播卡片 -->
    <view class="card">
      <swiper circular active-class="active" style="height: 210rpx;" previous-margin="270rpx" next-margin="270rpx"
        :current="swiperCurrent" @change="changeIdx">
        <swiper-item @click="selectCard(idx)" class="cardItem" :class="swiperCurrent == idx ? 'active' : ''"
          v-for="(item, idx) in boxData" :key="idx">
          <!-- <image src="../../static/image/float.jpg" mode="widthFix"></image> -->
          <view class="car">
            <image :src="item.thumb" mode=""></image>
            <view class="boxname">{{ item.title }}</view>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <view class="qbtn n-flex-row n-justify-between">
      <view class="left">
        <image @click="handleOuhuangshow"
          src="https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01llO7m624NdWBXweMO_!!2200676927379.png"
          mode="heightFix"></image>
        <!-- https://www.img.xcooo.cn/uploads/2024/03/e1cb48f869458d63.png -->
      </view>
      <view class="kaixiang" @click="choujiang">
        <image src="https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01wmQMcu24NdW9V93n1_!!2200676927379.gif"
          mode="widthFix"></image>
        <!-- https://www.img.xcooo.cn/uploads/2024/03/462092c1fdcf69ca.gif -->
        <view class="biankuang">
          <text></text>
          <text></text>
          <text></text>
          <text></text>
        </view>
      </view>
    </view>
    <view class="tip">
      谢绝未成年人使用或在监护人的监督指导下体验
    </view>

    <!-- 免费试玩 -->
    <image src="https://www.img.xcooo.cn/uploads/2024/03/2a2e930aad3842d1.png" class="free" mode="" @click="tryPlay">
    </image>
    <!-- 新手教程 -->
    <image src="https://www.img.xcooo.cn/uploads/2024/03/5eae41963d0b909b.png" class="xinshou" mode="widthFix"
      @click="videoShow = true"></image>

    <!-- 优惠券弹窗 -->
    <u-popup v-model="couponshow" mode="center" :custom-style="{ backgroundColor: 'rgba(0, 0, 0, 0)' }">
      <view class="newPeopleBox">
        <view class="newmainBox">
          <scroll-view scroll-y class="youhuilist">
            <view class="youhuibox" v-for="(item, idx) in couponList" :key="idx">
              <view class="left">
                <view>
                  <view class="name">{{ item.couname }}</view>
                  <view class="price1" v-if="item.typetag == 1">
                    满{{ item.mzamount }}可用
                  </view>
                  <view class="price1" v-if="item.typetag == 0">
                    <text class="pri">￥{{ item.amount }}</text>无门槛
                  </view>

                </view>
              </view>
              <view class="right">
                <view>
                  <view class="price">￥<text>{{ item.amount }}</text></view>
                  <view class="ling" :class="item.status_a == 0 ? 'active' : 'yiling'"
                    @click="receive(item.id, item.status_a, idx)">
                    {{ item.status_a == 0 ? '领取' : '已领取' }}
                  </view>

                </view>
              </view>
            </view>
          </scroll-view>
        </view>
        <view class="btm">
          <image class="btmBg" src="http://mhimg.69box.cn/kaixiang/rv.webp" mode="widthFix"></image>
          <view class="btn1">
            <image @click="receiveall" src="http://mhimg.69box.cn/kaixiang/sd.png" mode="widthFix"></image>
          </view>
        </view>

        <view class="off">
          <image @click="couponshow = false" src="http://mhimg.69box.cn/kaixiang/down.png" mode=""></image>
        </view>
      </view>

    </u-popup>

    <!-- 道具卡 -->
    <u-popup v-model="daojushow" mode="center">
      <view class="box11">
        <view class="daojubox">
          <view class="top">
            <image :src="isCard ? '../../static/image/qp.png' : '../../static/image/qn.png'" mode="widthFix">
            </image>
            <view class="rulebox" v-if="isCard" @click="isCard = false">
              <view class="wen">
                ?
              </view>
              使用规则
            </view>
          </view>
          <view v-if="isCard">
            <scroll-view scroll-y style="height: 755rpx;width: 100%;margin-top: 30rpx;">
              <view class="cardList">
                <view class="list" v-for="(item, idx) in cardList" :key="idx">
                  <view class="goods n-flex-row">
                    <view class="picbox">
                      <image src="https://img.50api.cn/dingdang/xu.png" mode=""></image>
                    </view>
                    <view class="textbox">
                      <view class="tit">
                        {{ item.lqsm }}
                      </view>
                      <view class="two">开盒时免费重抽1次</view>
                      <view class="qi n-flex-row n-justify-between">
                        <view>领取时间:{{ $u.timeFormat(item.lqtime, 'yyyy-mm-dd hh:MM:ss') }}</view>
                        <!-- <u-icon color="#999" label-color="#999" label-size="24"
													label-pos="left" name="arrow-down" label="适用盲盒">
												</u-icon> -->
                      </view>
                    </view>
                  </view>
                  <!-- <view class="tip1">
										适用范围适用范围适用范围适用范围适用范围适用范围适用范围
									</view> -->
                </view>
              </view>
              <u-empty text="暂无道具卡" mode="favor" color="#766ed0" icon-color="#766ed0" :show="cardShow">
              </u-empty>
            </scroll-view>
            <!-- <custom-tabs type="c1" tabSpacing="60" :tabCenter="true" :value="0" @change="rulechange">
							<custom-tab-pane label="未使用(0)" name="c1_1">
								<view>
									<view class="nodata">
										<view>
											<image src="../../static/image/um.webp" mode=""></image>
											<view class="tit"> 如何获取道具卡？ </view>
											<view class="fun"> 参与平台活动有机会获得道具卡 </view>
											<view class="fun"> 道具卡加持，更有机会获得心仪款哦~ </view>
										</view>
									</view>
									<scroll-view scroll-y style="height: 680rpx;width: 100%;">
										<view class="cardList">
											<view class="list" v-for="(item,idx) in 6" :key="idx">
												<view class="goods n-flex-row">
													<view class="picbox">
														<image src="../../static/image/xu.webp" mode=""></image>
													</view>
													<view class="textbox">
														<view class="tit">
															首次兑换赠送-重抽卡
														</view>
														<view class="two">开盒时免费重抽1次</view>
														<view class="qi n-flex-row n-justify-between">
															<view>有效期至:2022.10.10</view>
															<u-icon color="#999" label-color="#999" label-size="24"
																label-pos="left" name="arrow-down" label="适用盲盒">
															</u-icon>
														</view>
													</view>
												</view>
												<view class="tip1">
													适用范围适用范围适用范围适用范围适用范围适用范围适用范围
												</view>
											</view>
										</view>
									</scroll-view>
								</view>
							</custom-tab-pane>
							<custom-tab-pane label="不可用" name="c1_2">
								<view>
									<view class="nodata">
										<view>
											<image src="../../static/image/um.webp" mode=""></image>
											<view class="tit"> 如何获取道具卡？ </view>
											<view class="fun"> 参与平台活动有机会获得道具卡 </view>
											<view class="fun"> 道具卡加持，更有机会获得心仪款哦~ </view>
										</view>
									</view>
								</view>
							</custom-tab-pane>
						</custom-tabs> -->
          </view>

          <view v-else class="explain">
            <view class="tit">♦<text>重抽卡</text>♦</view>
            <scroll-view scroll-y class="text" style="height: 560rpx;">
              内容
            </scroll-view>
            <view class="btm">
              <view class="btn2" @click="isCard = true">
                我知道了
              </view>
            </view>
          </view>
        </view>
        <view class="off">
          <image @click="daojushow = false" src="http://mhimg.69box.cn/kaixiang/down.png" mode=""></image>
        </view>
      </view>
    </u-popup>

    <!-- 视频 -->
    <u-popup v-model="videoShow" mode="center">
      <view class="vbox">
        <video id="myVideo" class="v" :src="videoSrc" :show-mute-btn="true"></video>
        <view class="btm">
          <button @click="videoShow = false">我知道了</button>
        </view>
      </view>
    </u-popup>

    <!-- 订单 -->
    <u-popup v-model="orderShow" mode="bottom" :closeable="!selectCoupon">
      <view class="orderbox" v-if="!selectCoupon">
        <view class="tit">确认订单</view>
        <view class="con">
          <view class="box1">
            <view class="goods n-flex-row">
              <image v-if="boxData.length != 0" :src="boxData[swiperCurrent].box_banner_images" mode="">
              </image>
              <view class="info">
                <view class="t">{{ boxName }}</view>
                <view class="two">
                  <view class="price">￥{{ boxPrice }}</view>
                  <view class="num">x{{ num }}</view>
                </view>
              </view>
            </view>
            <view v-if="usedCoupon.length != 0" @click="goSelect" class="rowitem n-flex-row n-justify-between"
              style="margin-top: 10rpx;">
              <view class="l">
                <!-- <image src="../../static/image/quanlogo.png" mode=""></image> -->
                优惠券
              </view>
              <u-icon label-pos="left" :label-color="youhuiNum == '0' ? '#999' : '#d81e06'" color="#999"
                name="arrow-right" :label="youhuiNum == '0' ? '未选择优惠券' : '-￥' + youhuiNum">
              </u-icon>
            </view>
            <view class="rowitem n-flex-row n-justify-between">
              <view class="l">
                <!-- <image src="../../static/image/y2.png" mode=""></image> -->
                星石
              </view>
              <view class="" style="color: #999;">
                {{ diKou == 0 ? '无可抵扣数量' : '使用' + (diKou * 100).toFixed(0) + '星石抵扣￥' + diKou }}
              </view>
              <!-- <u-icon label-pos="left" label-color="#d81e06" color="#999" name="arrow-right" label="-￥10"></u-icon> -->
            </view>
            <view class="total" v-if="youhuiNum > 0">
              共计优惠：<text>￥{{ youhuiNum }}</text>
            </view>
          </view>

          <view class="box1" style="margin-top: 20rpx;">
            <u-radio-group style="display: block;" width="34rpx" v-model="paymode" active-color="#70DDE0">

              <!-- #ifdef MP-WEIXIN -->
              <view class="rowitem payrow" @click="selectPay('wechat')">
                <view class="l">
                  <image src="../../static/image/weixinf.png" mode=""></image>
                  微信
                </view>
                <u-radio name="wechat"></u-radio>
              </view>
              <!-- #endif -->

              <!-- #ifdef APP-PLUS || H5 -->
              <view class="rowitem payrow" @click="selectPay('alipay')">
                <view class="l">
                  <image src="../../static/image/zhifubao.png" mode=""></image>
                  支付宝
                </view>
                <u-radio name="alipay"></u-radio>
              </view>
              <!-- #endif -->
            </u-radio-group>
          </view>
        </view>
        <view class="obtm">
          <button @click="pay" v-if="num == 1">立即支付<text>￥{{ (((boxPrice * num) - youhuiNum - diKou).toFixed(2) >= 0) ?
            ((boxPrice * num) - youhuiNum - diKou).toFixed(2) : 0.00 }}</text></button>
          <button @click="pay" v-else>立即支付<text>￥{{ (((((boxPrice * num) - (boxPrice * num * bi)) - youhuiNum -
            diKou).toFixed(2)) >= 0) ? (((boxPrice * num) - (boxPrice * num * bi)) - youhuiNum - diKou).toFixed(2) :
            0.00 }}</text></button>
        </view>
        <view class="xieyi">
          <u-checkbox v-model="xieyi" shape="circle" active-color="#70DDE0" label-size="22">
            我已满18岁，已阅读并同意<text @click.stop="$.to('/pages/my/agreement?type=wfashuiming')">《支付服务协议》</text>
          </u-checkbox>
        </view>
      </view>

      <view class="syouhui" v-else>
        <view class="youtit">
          <view class="back" @click="selectCoupon = false">
            <u-icon size="40" name="arrow-left"></u-icon>
          </view>
          <view class="youhuit">
            优惠详情
          </view>
        </view>
        <view class="youhuicon">
          <scroll-view scroll-y class="shitu">
            <radio-group>
              <view class="couList" v-for="(item, idx) in usedCoupon" :key="idx" @click="selectCoupon1(item)">
                <view class="l">
                  <view class="aa">
                    ￥<text class="pri">{{ item.amount }}</text>
                    <view class="tiao" v-if="item.typetag == 0">无门槛</view>
                    <view class="tiao" v-if="item.typetag == 1">满{{ item.mzamount }}减{{ item.amount }}
                    </view>
                  </view>
                </view>
                <view class="r">
                  <view class="ll">
                    <view class="t">{{ item.couname }}</view>
                    <!-- <view class="use">可用</view> -->
                    <view class="qi" style="margin-top: 20rpx;">有效期至
                      {{ $u.timeFormat(item.end_time, 'yyyy-mm-dd hh:MM:ss') }}
                    </view>
                  </view>
                  <view class="rr">
                    <radio :value="item.id + ''" :checked="currentCoupon.id == item.id" color="#63D7D6"
                      style="transform:scale(0.8)" />
                  </view>
                </view>
              </view>
            </radio-group>
          </scroll-view>
          <view class="btn" @click="confirmCoupon">
            确认
          </view>
        </view>
      </view>
    </u-popup>

    <!-- 抽盒弹窗 -->
    <u-popup v-model="luckshow" mode="center">
      <view class="luckbox">
        <view class="top n-flex-row">
          <image class="titpic" src="https://img.alicdn.com/imgextra/i4/2215984279448/O1CN01j61qDR2JfEvWxcwQV_!!2215984279448.png" mode="widthFix"></image>
          <image v-if="boxData.length != 0" class="goodsPic" :src="boxData[swiperCurrent].thumb" mode="widthFix"></image>
        </view>
        <view class="option">
          <view class="row">
            <view class="chou" @click="changeBuyType(0)">
              <view class="b">
                <view class="tit">一发入魂</view>
                <view v-if="!isShiwan">￥{{ boxPrice }}</view>
              </view>
            </view>
            <!-- <view class="chou" @click="changeBuyType(1)">
              <view class="jian" v-if="!isShiwan">限时减{{ (boxPrice * 2 * bi).toFixed(2) }}元</view>
              <view class="b">
                <view class="tit">幸运二连</view>
                <view v-if="!isShiwan">￥{{ ((boxPrice * 2) - boxPrice * 2 * bi).toFixed(2) }} <text class="yuanj">￥{{
                  (boxPrice * 3).toFixed(2) }}</text> </view>
              </view>
            </view> -->
            <view class="chou" @click="changeBuyType(2)">
              <view class="jian" v-if="!isShiwan">限时减{{ (boxPrice * 3 * bi).toFixed(2) }}元</view>
              <view class="b">
                <view class="tit">霸气三连</view>
                <view v-if="!isShiwan">￥{{ ((boxPrice * 3) - boxPrice * 3 * bi).toFixed(2) }} <text class="yuanj">￥{{
                  boxPrice * 5 }}</text> </view>
              </view>
            </view>
          </view>
          <view class="row wu-row">
            <view class="chou" @click="changeBuyType(4)">
              <view class="jian" v-if="!isShiwan">限时减{{ (boxPrice * 5 * bi).toFixed(2) }}元</view>
              <view class="b">
                <view class="tit">五连绝世</view>
                <view v-if="!isShiwan">￥{{ ((boxPrice * 5) - boxPrice * 5 * bi).toFixed(2) }} <text class="yuanj">￥{{
                  boxPrice * 5 }}</text> </view>
              </view>
            </view>
            <!-- <view class="chou" @click="changeBuyType(2)">
              <view class="jian" v-if="!isShiwan">限时减{{ (boxPrice * 3 * bi).toFixed(2) }}元</view>
              <view class="b">
                <view class="tit">霸气三连</view>
                <view v-if="!isShiwan">￥{{ ((boxPrice * 3) - boxPrice * 3 * bi).toFixed(2) }} <text class="yuanj">￥{{
                  boxPrice * 5 }}</text> </view>
              </view>
            </view> -->
            <!-- <view class="chou" @click="changeBuyType(3)">
              <view class="jian" v-if="!isShiwan">限时减{{ (boxPrice * 4 * bi).toFixed(2) }}元</view>
              <view class="b">
                <view class="tit">欧气四连</view>
                <view v-if="!isShiwan">￥{{ ((boxPrice * 4) - boxPrice * 4 * bi).toFixed(2) }} <text class="yuanj">￥{{
                  boxPrice * 10 }}</text> </view>
              </view>
            </view> -->
          </view>
          <view class="row">
            <!-- <view class="chou" @click="changeBuyType(4)">
              <view class="jian" v-if="!isShiwan">限时减{{ (boxPrice * 5 * bi).toFixed(2) }}元</view>
              <view class="b">
                <view class="tit">五连绝世</view>
                <view v-if="!isShiwan">￥{{ ((boxPrice * 5) - boxPrice * 5 * bi).toFixed(2) }} <text class="yuanj">￥{{
                  boxPrice * 5 }}</text> </view>
              </view>
            </view> -->
          </view>
          <!-- <view class="shi" @click="chou(20)">
						<view class="jian" v-if="!isShiwan">限时减{{(boxPrice * 20 * bi).toFixed(2)}}元</view>
						<view class="b">
							<view class="tit">超凡二十连</view>
							<view v-if="!isShiwan">￥{{((boxPrice * 20) - boxPrice * 20 * bi).toFixed(2)}} <text class="yuanj">￥{{boxPrice * 20}}</text> </view>
						</view>
					</view> -->
        </view>
      </view>
    </u-popup>

    <u-popup v-model="ouhuangshow" mode="bottom">
      <view class="ouhuang">
        <view style="text-align: right;padding-right: 20rpx;">
          <u-icon @click="ouhuangshow = false" name="close-circle-fill" color="#ccc" size="55"></u-icon>
        </view>
        <scroll-view scroll-y class="scroll">
          <view class="listbox">
            <view class="list" v-for="(item, idx) in ouList" :key="idx">
              <view class="picbox" @click="lookbox(item.boxfl_id)">
                <image :src="item.activityimage_v" mode="aspectFill"></image>
                <view class="text n-flex-row n-justify-between">
                  <view>{{ item.activityname }}</view>
                  <u-icon name="arrow-right" label-pos="left" label="立即参与"></u-icon>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </u-popup>
    <!-- <show-result :key="0" ref="result-popup" :num="boxNum" @accept="toMyBox()" @recycle="recycle"
			:type="type" @close="resultKey++"></show-result> -->
    <kefu :isShow='kfshow' ref="child" @cusEvent="hide"></kefu>
    <u-popup v-model="tanShow" mode="center">
      <view class="tanBox">
        <view class="pic">
          <image @click="lookbox(tanCon.boxfl_id)" :src="tanCon.tcimage" mode="widthFix"></image>
        </view>
        <view class="off">
          <image @click="tancancel" src="http://mhimg.69box.cn/kaixiang/down.png" mode=""></image>
        </view>
      </view>
    </u-popup>

    <!-- 开盒弹窗 -->
    <uni-popup ref="orderPop" type="bottom">
      <view v-if="orderData" class="order-pop">
        <view class="order-pop-hd">
          支付后请在“我的-盒柜”内进行手动发货

          <view @click="closeOrderPop" class="close icon">
            <cimage src="/static/icon/close2.png" mode="scaleToFill" />
          </view>
        </view>

        <view class="order-pop-bd">
          <!-- 开盒数量 -->
          <view class="row">
            <view class="title">开盒数量</view>

            <view class="right"></view>
          </view>

          <view class="btn-list">
            <view @click="changeBuyType(i)" v-for="(item, i) in btnList" :key="i" class="btn-list-item" :class="{
              act: btnCur == i
            }">
              {{ item.title }}
            </view>
          </view>

          <view class="row">
            <view class="title">支付金额</view>

            <view class="right">
              <view class="price">
                ¥
                <text>{{ orderData.discount.total_money }}</text>
              </view>
            </view>
          </view>

          <view class="row">
            <view class="title">获得数量</view>

            <view class="right">
              <view class="gray">随机获得{{ orderData.box.num }}件商品</view>
            </view>
          </view>

          <view class="pay-type">
            <view @click.stop="changePayType(i)" v-for="(item, i) in payTypeList" :key="i" class="pay-type-item">
              <view class="icon">
                <cimage :src="item.icon" mode="scaleToFill" />
              </view>

              <view class="title">{{ item.title }}</view>

              <view class="icon">
                <!-- <cimage v-if="payTypeCur == i" src="/static/icon/check1_act.png" mode="scaleToFill" />

                <cimage v-else src="/static/icon/check1.png" mode="scaleToFill" /> -->
                <template v-if="payTypeCur == i">
                  <uni-icons type="checkbox-filled" color="#00e1db" size="25" />
                </template>
                <template v-else>
                  <uni-icons type="checkbox" color="#00e1db" size="25" />
                </template>
              </view>
            </view>
          </view>

          <view v-if="orderData.discount.money_dis * 1 > 0" class="row">
            <view class="title">余额抵扣</view>

            <view class="right">
              <view class="price red">
                -
                <text>{{ orderData.discount.money_dis }}</text>
              </view>
            </view>
          </view>

          <view class="agree">
            <view class="title">
              阅读并同意

              <text @click="$common.toRule(2)">《抽盒规则》</text>
            </view>

            <evan-switch v-model="agree" active-color="#00e1db" inactive-color="#000" :size="20" :active-value="true"
              :inactive-value="false"></evan-switch>
          </view>

          <!-- <view class="rule-title">{{ ruleData.title }}</view> -->

          <scroll-view class="rule-content" scroll-y>
            <view v-html="ruleData.editor"></view>
          </scroll-view>
        </view>

        <view @click="$common.noDouble(confirmSubmit, 1)" class="order-pop-ft">
          <view class="title">确认同意信息并支付</view>

          <view class="money">
            ¥
            <text>{{ orderData.discount.pay_money }}</text>
          </view>
        </view>
      </view>
    </uni-popup>

    <!-- 登录弹窗 -->
    <uni-popup ref="loginPopup" type="center">
      <view class="tiploginShow-view">
        <view class="tiploginShow-view-0">
          您还未登录
        </view>
        <view class="tiploginShow-view-1">
          请登录以后再进行此操作~
        </view>
        <view class="tiploginShow-view-2" @click="$common.to({ url: '/pages/mine/login' })">
          前往登录
        </view>
        <view class="tiploginShow-view-3" @click="$refs.loginPopup.close()">
          暂不登录
        </view>

      </view>
    </uni-popup>

    <!-- 联系客服 -->
    <u-popup v-model="kefushow" mode="center" border-radius="16">
      <view class="bgbox">
        <view class="off" @click="kefushow = false">
          <uni-icons type="close" color="#fff" size="25" />
        </view>
        <view class="content">
          <view class="ma">
            <image class="" :src="wx_kefu" mode="widthFix" lazy-load="false" binderror="" bindload="" />
          </view>
        </view>
        <view class="yi">
          微信扫一扫
        </view>
      </view>
    </u-popup>

  </view>
</template>

<script>
import kefu from '@/components/kefu.vue'
import colorGradient from 'uview-ui/libs/function/colorGradient';
import prizeFlying from "@/components/prize-flying.vue"
const switchMp3 = 'https://www.img.xcooo.cn/uploads/2024/02/17887756404cea30.mp3'
// const bg_music = 'https://img.50api.cn/dingdang/music.mp3'
const bg_music = ''
const switchMusic = uni.createInnerAudioContext();
const bgMusic = uni.createInnerAudioContext();
import {
  mapGetters
} from 'vuex'
export default {
  data () {
    return {
      currentCoupon: '', //当选择的优惠券
      Confirmed: '', //已确认的优惠券
      youhuiNum: '0',
      couponshow: false, //优惠券弹窗
      daojushow: false, //道具卡弹窗
      isCard: true, //我的道具卡与使用规则切换
      videoShow: false, //视频弹窗
      orderShow: false, //订单弹窗
      videoSrc: '',
      // #ifdef MP-WEIXIN || H5
      paymode: 'wechat',
      // #endif

      // #ifdef APP-PLUS || H5
      paymode: 'alipay',
      // #endif
      xieyi: true,
      selectCoupon: false, //选择优惠券
      luckshow: false, //抽奖弹窗
      boxPrice: '0.00', //盲盒价格
      ouhuangshow: false, //欧皇弹窗
      ouList: [], //欧皇福利列表
      isShiwan: true, //是否试玩
      num: '', //几抽
      kfshow: false,
      couponList: [], //优惠券列表
      cardList: [], //道具卡
      cardShow: false,
      usedCoupon: [],
      tongList: [], //中奖通知
      tong: '',
      dings: '',
      tanList: [], //弹窗列表
      tanShow: false,
      tanCon: '',
      tanidx: 0,
      bi: '', //连抽比率
      xing: '', //星石
      diKou: 0, //抵扣星石数量
      boxName: '', //盲盒名称
      interval: null,
      // 轮播数据
      swiperCurrent: 0,
      boxData: [],
      maxYou: '', //最高优惠
      // 奖品数据
      indexRecord: 0, //记录奖品下标
      prizeList: [],
      intervalTime: 2, //飞出频率 秒
      flySpeed: 25, //飞行速度 秒 越小越快
      flyLeftList: [],
      flyCenterList: [],
      flyRightList: [],
      // 订单信息
      orderData: '',
      btnList: [],
      payTypeCur: 0,
      payTypeList: [
        // #ifdef H5 || MP
        {
          id: 3,
          icon: 'https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01LXFFsU24NdWEFmyDP_!!2200676927379.png',
          title: '微信支付'
        },
        // {
        //   id: 4,
        //   icon: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01A3bNW324NdW9QBJvc_!!2200676927379.png',
        //   title: '支付宝支付'
        // }
        // #endif
        // {
        //   id: 2,
        //   icon: '',
        //   title: '余额支付'
        // }
      ],
      agree: true,
      ruleData: '',
      curDetail: '',
      // 购买方案
      btnCur: 0,
      optionsData: '',
      // 小程序飞行key
      flyingKey: 0,
      kefushow: false,
      wx_kefu: '',
      muteBgMusic: false, //是否静音
      is_epay: 0
    }
  },
  onLoad (options) {
    // 	#ifdef H5
    if (options.invite_code) {
      uni.setStorageSync('invite_code', options.invite_code);
    }
    // #endif

    if (options.scene) {
      let invite_code = decodeURIComponent(options.scene)
      let index = invite_code.indexOf('=') + 1
      if (index > 0) {
        invite_code = invite_code.slice(index, invite_code.length)
        uni.setStorageSync('invite_code', invite_code);
      }
      let arr = options.scene.split('_')
      this.optionsData = {
        userId: arr[1],
        id: arr[2]
      }
    } else {
      this.optionsData = options
    }


    // this.getManghe()
    // this.getOuHuang()
    // this.getvideo()
    // this.getBi()
    // uni.$on('music', (data) => {
    //   this.muteBgMusic = data
    // })
    // uni.loadFontFace({
    //   family: 'myfont',
    //   source: 'url("https://img.50api.cn/dingdang/YouSheBiaoTiHei.ttf")',
    // })
    // setInterval(() => {
    //   this.getTong()
    // }, 30000)

    switchMusic.src = switchMp3

    bgMusic.src = bg_music
    bgMusic.autoplay = true;
    bgMusic.loop = true;

    // #ifdef H5
    let order_info = uni.getStorageSync('order_info_box')
    // let order_info = {provider: 'alipay', order_sn: 'C916652564524855'}
    console.log(order_info, '这里是打印的订单信息')
    if (order_info) {
      this.checkPayStatus(order_info)
    }
    // #endif

  },
  onShow () {
    this.$store.dispatch('getUserInfo').then(res => {
      console.log(res)
    })
    this.$store.dispatch('getAppConfig').then((res) => {
      console.log(res);
      this.is_epay = res.data.is_epay
      this.wx_kefu = res.data.wx_kefu
      if (res.data.bg_music) {

      }
    })
    // 重置数据
    this.boxData = []
    this.swiperCurrent = 0
    this.getList({ num: 0, size: 30 })
  },
  onUnload () {
    console.log('移除事件')
    clearInterval(this.checkTimer)
    clearInterval(this.cancelTimer)
    this.cancelOrderPay()
    this.cancelCheckPayStatus()
    bgMusic.pause()
  },
  onHide() {
    console.log('隐藏事件')
    clearInterval(this.checkTimer)
    clearInterval(this.cancelTimer)
    this.cancelOrderPay()
    this.cancelCheckPayStatus()
    bgMusic.pause()
  },
  computed: {
    ...mapGetters(['sysConfig', 'userInfo']),
    prizeLength () {
      return this.prizeList.length
    }
  },
  destroyed () {
    //销毁
    clearInterval(this.interval)
  },
  components: {
    kefu,
    prizeFlying
  },
  // onShow() {
  // 	this.getCard()
  // },
  methods: {
    checkPayStatus () {
      const _this = this

      const order_info = uni.getStorageSync('order_info_box')

      _this.checkTimer = setInterval(() => {
        console.log(order_info, '获取到的订单数据')

        // 查询订单
        this.req({
          url: '/v1/pay/orderStatus',
          data: {
            order_sn: order_info.order_sn
          },
          Loading: true,
          success: (res) => {
            switch (res.code) {
              case 200:
                _this.cancelCheckPayStatus()
                this.$common.toast({
                  title: '支付成功', icon: 'success', duration: 1500, success: () => {
                    this.$common.to({
                      type: 1, url: '/pages/index/draw', query: {
                        id: res.data.id,
                        order_sn: order_info.order_sn,
                        drawNum: res.data.box_num
                      }
                    })
                  }
                })
                break;
              case 203:
                _this.cancelOrderPay()
                _this.cancelCheckPayStatus()
                this.$common.toast({ title: '支付失败', icon: 'none', duration: 500 })
                break;
            }
          }
        })
      }, 2 * 1000)

      _this.cancelTimer = setTimeout(() => {
        // 取消订单支付
        _this.cancelOrderPay()
        _this.cancelCheckPayStatus();
      }, 60 * 1000)
    },
    cancelCheckPayStatus () {
      uni.removeStorageSync('order_info_box')
      // this.$common.toast({
      // 	title: '支付超时',
      // 	icon: 'none',
      // 	duration: 500
      // })
      if (this.checkTimer) {
        clearTimeout(this.checkTimer)
      }

      if (this.cancelTimer) {
        clearInterval(this.cancelTimer)
      }
    },
    // 取消支付
    cancelOrderPay () {
      const order_info = uni.getStorageSync('order_info_box')
      if (order_info.order_sn) {
        this.req({
          url: '/v1/pay/cancel',
          data: {
            order_sn: order_info.order_sn
          },
          Loading: true,
          success: (res) => {
            console.log(res)
          }
        })
      }
    },
    getList ({
      num,
      size
    }) {
      this.req({
        url: '/v1/box/list',
        data: {
          page: num,
          per_page: size
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            if (num == 1) {
              this.boxData = []
            }
            this.boxData = [...this.boxData, ...res.data.data]
            this.boxPrice = this.boxData[this.swiperCurrent].price

            // 加载奖品
            //#ifdef MP-WEIXIN
            this.loadPrizeList()
            //#endif

            // this.mescroll.endBySize(res.data.data.length, res.data.total)
          } else {
            // this.mescroll.endBySize(0, 0)
          }
        }
      })
    },
    // 页面改变
    changeIdx (idx) {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.swiperCurrent = idx.detail.current
      this.boxPrice = this.boxData[this.swiperCurrent].price
      this.boxName = this.boxData[this.swiperCurrent].title
      // 优惠
      // this.maxYou = this.boxData[this.swiperCurrent].box_label
      this.flyingKey++
      // this.prizeList = []
      // this.flyLeftList = [],
      // this.flyCenterList = [],
      // this.flyRightList = [],
      // clearInterval(this.interval)
      // this.loadPrizeList()
    },
    //加载奖品列表
    loadPrizeList () {
      if (!this.boxId) return
      this.req({
        url: "/v1/box/getBoxShop",
        data: {
          id: this.boxId
        },
        success: res => {
          if (res.code == 200) {
            this.prizeList = res.data
            console.log(this.prizeList, "奖品");
            this.flyInterval()
          }
        }
      })
    },
    //循环
    flyInterval () {
      this.pushFlyList()
      this.interval = setInterval(() => {
        this.pushFlyList()
      }, this.intervalTime * 1000)
    },
    pushFlyList () {
      let count = 0
      while (count < 3) {
        if (this.indexRecord == this.prizeLength - 1) {
          this.indexRecord = 0
        } else {
          this.indexRecord++
        }
        let prize = this.prizeList[this.indexRecord]
        switch (count) {
          case 0:
            this.flyLeftList.push(prize)
            break
          case 1:
            this.flyCenterList.push(prize)
            break
          case 2:
            this.flyRightList.push(prize)
            break
        }
        count++
      }
    },
    // 气泡
    flyStyle (prize) {
      return {
        background: `url(${prize.image})`,
        '-webkit-animation-duration': `${this.flySpeed}s`,
        'animation-duration': `${this.flySpeed}s`,
      }
    },
    // 欧皇福利
    handleOuhuangshow () {
      // this.ouhuangshow = true
    },
    // 玩法
    goRule () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.$common.to({ url: '/pages/index/rule?id=3' })
    },
    goMall () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      uni.switchTab({
        url: '/pages/index/index',
      });

    },
    // 联系客服
    lxkefu () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.kefushow = true
    },
    playMusic () {
      this.muteBgMusic = !this.muteBgMusic;
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      if (this.muteBgMusic) {
        bgMusic.play()
      } else {
        bgMusic.pause()
      }
    },
    // 试玩
    tryPlay () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      let id = this.boxData[this.swiperCurrent].id
      this.$common.to({
        url: '/pages/index/draw',
        query: {
          id,
          drawNum: 1,
          type: 'play'
        }
      })
    },
    // 抽奖
    choujiang () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.luckshow = true
      this.youhuiNum = 0;
      this.currentCoupon = '';
      this.isShiwan = false
      // this.confirmSubmit(0)
    },

    chou (num) {
      // this.num = num
      // this.luckshow = false
      // this.payTypeCur = num
      // if (this.isShiwan == false) {
      //   this.getNotUsed()
      //   this.getXing()
      //   this.orderShow = true
      // } else {
      //   uni.navigateTo({
      //     url: '/pages/home/luckbox'
      //   })

      //   setTimeout(() => {
      //     uni.$emit('cdata', {
      //       id: this.boxData[this.swiperCurrent].id,
      //       num: num
      //     })
      //   }, 600)

      // }
    },
    changePayType (e) {
      this.payTypeCur = e
    },
    changeBuyType (e) {
      this.btnCur = e
      this.luckshow = false
      this.confirmSubmit(0)
    },
    // 提交订单
    async confirmSubmit (e) {
      if (!this.userInfo) {
        this.$refs.loginPopup.open('center')
        return
      }
      if (this.btnList.length == 0) {
        await this.getDraw()
      }
      if (e == 1 && !this.agree) {
        this.$common.toast({
          title: '请阅读并同意抽盒规则'
        })
        this.ruleType = 'buy'
        this.$common.getRule(3, true).then(res => {
          this.ruleData = res
          this.openRulePop()
        })
        return
      }
      let data = {
        id: this.boxData[this.swiperCurrent].id,
        draw_id: this.btnList[this.btnCur].id,
        invite_user_id: this.optionsData.userId || '',
        pay_type: this.payTypeList[this.payTypeCur].id,
        submit: e
      }

      this.req({
        url: '/v1/box/order',
        data,
        success: res => {
          if (res.code == 200) {
            if (e == 0) {
              this.orderData = res.data
              this.openOrderPop()
            } else {
              this.closeOrderPop()
              if (res.data.pay_money * 1 > 0) {
                // #ifdef H5 || MP
                const order_info = { order_sn: res.data.order_sn }
                uni.setStorageSync('order_info_box', order_info);
                this.checkPayStatus()
                // #endif
                // const params = { ...res.data, returnUrl: `/package/box/box-detail?id=${this.optionsData.id}` }
                const params = { ...res.data, is_epay: this.is_epay, returnUrl: `/pages/tabBar/box` }
                this.$common.orderPay(params).then(res1 => {
                  if (res1 == 'success') {
                    this.$common.toast({
                      title: '支付成功',
                      icon: 'success',
                      duration: 1500,
                      success: () => {
                        this.$common.to({
                          type: 1,
                          url: '/pages/index/draw',
                          query: {
                            id: this.boxData[this.swiperCurrent].id,
                            order_sn: res.data.order_sn,
                            drawNum: this.orderData.box.num
                          }
                        })
                      }
                    })
                  }
                })
              } else {
                this.$common.toast({
                  title: '支付成功',
                  duration: 1500,
                  success: () => {
                    this.$common.to({
                      type: 1,
                      url: '/pages/index/draw',
                      query: {
                        id: this.boxData[this.swiperCurrent].id,
                        order_sn: res.data.order_sn,
                        drawNum: this.orderData.box.num
                      }
                    })
                  }
                })
              }
            }
          }
        }
      })
    },
    /**
* @description: 打开订单弹窗
* @return {*}
*/
    openOrderPop () {
      this.agree = true

      this.$refs.orderPop.open()
    },
    /**
 * @description: 关闭订单弹窗
 * @return {*}
 */
    closeOrderPop () {
      this.$refs.orderPop.close()
    },


    /**
* @description: 获取抽奖方式
* @return {*}
*/
    getDraw () {
      return new Promise((resolve, reject) => {
        this.req({
          url: '/v1/box/draw',
          data: {},
          Loading: true,
          success: res => {
            if (res.code == 200) {
              this.btnList = res.data
              // this.btnList = res.data.map((item, index) => {
              //   let btnObj = this.btnIconList.find(v => v.key == item.times)
              //   return { ...item, icon: btnObj ? btnObj['icon'] : '', price: (item.times * this.pageData.box.price).toFixed(2) }
              // })
              // this.btnList.forEach(item => {
              //   if (item.icon) {
              //     this.bottomBtnList.push(item)
              //   }
              // })
              // console.log(this.bottomBtnList)
              resolve()
            }
          }
        })
      })
    },
    openRulePop () {
      this.$refs.rulePop.open()
    },
    // 获取星石
    getXing () {
      this.$http({
        url: "index.php/api/user/userinfo",
        header: {
          // "Content-Type": "application/json",
          "token": uni.getStorageSync("user").token
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 1) {
          this.xing = res.data.data.money
          if (this.xing == 0) {
            return
          }
          var max = (this.boxPrice * this.num * 1).toFixed(2)
          if ((this.xing / 100) > max) {
            this.diKou = max
          } else {
            this.diKou = (this.xing / 100).toFixed(2)
            console.log(this.diKou);
          }

        }
      }).catch(err => { });
    },
    //加载奖品列表
    loadPrizeList () {
      console.log("掉用气泡");
      // if (!this.boxId) return
      this.$http({
        url: "index.php/api/Box/getBoxShop",
        data: {
          id: this.boxData[this.swiperCurrent].id
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 1) {
          this.prizeList = res.data.data.shop
          this.flyInterval()
        }
      }).catch(err => { });
    },

    // 获取连抽比率
    getBi () {
      this.$http({
        url: "index.php/api/box/getlcyh",
      }).then(res => {
        console.log(res, "bili");
        if (res.data.code == 1) {
          this.bi = res.data.data
        }
      }).catch(err => { });
    },
    tancancel () {
      this.tanShow = false
      this.tanidx += 1
      if (this.tanidx < this.tanList.length) {
        this.tanShow = true
      } else {
        return
      }
      this.tanCon = this.tanList[this.tanidx]
    },
    getTong () {
      clearTimeout(this.dings)
      this.$http({
        url: "index.php/api/index/getBoxlist",
      }).then(res => {
        if (res.data.code == 1) {
          this.tongList = res.data.data
          this.tongz()
        }
      }).catch(err => { });
    },
    tongz () {
      if (this.tongList.length == 0) {
        return
      }
      var arr = this.$u.randomArray(this.tongList)
      arr.forEach(item => {
        item.text = '恭喜 ' + item.username + ' 获得' + item.mhgoodsname
        item.text = [item.text]
        if (item.tag == 'legend') {
          item.bg = 'https://img.50api.cn/dingdang/cstz.png'
        } else {
          item.bg = 'https://img.50api.cn/dingdang/sstz.png'
        }
      })
      this.tong = arr[0]
      this.dings = setTimeout(() => {
        this.tong = ""
      }, 4000)
    },
    lingquan () {
      this.couponshow = true
      this.getYouhui()
      this.getNotUsed()
    },
    // 选择优惠券
    selectCoupon1 (val) {
      this.currentCoupon = val
    },
    // 确认选择优惠券
    confirmCoupon () {
      if (!this.currentCoupon) {
        uni.showToast({
          title: '请选择优惠券',
          icon: 'none'
        })
      }
      console.log(this.currentCoupon, "已选择");
      if (this.currentCoupon.typetag == 1) {
        if ((this.boxPrice * this.num) < this.currentCoupon.mzamount) {
          this.$tip.tip("该优惠券不可用")
          return
        }
      }
      this.Confirmed = this.currentCoupon
      this.youhuiNum = this.Confirmed.amount
      this.selectCoupon = false
    },
    goSelect () {
      this.selectCoupon = true
      this.getNotUsed()
    },
    // 获取未使用优惠券
    getNotUsed () {
      this.$http({
        url: "index.php/api/user/getCop",
        header: {
          "Content-Type": "application/json",
          "token": uni.getStorageSync("user").token
        },
      }).then(res => {
        console.log(res, '');
        if (res.data.code == 1) {
          this.usedCoupon = res.data.data
        } else {
          this.show = true
        }
      }).catch(err => { });
    },
    // 获取重抽卡
    getCard () {
      this.$http({
        url: "index.php/api/index/getCards",
        header: {
          // "Content-Type": "application/json",
          "token": uni.getStorageSync("user").token
        },
      }).then(res => {
        if (res.data.code == 1) {
          if (res.data.data.length == 0) {
            this.cardShow = true
          } else {
            this.cardShow = false
          }
          this.cardList = res.data.data
        } else {
          this.cardShow = true
        }
      }).catch(err => { });
    },
    // 领取全部优惠券
    receiveall () {
      let arr = []
      this.couponList.forEach(item => {
        if (item.status_a == 0) {
          arr.push(item.id)
        }
      })
      console.log(arr, "全部优惠券id");
      if (arr.length == 0) {
        return
      }
      this.$http({
        url: "index.php/api/index/receiveCoupon",
        header: {
          // "Content-Type": "application/json",
          "token": uni.getStorageSync("user").token
        },
        data: {
          cid: arr
        }
      }).then(res => {
        console.log(res, '领取全部优惠券')
        if (res.data.code == 1) {
          this.couponList.forEach(item => {
            item.status_a = 1
          })
          this.getNotUsed()
        } else {
          this.$tip.tip(res.data.msg)
        }
      }).catch(err => { });

    },
    // 领取单个优惠券
    receive (id, status_a, idx) {
      if (status_a == 1) {
        return
      }
      this.$http({
        url: "index.php/api/index/receiveCoupon",
        header: {
          // "Content-Type": "application/json",
          "token": uni.getStorageSync("user").token
        },
        data: {
          cid: id
        }
      }).then(res => {
        console.log(res, '领取单个优惠券')
        if (res.data.code == 1) {
          this.couponList[idx].status_a = 1
          this.getNotUsed()
        } else {
          this.$tip.tip(res.data.msg)
        }
      }).catch(err => { });
    },
    getYouhui () {
      this.$http({
        url: "index.php/api/index/getCoupon",
        header: {
          // "Content-Type": "application/json",
          "token": uni.getStorageSync("user").token
        },
      }).then(res => {
        console.log(res, '优惠券');
        if (res.data.code == 1) {
          this.couponList = res.data.data
        }
      }).catch(err => { });
    },
    // 支付
    pay () {
      if (!this.xieyi) {
        this.$tip.tip("请阅读并同意协议")
        return
      }
      if (this.paymode == "") {
        this.$tip.tip("请选择支付方式")
        return
      }
      let price
      if (this.num == 1) {
        price = ((((this.boxPrice * this.num) - this.youhuiNum - this.diKou).toFixed(2)) >= 0) ? ((this
          .boxPrice * this.num) - this.youhuiNum - this.diKou).toFixed(2) : 0.00
      } else {
        price = ((((this.boxPrice * this.num) - (this.boxPrice * this.num * this.bi)) - this.youhuiNum - this
          .diKou).toFixed(2) >= 0) ? (((this.boxPrice * this.num) - (this.boxPrice * this.num * this
            .bi)) - this.youhuiNum - this.diKou).toFixed(2) : 0.00
      }
      console.log(price)
      if (price <= 0) {
        this.$http({
          url: "index.php/api/index/goPay",
          header: {
            // "Content-Type": "application/json",
            "token": uni.getStorageSync("user").token
          },
          data: {
            boxid: this.boxData[this.swiperCurrent].id,
            num: this.num,
            payfs: this.paymode,
            currentCoupon_id: this.currentCoupon.id,
            price: price,
            xs: (this.diKou * 100).toFixed(0),
            // price: 0.01,
            // #ifdef H5
            terminal: 0,
            // #endif

            // #ifdef MP-WEIXIN
            terminal: 1,
            // #endif

            // #ifdef APP-PLUS
            terminal: 2,
            // #endif

          }
        }).then(res => {
          console.log(res.data.data, "支付");
          // return
          if (res.data.code == 1) {
            this.orderShow = false
            // var data = res.data.data.data
            this.getXing();
            setTimeout(() => {

              uni.navigateTo({
                url: '/pages/home/luckbox'
              })
              console.log(res.data.data.ooid, 'ooid');
              setTimeout(() => {
                uni.$emit('paydata', {
                  ooid: res.data.data.ooid,
                  id: this.boxData[this
                    .swiperCurrent].id,
                  num: this.num
                })
              }, 600)
            }, 700)
          } else {
            this.$tip.tip(res.data.msg)
          }
        }).catch(err => { });
      } else {


        if (this.paymode == 'wechat') {

          this.$http({
            url: "index.php/api/index/goPay",
            header: {
              // "Content-Type": "application/json",
              "token": uni.getStorageSync("user").token
            },
            data: {
              boxid: this.boxData[this.swiperCurrent].id,
              num: this.num,
              payfs: this.paymode,
              currentCoupon_id: this.currentCoupon.id,
              price: price,
              xs: (this.diKou * 100).toFixed(0),
              // price: 0.01,
              // #ifdef H5
              terminal: 0,
              // #endif

              // #ifdef MP-WEIXIN
              terminal: 1,
              // #endif

              // #ifdef APP-PLUS
              terminal: 2,
              // #endif

            }
          }).then(res => {
            console.log(res);
            // #ifdef H5
            uni.navigateTo({
              url: '/pages/tabBar/pay'
            })
            setTimeout(() => {
              uni.$emit('h5pay', res.data)
            }, 600)
            // #endif
            if (res.data.code == 1) {
              // #ifdef MP-WEIXIN
              var data = res.data.data.data
              uni.requestPayment({
                provider: 'wxpay',
                orderInfo: data,
                appId: data.appId,
                timeStamp: data.timeStamp,
                nonceStr: data.nonceStr,
                package: data.package,
                signType: data.signType,
                paySign: data.paySign,
                success: (res1) => {
                  this.$tip.tip("支付成功", "success")
                  this.orderShow = false
                  setTimeout(() => {
                    uni.navigateTo({
                      url: '/pages/home/luckbox'
                    })
                    console.log(res.data.data.ooid, 'ooid');
                    setTimeout(() => {
                      uni.$emit('paydata', {
                        ooid: res.data.data.ooid,
                        id: this.boxData[this
                          .swiperCurrent].id,
                        num: this.num
                      })
                    }, 600)
                  }, 700)
                },
                fail: (err) => {
                  this.$tip.tip("支付失败")
                }
              });
              // #endif
            } else {
              this.$tip.tip(res.data.msg)
            }
          }).catch(err => { });

        } else if (this.paymode == 'alipay') {
          // 支付宝支付
          this.$http({
            url: "index.php/api/index/goPay",
            header: {
              // "Content-Type": "application/json",
              "token": uni.getStorageSync("user").token
            },
            data: {
              boxid: this.boxData[this.swiperCurrent].id,
              num: this.num,
              payfs: this.paymode,
              price: price,
              currentCoupon_id: this.currentCoupon.id,
              xs: (this.diKou * 100).toFixed(0),
              // price: 0.01,
              // #ifdef H5
              terminal: 0,
              // #endif

              // #ifdef MP-WEIXIN
              terminal: 1,
              // #endif

              // #ifdef APP-PLUS
              terminal: 2,
              // #endif

            }
          }).then(res => {
            console.log(res.data);
            // #ifdef H5
            uni.navigateTo({
              url: '/pages/tabBar/pay'
            })
            setTimeout(() => {
              uni.$emit('h5pay', res.data)
            }, 600)
            // #endif
            if (res.data.code == 1) {
              // #ifdef APP-PLUS
              var data = res.data.data
              uni.requestPayment({
                provider: 'alipay',
                orderInfo: data,
                success: (res1) => {
                  this.$tip.tip("支付成功", "success")
                  this.orderShow = false
                  setTimeout(() => {
                    uni.navigateTo({
                      url: '/pages/home/luckbox'
                    })
                    setTimeout(() => {
                      uni.$emit('paydata', {
                        ooid: res.data.ooid,
                        id: this.boxData[this
                          .swiperCurrent].id,
                        num: this.num
                      })
                    }, 600)
                  }, 700)
                },
                fail: (err) => {
                  this.$tip.tip("支付失败")
                }
              });
              // #endif
            } else {
              this.$tip.tip(res.data.msg)
            }
          }).catch(err => { });
        }
      }
    },
    hide () {
      this.kfshow = false
    },
    // 查看盲盒
    lookbox (id) {
      uni.navigateTo({
        url: '/pages/home/kaixiang?id=' + id + '&music=' + this.muteBgMusic
      })
    },
    // 获取欧皇福利
    getOuHuang () {
      this.$http({
        url: "index.php/api/index/getHd",
      }).then(res => {
        console.log(res);
        if (res.data.code == 1) {
          let arr = []
          this.ouList = res.data.data
          this.ouList.forEach(item => {
            if (item.tcswitch == 1) {
              arr.push(item)
            }
          })
          if (arr.length != 0) {
            this.tanShow = true
            this.tanList = arr
            this.tanCon = arr[0]
          }
        }
      }).catch(err => { });
    },
    // 获取视频
    getvideo () {
      this.$http({
        url: "index.php/api/index/getSetting",
      }).then(res => {
        if (res.data.code == 1) {
          this.videoSrc = res.data.data.xsjc
        }
      }).catch(err => { });
    },
    // 获取盲盒
    getManghe () {
      this.$http({
        url: "index.php/api/Box/getBox",

      }).then(res => {
        console.log(res, "盲盒");
        if (res.data.code == 1) {
          this.boxData = res.data.data
          var data = res.data.data
          this.boxPrice = this.boxData[0].price
          this.boxName = this.boxData[0].box_name
          this.maxYou = this.boxData[0].box_label
          //#ifdef MP-WEIXIN
          this.loadPrizeList()
          //#endif
          // 数据不够5自动添加
          if (this.boxData.length < 5) {
            for (var i = 0; i < 5; i++) {
              if (this.boxData.length >= 5) {
                return
              }
              this.boxData = this.boxData.concat(data)
            }
          }

        }
      }).catch(err => { });
    },
    // 选择支付方式
    selectPay (mode) {
      this.paymode = mode
    },
    prev () {
      this.swiperCurrent--
      if (this.swiperCurrent < 0) {
        this.swiperCurrent = this.boxData.length - 1
      }
    },
    next () {
      this.swiperCurrent++
      if (this.swiperCurrent >= this.boxData.length) {
        this.swiperCurrent = 0
      }
    },
    selectCard (id) {
      this.swiperCurrent = id
    },
    rulechange (index) {
      console.log(index);
    }
  },
}
</script>

<style>
@import url("../../static/css/box.css");
</style>
<style lang="scss">
.bgbox {
  background: url('https://www.img.xcooo.cn/uploads/2024/02/d969aa4534f6b91e.png') no-repeat;
  background-size: 100% 100%;
  width: 540rpx;
  height: 680rpx;

  .off {
    text-align: right;
    padding: 15px;
    box-sizing: border-box;
  }

  .content {
    margin-top: 35px;
    text-align: center;
    display: flex;
    justify-content: center;

    .ma {
      width: 156px;
      height: 156px;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }

  .yi {
    text-align: center;
    font-size: 17px;
    color: #999;
    line-height: 26px;
    margin-top: 20px;
  }
}

.order-pop {
  background: #fff;
  border-radius: 10rpx 10rpx 0 0;
  padding: 1rpx 30rpx;
  padding-bottom: 180rpx;

  &-hd {
    height: 100rpx;
    position: relative;
    line-height: 100rpx;
    text-align: center;

    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;

    .close {
      width: 40rpx;
      height: 40rpx;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &-bd {
    padding: 1rpx 0 0;

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30rpx;

      .title {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
      }

      .right {
        .price {
          font-size: 28rpx;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #333333;

          text {
            font-size: 34rpx;
          }
        }

        .gray {
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
        }

        .red {
          color: #ff4f4d;
        }
      }
    }

    .btn-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: center;

      &-item {
        width: 130rpx;
        height: 69rpx;
        box-sizing: border-box;
        border-radius: 5rpx;
        border: 1rpx solid #bfbfbf;
        line-height: 69rpx;
        text-align: center;

        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-top: 20rpx;

        &.act {
          background: #000000;
          color: #fff;
          border-color: #000000;
        }
      }
    }

    .pay-type {
      margin-top: 30rpx;

      &-item {
        display: flex;
        align-items: center;
        height: 70rpx;

        .icon {
          width: 56rpx;
          height: 56rpx;
        }

        .title {
          flex: 1;
          padding: 0 10rpx;
        }
      }
    }

    .agree {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30rpx;

      .title {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;

        text {
          color: #cc0000;
        }
      }
    }

    .rule-content {
      max-height: 20vh;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #666666;
      margin-top: 40rpx;
    }
  }

  &-ft {
    width: 630rpx;
    height: 88rpx;
    background: #000000;
    border-radius: 44rpx;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 0 30rpx;
    align-items: center;
    margin: 50rpx auto;

    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;

    .money {
      font-weight: bold;
      font-size: 24rpx;

      text {
        font-size: 32rpx;
      }
    }
  }
}

// 动画
.prize-flying {
  z-index: 99;
  width: 200rpx;
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);

  .fly-prize {
    text-align: center;
    position: absolute;
    top: 100%;
    opacity: 0;
    width: 78rpx;
    height: 78rpx;
    background-image: url('https://www.img.xcooo.cn/uploads/2024/02/7f7d1da946ea88f0.png') !important;
    background-repeat: no-repeat !important;
    background-size: 100% 100% !important;
    border-radius: 50%;
    background: #fff;
    // border: 1px solid #3277ff;
    padding: 14rpx;
    text-align: center;

    image {
      margin-top: 15%;
      width: 70%;
      height: 70%;
    }
  }

  .fly-left {
    left: 0px;
    z-index: 5;
    -webkit-animation: flyleft;
    animation: flyleft;
  }

  .fly-center {
    left: 60rpx;
    z-index: 3;
    -webkit-animation: flycenter;
    animation: flycenter;

  }

  .fly-right {
    right: 0px;
    z-index: 5;
    -webkit-animation: flyright;
    animation: flyright;
  }
}

// 动画
@keyframes flyleft {
  0% {
    // top: 100%;
    -webkit-transform: scale(0) translateX(0);
    transform: scale(0) translateX(0);
    opacity: .6;
  }

  3% {
    // top: 95%;
  }

  5% {
    -webkit-transform: scale(1) translateX(0) translateY(-80%);
    transform: scale(1) translateX(0) translateY(-80%);
    opacity: .8;
  }

  20% {
    opacity: 1;
  }

  30% {
    opacity: .2;
  }

  32% {
    opacity: 0;
    visibility: hidden;
  }

  50% {
    -webkit-transform: scale(1.9) translateX(-40px) translateY(-340%);
    transform: scale(1.9) translateX(-40px) translateY(-340%);
  }

  100% {
    // top: 0%;
    -webkit-transform: translateX(-100px);
    transform: translateX(-100px);
  }
}

@keyframes flycenter {
  0% {
    // top: 100%;
    -webkit-transform: scale(0) translateX(0);
    transform: scale(0) translateX(0);
    opacity: .6;
  }

  3% {
    // top: 95%;
  }

  5% {
    -webkit-transform: scale(1) translateX(0) translateY(-80%);
    transform: scale(1) translateX(0) translateY(-80%);
    opacity: .8;
  }

  20% {
    opacity: 1;
  }

  30% {
    opacity: .2;
  }

  32% {
    opacity: 0;
    visibility: hidden;
  }

  34% {
    opacity: 0;
  }

  50% {
    -webkit-transform: scale(1.9) translateX(0) translateY(-340%);
    transform: scale(1.9) translateX(0) translateY(-340%);
  }

  100% {
    // top: 0%;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@keyframes flyright {
  0% {
    // top: 100%;
    -webkit-transform: scale(0) translateX(0);
    transform: scale(0) translateX(0);
    opacity: .6;
  }


  3% {
    // top: 95%;
  }

  5% {
    -webkit-transform: scale(1) translateX(0) translateY(-80%);
    transform: scale(1) translateX(0) translateY(-80%);
    opacity: .8;
  }

  20% {
    opacity: 1;
  }

  30% {
    opacity: .2;
  }

  32% {
    opacity: 0;
    visibility: hidden;
  }

  34% {
    opacity: 0;
  }

  50% {
    -webkit-transform: scale(1.9) translateX(40px) translateY(-340%);
    transform: scale(1.9) translateX(40px) translateY(-340%);
  }

  100% {
    // top: 0%;
    -webkit-transform: translateX(100px);
    transform: translateX(100px);
  }
}
</style>


<style lang="scss">
.tiploginShow-view {
  width: 260px;
  background-color: #fff;
  border-radius: 15px;
  padding: 15px;
  box-sizing: border-box;

  .tiploginShow-view-0 {
    text-align: center;
    font-size: 16px;
    color: #131313;
  }

  .tiploginShow-view-1 {
    text-align: center;
    font-size: 12px;
    margin-top: 10px;
    color: #2c2c2c;
  }

  .tiploginShow-view-2 {
    width: 208px;
    height: 41px;
    background-color: #0079fe;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto 10px;
  }

  .tiploginShow-view-3 {
    text-align: center;

  }
}
</style>