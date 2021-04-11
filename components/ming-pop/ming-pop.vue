<template>
  <!-- v-if解决center弹窗位置问题 -->
  <view v-if="direction==='center'?open:true"
        :class="direction==='center'?'centers':''">
    <view class="product-window"
          :style="{width:width+'%'}"
          :class="(open ? 'on' : '')+' '+direction">
      <!-- 兼容h5顶部导航空位 -->
      <!-- #ifndef MP -->
      <view v-if="(direction!=='below'&&direction!=='center')"
            style="height: 100rpx;" />
      <!-- #endif -->
      <image v-if="is_close"
             src="../../static/ming-pop/close.png"
             mode=""
             :class="(direction!=='below'&&direction!=='center')?'iconfont-h5':''"
             class="iconfont"
             @click="open=false" />
      <slot />
    </view>
    <view v-if="is_mask"
          class="mask"
          :hidden="!open"
          @touchmove.prevent
          @click="open=false" />
  </view>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: "below"
    },
    width: {
      type: Number,
      default: 100
    },
    // eslint-disable-next-line vue/prop-name-casing
    is_close: {
      type: Boolean,
      default: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    is_mask: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      open: false
    };
  },
  methods: {
    show () {
      this.open = true;
    },
    close () {
      this.open = false;
    }
  }
}
</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}
.centers {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.product-window {
  position: fixed;
  background-color: #fff;
  z-index: 77;
  border-radius: 15rpx;
  padding: 50rpx 30rpx;
  transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
  -webkit-transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
}

.below {
  left: 0;
  bottom: 0;
  transform: translate3d(0, 100%, 0);
  -webkit-transform: translate3d(0, 100%, 0);
}

.up {
  top: 0;
  left: 0;
  transform: translate3d(0, -100%, 0);
  -webkit-transform: translate3d(0, -100%, 0);
}

.right {
  right: 0;
  top: 0;
  height: 100%;
  transform: translate3d(100vw, 0, 0);
  -webkit-transform: translate3d(100vw, 0, 0);
}

.left {
  left: 0;
  top: 0;
  height: 100%;
  transform: translate3d(-100vw, 0, 0);
  -webkit-transform: translate3d(-100vw, 0, 0);
}
.center {
  position: static;
  -webkit-position: static;
  transform: translate3d(-100vw, -100%, 0);
  -webkit-transform: translate3d(-100vw, -100%, 0);
}
.product-window.on {
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 5;
}

.product-window .iconfont {
  position: fixed;
  right: 30rpx;
  top: 20rpx;
  font-size: 35rpx;
  color: #8a8a8a;
  width: 50rpx;
  height: 50rpx;
}
//兼容h5顶部导航空位
// #ifndef MP
.product-window .iconfont-h5 {
  top: 100rpx;
}
// #endif
</style>
