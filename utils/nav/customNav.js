export default{
	data(){
		return {
			navBarHeight: 0,//导航栏高度
      navTop: 0,//胶囊距上边界距离
      navPaddingBottom: 0,//胶囊距上边界距离-状态栏高度
      menuButtonHeight:0//胶囊高度
		}
	},
	onLoad () {
    //导航栏高度 = 状态栏到胶囊的间距（胶囊距上边界距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度。
    const statusBarHeight = uni.getSystemInfoSync().statusBarHeight;//状态栏高度。
    //console.log('statusBarHeight' + statusBarHeight)
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();//胶囊相关信息
    const menuButtonHeight = menuButtonInfo.height //胶囊高度
    this.menuButtonHeight = menuButtonHeight;
    const menuButtonTop = menuButtonInfo.top//胶囊距上边界距离
    // console.log('menuButtonHeight' + menuButtonHeight)
    // console.log('menuButtonTop' + menuButtonTop)
    this.navBarHeight = (menuButtonTop - statusBarHeight) * 2 + menuButtonHeight + statusBarHeight
    this.navTop = menuButtonTop;
    this.navPaddingBottom = menuButtonTop - statusBarHeight
    // 通过延时模拟向后端请求数据，调隐藏骨架屏
  },
}