<template>
	<view class="list" @click="$H.toDetail(item.novel.id)">
		<view class="flex">
			<view class="mr-3">
				<u-lazy-load :image="$H.loadImg(item.novel.pic)"
				img-mode="aspectFill" 
				class="list-img" 
				height="175" 
				:is-effect="false"
				border-radius="8"
				loading-img="">
				</u-lazy-load>
			</view>
			<view style="width: 520rpx;height: 170rpx;" class="flex flex-column justify-between">
				<view class="text-ellipsis1" style="width: 410rpx;"><text class="f5 font29">{{item.novel.title}}</text>
				</view>
				<view class="text-ellipsis1 gray font23">最新章节：{{item.novelChapter.updated.title}}</view>
				<view class="text-ellipsis1 gray font23">{{reading}}</view>
				<view class="gray font23">{{$H.friendlyDate(item.update_time)}}</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: [Array, Object]
		},
		computed: {
			reading() {
				if (this.item.reading.length) {
					return '正在读：' + this.item.reading.title;
				}
				return '暂未开始阅读';
			}
		},
		data() {
			return {

			};
		},
		methods: {
			detail(id) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.list {
		width: 750rpx;
		margin-bottom: 20rpx;

		&-img {
			width: 135rpx;
			height: 175rpx;
			border-radius: 8rpx;
		}
	}

	.btn {
		width: 150rpx;
		height: 50rpx;
		border-radius: 50rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		background-image: linear-gradient(to right, #fd717c, #fc4c7b);
	}
</style>
