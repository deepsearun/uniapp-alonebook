<template>
	<view class="hot-class flex align-center justify-between">

		<view class="ml-3">
			<view class="text-ellipsis1">玄幻</view>
			<view class="gray hot-class-num">{{$H.numberToShort(2942934)}}本书</view>
		</view>
		
		<view class="mr-2 mt-1">
			<image src="http://book.uulu.cc/uploads/novel/20210127/d7fcbe9340f672fe27a91cac404f3f9b.jpg" 
			mode="aspectFill" class="hot-class-img"></image>
		</view>

	</view>
</template>

<script>
	export default {
		props:{
			
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	.hot-class {
		background-color: #f7f7f9;
		border-radius: 30rpx;
		width: 280rpx;
		height: 140rpx;
		margin-bottom: 30rpx;
		
		&-num{
			font-size: 22rpx;
		}
		&-img {
			width: 70rpx;
			height: 100rpx;
			border-radius: 8rpx;
		}
	}
</style>
