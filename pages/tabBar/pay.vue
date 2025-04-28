<template>
	<view>
		<view class="" v-html="url">
			
		</view>
		
	</view>
</template>

<script>
	setTimeout(() => {
		document.forms['epay'].submit();
		console.log("提交");
	},1400)
	export default {
		
		data() {
			return {
				url: '',
			}
		},
		onUnload() {
			uni.$off('h5pay')
		},
		onLoad() {
			uni.$on('h5pay',(data) => {
				this.url = data
				console.log(this.url,"url");
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
