<template>
  <!-- 使用label会导致事件处理函数执行两次 -->
  <!-- vue内部作了处理 -->
  <div @click="handleClick" class="dhl-switch" :class="{'is-checked':value}">
    <input class="dhl-switch_input" type="checkbox" ref="input" :name="name">
    <span class="dhl-switch_core" ref="core">
      <span class="dhl-switch_button"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'DhlSwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    async handleClick () {
      this.$emit('input', !this.value)
      // 在vue中,只要修改了数据,视图会自动更新,这个更新的过程是异步的,
      // 但是如果你在数据修改之后,立刻去获取dom解构,得到的还是之前的结构
      // 在数据修改之后,dom结构上的数据还是之前的数据,因为dom还没有更新
      // 数据修改是同步的,但是数据修改了,视图并没有立刻更新,并没有把数据直接替换视图,而是在内存中进行新旧虚拟dom的对比,对比出差异的部分最终进行差异化更新
      // vue会等一段代码执行完了,再进行对比,对比出变化的部分,进行差异化更新
      // 所以你在修改值后,立刻去获取值,获取到的还是之前的值,需要$nextTick()
      // 因为子组件的value值是父组件传递过来的,所以父组件dom更新完毕之后,父组件传递过来的value值就会改变,子组件的value值也会改变
      await this.$nextTick()
      // console.log(this.value)
      this.changeColor()
      this.$refs.input.checked = this.value
      console.log(this.$refs.input.checked)
    },
    changeColor () {
      if (this.activeColor || this.inactiveColor) {
        const color = this.value ? this.activeColor : this.inactiveColor
        this.$refs.core.style.borderColor = color
        this.$refs.core.style.backgroundColor = color
      }
    }
  },
  mounted () {
    this.changeColor()
    this.$refs.input.checked = this.value
  }
}
</script>

<style lang="scss" scoped>
 .dhl-switch{
    display: inline-block;
    align-items: center;
    position: relative;
    font-size: 14px;
    line-height: 20px;
    vertical-align: middle;
    .dhl-switch_core{
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color .3s,background-color .3s;
    vertical-align: middle;
    .dhl-switch_button{
      position:absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all .3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
      }
    }
  }
  // 选中样式
  .is-checked {
    .dhl-switch_core{
      border-color: #409eff;
      background-color: #409eff;
      .dhl-switch_button {
        transform: translateX(20px);
      }
    }
  }
  // 隐藏input标签
  .dhl-switch_input{
    position:absolute;
    width: 0px;
    height: 0ppx;
    opacity: 0;
    margin: 0;
  }
</style>
