<template>
  <view>
    <u-popup v-model="createShow"
             border-radius="20"
             mode="center">
      <view class="popView">

        <u-input v-model="createName"
                 placeholder="输入自习室名字" />
        <view class="actionBtn"
              @click="createRoom">创建</view>
      </view>
    </u-popup>
    <u-popup v-model="joinShow"
             border-radius="20"
             mode="center">
      <view class="popView">
        <u-input v-model="joinName"
                 placeholder="输入自习室名字" />
        <view class="actionBtn"
              @click="joinRoom">加入</view>
      </view>
    </u-popup>
    <view class="btn">
      <u-button type="primary"
                @click="createBtn">创建自习室</u-button>
      <u-button type="warning"
                @click="joinBtn">加入自习室</u-button>
    </view>

  </view>
</template>

<script>
import { request } from '@/utils/request/request.js'
export default {
  data () {
    return {
      createShow: false,
      joinShow: false,
      createName: '',
      joinName: '',
    }
  },
  onShow () {
    Object.assign(this.$data, this.$options.data());
  },
  methods: {
    createBtn () {
      this.createName = ''
      this.createShow = true;
    },
    joinBtn () {
      this.joinName = ''
      this.joinShow = true;
    },
    async createRoom () {
      this.createShow = true
      const res = await request('studyRoom', 'addRoom', {
        name: this.createName
      })

      if (res.status == 1) {
        //res.data.id是id 就只有id
        let roomToken = {
          roomId: res.data.id,
          roomName: this.createName,
          userId: this.$store.getters.userId,
          nickname: this.$store.getters.userName,
          avatar: this.$store.getters.userAvatar
        }
        let roomTokenAsJsonString = JSON.stringify(roomToken)
        uni.navigateTo({
          url: "room?roomToken=" + roomTokenAsJsonString,
          success: () => {
            this.createName = ''
            this.createShow = false;
          },
          fail: err => {
            console.log(err)
          }
        });
      } else if (res.status == 2) {
        uni.showToast({
          title: '房间名字已存在',
          duration: 2000,
          icon: 'none'
        });
      }

    },
    async joinRoom () {
      this.joinShow = true
      const res = await request('studyRoom', 'checkName', {
        name: this.joinName
      })
      if (res.status == 2) {
        //没有房间
        uni.showToast({
          title: '没有该自习室 请重新输入名字',
          duration: 2000,
          icon: 'none'
        });
      } else {
        //res.data.data[0]._id是id   
        //res.data.data[0].name是名字
        let roomToken = {
          roomId: res.data.data[0]._id,
          roomName: this.joinName,
          userId: this.$store.getters.userId,
          nickname: this.$store.getters.userName,
          avatar: this.$store.getters.userAvatar
        }
        let roomTokenAsJsonString = JSON.stringify(roomToken)
        uni.navigateTo({
          url: "room?roomToken=" + roomTokenAsJsonString,
          success: () => {
            this.joinName = ''
            this.joinShow = false;
          },
          fail: err => {
            console.log(err)
          }
        });
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50vw;
  margin: 0 auto;
}
.popView {
  display: flex;
  flex-direction: column;
  padding: 2vw;
  .actionBtn {
    height: 5vh;
    width: 30vw;
    color: white;
    background-color: $main-color-yellow;
    text-align: center;
    line-height: 5vh;
    margin: 0 auto;
    border-radius: 10%;
    margin-top: 2vh;
  }
}
</style>