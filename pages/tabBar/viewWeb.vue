<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
			}
		},
		onLoad() {
			this.getUrl()
		},
		methods: {
			getUrl(){
				this.$http({
					url: "index.php/api/index/getApp",
				}).then(res => {
					if (res.data.code == 1) {
						let url = res.data.data
						this.url = decodeURIComponent(url)
					}
				}).catch(err => {});
			},
		}
	}
</script>

<style>

</style>
