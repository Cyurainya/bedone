/* eslint-disable no-undef */
<template>
  <view class="content">
    <image class="logo"
           src="/static/logo.png" />
    <view class="login-button"
          @click="showLogin">
      微信一键登录
    </view>

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
import pop from '@/components/ming-pop/ming-pop.vue'

export default {
  components: { pop },
  data () {
    return {
      title: 'Hello'
    }
  },
  onLoad () {

  },
  methods: {
    async showLogin () {
      // const code = await wxLogin();
      // const res = await myRequest('wxlogin', code)
      // console.log(res)

      this.$refs.pop.show();

    }
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
}
</style>
