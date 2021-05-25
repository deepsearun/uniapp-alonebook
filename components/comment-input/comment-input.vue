<template>
	<view>
		<u-popup v-model="show" mode="bottom" close-icon-size="40" border-radius="15" close-icon-pos="top-left"
			closeable height="1200">
			<view class="border-bottom-hui flex align-center justify-between p-3">
				<view class="flex justify-center flex-1 ml-5 font31 f5">
					点评本书
				</view>
				<view class="hon f5 font31" @click="sendComment()">
					发表
				</view>
			</view>
			<view class="flex justify-center mt-4">
				<u-rate size="55" :min-count="1" v-model="sendData.rate"></u-rate>
			</view>
			<view class="hon font28 mt-4 flex justify-center mb-2">
				{{rateText}}
			</view>
			<view class="m-3 flex justify-center">
				<textarea v-model="sendData.content" placeholder="请输入评论内容" height="400" :adjust-position="false"
					style="border-radius: 8rpx;height: 600rpx;width: 750rpx;" class="bg-hui p-3" />
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "comment-input",
		data() {
			return {
				show: false,
				sendData:{
					content:'',
					rate:1,
					pid:0,
				}
			};
		},
		watch: {
			show(val) {
				if (val == false) {
					this.sendData.content = '';
				}
			},
		},
		computed: {
			rateText() {
				let msg = [
					'轻点评分',
					'太差了',
					'不太好',
					'一般般',
					'还不错',
					'超精彩'
				];
				return msg[this.rate];
			},
		},
		methods:{
			sendComment() {
				if (!this.sendData.content.length) {
					return this.$H.msg('评论内容不能为空');
				}
				setTimeout(()=>{
					this.show = false;
				},100);
				this.$emit('submit',this.sendData);
			}
		}
	}
</script>

<style>

</style>
