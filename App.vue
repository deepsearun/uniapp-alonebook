<script>
	export default {
		onLaunch: function() {
			// 初始化登录
			this.$store.commit('initLogin');
			
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	// 全局CSS
	@import "/common/css/main.css";
	/* #ifndef APP-NVUE */
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	// 动画库
	@import "/common/css/animate.min.css";
	// 图标
	@import "/static/icon/iconfont.css";
	/* #endif */
</style>

<style>
	/*每个页面公共css */
</style>
