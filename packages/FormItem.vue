<template>
  <div class="dhl-form-item">
    <label :style="{width:this.Form.labelWidth}" class="dhl-form-item_label">{{label}}</label>
    <div class="dhl-form-item_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DhlFormItem',
  inject: ['Form'],
  props: {
    label: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
  .dhl-form-item{
    margin-bottom: 25px;
    .dhl-form-item_label{
      text-align: right;
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0 12px 0 0;
      box-sizing: border-box;
    }
    .dhl-form-item_content{
      line-height: 40px;
      position: relative;
      font-size: 14px;
      overflow: hidden;
    }
  }
</style>
