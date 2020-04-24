<template>
  <label class="dhl-radio" :class="{ 'is-checked': label === model }">
    <span class="dhl-radio_input">
      <span class="dhl-radio_inner"></span>
      <!-- v-model属性的绑定的值和value属性绑定的值相等就选中 -->
      <input
        type="radio"
        class="dhl-radio_original"
        :value="label"
        :name="name"
        v-model="model"
      />
    </span>
    <span class="dhl-radio_label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
/*
  provide 与 inject
*/
export default {
  name: 'DhlRadio',
  /* created () {
    console.log(this.$parent)
  }, */
  data () {
    return {}
  },
  inject: {
    RadioGroup: {
      default: ''
    }
  },
  created () {
    console.log(this.RadioGroup)
  },
  props: {
    label: {
      type: [String, Boolean, Number],
      default: ''
    },
    value: null,
    name: {
      type: String,
      default: ''
    }
  },
  // 如果要双向绑定/设置一个计算属性的值,必须要get和set
  computed: {
    model: {
      get () {
        return this.isGroup ? this.RadioGroup.value : this.value
      },
      // this.model = v(label的值)
      set (v) {
        if (this.isGroup) {
          // 自己已经没有input事件
          // 需要触发RadioGroup的input事件
          // 找到RadioGroup,让他触发父元素给自己注册的input事件
          this.RadioGroup.$emit('input', v)
        } else {
          // 触发父元素给自己注册的input事件
          this.$emit('input', v)
        }
      }
    },
    isGroup () {
      return !!this.RadioGroup
    }
  }
}
</script>

<style lang="scss">
.dhl-radio {
  color: #606266;
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
  margin-right: 30px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  .dhl-radio_input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    .dhl-radio_inner {
      border: 1px solid #dcdfe6;
      border-radius: 100%;
      width: 14px;
      height: 14px;
      background-color: #fff;
      position: relative;
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;
      &:after {
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: #fff;
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.15s ease-in;
      }
    }
    .dhl-radio_original {
      opacity: 0;
      outline: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0px;
      right: 0;
      bottom: 0;
      margin: 0;
    }
  }
  .dhl-radio_label {
    font-size: 14px;
    padding-left: 10px;
  }
}
// 选中的样式
.dhl-radio.is-checked {
  .dhl-radio_input {
    .dhl-radio_inner {
      border-color: #409eff;
      background-color: #409eff;
      &:after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
  .dhl-radio_label {
    color: #409eff;
  }
}
</style>
