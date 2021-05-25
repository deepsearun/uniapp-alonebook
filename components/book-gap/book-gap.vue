<template>
	<view>
		<u-gap :height="height" bg-color="#f8f8fa"></u-gap>
	</view>
</template>

<script>
	export default {
		name:"book-gap",
		props:{
			height:{
				type:[Number,String],
				default:20
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
