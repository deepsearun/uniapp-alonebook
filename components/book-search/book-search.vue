<template>
	<view :class="'px-'+px+' pt-'+pt" @click="search()">
		<view class="search mb-35 flex mt-1">
			<view class="ml-2 flex align-center">
				<u-icon name="search" color="#79797d" size="28"></u-icon>
				<text class="search-text ml-1">输入书籍名或作者名搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			px: {
				type: [String, Number],
				default: ''
			},
			pt: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {

			};
		},
		methods:{
			search(){
				uni.navigateTo({
					url: '/pages/search/search'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.search {
		background-color: #dbdbdb85;
		border-radius: 30rpx;
		height: 65rpx;

		&-text {
			font-size: 23rpx;
			color: #79797d;
		}
	}
</style>
