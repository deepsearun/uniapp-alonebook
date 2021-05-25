<template>
	<view class="flex align-center justify-between border-bottom-hui py-3">
		<text class="font28 text-ellipsis1">{{item.title}}</text>
	</view>
</template>

<script>
	export default {
		name:"chapter-list-item",
		props:{
			item:[Array,Object]
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
