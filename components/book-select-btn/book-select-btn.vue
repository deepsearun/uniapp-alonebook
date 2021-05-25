<template>
	<view class="bg-hui flex align-center justify-center gray wh font26" @click="click(index)">
		{{name}}
	</view>
</template>

<script>
	export default {
		props: {
			name: String,
			index:{
				type:[Number,String],
				default:''
			}
		},
		data() {
			return {

			};
		},
		methods: {
			click(index) {
				this.$emit('click', index);
			}
		}
	}
</script>

<style>
	.wh {
		width: 170rpx;
		height: 60rpx;
	}
</style>
