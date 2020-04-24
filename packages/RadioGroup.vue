<template>
  <div class="dhl-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DhlRadioGroup',
  // dhl-radio-group 接收到了一个value值
  // 将来还要触发当前组件的input事件
  // 将来我们在radio组件里面还要操作到radio-group
  provide () {
    return {
      RadioGroup: this
    }
  },
  props: {
    value: null
  }
}
</script>

<style lang="scss" scoped></style>
