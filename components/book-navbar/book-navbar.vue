<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<u-navbar :is-back="false" title=""  :border-bottom="false">
			<view class="f5 ml-25" style="font-size: 44rpx;color: #222;">
				{{title}}
			</view>
			<template slot="right">
				<view class="pr-4" @click="search()">
					<u-icon name="search" color="#222" size="39"></u-icon>
				</view>
			</template>
		</u-navbar>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<u-navbar :is-back="false" :title="title" title-color="#222" title-bold :border-bottom="false"  title-size="31">
			<template slot="right">
				<view class="pr-4" @click="search()">
					<u-icon name="search" color="#222" size="39"></u-icon>
				</view>
			</template>
		</u-navbar>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		props:{
			title:String,
			ml:String
		},
		data() {
			return {
				
			};
		},
		methods:{
			search(){
				uni.navigateTo({
					url: '/pages/search/search'
				});
			}
		}
	}
</script>

<style>

</style>
