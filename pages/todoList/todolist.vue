
<template>
  <view>
    <u-calendar v-model="pageCalendar"
                min-date="1975-04-15"
                max-date="2222-01-01"
                @change="toCalendarPage"></u-calendar>
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
      <view class="nav-bar"
            :style="{height:navBarHeight + 'px',paddingTop:navTop + 'px',paddingBottom:navPaddingBottom + 'px'}">
        <view class="navbtn">
          <u-icon name="calendar-fill"
                  color="#000000"
                  size='45'
                  @click="toDayPage"></u-icon>
        </view>
        <text>
          待办
        </text>

      </view>
      <view class="todolist about"
            v-if="expiredList.length > 0">
        <view>
          过期日程
        </view>

      </view>

      <u-swipe-action :show="item.showSwipe"
                      :index="index"
                      v-for="(item, index) in expiredList"
                      :key="item._id"
                      @click="click"
                      @open="open(index,'expired')"
                      :options="options">
        <view class="swipeView">
          <u-checkbox @change="checkboxChange('expired',index,item.checkBox)"
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
            <view class="detail"
                  v-show="item.detail !== undefined ">{{item.detail}}
              <text>{{item.time}}</text>

            </view>
          </view>

        </view>

      </u-swipe-action>

      <view class="todolist about">
        <view>
          今日日程
        </view>

      </view>
      <u-swipe-action :show="item.showSwipe"
                      :index="index"
                      v-for="(item, index) in list"
                      :key="item._id"
                      @click="click"
                      @open="open(index,'list')"
                      :options="options">
        <view class="swipeView">
          <u-checkbox @change="checkboxChange('list',index,item.checkBox)"
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
            <view class="detail"
                  v-show="item.detail !== undefined">{{ item.detail}}</view>
          </view>
        </view>

      </u-swipe-action>
      <u-collapse :head-style="itemStyle">
        <u-collapse-item title="后续日程"
                         class="todolist complete"
                         v-if="laterList.length > 0">
          <u-swipe-action :show="item.showSwipe"
                          :index="index"
                          v-for="(item, index) in laterList"
                          :key="item._id"
                          @click="click"
                          @open="open(index,'later')"
                          :options="options">
            <view class="swipeView">
              <u-checkbox @change="checkboxChange('later',index,item.checkBox)"
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
                <view class="detail"
                      v-show="item.detail !== undefined ">{{item.detail}}
                  <text style="color:red;padding:0 3vw">{{item.time}}</text>

                </view>
              </view>

            </view>

          </u-swipe-action>
        </u-collapse-item>
      </u-collapse>
    </view>

    <view>
      <view @click="addTask('add')"
            class="addBtn">
        +
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
      list: [], //今天待办的任务
      expiredList: [], //当前用户的已完成或者过期的任务
      laterList: [], //后续待办的任务
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
      showTask: false,
      showCalendar: false,
      calendarMode: 'date',
      loading: true,
      selectTag: 'today',//任务弹窗的默认日期
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
        color: '#ffc90e',
        textAlign: 'center !important',
        lineHeight: '5vh',
        height: '5vh',
        borderBottom: '1px solid #ffc90e',
      },

      openlist: [],
      pageCalendar: false
    }
  },
  onLoad () {

    // 通过延时模拟向后端请求数据，调隐藏骨架屏
    setTimeout(() => {
      this.loading = false
    }, 2000);

  },
  mounted () {
    this.getTask()
  },
  computed: {
    today () {
      let d = new Date()
      return this.$u.timeFormat(d, 'yyyy-mm-dd')
    },
    tomorrow () {
      let dd = new Date()
      dd.setDate(dd.getDate() + 1)
      return this.$u.timeFormat(dd, 'yyyy-mm-dd')
    },
    userId () {
      return this.$store.getters.userId
    },
  },
  methods: {
    toCalendarPage (e) {
      uni.navigateTo({
        url: 'dayList?day=' + e.result,
        success: res => {
          console.log(res)
        },
        fail: err => {
          console.log(err)
        }
      });
      console.log(e)
    },
    toDayPage () {
      this.pageCalendar = true
    },
    async getTask () {
      //获取所有task
      const res = await request('task', 'getTask', {
        userId: this.userId,
      })
      //清空
      this.list = [] //今天待办的任务
      this.expiredList = [] //当前用户的已完成或者过期的任务
      this.laterList = [] //后续待办的任务
      //当前用户的已完成或者过期的任务
      res.data.map((item) => {
        if (item.time < this.today && item.checkBox == false) {
          this.expiredList.push(item)
        }
      })

      //今天待办的任务
      res.data.map((item) => {
        if (item.time === this.today) {
          this.list.push(item)
        }
      })

      //后续待办的任务
      res.data.map((item) => {
        if (item.time > this.today) {
          this.laterList.push(item)
        }
      })

      //对后续任务进行事件排序
      this.laterList.reduce((a, b) => {
        return a.time - b.time
      }, [])
    },

    async checkboxChange (list, index, checked) {
      if (list == 'list') this.openlist = this.list
      else if (list == 'expired') this.openlist = this.expiredList
      else if (list == 'later') this.openlist = this.laterList
      if (!checked) {
        //完成事件
        const res = await request('task', 'checkTask', {
          _id: this.openlist[index]._id,
        })
        if (res.status == 1) {
          this.$refs.uToast.show({
            title: '已完成',
            type: 'success',
          })
        }
        if (list == 'expired') {
          this.openlist.splice(index, 1)
        }
      } else {
        const res = await request('task', 'revokeTask', {
          _id: this.openlist[index]._id,
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
      this.selectTask.time = this.today
      this.showTask = true
    },
    tagClick (opera) {
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
    },
    changeDate (e) {

      this.selectTask.time = e.result
    },
    async click (index, index1) {

      if (index1 == 1) {
        const res = await request('task', 'deleteTask', {
          _id: this.openlist[index]._id,
        })
        if (res.status == 1) {
          this.openlist.splice(index, 1)
          this.$refs.uTips.show({
            title: '删除成功',
            type: 'success',
            duration: '2300',
          })
        }

      } else {
        //编辑
        this.openlist[index].show = false
        this.taskOperation = 'edit'
        this.selectTask = this.openlist[index] //已经获得当前task信息 没必要再做一次请求了
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

    open (index, list) {
      if (list == 'list') this.openlist = this.list
      else if (list == 'expired') this.openlist = this.expiredList
      else if (list == 'later') this.openlist = this.laterList

      this.openlist[index].showSwipe = true
      this.openlist.map((val, idx) => {
        if (index != idx) this.openlist[idx].showSwipe = false
      })
    },

    async taskEdit () {
      if (this.taskOperation == 'add') {
        //添加完成
        const res = await request('task', 'addTask', {
          title: this.selectTask.title,
          detail: this.selectTask.detail,
          userId: this.userId,
          time: this.selectTask.time,
        })
        if (res.status == 1) {
          this.$refs.uToast.show({
            title: '添加成功',
            type: 'success',
          })



        } else if (res.status == 0) {
          this.$refs.uToast.show({
            title: '添加失败',
            type: 'error',
          })
        }
      } else {
        //编辑完成
        const res = request('task', 'editTask', {
          title: this.selectTask.title,
          detail: this.selectTask.detail,
          time: this.selectTask.time,
          _id: this.selectTask._id,
        })
        if (res.status == 1) {
          this.$refs.uToast.show({
            title: '编辑成功',
            type: 'success',
          })
          this.openlist.map((val, idx) => {
            if (val._id === _id) {
              this.openlist[idx] = this.selectTask
              this.openlist[idx].show = false
            }
          })

        } else if (res.status == 0) {
          this.$refs.uToast.show({
            title: '编辑失败',
            type: 'error',
          })
        }
      }
      this.showTask = false
      //如果是后续事件的话需要改界面
      this.getTask()
    }

  },
}
</script>
<style scoped lang="scss">
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
.nameBox {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
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
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    font-size: 3vw;
    line-height: normal;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text {
      color: red;
      padding: 0 3vw;
      width: 26vw;
      text-align: center;
    }
  }
}

.todolist {
  height: 5vh;
  width: 100vw;
  color: white;
  line-height: 5vh;
}
.about {
  background-color: #ffc90e80;
  display: flex;
  justify-content: space-between;
  color: #ffc90e;
}

.nav-bar {
  display: flex;
  text-align: center;
  align-items: center;
  background-color: rgb(248, 248, 248);
  font-size: 30rpx;
  .navbtn {
    position: absolute;
    margin-left: 2vw;
  }
  text {
    margin: 0 auto;
  }
}
</style>