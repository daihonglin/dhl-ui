<template>
  <div :class="{ 'dhl-input__suffix': showSuffix }" class="dhl-input" name>
    <!--
       type的值不能写死:
          如果showpassword不存在, 说明没有小眼睛, 那么type正常显示
          如果showpassword存在, 说明不能直接显示type, 需要进行处理
             type有默认值, 父组件不传也有默认值, 所以不能触发父组件的事件
             给组件使用时注册事件也不合理, 使用sync修饰符也不合理
          所以可以自己定义一个变量, 点击按钮时控制变量的true/false从而判断显示password还是text, 默认变量值为false, 显示password, 点击了进行切换, 显示text, 再点击如此往复...
    -->
    <!--
      如果传递了showPassword 才判断是否需要切换密码的显示,如果不传,就不判断
      传进来的属性不能改,所以我们就提供一个属性,通过修改自己的属性来给type不同的值,并没有修改传过来的type值
     -->
    <input
      class="dhl-input_inner"
      :disabled="disabled"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :placeholder="placeholder"
      :name="name"
      :class="{ 'is-disabled': disabled }"
      :value="value"
      @input="handleInput"
    />
    <span v-if="showSuffix" class="dhl-input_suffix">
      <i
        @click="clearInput"
        class="dhl-icon-cancel"
        v-if="clearable && value"
      ></i>
      <i
        :class="{ 'dhl-icon-active': passwordVisible }"
        class="dhl-icon-visible"
        v-if="showPassword"
        @click="togglePassword"
      ></i>
    </span>
  </div>
</template>

<script>
/*
给组件身上加v-model:
  在组件内部需要接受value值,并且触发父组件的input事件
*/
export default {
  name: 'DhlInput',
  data () {
    return {
      passwordVisible: false
    }
  },
  // 如果不传,props里面也可以给默认值
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showSuffix () {
      return this.showPassword || this.clearable
    }
  },
  methods: {
    handleInput (e) {
      // this.value = e.target.value
      this.$emit('input', e.target.value)
    },
    clearInput () {
      this.$emit('input', '')
    },
    togglePassword () {
      this.passwordVisible = !this.passwordVisible
    }
  }
}
</script>

<style lang="scss">
.dhl-input {
  width: 100%;
  position: relative;
  font-size: 14px;
  display: inline-block;
  .dhl-input_inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 045, 0.355, 1);
    width: 100%;

    &:focus {
      outline: none;
      border-color: #409eff;
    }
    // input禁用样式
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
// 后面加suffix的意思是后面如果有后缀的话，触发该样式
.dhl-input__suffix {
  .dhl-input_inner {
    padding-right: 30px;
  }
  .dhl-input_suffix {
    position: absolute;
    right: 10px;
    height: 100%;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    transition: all 0.3s;
    z-index: 900;
    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      &.dhl-icon-active {
        color: red;
      }
    }
  }
}
</style>
