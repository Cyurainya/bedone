
<template>
  <view class="container">
    <view class="tab-wrap">
      <view @click="tabChange(0)"
            class="tab-item">
        <image :src="current == 0 ? './../../static/statistics-now.png' : './../../static/statistics.png'"
               mode="" />
        <text :class="current == 0 ? 'current' : '' ">昨日总结</text>
        <view :class="current == 0 ? 'current-line line' : 'line' "></view>
      </view>
      <view @click="tabChange(1)"
            class="tab-item">
        <image :src="current == 1 ? './../../static/complete-now.png' : './../../static/complete.png'"
               mode="" />
        <text :class="current == 1 ? 'current' : '' ">事件统计</text>
        <view :class="current == 1 ? 'current-line line' : 'line' "></view>
      </view>
      <view @click="tabChange(2)"
            class="tab-item">
        <image :src="current == 2 ? './../../static/clock-now.png':'./../../static/clock.png'"
               mode="" />
        <text :class="current == 2 ? 'current' : '' ">专注统计</text>
        <view :class="current == 2 ? 'current-line line' : 'line' "></view>
      </view>
    </view>
    <view class="uni-padding-wrap">

      <view>
        <swiper class="swiper"
                style="min-height:90vh;max-heigth:9999vh"
                :current="current"
                @change="changeCurrent">
          <swiper-item>
            <scroll-view scroll-y
                         style="height: 100%;width: 100%;">
              <view class="swiper-item">

                <view class="box-wrap">
                  <view class="num-box"
                        style="background-color: lightseagreen;">
                    <view class="name-amount">事件总工作量</view>
                    <view>
                      <text class="number">{{lastTick}}</text>
                      <text>件</text>
                    </view>
                  </view>
                  <view class="num-box"
                        style="background-color: cornflowerblue;">
                    <view class="name-amount">专注时长</view>
                    <view>
                      <text class="number">{{lastFocus}}</text>
                      <text>min</text>
                    </view>
                  </view>
                </view>
                <view v-if="!lastTick">
                  <view class="box-cell free">
                    <image src="../../static/coffee.png"
                           mode="" />
                    你昨天没有事件哦....
                  </view>
                </view>
                <view v-if="lastTick">
                  <view class="box-cell">
                    <view class="box-title">事件完成度</view>

                    <view class="charts-box">
                      <qiun-data-charts type="pie"
                                        :chartData="lastTickData"
                                        :echartsH5="true"
                                        :inScrollView="true"
                                        background="none"
                                        :animation="false" />
                    </view>
                  </view>
                </view>
                <view v-if="!lastFocus">
                  <view class="box-cell free">
                    <image src="../../static/coffee.png"
                           mode="" />
                    你昨天没有专注哦....
                  </view>
                </view>
                <view v-if="lastFocus">
                  <view class="box-cell">
                    <view class="box-title">专注完成度</view>
                    <view class="charts-box">
                      <qiun-data-charts type="pie"
                                        :chartData="lastFocusData"
                                        :echartsH5="true"
                                        :inScrollView="true"
                                        background="none"
                                        :animation="false" />
                    </view>
                  </view>
                </view>

              </view>
            </scroll-view>

          </swiper-item>
          <swiper-item>
            <scroll-view scroll-y
                         style="height: 100%;width: 100%;">
              <view class="swiper-item">
                <view class="box-wrap">
                  <view class="num-box"
                        style="background-color: lightseagreen;">
                    <view class="name-amount">最近七天事件总工作量</view>
                    <view>
                      <text class="number">{{lastWeekTaskAmount}}</text>
                      <text>件</text>
                    </view>
                  </view>
                  <view class="num-box"
                        style="background-color: cornflowerblue;">
                    <view class="name-amount">最近七天完成事件量</view>
                    <view>
                      <text class="number">{{lastWeekTaskComple}}</text>
                      <text>件</text>
                    </view>
                  </view>
                </view>

                <view>
                  <view class="box-cell">
                    <view class="box-title">事件完成度</view>

                    <view class="charts-box">
                      <view class="charts-box">
                        <qiun-data-charts type="column"
                                          :chartData="weekTickData"
                                          background="none"
                                          :animation="false" />
                      </view>
                    </view>
                  </view>
                </view>

                <view>
                  <view class="box-cell">
                    <view class="box-title">事件完成度</view>

                    <view class="charts-box">
                      <view class="charts-box">
                        <qiun-data-charts type="rose"
                                          :chartData="weekTickPercent"
                                          background="none"
                                          :animation="false" />
                      </view>
                    </view>
                  </view>
                </view>

              </view>
            </scroll-view>

          </swiper-item>
          <swiper-item>
            <view class="swiper-item">
              <scroll-view scroll-y
                           style="height: 100%;width: 100%;">
                <view class="box-wrap">
                  <view class="num-box"
                        style="background-color: lightseagreen;">
                    <view class="name-amount">专注总次数</view>
                    <view>
                      <text class="number">{{lastWeekFocusAmount}}</text>
                      <text>件</text>
                    </view>
                  </view>
                  <view class="num-box"
                        style="background-color: cornflowerblue;">
                    <view class="name-amount">专注总时长</view>
                    <view>
                      <text class="number">{{lastWeekFocusTime}}</text>
                      <text>min</text>
                    </view>
                  </view>
                </view>
                <view class="box-cell">
                  <view class="box-title">专注时长</view>

                  <view class="charts-box">
                    <qiun-data-charts type="line"
                                      :chartData="weekFocusData"
                                      background="none"
                                      :animation="false" />
                  </view>
                </view>
              </scroll-view>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>

  </view>
</template>
<script>
import { request } from '@/utils/request/request.js'
export default {
  data () {
    return {
      current: 2,//轮播图的current Index
      weekList: [],
      lastTickData: {
        "series": [
          {
            "data": [
              {
                "name": "完成事件量",
                "value": 0,
                "color": "#6495ed"
              },
              {
                "name": "未完成事件量",
                "value": 0,
                "color": "#20b2aa"
              },
            ]
          }
        ]
      },
      lastFocusData: {
        "series": [
          {
            "data": [
              {
                "name": "完成事件量",
                "value": 0,
                "color": "#6495ed"
              },
              {
                "name": "未完成事件量",
                "value": 0,
                "color": "#20b2aa"
              },
            ]
          }
        ]
      },
      weekTickData: {
        "categories": [
          "04.09",
          "04.09",
          "04.09",
          "04.09",
          "04.09",
          "04.09",
          "04.09"
        ],
        "series": [
          {
            "name": "目标值",
            "data": [
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          },
          {
            "name": "完成量",
            "data": [
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          }
        ]
      },
      weekTickPercent: {
        "series": [
          {
            "data": [
              {
                "name": "完成事件量",
                "value": 10,
                "color": "#6495ed"
              },
              {
                "name": "未完成事件量",
                "value": 2,
                "color": "#20b2aa"
              },
            ]
          }
        ]
      },
      weekFocusData: {
        "categories": [
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021"
        ],
        "series": [
          {
            "name": "专注总时长",
            "data": [
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          }
        ]
      },
      lastTick: 0,
      lastFocus: 0,
      lastWeekTaskAmount: 0,
      lastWeekTaskComple: 0,
      lastWeekFocusAmount: 0,
      lastWeekFocusTime: 0
    }
  },
  mounted () {
    this.lastWeek();//获取最近七天的日和月
    this.getLastTask();//获取昨天的事件
    this.getLastFocus(); //获取昨天的专注
    this.getWeekTask();//获取最近七天的事件
    this.getWeekFocus();//获取最近七天的专注
  },
  computed: {
    today () {
      let d = new Date()
      return this.$u.timeFormat(d, 'yyyy-mm-dd')
    },
    yesterday () {
      let dd = new Date()
      dd.setDate(dd.getDate() - 1)
      return this.$u.timeFormat(dd, 'yyyy-mm-dd')
    },
    lastSevenList () {
      let list = [];
      for (let i = 0; i < 7; i++) {
        let dd = new Date()
        dd.setDate(dd.getDate() - i)
        list.push(this.$u.timeFormat(dd, 'yyyy-mm-dd'))
      }
      return list
    }
  },
  methods: {
    //设置最近七天的日和月
    lastWeek () {
      for (let i = 6; i >= 0; i--) {
        let d = new Date();
        d.setDate(d.getDate() - i)
        let day = this.$u.timeFormat(d, 'yyyy-mm-dd');
        this.weekList.push(day.substring(5, 7) + '.' + day.substring(8, 10))
      }
      this.weekTickData['categories'] = this.weekList
      this.weekFocusData['categories'] = this.weekList
    },
    //获取昨天的事件
    async getLastTask () {
      this.lastTick = 0;
      this.lastTickData = {
        "series": [
          {
            "data": [
              {
                "name": "完成事件量",
                "value": 0,
                "color": "#6495ed"
              },
              {
                "name": "未完成事件量",
                "value": 0,
                "color": "#20b2aa"
              },
            ]
          }
        ]
      }
      const res = await request('task', 'getTaskByDay', {
        userId: this.$store.getters.userId,
        time: this.yesterday
      })
      if (res.status == 1 && res.data.length > 0) {
        this.lastTick = res.data.length
        res.data.map((item) => {
          if (item.checkBox) {
            //昨天完成的事件
            this.lastTickData['series'][0]['data'][0]['value']++
          } else {
            this.lastTickData['series'][0]['data'][1]['value']++
          }
        })
      }
    },
    //获取昨天的专注
    async getLastFocus () {
      const res = await request('focus', 'focusGetByDay', {
        userId: this.$store.getters.userId,
        time: this.yesterday
      })

      if (res.status == 1 && res.data.length > 0) {
        res.data.map((item) => {
          this.lastFocus += parseInt(item.duration)
          if (item.finish) {
            this.lastFocusData['series'][0]['data'][0]['value']++
          } else {
            this.lastFocusData['series'][0]['data'][1]['value']++
          }
        })
      }
    },
    //获取最近七天的事件
    async getWeekTask () {
      const res = await request('task', 'getWeekTask', {
        userId: this.$store.getters.userId,
        time: this.lastSevenList
      })
      if (res.status == 1 && res.data.length > 0) {
        //七天事件总工作量
        this.lastWeekTaskAmount = res.data.length
        res.data.map((item) => {
          let time = item.time.substring(5, 7) + '.' + item.time.substring(8, 10)
          let index = this.weekList.indexOf(time)
          //将item设置到对应的series里面
          //series[0]是目标量 series[1]是完成量
          if (item.checkBox) {
            //事件已完成 放进series[1]完成量
            this.weekTickData['series'][1]['data'][index]++
            this.lastWeekTaskComple++
            this.weekTickPercent['series'][0]['data'][0]['value']++
          } else {
            //这是最近七天task饼状图的
            this.weekTickPercent['series'][0]['data'][1]['value']++
          }
          //目标量 是该天全部的量
          this.weekTickData['series'][0]['data'][index]++

        })
      }
    },
    //获取最近七天的专注
    async getWeekFocus () {
      const res = await request('focus', 'getWeekFocus', {
        userId: this.$store.getters.userId,
        time: this.lastSevenList
      })

      if (res.status == 1 && res.data.length > 0) {
        this.lastWeekFocusAmount = res.data.length;
        res.data.map(item => {
          let time = item.day.substring(5, 7) + '.' + item.day.substring(8, 10)
          let index = this.weekList.indexOf(time)
          this.lastWeekFocusTime += parseInt(item.duration)
          this.weekFocusData['series'][0]['data'][index]++
        })
      }
    },
    changeCurrent (e) {
      this.current = e.detail.current
    },
    tabChange (cur) {
      this.current = cur
    }
  }
}
</script>
<style lang="scss" scope>
.container {
  min-height: 100vh;
  background-color: rgb(240, 240, 240);
}
.tab-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  // background-color: #e6e6e6;
  color: #bfbfbf;
  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: smaller;
    font-weight: 700;
    font-family: fantasy;
    .current {
      color: #ffc90e;
    }
    .current-line {
      background-color: #ffc90e;
    }
    image {
      width: 8vw;
      height: 8vw;
      padding: 2vw;
      padding-bottom: 1px;
    }
    .line {
      width: 8vw;
      height: 2px;
      margin-top: 3px;
    }
  }
}
.swiper-item {
  .box-wrap {
    padding: 5vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .num-box {
      width: 40vw;
      height: 12vh;
      border-radius: 5px;
      color: white;
      padding: 4px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .number {
        font-weight: bold;
        font-size: 20px;
        padding-right: 4px;
      }
    }
  }
  .box-cell {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    width: 90vw;
    margin: 0 auto;
    margin-bottom: 5vh;
    .box-title {
      font-size: 14px;
      padding: 8px;
    }
  }
  .free {
    text-align: center;
    padding: 10vh 0;
    color: gray;
    font-family: monospace;
    image {
      width: 10vw;
      height: 10vw;
    }
  }
  .charts-box {
    width: 100%;
    height: 300px;
  }
}
</style>