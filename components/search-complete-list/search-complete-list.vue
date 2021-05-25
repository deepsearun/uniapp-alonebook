<template>
	<view class="flex border-bottom-hui py-2 align-center words-list" 
	hover-class="bg-hui" 
	@click="item.title ? doSearch(item.title) : toAuthor(item.author)">
		<u-icon name="search" color="gray" size="31"></u-icon>

		<view class="ml-2" v-if="!isAuthor">
			<text class="font27 words-list-text text-ellipsis1">{{item.title}} - {{item.author}}</text>
		</view>

		<view class="ml-2 flex align-center" v-else>
			<view class="font27 words-list-text text-ellipsis1">{{item.author}}</view>
			<view class="words-list-author ml-15">
				作者
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "search-complete-list",
		props: {
			item: [Object, Array],
			isAuthor: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods:{
			toAuthor(e){
				uni.navigateTo({
					url: '/pages/detail/author/author?title=' + e,
				});
			},
			doSearch(word){
				this.$emit('doSearch',word);
			}
		}
	}
</script>

<style lang="less">
	.words-list {
		height: 90rpx;
		line-height: 90rpx;

		&-text {
			color: #5a5555;
		}

		&-author {
			color: #dd491d;
			border: 1rpx solid #dd491d;
			line-height: 30rpx;
			border-radius: 8rpx;
			font-size: 23rpx;
			padding: 2rpx;
			margin-top: 3rpx;
		}
	}
</style>
