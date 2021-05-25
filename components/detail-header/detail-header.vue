<template>
	<view class="content white p-4" style="width: 750rpx;">
		<view class="flex justify-between">
			<view class="flex flex-column">
				<view class="f5 font35">{{item.title}}</view>
				<view class="my-4" @click="toAuthor()">
					<text class="font27 mr-1">{{item.author}}</text>
					<u-icon name="arrow-right" :size="27"></u-icon>
				</view>
				<view class="font27">
					{{item.category.title}} · {{item.serialize ? '完结' : '连载'}} · {{$H.numberToShort(item.word,1)}}字
				</view>
			</view>
			<view>
				<image :src="$H.loadImg(item.pic)" mode="aspectFill"
					style="width: 160rpx;height: 215rpx;border-radius: 15rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "detail-header",
		props: {
			item: [Object, Array]
		},
		data() {
			return {

			};
		},
		methods: {
			toAuthor() {
				this.$emit('author');
			}
		}
	}
</script>

<style lang="scss">
	.content {
		position: absolute;
		top: calc(var(--status-bar-height) + 35px);
	}
</style>
