<template>
  <view>
    <view class="uni-padding-wrap">
      <swiper class="swiper"
              :indicator-dots="false"
              :current="current"
              :duration="duration">
        <swiper-item @click="clickme">
          <view>1111111</view>
        </swiper-item>
        <swiper-item>
          <view>222222222</view>
        </swiper-item>
        <swiper-item>
          <view>333333</view>
        </swiper-item>
      </swiper>
    </view>

    <view class="uni-padding-wrap">

      <swiper class="swiper"
              :indicator-dots="false"
              :current="current"
              @change="viewChange">
        <swiper-item>
          <view class=" uni-bg-red">A AAAAAAAAAAA</view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item ">BBBBBBBBBBBBBBBBBB</view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item ">CCCCCCCCCCCCCC</view>
        </swiper-item>
      </swiper>

    </view>

  </view>
</template>

<script>


export default {
  data () {
    return {
      list: ['昨日小节', '事件统计', '专注统计'],
      background: ['color1', 'color2', 'color3'],
      indicatorDots: false,
      current: 0
    }
  },
  methods: {
    viewChange (e) {
      this.current = e.detail.current
    },
    clickme () {
      console.log('sdfdf')
    }
  }
}
</script>

<style scoped lang="scss">
</style>