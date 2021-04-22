<template>
  <view>
    <u-toast ref="uToast" />
    <view @click="addTask('add')"
          class="addBtn">
      +
    </view>
    <u-picker mode="time"
              v-model="calendar"
              :default-time="day"
              @confirm="confirmTime"></u-picker>
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

        </view>
      </view>
    </u-popup>
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
    <u-swipe-action :show="item.showSwipe"
                    :index="index"
                    v-for="(item, index) in taskList"
                    :key="item._id"
                    @click="click"
                    @open="open(index)"
                    :options="options">
      <view class="swipeView">
        <u-checkbox @change="checkboxChange"
                    v-model="item.checkBox"
                    active-color="#ffc90e"
                    :name="index"
                    class="checkBox">

        </u-checkbox>
        <view class="nameBox"
              :style="{textDecoration:item.checkBox?'line-through':'none'}">

          <view class="title">
            {{item.title}}
          </view>
          <view class="detail">{{item.detail}}</view>
        </view>
      </view>

    </u-swipe-action>
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
      showTask: false,
      params: {
        year: true,
        month: true,
        day: true,
        hour: false,
        minute: false,
        second: false,
      },
      taskOperation: 'add',
      selectTask: {},
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
    }
  },
  onLoad: function (option) {
    this.day = option.day

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
      uni.navigateBack();
    },
    async click (index, index1) {
      if (index1 == 1) {
        const res = await request('task', 'deleteTask', {
          _id: this.taskList[index]._id,
        })
        if (res.status == 1) {
          this.taskList.splice(index, 1)
          this.$refs.uToast.show({
            title: '删除成功',
            type: 'success',
            duration: '2300',
          })
        }
      } else {
        this.taskList[index].show = false
        this.taskOperation = 'edit'
        this.selectTask = this.taskList[index]
        this.showTask = true
      }
    },
    open (index) {
      this.taskList[index].showSwipe = true
      this.taskList.map((val, idx) => {

        if (index != idx) {
          console.log(idx)
          this.taskList[idx].showSwipe = false
        }
      })
    },
    async checkboxChange (e) {
      if (e.value) {
        //完成事件
        const res = await request('task', 'checkTask', {
          _id: this.taskList[e.name]._id,
        })
        if (res.status == 1) {
          this.$refs.uToast.show({
            title: '已完成',
            type: 'success',
          })
        }
      } else {
        const res = await request('task', 'revokeTask', {
          _id: this.taskList[e.name]._id,
        })
        if (res.status == 1) {
          this.$refs.uToast.show({
            title: '已撤销',
            type: 'success',
          })
        }
      }
    },
    addTask (taskOpera) {
      this.taskOperation = taskOpera
      this.selectTask = {}
      this.showTask = true
    },
    async taskEdit () {
      if (this.taskOperation == 'add') {
        //添加事件
        const res = await request('task', 'addTask', {
          userId: this.$store.getters.userId,
          time: this.day,
          title: this.selectTask.title,
          detail: this.selectTask.detail,
        })
        if (res.status == 1) {
          this.$refs.uToast.show({
            title: '添加成功',
            type: 'success',
          })

        }
      } else {
        const res = request('task', 'editTask', {
          title: this.selectTask.title,
          detail: this.selectTask.detail,
          time: this.day,
          _id: this.selectTask._id,
        })
        if (res.status == 1) {
          this.$refs.uToast.show({
            title: '修改成功',
            type: 'success',
          })

        }
      }
      this.getTaskByDay();
      this.showTask = false
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
  .titleBox {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
}
.swipeView {
  display: flex;
  padding: 1vh 0;
  height: 8vh;
  align-items: center;
  padding-left: 2vw;
  line-height: auto;
  .checkBox {
    height: initial;
  }
  .title {
    color: black;
    font-weight: 500;
    line-height: normal;
    font-size: 3.5vw;
    font-variant: diagonal-fractions;
  }
  .detail {
    color: grey;
    display: flex;
    font-size: 3vw;
    line-height: normal;
    view {
      padding-right: 3vw;
    }
  }
}
.addBtn {
  position: fixed;
  width: 16vw;
  height: 16vw;
  right: 5vw;
  bottom: 5vw;
  border: 1px solid #ffc90e;
  -webkit-border-radius: 18vw;
  border-radius: 18vw;
  background-color: #ffc90e;
  text-align: center;
  line-height: 14vw;
  font-size: 10vw;
  color: white;
}
.addBtn :hover {
  box-shadow: 0 8px 16px 0 #e6e6e6, 0 6px 20px 0 #e6e6e6;
}
</style>