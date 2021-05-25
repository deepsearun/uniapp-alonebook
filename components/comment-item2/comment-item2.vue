<template>
	<view class="flex flex-column border-bottom-hui pb-3 mb-3">
		<view class="flex" @click="repost(item)">
			<u-avatar size="42" :src="item.user.headimgurl">
			</u-avatar>
			<view class="font26 ml-2">
				{{item.user.nickname}}
			</view>
		</view>
		<view class="mt-1 ml-6">
			<view class="font26 mb-1 hei" style="line-height: 43rpx;" @click="repost(item)">
				{{item.content}}
			</view>
			<view class="flex align-center justify-between flex-1">
				<view class="font23">
					<text class="base-text">{{$u.timeFormat(item.create_time, 'yy-mm-dd hh:MM')}}</text>
				</view>
				<view>
					<u-icon name="thumb-up" @click="support()" :color="item.isSupport ? '#fa3534' : 'gray'" class="mr-4"
						size="29">
					</u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "comment-item2",
		props: {
			item: [Array, Object],
			index: Number
		},
		methods:{
			repost(item) {
				if (this.$store.state.user.id == item.uid) {
					// return;
				}
				this.$emit('repost', item, this.index);
			},
			support() {
				this.$emit('support',this.index);
			}
		}
	}
</script>

<style lang="scss">

</style>
