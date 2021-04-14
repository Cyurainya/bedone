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
  </view>
</template>

<script scoped>
import loginMpWx from '@/utils/login/login-mp.js'
export default {
  mixins: [loginMpWx]
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
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 3vw 0;
  font-size: 30rpx;
}
.username{
	font-weight: bold;
}
</style>