<template>
	<!-- #ifdef H5 -->
	<view class="head mb-2">
	
		<view class="mt-2 mb-2 flex align-center justify-between px-3">
			<image src="/static/logo.png" mode="widthFix" class="logo-img"></image>
			<view>
				<u-button @click="download()">APP下载</u-button>
			</view>
		</view>
		<book-search px="3"></book-search>
	
	</view>
	<!-- #endif -->
</template>

<script>
	export default {
		data() {
			return {
				href:this.$C.appDownloadUrl
			};
		},
		methods:{
			download(){
				// #ifdef APP-PLUS
				plus.runtime.openURL(this.href)
				// #endif
				// #ifdef H5
				window.open(this.href)
				// #endif
				// #ifdef MP
				uni.setClipboardData({
					data: this.href
				});
				uni.showModal({
					content: this.copyTips,
					showCancel: false
				});
				// #endif
			}
		}
	}
</script>

<style lang="less" scoped>
.head {
		background-color: #FFFFFF;
		position: sticky;
		top: 0;
		z-index: 9999;
		height: 200rpx;
	}

	.logo {
		&-img {
			width: 235rpx;
			height: 100rpx;
		}
	}

</style>
