<template>
	<view class="base mb-2 flex flex-column justify-between tc" @click="$H.toDetail(item.id)">
		<view>
			<u-lazy-load :image="$H.loadImg(item.pic)" 
			img-mode="aspectFill" 
			class="img" 
			height="250" 
			border-radius="8"
			:is-effect="false"
			loading-img="">
			</u-lazy-load>
		</view>
		<view class="text-ellipsis1 font27 mt-1">{{item.title}}</view>
		<view class="gray mt-1 font22" v-if="author">{{item.author}}</view>
	</view>

</template>

<script>
	export default {
		props: {
			item: [Object,Array],
			author:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.base {
		width: 185rpx;
	}

	.icon {
		position: absolute;
		right: 10rpx;
		bottom: 15rpx;
		background-color: rgba(0, 0, 0, 0.46);
		border-radius: 5rpx;
		width: 56rpx;
		height: 36rpx;
	}
</style>
