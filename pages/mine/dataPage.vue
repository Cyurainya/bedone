
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
                      <text class="number">3</text>
                      <text>件</text>
                    </view>
                  </view>
                  <view class="num-box"
                        style="background-color: cornflowerblue;">
                    <view class="name-amount">专注时长</view>
                    <view>
                      <text class="number">30</text>
                      <text>min</text>
                    </view>
                  </view>
                </view>
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
                <view class="box-cell">
                  <view class="box-title">专注完成度</view>
                  <view></view>
                  <view class="charts-box">
                    <qiun-data-charts type="rose"
                                      :chartData="lastFocusData"
                                      :echartsH5="true"
                                      :inScrollView="true"
                                      background="none"
                                      position="bottom"
                                      :animation="false" />
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
                    <view class="name-amount">事件总工作量</view>
                    <view>
                      <text class="number">3</text>
                      <text>件</text>
                    </view>
                  </view>
                  <view class="num-box"
                        style="background-color: cornflowerblue;">
                    <view class="name-amount">专注时长</view>
                    <view>
                      <text class="number">30</text>
                      <text>min</text>
                    </view>
                  </view>
                </view>
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
            </scroll-view>

          </swiper-item>
          <swiper-item>
            <view class="swiper-item">
              <scroll-view scroll-y
                           style="height: 100%;width: 100%;">
                <view class="box-wrap">
                  <view class="num-box"
                        style="background-color: lightseagreen;">
                    <view class="name-amount">事件总工作量</view>
                    <view>
                      <text class="number">3</text>
                      <text>件</text>
                    </view>
                  </view>
                  <view class="num-box"
                        style="background-color: cornflowerblue;">
                    <view class="name-amount">专注时长</view>
                    <view>
                      <text class="number">30</text>
                      <text>min</text>
                    </view>
                  </view>
                </view>
                <view class="box-cell">
                  <view class="box-title">事件完成度</view>

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
export default {
  data () {
    return {
      current: 0,
      lastTickData: {
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
      lastFocusData: {
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
      weekTickData: {
        "categories": [
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022"
        ],
        "series": [
          {
            "name": "目标值",
            "data": [
              35,
              36,
              31,
              33,
              13,
              34,
              23
            ]
          },
          {
            "name": "完成量",
            "data": [
              18,
              27,
              21,
              24,
              6,
              28,
              23
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
            "name": "成交量A",
            "data": [
              35,
              8,
              25,
              37,
              4,
              20
            ]
          }
        ]
      }
    }
  },
  computed: {
    today () {
      let d = new Date()
      return this.$u.timeFormat(d, 'yyyy-mm-dd')
    },
  },
  methods: {
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
  .charts-box {
    width: 100%;
    height: 300px;
  }
}
</style>