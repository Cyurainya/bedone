
<template>
  <view>

    <u-skeleton :loading="loading"
                :animation="true"
                bgColor="#FFF"></u-skeleton>
    <u-top-tips ref="uTips"></u-top-tips>
    <u-toast ref="uToast" />
    <u-popup v-model="showTask"
             mode="bottom"
             safe-area-inset-bottom="true">
      <view class="u-skeleton">
        <view class="popView">
          <view class="popTitle">

            {{taskOperation == 'add' ? '添加新任务' :'编辑任务'}}
          </view>
          <view class="titleBox">
            <u-input placeholder="准备做点什么呀"
                     placeholder-style="font-size:0.8rem;color:#8a8a8a"
                     v-model="selectTask.title"
                     clearable="true"
                     focus="true" />
            <text style="color:#ffc90e;width:12vw;text-align:center;font-size: small;"
                  @click="taskEdit">
              {{taskOperation == 'add' ? '添加' :'完成'}}

            </text>
          </view>

          <u-input placeholder="描述详细一点？"
                   clearable="true"
                   v-model="selectTask.detail"
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
              <text>{{selectTag !=='selectDate' ? '选择日期' :selectTask.time}}</text>
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
    <view>
      <u-collapse :head-style="itemStyle">
        <u-collapse-item title="已完成"
                         class="todolist complete"
                         v-show="completeList.length > 0">
          <u-swipe-action :show="item.show"
                          :index="index"
                          v-for="(item, index) in completeList"
                          :key="item.id"
                          @click="clickComplete"
                          @open="openComplete"
                          :options="optionsComple">
            <view class="complete-item u-border-bottom">
              <view class="title-wrap">
                <text class="complete-title">{{item.title}}</text>
              </view>
            </view>
          </u-swipe-action>
        </u-collapse-item>
      </u-collapse>

      <view class="todolist about">
        待完成
      </view>
      <u-swipe-action :show="item.showSwipe"
                      :index="index"
                      v-for="(item, index) in list"
                      :key="item.id"
                      @click="click"
                      @open="open"
                      :options="options"
                      style="width:100vw;background-color:yellow">

        <view class="title-wrap">
          <view class="insideBox">
            <u-checkbox @change="checkboxChange(index)"
                        v-model="item.checkBox"
                        :name="item.title"
                        active-color="#ffc90e"
                        class="checkbox"
                        size=50>

            </u-checkbox>
            <view class="nameBox">

              <view class="title">
                {{item.title}}
              </view>
              <view class="detail">{{item.detail}}</view>
            </view>
          </view>

        </view>

      </u-swipe-action>
    </view>
    <view>
      <image src="/static/add.png"
             mode=""
             class="addBtn"
             @click="addTask('add')" />
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
          time: '2021-04-16',
          checkBox: false,
          showSwipe: false,
        },
        {
          id: 2,
          title: '完成数据库',
          detail: '搞掂晒',
          userId: '6072ba34c1a7260001d8dbed',
          time: '2021-04-17',
          checkBox: false,
          showSwipe: false,
        },
        {
          id: 3,
          title: '完成list',
          detail: '搞掂晒',
          userId: '6072ba34c1a7260001d8dbed',
          time: '2021-04-19',
          checkBox: false,
          showSwipe: false,
        },
        {
          id: 4,
          title: '完成界面',
          detail: '搞掂晒',
          userId: '6072ba34c1a7260001d8dbed',
          time: '',
          checkBox: false,
          showSwipe: false,
        },
      ],
      completeList: [
        {
          id: 4,
          title: '完成啦',
          detail: '搞掂晒',
          userId: '6072ba34c1a7260001d8dbed',
          time: '2021-04-20',
          checkBox: false,
          showSwipe: false,
        },
      ],
      options: [
        {
          text: '编辑',
          style: {
            backgroundColor: '#ffc90e',
          },
        },
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d',
          },
        },
      ],
      optionsComple: [
        {
          text: '撤销',
          style: {
            backgroundColor: '#ffc90e',
          },
        },
      ],
      showTask: false,
      showCalendar: false,
      calendarMode: 'date',
      loading: true,
      selectTag: 'today',
      deleteShow: false,
      disabled: false,
      btnWidth: 180,
      show: false,
      taskOperation: 'add',
      selectTask: {
        id: 0,
        title: '',
        detail: '',
        userId: '', //userid
        time: '',
        checkBox: false,
        swipe: false,
      },
      itemStyle: {
        backgroundColor: '#ffc90e80',
        color: 'white',
        textAlign: 'center !important',
        lineHeight: '5vh',
        height: '5vh',
      },
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
      let d = new Date()
      return this.$u.timeFormat(d, 'yyyy-mm-dd')
    },
    tomorrow() {
      let dd = new Date()
      dd.setDate(dd.getDate() + 1)
      return this.$u.timeFormat(dd, 'yyyy-mm-dd')
    },
  },
  methods: {
    checkboxChange(index) {
      //已完成
      this.completeList.push(this.list[index])
      this.list.splice(index, 1)
      this.$refs.uToast.show({
        title: '已完成',
        type: 'success',
      })
    },
    addTask(taskOpera) {
      this.taskOperation = taskOpera
      this.selectTask = {}
      this.showTask = true
    },
    tagClick(opera) {
      if (opera == 'today') {
        this.selectTag = 'today'
        this.selectTask.time = this.today
      } else if (opera == 'tomorrow') {
        this.selectTag = 'tomorrow'
        this.selectTask.time = this.tomorrow
      } else if (opera == 'selectDate') {
        this.selectTag = 'selectDate'
        this.showCalendar = true //然后转换到calendar事件
      } else if (opera == 'noSet') {
        this.selectTag = 'noSet'
        this.selectTask.time = ''
      }
      console.log(this.selectTask.time)
    },
    changeDate(e) {
      console.log(e)
      this.selectTask.time = e.result
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
        this.deleteShow = true
        this.list.splice(index, 1)
        this.$refs.uTips.show({
          title: '删除成功',
          type: 'success',
          duration: '2300',
        })
      } else {
        //编辑
        this.list[index].show = false
        this.taskOperation = 'edit'
        let selectTask = this.list[index]
        this.selectTask = selectTask
        this.showTask = true
        if (this.selectTask.time == this.today) {
          this.selectTag = 'today'
        } else if (this.selectTask.time == this.tomorrow) {
          this.selectTag = 'tomorrow'
        } else if (this.selectTask.time.length === 0) {
          this.selectTag = 'noSet'
        } else {
          this.selectTag = 'selectDate'
          this.dateResult = this.selectTask.time
        }
        //然后更改新的 也就更新日期 其实就是tagClick的转换事件
      }
    },

    open(index) {
      this.list[index].showSwipe = true
      this.list.map((val, idx) => {
        if (index != idx) this.list[idx].showSwipe = false
      })
    },
    taskEdit() {
      this.selectTask.userId = this.$store.getters.userId
      this.selectTask.checkBox = false
      this.selectTask.swipe = false
      this.selectTask.time = this.today
      if (this.taskOperation == 'add') {
        //添加完成
        this.selectTask.id = this.list.length + 1 //不用传进数据库
        this.selectTask.checkBox = false
        this.selectTask.swipe = false
        this.list.push(this.selectTask)
      } else {
        //编辑完成
        let id = this.selectTask.id
        this.list.map((val, idx) => {
          if (val.id === id) {
            this.list[idx] = this.selectTask
            this.list[idx].show = false
          }
        })
      }
      this.showTask = false
    },
    clickComplete(index) {
      //撤销已完成
      this.list.push(this.completeList[index])
      this.completeList.splice(index, 1)
      this.$refs.uToast.show({
        title: '撤销成功',
        type: 'success',
      })
    },
    openComplete(index) {
      this.completeList[index].showSwipe = true
      this.completeList.map((val, idx) => {
        if (index != idx) this.list[idx].showSwipe = false
      })
    },
  },
}
</script>
<style scoped lang="scss">
.addBtn {
  position: absolute;
  width: 18vw;
  height: 18vw;
  right: 5vw;
  bottom: 10vh;
}
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
  padding-top: 0;

  .popTitle {
    text-align: center;
    color: $main-color-yellow;
    padding: 2vh 0;
    font-weight: bold;
    font-size: 4vw;
  }
}
.titleBox {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
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
.title-wrap {
  display: flex;
}
.insideBox {
  display: flex;
  align-items: center;
  padding: 4vh;
  padding-top: 2vh;
}
.todolist {
  height: 5vh;
  width: 100vw;
  color: white;
  line-height: 5vh;
}
.about {
  background-color: rgba($color: #007aff, $alpha: 0.5);
}
.complete-item {
  height: 6vh;
  padding-left: 5vw;
  line-height: 6vh;
}
.complete-title {
  text-decoration: line-through;
}
</style>