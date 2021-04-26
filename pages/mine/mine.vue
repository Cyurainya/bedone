/* eslint-disable vue/max-attributes-per-line */
<template>
  <view>
    <view class="me-cell">
      <button v-show="!userId"
              class="login-button"
              open-type="getUserInfo"
              @getuserinfo="mpWxLogin">
        授权登录
      </button>

      <u-avatar v-show="userId"
                :src="userInfo.avatar"
                size="large" />

      <text v-show="userId"
            class="username">
        {{ userInfo.nickname }}
      </text>
    </view>
    <view class="data-cell"
          @click="dataPage">
      <view class="cell-title">
        <image src="./../../static/data.png"
               mode="" />
        数据统计
      </view>
      <view>＞</view>
    </view>
  </view>
</template>

<script scoped>
import loginMpWx from '@/utils/login/login-mp.js'
export default {
  mixins: [loginMpWx],
  methods: {
    dataPage () {
      uni.navigateTo({
        url: "dataPage",
        success: (res) => {
          console.log(res)
        },
        fail: err => {
          console.log(err)
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
.me-cell {
  //   border-bottom: 1px solid $main-color-grey;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5vw 2vh;
}
.login-button {
  color: white;
  background-color: #43cf7c;
  text-align: center;
  border-radius: 5px;
  margin: 3vw 0;
  font-size: 33rpx;
  width: 80vw;
}
.login-button ::after {
  border: none;
}
.username {
  font-weight: bold;
}
.data-cell {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2vw;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  .cell-title {
    display: flex;
    align-items: center;
    image {
      width: 8vw;
      height: 8vw;
    }
  }
}
</style>