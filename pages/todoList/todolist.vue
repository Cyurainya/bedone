
<template>
  <view>

    <u-skeleton :loading="loading"
                :animation="true"
                bgColor="#FFF"></u-skeleton>
    <u-popup v-model="showTask"
             mode="bottom"
             border-radius="20"
             safe-area-inset-bottom="true">
      <view class="u-skeleton">
        <view class="popView">
          <view class="titleBox">
            <u-input placeholder="准备做点什么呀"
                     placeholder-style="font-size:0.8rem;color:#8a8a8a"
                     clearable="true"
                     focus="true" />
            <text style="color:#ffc90e;width:12vw;text-align:center;font-size: small;">添加</text>
          </view>

          <u-input placeholder="描述详细一点？"
                   clearable="true"
                   auto-height="true" />
          <u-line class="u-line"
                  color="#8a8a8a"></u-line>
          <view style="padding:1vh;display:flex;justify-content:space-around;flex-wrap: wrap;">
            <view v-bind:class="[selectTag =='today' ? 'date-tag-now' : 'date-tag']"
                  @click="tagClick('today')">今天</view>
            <view v-bind:class="[selectTag =='tomorrow' ? 'date-tag-now' : 'date-tag']"
                  @click="tagClick('tomorrow')">明天</view>
            <view v-bind:class="[selectTag =='selectDate' ? 'date-tag-now' : 'date-tag']"
                  @click="tagClick('selectDate')">
              <text v-show="dateResult == 0">选择日期</text>
              <text v-show="dateResult !== 0">{{dateResult}}</text>
              <u-icon name="arrow-down-fill"></u-icon>

            </view>

            <view v-bind:class="[selectTag =='noSet' ? 'date-tag-now' : 'date-tag']"
                  @click="tagClick('noSet')">不设置</view>
          </view>

        </view>
      </view>
    </u-popup>
    <u-calendar v-model="showCalendar"
                :mode="calendarMode"
                safe-area-inset-bottom="true"
                min-date="2021-04-15"
                max-date="2222-01-01"
                @change="changeDate"></u-calendar>
    <u-popup v-model="deleteShow"
             border-radius="20"
             closeable="true"
             mode="center">
      <view class="deleteBox">
        <view>
          删除
        </view>
        <text>
          {{deleTitle}}
        </text>

        <u-button type="error"
                  style="margin-top:5vh"
                  @click="deleteComfir(deleteId)">确定删除</u-button>
      </view>
    </u-popup>
    <view>

      <u-swipe-action :show="item.swipe"
                      :index="index"
                      v-for="(item, index) in list"
                      :key="item.id"
                      @click="click"
                      @open="open"
                      :options="options">
        <!-- <view class="title-wrap">
          <text class="title u-line-2">{{ item.title }}</text>
        </view> -->

        <view class="title-wrap">
          <u-checkbox @change="checkboxChange"
                      v-model="item.checkBox"
                      :name="item.title"
                      size=50>

          </u-checkbox>
          <view class="nameBox">
            <view class="title">
              {{item.title}}
            </view>
            <view class="detail">{{item.detail}}</view>
          </view>
        </view>

        <!-- <image src="/static/delete.png"
               class="delete"
               @click="deleteTask(item.title,item.id)" /> -->

      </u-swipe-action>
    </view>
    <view>
      <image src="/static/add.png"
             mode=""
             class="addBtn"
             @click="addTask" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          title: '完成原型',
          detail: '搞掂晒',
          userId: '6072ba34c1a7260001d8dbed',
          time: '2021-04-15',
          checkBox: false,
          swipe: false,
        },
        {
          id: 2,
          title: '完成数据库',
          detail: '搞掂晒',
          userId: '6072ba34c1a7260001d8dbed',
          time: '2021-04-15',
          checkBox: false,
          swipe: false,
        },
        {
          id: 3,
          title: '完成list',
          detail: '搞掂晒',
          userId: '6072ba34c1a7260001d8dbed',
          time: '2021-04-15',
          checkBox: false,
          swipe: false,
        },
      ],
      options: [
        {
          text: '收藏',
          style: {
            backgroundColor: '#007aff',
          },
        },
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d',
          },
        },
      ],
      showTask: false,
      showCalendar: false,
      calendarMode: 'date',
      loading: true,
      selectTag: 'today',
      dateResult: 0,
      selectTask: {},
      deleTitle: '',
      deleId: 0,
      deleteShow: false,
      disabled: false,
      btnWidth: 180,
      show: false,
    }
  },
  onLoad() {
    // 通过延时模拟向后端请求数据，调隐藏骨架屏
    setTimeout(() => {
      this.loading = false
    }, 2000)
  },
  computed: {
    today() {
      let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    },
  },
  methods: {
    checkboxChange(e) {
      console.log(e)
    },
    addTask() {
      this.showTask = true
    },
    tagClick(opera) {
      if (opera == 'today') {
        this.selectTag = 'today'
      } else if (opera == 'tomorrow') {
        this.selectTag = 'tomorrow'
      } else if (opera == 'selectDate') {
        this.selectTag = 'selectDate'
        this.showCalendar = true
      } else if (opera == 'noSet') {
        this.selectTag = 'noSet'
      }
    },
    changeDate(e) {
      this.dateResult = e.result
    },
    deleteTask(title, id) {
      this.deleteShow = true
      this.deleTitle = title
      this.deleId = id
    },
    deleteComfir(id) {
      this.deleteShow = false
      console.log(id)
    },
    click(index, index1) {
      if (index1 == 1) {
        this.list.splice(index, 1)
        this.$u.toast(`删除了第${index}个cell`)
      } else {
        this.list[index].show = false
        this.$u.toast(`收藏成功`)
      }
    },
    // 如果打开一个的时候，不需要关闭其他，则无需实现本方法
    open(index) {
      // 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
      // 原本为'false'，再次设置为'false'会无效
      this.list[index].show = true
      this.list.map((val, idx) => {
        if (index != idx) this.list[idx].show = false
      })
    },
  },
}
</script>
<style scoped lang="scss">
.addBtn {
  position: absolute;
  width: 20vw;
  height: 20vw;
  right: 5vw;
  bottom: 10vh;
}
// .list {
//   display: flex;
//   padding: 3vh 5vw;
//   justify-content: space-between;
//   align-items: center;
// }
.nameBox {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.title {
  color: black;
  font-weight: bold;
}
.detail {
  color: grey;
}
.popView {
  padding: 3vw;
}
.titleBox {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.now-tabBtn {
  color: white;
  background-color: #ffc90e;
  border-color: #ffc90e;
}
.date-tag-now {
  border-radius: 5vw;
  font-size: 3vw;
  color: white;
  background-color: $main-color-yellow;
  text-align: center;
  padding: 1vh 4vw;
  margin: 1vh 2vw;
}
.date-tag {
  border-radius: 5vw;
  font-size: 3vw;
  color: $main-color-grey;
  background-color: $main-color-miGrey;
  text-align: center;
  padding: 1vh 4vw;
  margin: 1vh 2vw;
}
.delete {
  width: 5vw;
  height: 5vw;
}
.deleteBox {
  padding: 10vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text {
    font-weight: bold;
    font-size: 5vw;
    margin-top: 3vh;
  }
}
</style>