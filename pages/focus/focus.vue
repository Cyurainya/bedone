<template>
  <view class="container">
    <u-popup v-model="showSelect"
             border-radius="20"
             mode="center">
      <view class="selectBox">

        <slider :value="minute"
                block-size="20"
                max="60"
                activeColor="#ffc90e"
                @changing="changNum"></slider>

        <text>{{minute}} min</text>
        <u-button type="warning"
                  @click="hideShow">确认</u-button>
      </view>

    </u-popup>
    <u-popup v-model="stop"
             border-radius="20"
             mode="center">
      <view class="stopContainer">
        <text>
          能再坚持一下吗?
        </text>
        <view class="btnContain">
          <view class="stopBtn"
                style="background-color:#ffc90e;color:white"
                @click="cancelStop">坚持下去</view>
          <view class="stopBtn"
                style="background-color:#e6e6e6;color:#8a8a8a"
                @click="confirmStop">我要放弃</view>
        </view>
      </view>

    </u-popup>
    <u-popup v-model="finish"
             border-radius="20"
             mode="center">
      <view class="stopContainer">
        <u-image width="50px"
                 height="50px"
                 src="/static/cup.png"></u-image>
        <text style="margin:2vh 0">
          恭喜你完成啦
        </text>

        <view class="stopBtn"
              @click="hideFinish"
              style="background-color:#ffc90e;color:white;width:100%">确认</view>

      </view>
    </u-popup>
    <view class="bottle"
          :style="{'--bottom':bottomNum}">

    </view>
    <view class="timeBox">

      <text class="countDown">{{minute}}:{{second}}</text>
      <text class="setTime"
            @click="setTime"
            v-show="!begin">设置时间</text>
    </view>

    <u-button :type="btnType"
              class="actionBtn"
              ripple="true"
              shape="circle"
              @click="clock">
      <view>

        {{!begin ? ' ▶&nbsp;&nbsp; 开始专注':'▋▋&nbsp;&nbsp;停止'}}

      </view>

    </u-button>

  </view>
</template>

<script>
export default {
  data() {
    return {
      showSelect: false,
      minute: 25,
      begin: false,
      btnType: 'warning',
      second: '00',
      sumTime: 0,
      timer: 0,
      stop: false,
      value: 0,
      finish: false,
      bottomNum: '1%', //buttom的值
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.minute =
        newVal.toString().length == 2 ? newVal : '0' + newVal.toString()
    },
  },
  methods: {
    setTime() {
      this.showSelect = true
    },
    changNum(e) {
      this.value = e.detail.value
    },
    hideShow() {
      this.showSelect = false
    },
    clock() {
      if (!this.begin) {
        //开始啦
        this.begin = true
        this.btnType = 'error'
        this.sumTime = this.minute * 60
        const initSum = this.sumTime //这个不可以动的哦
        //开始计时
        this.timer = setInterval(() => {
          if (this.sumTime > 0) {
            //开始倒计时
            this.minute =
              Math.floor(this.sumTime / 60).toString().length == 2
                ? Math.floor(this.sumTime / 60)
                : '0' + Math.floor(this.sumTime / 60)
            this.second =
              Math.floor(this.sumTime % 60).toString().length == 2
                ? Math.floor(this.sumTime % 60)
                : '0' + Math.floor(this.sumTime % 60)
            this.sumTime--
            this.bottomNum = 100 - (this.sumTime / initSum) * 100 + '%'
          } else {
            //focus时间完美结束啦
            this.second = '00'
            this.sumTime = 0
            this.minute = 25
            this.begin = false
            this.btnType = 'warning'
            this.finish = true
            clearInterval(this.timer)
          }
        }, 1000)
      } else {
        //强行停止 显示stop弹窗
        this.stop = true
      }
    },
    cancelStop() {
      //坚持下去
      this.stop = false
    },
    confirmStop() {
      //强行结束

      //结束定时器
      clearInterval(this.timer)
      this.second = '00'
      this.sumTime = 0
      this.minute = 25
      this.begin = false
      this.btnType = 'warning'
      //关闭弹窗
      this.stop = false
    },
    hideFinish() {
      this.finish = false
    },
  },
}
</script>
<style scoped lang="scss">
.bottle {
  margin: 20vh auto;
  width: 150px;
  height: 225px;
  border-radius: 0 0 20px 20px;
  border: 3px solid black;
  border-top: none;
  position: relative;
  background-color: #ffcb0ea8; //开始的时候是白色
  overflow: hidden;
  text-align: center;
  line-height: 225px;
  margin-bottom: 10vh;
  text {
    color: black;
    font-size: 10vw;
    position: absolute;
    font-weight: bold;
    letter-spacing: 4.6pt;
    right: 0%;
    font-family: verdana, sans-serif;
  }
}
.bottle::before,
.bottle::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 270px;
  border-radius: 55% 45%;
  bottom: var(--bottom); //改变
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  animation: rotate 5s linear infinite;
}
.bottle::after {
  left: 47%;
  bottom: var(--bottom); //改变
  border-radius: 45% 50%;
  opacity: 0.3;
}
@keyframes rotate {
  0% {
    transform: translate(-50%) rotateZ(0deg);
  }
  100% {
    transform: translate(-50%) rotateZ(360deg);
  }
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: helvetica, sans-serif;
  font-weight: bold;
}
.actionBtn {
  width: 150px;
}
.countDown {
  font-family: verdana, sans-serif;
  font-size: 30px;
  font-weight: bold;
  padding: 2vw;
}
.setTime {
  padding: 2vw;
  border-radius: 10%;
  color: #8a8a8a;
  background-color: #e6e6e6;
}
.timeBox {
  position: absolute;
  top: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.selectBox {
  background-color: white;
  width: 70vw;
  padding: 5vw;
  display: flex;
  flex-direction: column;
  text {
    padding: 2vh 0;
    margin: 0 auto;
    font-size: large;
  }
}
.stopContainer {
  background-color: white;
  color: black;
  display: flex;
  padding: 2vw 5vh;
  flex-direction: column;
  font-size: 5vw;
  text-align: center;
  align-items: center;
}
.btnContain {
  display: flex;
  flex-direction: row;
  margin-top: 5vh;
  align-items: center;
}
.stopBtn {
  margin: 0 2vw;
  padding: 2vw;
  border-radius: 5px;
  font-size: 3vw;
}
</style>