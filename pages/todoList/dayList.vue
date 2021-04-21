<template>
  <view>
    <u-picker mode="time"
              v-model="calendar"
              :default-time="day"
              @confirm="confirmTime"></u-picker>
    <view class="nav-bar"
          :style="{height:navBarHeight + 'px',paddingTop:navTop + 'px',paddingBottom:navPaddingBottom + 'px'}">

      <view @click="selectTime">
        <view class="backPage"
              @click="backPage"
              :style="{height:menuButtonHeight + 'px',bottom:navPaddingBottom + 'px',lineHeight:menuButtonHeight + 'px'}">
          <u-icon name="arrow-left"></u-icon>
          <text>返回</text>

        </view>
        <u-icon name="calendar-fill"
                color="#000000"
                size='45'></u-icon>
        {{day}}
        <u-icon name="arrow-down"></u-icon>
      </view>

    </view>
  </view>
</template>

<script>
import { request } from '@/utils/request/request.js'
import customNav from '@/utils/nav/customNav.js'
export default {
  mixins: [customNav],
  data () {
    return {
      day: '',
      taskList: [],
      calendar: false,
      params: {
        year: true,
        month: true,
        day: true,
        hour: false,
        minute: false,
        second: false,
      }
    }
  },
  onLoad: function (option) {
    //this.day = option.day
    this.day = '2021-04-22'
  },
  mounted () {
    this.getTaskByDay()
  },
  methods: {
    async getTaskByDay () {
      this.taskList = [];
      const res = await request('task', 'getTaskByDay', {
        userId: this.$store.getters.userId,
        time: this.day
      })
      if (res.status == 1) {
        this.taskList = res.data
      }

    },
    selectTime () {
      this.calendar = true
    },
    confirmTime (e) {
      this.day = e.year + '-' + e.month + '-' + e.day
      this.getTaskByDay()
    },
    backPage () {
      uni.navigateBack({

      });
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  text-align: center;
  align-items: center;
  background-color: rgb(248, 248, 248);
  font-size: 30rpx;
  font-size: 3vw;
  position: relative;
  view {
    margin: 0 auto;
  }
  .backPage {
    position: absolute;
    left: 3vw;
    text {
      font-size: 3vw;
    }
  }
}
</style>