<template name='LoginPop'>
  <view>
    <button @tap="childClick">点击我 </button>
    <view class="child"> hi {{showModal}}</view>
    <view>psync同步(child):{{syncDate}}</view>
  </view>

</template>

<script>
export default {
  name: 'LoginPop',
  props: {
    showModal: {
      type: String,
      default: 'hello',
    },
    syncDate: {
      type: String,
      default: 'hello',
    },
  },

  data() {
    return {
      childdata: 'child value',
    }
  },
  methods: {
    childClick() {
      console.info(this.childdata)
      this.$emit('changes', this.childdata)
    },
  },
}
</script>

<style>
</style>