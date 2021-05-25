<template>
	<view class="list" @longpress="logoTime">
		<view class="flex">
			<view class="mr-3 relative">
				<image :src="$H.loadImg(item.novel.pic)" mode="aspectFill" class="list-img"></image>
				<view class="white icon font22 flex align-center justify-center" v-if="item.isUpdate">
					更新
				</view>
			</view>
			<view style="width: 500rpx;height: 185rpx;" class="flex flex-column justify-between">
				<view class="flex align-center justify-between">
					<view class="text-ellipsis1 f5 font29">{{item.novel.title}}</view>
					<view class="list-bftext" v-if="false">
						上次阅读
					</view>
				</view>
				<view class="gray font23 mt-2">{{item.novel.author}}</view>
				<view class="text-ellipsis1 gray font23">最新章节：{{item.novelChapter.updated.title}}</view>

				<view class="text-ellipsis1 gray font23 ">{{reading}}</view>
			</view>
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
		computed: {
			reading() {
				if (this.item.reading.length) {
					return '正在读：' + this.item.reading.title;
				}
				return '暂未开始阅读';
			}
		},
		methods: {
			logoTime() {
				this.$emit('logo');
			}
		}
	}
</script>

<style lang="less" scoped>
	.list {
		width: 750rpx;
		margin-bottom: 20rpx;

		&-img {
			width: 146rpx;
			height: 185rpx;
			border-radius: 8rpx;
		}

		&-bftext {
			font-size: 24rpx;
			color: #e16963;
		}
	}

	.icon {
		position: absolute;
		right: 0rpx;
		top: 0rpx;
		background-color: #f11b1b;
		border-radius: 5rpx;
		width: 56rpx;
		height: 36rpx;
	}
</style>
