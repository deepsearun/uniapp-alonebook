<template>
	<view class="base mb-3" @longpress="logoTime(item.novel.id)">
		<view class="relative">
			<image class="img" :src="$H.loadImg(item.novel.pic)" mode="aspectFill">
			</image>
			<view class="white icon font22 flex align-center justify-center" v-if="item.isUpdate">
				更新
			</view>
		</view>
		<view class="tc">
			<view class="text-ellipsis1 font26">{{item.novel.title}}</view>
			<view class="gray mt-1 font22">{{surNum}}</view>
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
			surNum() {
				if (this.item.surNum > 0) {
					return this.item.surNum + '章未读';
				} else if (this.item.surNum === false) {
					return '暂未开始阅读';
				}
				return '已阅读至最新章节';
			}
		},
		methods: {
			logoTime(id) {
				this.$emit('logo',id);
			}
		}
	}
</script>

<style lang="less" scoped>
	.base {
		width: 185rpx;
	}

	.img {
		width: 185rpx;
		height: 255rpx;
		border-radius: 10rpx;
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
