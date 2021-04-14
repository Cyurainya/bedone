<script>
export default {
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
    async initLogin() {
      const userInfo = uni.getStorageSync('userInfo')
      console.log('userInfo-------' + userInfo)
      if (userInfo) {
        this.$store.dispatch('setUserData', userInfo)
      }
    }
  }
}
</script>
<style lang="scss">
@import 'uview-ui/index.scss';
@import  'uni.scss'

</style>
