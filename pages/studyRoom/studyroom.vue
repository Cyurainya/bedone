<template>
  <view class="">

    <u-swipe-action :show="item.show"
                    :index="index"
                    v-for="(item, index) in list"
                    :key="index"
                    @click="click"
                    @open="open"
                    :options="options">

      <view class="item u-border-bottom">
        <u-checkbox @change="checkboxChange"
                    v-model="item.checked"
                    :name="item.name">

        </u-checkbox>
        <!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
        <view class="title-wrap">
          <text class="title u-line-2">{{ item.name }}</text>
        </view>
      </view>
    </u-swipe-action>

  </view>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          name: 'apple',
          checked: false,
          disabled: false,
          show: false
        },
        {
          name: 'banner',
          checked: false,
          disabled: false,
          show: false
        },
        {
          name: 'orange',
          checked: false,
          disabled: false,
          show: false
        }
      ],
      disabled: false,
      btnWidth: 180,
      show: false,
      options: [
        {
          text: '收藏',
          style: {
            backgroundColor: '#007aff'
          }
        },
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }
      ]
    };
  },
  methods: {
    // 选中某个复选框时，由checkbox时触发
    checkboxChange (e) {
      console.log(e);
    },
    // 选中任一checkbox时，由checkbox-group触发
    checkboxGroupChange (e) {
      console.log(e);
    },
    // 全选
    checkedAll () {
      this.list.map(val => {
        val.checked = true;
      })
    }
  }
};
</script>