<template>
	<view>
		<view class="w100 flex align-center justify-between comment" style="z-index: 999999;position: fixed;"
			:style="{bottom:bottom+'rpx'}">
			<input type="text" placeholder="请输入内容" focus class="comment-input"
				v-model="sendData.content" @confirm="sendComment(index)">
			<view class="mr-3" @touchend.prevent="sendComment(index)">
				发送
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "comment-input-bottom",
		props: {
			bottom: {
				type: Number,
				default: 0
			},
			index:Number
		},
		data() {
			return {
				sendData: {
					pid: 0,
					nickname:'',
					content: '',
					rate: 0
				}
			};
		},
		methods: {
			sendComment(index) {
				if (!this.sendData.content.length) {
					return this.$H.msg('评论内容不能为空');
				}
				this.$emit('submit', this.sendData, index,'input-bottom');
				this.sendData.content = '';
			}
		}
	}
</script>

<style lang="scss">
	.comment {
		height: 85rpx;
		background-color: #F8F8F8;

		.comment-input {
			background-color: #fff;
			border-radius: 8rpx;
			width: 600rpx;
			font-size: 25rpx;
			padding: 15rpx;
			margin-left: 10rpx;
		}
	}
</style>
