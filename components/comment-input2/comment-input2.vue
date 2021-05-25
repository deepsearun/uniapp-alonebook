<template>
	<view>
		<u-mask :show="show"></u-mask>
		<view v-if="show" class="w100 flex align-center justify-between comment"
			style="z-index: 999999;position: fixed;" :style="{bottom:keyH+'rpx'}">
			<input type="text" :placeholder="'回复'+sendData.nickname+':'" focus class="comment-input"
				:adjust-position="false" @blur="show = false" @keyboardheightchange="keyboardH"
				v-model="sendData.content" @confirm="sendComment(index)">
			<view class="mr-3" @touchend.prevent="sendComment(index)">
				发送
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "comment-input2",
		props: {
			index: Number
		},
		data() {
			return {
				show: false,
				keyH: 0,
				sendData: {
					nickname: '',
					pid: 0,
					content: '',
					rate: 0
				}
			};
		},
		watch: {
			show(val) {
				if (val == false) {
					this.sendData.nickname = '';
					this.sendData.pid = 0;
					this.sendData.content = '';
				}
			}
		},
		methods: {
			keyboardH(res) {
				if (!res.detail.height) {
					this.keyH = 0;
					return;
				}
				this.keyH = res.detail.height + 220;
			},
			sendComment(index) {
				if (!this.sendData.content.length) {
					return this.$H.msg('评论内容不能为空');
				}
				setTimeout(() => {
					this.show = false;
				}, 100);
				this.$emit('submit', this.sendData, index);
			},
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
