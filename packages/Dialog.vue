<template>
  <transition name="dialog-fade">
    <div @click.self="handleClose" v-show="visible" class="dhl-dialog__wrapper">
      <div class="dhl-dialog" :style="{ width: width, marginTop: top }">
        <div class="dhl-dialog__header">
          <!-- 如果使用时不给具名插槽分发内容,插槽里面的默认内容正常显示;如果使用时给具名插槽分发内容,插槽里面的默认内容就会被覆盖 -->
          <!-- 具名插槽 -->
          <slot name="title">
            <span class="dhl-dialog__title">{{ title }}</span>
          </slot>
          <button class="dhl-dialog__headerbtn">
            <i @click="handleClose" class="dhl-icon-close"></i>
          </button>
        </div>
        <div class="dhl-dialog__body">
          <!-- 默认插槽 -->
          <slot>
            <span>请输入内容</span>
          </slot>
        </div>
        <div class="dhl-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DhlDialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: '30%'
    },
    top: {
      type: String,
      default: '100px'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  // 等模板与数据结合,替换视图,页面生成之后才知道有没有传递给插槽分发内容
  // 因为分发的内容只有生成了dom才知道有没有分发成功
  /*  mounted () {
    console.log(this.$slots.footer)
  } */
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
/*
scoped的原理:
  scoped 会给当前组件的模板中所有的元素都添加一个随机的属性
  scoped 会给当前组件中所有的样式也添加一个对应的属性选择器
  属性选择器的属性和元素随机的属性是一样的
  这样就能保证样式只影响当前组件的元素

  但是此时要给dhl-button加样式,这个样式也会添加上一个随机的属性选择器
  但是dhl-button并不是dialog组件里面的,button是App里传递过来的,所以button不会添加唯一的属性,这样类名的属性和按钮的属性不一致,就作用不了了

  可以将scoped去掉,这样类名(和组件内部元素)就没有唯一的属性,这样就能选中子组件给他添加样式了

深度选择器:
  如果组件库的样式我们自己覆盖不了,就可以使用深度选择器
  加了深度选择器,样式就不会添加 随机生成的属性选择器了
  scss:  ::v-deep
  less:  /deep/
  css:   >>>
  stylus: >>>
 */
.dhl-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0, 0, 0, 0.5);

  .dhl-dialog {
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 30%;

    &__header {
      padding: 20px 20px 10px;
      .dhl-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }
      .dhl-dialog__headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
        .el-icon-close {
          color: #909399;
        }
      }
    }

    &__body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    &__footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      ::v-deep .dhl-button:first-child {
        margin-right: 20px;
      }
    }
  }
}
.dialog-fade-enter-active {
  animation: fade .5s;
}
.dialog-fade-leave-active {
  animation: fade .5s reverse;
}
@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(-20px)
  }
  to {
    opacity: 1;
    transform: translateY(0)
  }
}
</style>
