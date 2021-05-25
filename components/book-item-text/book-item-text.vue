<template>
	<view class="flex align-center justify-between mb-3 font26">
		<view class="flex align-center">
			<text class="mr-1 tag-color">[{{item.category.title}}]</text>
			<view class="text-ellipsis1 title ">
				{{item.title}}
			</view>

		</view>
		<view class="flex align-center">
			<view class="gray text-ellipsis1 title">
				{{item.chapter.updated.title}}
			</view>
			<text class="tag-color">{{item.serialize ? '完结' : '连载中'}}</text>
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
		}
	}
</script>

<style>
	.title {
		width: 235rpx;
	}

	.tag-color {
		color: #c99754;
	}
</style>
