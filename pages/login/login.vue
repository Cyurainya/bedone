/* eslint-disable no-undef */
<template>
  <view class="content">
    <image class="logo"
           src="/static/logo.png" />
    <button class="login-button"
            open-type="getUserInfo"
            @getuserinfo="mpWxLogin">
      微信一键登录
    </button>

    <pop ref="pop"
         direction="below"
         :is_close="true"
         :is_mask="true"
         :width="100"
         style="position:absolute">
      我是弹窗需要展示的内容
    </pop>
  </view>
</template>

<script scoped>
import loginMpWx from '@/utils/login/login-mp.js'
export default {
  mixins: [loginMpWx],
  data () {
    return {
      title: 'Hello'
    }
  },
  onLoad () {

  },
  methods: {

  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  /* background-color: rgba(253, 238, 107, 100); */
  height: 100vh;
}

.logo {
  height: 10vh;
  width: 10vh;
}
.login-button {
  width: 70vw;
  height: 8vh;
  background-color: rgba(67, 207, 124, 100);
  font-size: 2vh;
  text-align: center;
  line-height: 8vh;
  border-radius: 0px;
}
</style>
