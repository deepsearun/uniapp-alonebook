<template>
	<view class="base" @click="$H.toDetail(item.id)">

		<view class="flex align-center justify-between px-2 pt-1">

			<view class="mt-1">
				<text class="f8 font32">{{$H.ellipsis(item.title,10)}}</text>
				<text class="ml-2 gray font20">{{item.author}}</text>

				<view class="mt-2 mr-2 text-ellipsis3 gray font22">
					“ {{item.content}}
				</view>
			</view>

			<view class="mt-1">
				<image class="img" :src="$H.loadImg(item.pic)"  mode="aspectFill"></image>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props:{
			item:[Object,Array]
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="less" scoped>
	.base {
		height: 220rpx;
		background-color: #fff;
		box-shadow: rgb(232 230 230) 2rpx 2rpx 30rpx -2rpx;
		border-radius: 10rpx;
	}

	.img {
		width: 135rpx;
		height: 175rpx;
		border-radius: 8rpx;
	}
</style>
