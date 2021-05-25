<template>
	<view class="hot-class flex align-center justify-between" @click="click(item.id)">

		<view class="ml-3">
			<view class="text-ellipsis1">{{item.title}}</view>
			<view class="gray mt-1 hot-class-num">{{$H.numberToShort(item.novel_count)}}本书</view>
		</view>

		<view class="mr-2 mt-1">
			<image :src="$H.loadImg(item.icon)" mode="aspectFill" class="hot-class-img"></image>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			item: [Array, Object]
		},
		data() {
			return {

			};
		},
		methods: {
			click(id) {
				uni.navigateTo({
					url: '/pages/category/category?title=' + this.item.title + '&cid=' + id,
				});
			}
		}
	}
</script>

<style lang="less">
	.hot-class {
		background-color: #f7f7f9;
		border-radius: 15rpx;
		width: 330rpx;
		height: 190rpx;
		margin-bottom: 30rpx;

		&-num {
			font-size: 22rpx;
		}

		&-img {
			width: 110rpx;
			height: 140rpx;
			border-radius: 10rpx;
		}
	}
</style>
