<template>
	<view>
		<aui-loading ref="auiLoading" :type="auiLoading.type"
		 :msg="auiLoading.msg" :mask="auiLoading.mask" :direction="auiLoading.direction"
		 :styles="auiLoading.styles" :theme="auiLoading.theme"></aui-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				auiLoading: {
					type: 4,
					msg: '加载中',
					mask: false,
					direction: 'col',
					styles: {
						background: "#FFF",
						color: "#333"
					},
					theme: 1
				}
			};
		},
		methods:{
			show(){
				this.$refs.auiLoading.show();
			},
			hide(){
				this.$refs.auiLoading.hide();
			}
		}
	}
</script>

<style>

</style>
