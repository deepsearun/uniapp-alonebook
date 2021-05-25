<template>
	<view class="flex align-center mb-2" @click="$H.toDetail(item.id)">
		<view>
			<u-lazy-load :image="$H.loadImg(item.pic)"
			img-mode="aspectFill" 
			class="img" 
			height="175" 
			border-radius="8"
			:is-effect="false"
			loading-img="">
			</u-lazy-load>
		</view>
		<view class="ml-2 flex flex-column justify-between mb-1" style="height: 175rpx;">
			<view class="text-ellipsis1 f5 font29">{{item.title}}</view>
			<view class="gray font24" :class="'text-ellipsis'+ellipsis">{{item.content}}</view>
			<view class="gray text-ellipsis1 font24">
				{{isAuthor ? item.author : item.category.title}}
				<text class="mx-1">·</text>
				{{item.serialize ? '完结' : '连载'}}
				<text class="mx-1">·</text>
				{{$H.numberToShort(item.word)}}字
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: [Object, Array],
			isAuthor: {
				type: Boolean,
				default: true
			},
			ellipsis: {
				type: [String,Number],
				default: 2
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="less" scoped>
	.img {
		width: 125rpx;
	}
</style>
