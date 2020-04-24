<template>
  <div class="dhl-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DhlCheckboxGroup',
  props: {
    value: {
      type: Array
    }
  },
  provide () {
    return {
      Checkboxgroup: this
    }
  }
}
</script>

<style lang="less" scoped>
</style>
