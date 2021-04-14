
<template>
  <view>
    <view>
      <view v-for="(item, index) in list"
            :key="index"
            class="list">

        <u-checkbox @change="checkboxChange"
                    v-model="item.show"
                    :name="item.title">

        </u-checkbox>
        <view>
          <view class="title">
            {{item.title}}

          </view>

        </view>

        <u-icon name="grid-fill"
                size="50"></u-icon>

      </view>
    </view>
    <view>
      <image src="/static/add.png"
             mode=""
             class="addBtn" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          title:
            '完成原型完成原型完成原型完成原型完成原型完成原型完成原型完成原型完成原型完成原型完成原型完成原型完成原型完成原型',
          show: false,
        },
        {
          id: 2,
          title: '完成数据库',
          show: false,
        },
        {
          id: 3,
          title: '完成list',
          show: false,
        },
      ],
      disabled: false,
      btnWidth: 180,
      show: false,
      options: [
        {
          text: '编辑',
          style: {
            backgroundColor: '#007aff',
          },
        },
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d',
          },
        },
      ],
    }
  },
  methods: {
    checkboxChange(e) {
      console.log(e)
    },
  },
}
</script>
<style scoped lang="scss">
.addBtn {
  position: absolute;
  width: 20vw;
  height: 20vw;
  right: 5vw;
  bottom: 10vh;
}
.list {
  display: flex;
  padding: 3vh 5vw;
  justify-content: space-between;
  align-items: center;
}
</style>