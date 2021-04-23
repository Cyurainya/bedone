<script>
import GoEasy from 'goeasy';
export default {
  globalData: {
    goEasy: GoEasy.getInstance({
      host: 'hangzhou.goeasy.io',
      appkey: 'BC-6ee4e308a51c4908b77b9d2af9134bbe',
    })
  },
  onLaunch: function () {
    console.log('App Launch')
    this.initLogin()
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  methods: {
    async initLogin () {
      const userInfo = uni.getStorageSync('userInfo')
      if (userInfo) {
        this.$store.dispatch('setUserData', userInfo)
      } else {
        this.$util.msg('请先登录')
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/mine/mine',
            success (res) {
              console.log(res)
            },
            fail (err) {
              console.log(err)
            },
          })
        }, 1000)
      }
    },
  },
}
</script>
<style lang="scss">
@import 'uview-ui/index.scss';
@import 'uni.scss';
</style>
