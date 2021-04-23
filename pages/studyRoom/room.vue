<template>
  <view>room</view>
</template>

<script>
export default {
  onLoad (options) {
    uni.setNavigationBarTitle({
      title: options.name
    });
  }
}
</script>

<style>
</style>