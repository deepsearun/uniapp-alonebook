(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-find-more-more"],{"16e0":function(t,e,i){"use strict";i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=uni.getSystemInfoSync(),n={},o={name:"u-navbar",props:{height:{type:[String,Number],default:""},backIconColor:{type:String,default:"#606266"},backIconName:{type:String,default:"nav-back"},backIconSize:{type:[String,Number],default:"44"},backText:{type:String,default:""},backTextStyle:{type:Object,default:function(){return{color:"#606266"}}},title:{type:String,default:""},titleWidth:{type:[String,Number],default:"250"},titleColor:{type:String,default:"#606266"},titleBold:{type:Boolean,default:!1},titleSize:{type:[String,Number],default:32},isBack:{type:[Boolean,String],default:!0},background:{type:Object,default:function(){return{background:"#ffffff"}}},isFixed:{type:Boolean,default:!0},immersive:{type:Boolean,default:!1},borderBottom:{type:Boolean,default:!0},zIndex:{type:[String,Number],default:""},customBack:{type:Function,default:null}},data:function(){return{menuButtonInfo:n,statusBarHeight:a.statusBarHeight}},computed:{navbarInnerStyle:function(){var t={};return t.height=this.navbarHeight+"px",t},navbarStyle:function(){var t={};return t.zIndex=this.zIndex?this.zIndex:this.$u.zIndex.navbar,Object.assign(t,this.background),t},titleStyle:function(){var t={};return t.left=(a.windowWidth-uni.upx2px(this.titleWidth))/2+"px",t.right=(a.windowWidth-uni.upx2px(this.titleWidth))/2+"px",t.width=uni.upx2px(this.titleWidth)+"px",t},navbarHeight:function(){return this.height?this.height:44}},created:function(){},methods:{goBack:function(){"function"===typeof this.customBack?this.customBack.bind(this.$u.$parent.call(this))():uni.navigateBack()}}};e.default=o},"59dc":function(t,e,i){"use strict";i.r(e);var a=i("643f"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},"643f":function(t,e,i){"use strict";i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{title:"查看更多",type:"",list:{page:1,pageSize:10,loadStatus:"loading",data:[]}}},onLoad:function(t){uni.showLoading({mask:!0,title:"加载中"}),this.title=t.title,this.type=t.type,this.loadData()},methods:{loadData:function(){switch(this.type){case"like":this.like();break;case"update":this.update();break;case"hits":this.hits();break}},like:function(){var t=this;this.$api.likeBook({pageSize:this.list.pageSize}).then((function(e){t.list.data=e.data.list,t.list.loadStatus="nomore",setTimeout((function(){uni.hideLoading()}),300)}))},update:function(){var t=this;this.$api.newBook({page:this.list.page,pageSize:this.list.pageSize}).then((function(e){1==e.data.page?t.list.data=e.data.list:t.list.data=t.list.data.concat(e.data.list),t.list.loadStatus="loadmore",e.data.list.length<10&&(t.list.loadStatus="nomore"),setTimeout((function(){uni.hideLoading()}),300)}))},hits:function(){var t=this;this.$api.novelHits({page:this.list.page,pageSize:this.list.pageSize,hits:"week"}).then((function(e){1==e.data.page?t.list.data=e.data.list:t.list.data=t.list.data.concat(e.data.list),t.list.loadStatus="loadmore",e.data.list.length<10&&(t.list.loadStatus="nomore"),setTimeout((function(){uni.hideLoading()}),300)}))},loadMore:function(){"loadmore"==this.list.loadStatus&&(this.list.page+=1,this.list.loadStatus="loading",this.loadData())},onReachBottom:function(){this.loadMore()}}};e.default=a},"6ebf":function(t,e,i){"use strict";var a=i("b5c9"),n=i.n(a);n.a},"776b":function(t,e,i){"use strict";i.r(e);var a=i("fd0a"),n=i("59dc");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);var r,l=i("f0c5"),s=Object(l["a"])(n["default"],a["b"],a["c"],!1,null,"c58c0bae",null,!1,a["a"],r);e["default"]=s.exports},8061:function(t,e,i){"use strict";i.r(e);var a=i("c4b8"),n=i("ff31");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("6ebf");var r,l=i("f0c5"),s=Object(l["a"])(n["default"],a["b"],a["c"],!1,null,"6fefbe5a",null,!1,a["a"],r);e["default"]=s.exports},b388:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-navbar[data-v-6fefbe5a]{width:100%}.u-navbar-fixed[data-v-6fefbe5a]{position:fixed;left:0;right:0;top:0;z-index:991}.u-status-bar[data-v-6fefbe5a]{width:100%}.u-navbar-inner[data-v-6fefbe5a]{\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\r\n-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;position:relative;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.u-back-wrap[data-v-6fefbe5a]{\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\r\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-flex:0;-webkit-flex-grow:0;flex-grow:0;padding:%?14?% %?14?% %?14?% %?24?%}.u-back-text[data-v-6fefbe5a]{padding-left:%?4?%;font-size:%?30?%}.u-navbar-content-title[data-v-6fefbe5a]{\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\r\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-flex:1;-webkit-flex:1;flex:1;position:absolute;left:0;right:0;height:%?60?%;text-align:center;-webkit-flex-shrink:0;flex-shrink:0}.u-navbar-centent-slot[data-v-6fefbe5a]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.u-title[data-v-6fefbe5a]{line-height:%?60?%;font-size:%?32?%;-webkit-box-flex:1;-webkit-flex:1;flex:1}.u-navbar-right[data-v-6fefbe5a]{-webkit-box-flex:1;-webkit-flex:1;flex:1;\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\r\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end}.u-slot-content[data-v-6fefbe5a]{-webkit-box-flex:1;-webkit-flex:1;flex:1;\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\r\n-webkit-box-align:center;-webkit-align-items:center;align-items:center}',""]),t.exports=e},b5c9:function(t,e,i){var a=i("b388");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("798fa615",a,!0,{sourceMap:!1,shadowMode:!1})},c4b8:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var a={uIcon:i("a9fd").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{},[i("v-uni-view",{staticClass:"u-navbar",class:{"u-navbar-fixed":t.isFixed,"u-border-bottom":t.borderBottom},style:[t.navbarStyle]},[i("v-uni-view",{staticClass:"u-status-bar",style:{height:t.statusBarHeight+"px"}}),i("v-uni-view",{staticClass:"u-navbar-inner",style:[t.navbarInnerStyle]},[t.isBack?i("v-uni-view",{staticClass:"u-back-wrap",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goBack.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"u-icon-wrap"},[i("u-icon",{attrs:{name:t.backIconName,color:t.backIconColor,size:t.backIconSize}})],1),t.backText?i("v-uni-view",{staticClass:"u-icon-wrap u-back-text u-line-1",style:[t.backTextStyle]},[t._v(t._s(t.backText))]):t._e()],1):t._e(),t.title?i("v-uni-view",{staticClass:"u-navbar-content-title",style:[t.titleStyle]},[i("v-uni-view",{staticClass:"u-title u-line-1",style:{color:t.titleColor,fontSize:t.titleSize+"rpx",fontWeight:t.titleBold?"bold":"normal"}},[t._v(t._s(t.title))])],1):t._e(),i("v-uni-view",{staticClass:"u-slot-content"},[t._t("default")],2),i("v-uni-view",{staticClass:"u-slot-right"},[t._t("right")],2)],1)],1),t.isFixed&&!t.immersive?i("v-uni-view",{staticClass:"u-navbar-placeholder",style:{width:"100%",height:Number(t.navbarHeight)+t.statusBarHeight+"px"}}):t._e()],1)},o=[]},fd0a:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var a={uNavbar:i("8061").default,bookItemY:i("e784").default,uLoadmore:i("8ea6").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"p-3"},[i("u-navbar",{attrs:{title:t.title,"title-color":"#222","back-icon-color":"#222","title-bold":!0,"title-size":"31","border-bottom":!1}}),i("v-uni-view",{staticClass:"mt-1 flex flex-wrap"},t._l(t.list.data,(function(t,e){return i("book-item-y",{key:e,attrs:{item:t}})})),1),t.list.data.length?i("u-loadmore",{staticClass:"pt-2",attrs:{status:t.list.loadStatus}}):t._e()],1)},o=[]},ff31:function(t,e,i){"use strict";i.r(e);var a=i("16e0"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a}}]);