import Vue from 'vue'
import App from './App.vue'
import dhl from '../packages/index'
window.aa = '戴宏林'
require('./a')
Vue.config.productionTip = false
// vue.use(对象/函数) 会自动执行函数/对象中的install函数
// 模块化语法全局没有Vue 只有模块内部有Vue
// window里面的变量,任何模块都能访问
Vue.use(dhl)
new Vue({
  render: h => h(App)
}).$mount('#app')
console.log(window)
