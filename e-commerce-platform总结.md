# Vue电商项目

## js

### axios二次封装

```js
// request.js
// 引入依赖
import axios from 'axios'
// 创建axios实例
const instance = axios.create({
    baseURL: '', // 请求服务器的基础域名
    timeout: 5000 // 响应超时时间(毫秒)
})
// 请求拦截器
instance.interceptors.request.use((config)=>{
    // 第一个回调
    // 在发送请求之前做些什么
    
    // config.headers是请求头, 需要token的请求可以在这里配置token
    // config.header[tokenKey] = tokenValue
    
    return config; //这个必须写，否则请求发不出
}, (err) => {
    // 请求失败
    // 第二个回调
   	// 对请求错误做些什么
    
    // 这里可以添加一个全局的请求失败弹窗提示
    return Promise.reject(error);
})

instance.interceptors.response.use((res) => {
    // 第一个回调
    // 对响应数据做点什么
    
    // 这里可以对 后台响应为成功，但是业务逻辑失败 返回的数据做拦截
    
    return res // 这个必须写, 否则请求到的数据页面拿不到
}, (err) => {
    // 第二个回调
    // 响应失败走这里
    // 这里可以添加一个全局的响应失败弹窗提示
}})

export default instance // 暴露
```



```js
// api.js
// 引入request.js
import instance from './request'

// 带参的get请求
export const getWithData = (params) => instance.get('/api', { params }) // 带中括号的
// delete请求
export const delete = (params) => instance.delete('/api', {params}) // 带中括号的
```



在页面引用

```js
methods: {
	async request(){
		// 这里不用.then的形式拿数据，用async await避免回调地狱
		let res = await getWithData()
	}
}
```



### 获取验证码的倒计时

```js
// data..


initCount: 30, // 倒计时初始化
maxCount: 30, // 最大读秒数提上来，到时候要改的话不用去方法里找
// 是否显示倒计时
showCount: false,
// 计时器
timer: null
```

```js
// 倒计时逻辑
countDown() {
  // data里调一个空的(null)timer给它赋值
  this.timer = setInterval(() => {
    this.initCount--
    // 倒数到0清除读秒，然后显示获取验证码按钮，初始化读秒
    if (this.initCount === -1) {
      this.showCount = false // 显示获取验证码按钮
      this.initCount = this.maxCount // 读秒复位
      clearTimeout(this.timer) // 清除读秒器
    }
  }, 1000)
}
```



### replaceAll和replace

```js
richText.replaceAll(被替换的内容, 新内容)
// replace只会替换一个
```



### 增加/减少/输入 商品

**增加/减少商品**

不用写两个函数分别控制加减

```
controlAmount(val) {
  // 用一个函数同时控制加减
  // 传入一个val参数 1 代表加 -1代表减
  if (
    (val === -1 && this.productAmount <= 1) || // 当前input框内的数字不能小于1
    (val === 1 && this.productAmount >= this.mainData.stock) // 当前input框内的数字不能大于库存数
  ) {
    return
  }
  // 用传入的参数做递增或递减
  this.productAmount += val
},
```

输入商品数量

```js
inputAmount() {
  // 只能输入正整数
  // 如果输入的商品数量不是数字, 则用空字符串代替( 就是删掉 ),
  this.productAmount = this.productAmount.replace(/[^\d]/g, '') // /[^\d]/g 的意思是 非数字 并 查找所有匹配而非在找到第一个匹配后停止
  // 如果输入的数字大于库存, 则商品数量为最大库存
  if (this.productAmount > this.mainData.stock) {
    this.productAmount = this.mainData.stock
  }
  // 如果输入的数字小于1, 则商品数量为1
  if (this.productAmount < 1) {
    // 当意图删掉所有数字时,this.productAmount为 空字符串, 它会去做一个正则匹配: 空字符串 属于 非数字, 但取代这个空字符串的依然是空字符串
    // 空字符串被转化成数字0 ( Number('')===0 )
    // 0 比 1 小, 进入条件后 给this.productAmount 赋值1
    // 所以input框内的数字是删除不掉的
    this.productAmount = 1
  }
}

```



### 数组方法every

如果every收到的数组如果是空的，所以不管什么情况都会返回true

## html

### 标签命名快捷写法

输入 .left+.right 可快速得到以下代码

```html
<div class="left"></div>
<div class="right"></div>
```

### 有默认样式的标签

像 ul li 这些有默认样式的标签可以在index.html做一个全局样式初始化，这样不用在每个用到这些标签的页面再重新写样式



### 避免事件冒泡

需求: 当点击登录窗口以外的遮罩层，关闭登录模块

```html
<div @click='关闭窗口' class="login-madol">
  <div class="login-box"></div>
</div>
```

当点击login-box时，由于事件冒泡的存在，会触发login-madol的@click='关闭窗口'

```html
<div class="login-madol">
  <div @click='关闭窗口' class="mask"></div>
  <div class="login-box"></div>
</div>
```

在login-madol里放一个和它一样大的mask完全遮住login-madol，

再用绝对定位把login-box放在mask上面，这样login-box占据那部分就不会触发mask的点击事件，以此来避免事件冒泡



### 验证手机号正则

```js
// 把验证手机号的方法封到一个utils里
// src/utils/index.js

export const verifyPhoneNumber = (value) => {
  let reg =
    /^(13[0-9]|14[01456789]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  return reg.test(value)
}

```



## css

### 全局样式

像一些公共放到一个全局的css里引用

```css
@base-color: #0a328e;
.center{
    width: 1200px;
    margin: 0 auto;
}
```



1. 在main.js里引用.center

```js
import '@/assets/css/GlobalStyle.css'
```

组件里就可以直接用这个.center选择器的样式



2. 在组件内引入@base-color主题颜色并使用

```html
<style>
/* 注意这里的引用@前需要加一个~波浪号*/
@import '~@/assets/css/global-style.less';
p{
    color: @base-color
}
</style>
```



### less

```css
li{
    &.login-btn{
        /* 选择器的意思为 是li标签，且类名为 login-btn*/
    }
}
```



### css属性

```css
text-indent: 1em /* 字符缩进 */
```

```css
outline: 1px solid red /*轮廓线(跟border有点像，但不占空间)*/
```



### rem和em

rem是相对于html元素

em相对于父元素



### 关于div内的img

**问题描述:**

div里放了个img，底部留白，用了padding:0，没去掉，记录一下。

**原因分析:**

img元素默认是inline元素，而inline元素的vertical-align属性的默认值为baseline，

也就是文字基线对齐，所以图片底部的留白就是baseline和bottom之间的距离。

**解决方案:**

1. 使用display: block;将img转换成block元素即可。
2. 重写默认的vertical-align: baseline;，建议设置为vertical-align: middle;
3. 设置图片的浮动或者定位属性，通过添加 float 或 position 属性来改变display属性，将图片隐式转换为块级元素。



### 鼠标悬浮盒子上移的效果

(1)鼠标悬浮在外面的盒子上里面的盒子上移

(2)外面一个固定位置的盒子

(3)里面一个可移动的盒子

**这个可移动的盒子初始状态和悬浮状态都要有相对定位属性，否则过度动画无效**

**相对定位，是相对自己初始位置的定位**



### flex

```css
flex: 1
/* 横向填满盒子 */
```



### 超出盒子的字样用省略号代替

```css
/* 超出盒子的字样用省略号代替 */
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```



## vue

### 跨域配置

**注意**:  这个是本地用的, 线上跨域用nginx

1. 根目录新建文件vue.config.js, 写入

```js
module.exports = {
  devServer: {
    proxy: {
      // 项目里我的所有接口的地址都是 /api开头(因为在request.js里配置了baseURL: '/api')
      // 例如: 我的请求地址/api/xx/xx
      // 当node服务器遇到以 '/api' 开头的请求, 就会把target字段里的值加上, 那么请求地址就变成了
      // http://kumanxuan1.f3322.net:8881/cms/api/xx/xx
      // 最后pathRewrite的意思是, 把 '/api'替换为空
      // 所以请求地址就变成了http://kumanxuan1.f3322.net:8881/cms/xx/xx
      // 重启项目就可以了
      // 这个是本地用的, 线上跨域用nginx
      '/api': {
        target: 'http://kumanxuan1.f3322.net:8881/cms', // 后台接口地址
        //   ws:true, // 如果要代理websockets, 配置这个参数
        //   secure: true, // 如果是https接口, 需要配置换个参数
        // changeOrigin: true, // 是否跨域
        pathRewrite: {
          // 重写路径
          '^/api': ''
        }
      }
    }
  }
}

```

2. 更改请求接口的baseURL为 '/api'

```js
// request/request.js

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000
})
```



### 监听事件加载和卸载

有些只能在特定组件使用的方法需要加载和卸载

```
mounted() {
  // 进入组件加载监听事件
  window.addEventListener('scroll', this.scrollLoading) // addEventListener('监听事件', 执行函数)
},
beforeDestroy() {
  // 离开组件后删除监听事件
  window.removeEventListener('scroll', this.scrollLoading)
},
```



### 响应式

像这样**直接**向响应式对象中添加一个property this.productList[i].hasSelected = false, 那么这个新增的属性并**不是响应式**的

调用**$set API** 以添加新的响应式 property 即可

```js
// 初始化商品选择
initSelect() {
  for (let i in this.productList) {
    this.$set(this.productList[i], 'hasSelected', false)
  }
}
```



### 富文本渲染

将富文本绑定到v-html

```
<div v-html="richText"></div>
```



### 抽取图片基本路径

方便后期维护

```js
// main.js
Vue.prototype.imgBaseUrl = 服务器基本路径
```

```html
<!-- 其他组件引用 -->
<img :src="imgBaseUrl + url">
```



### 滚动条初始化

```js
created(){
    // 因为是单页面应用，所以切换页面的时候滚动条是不会初始化置顶的
	// 所以设置页面滚动高度为0
	document.documentElement.scrollTop = 0
}
```



### 组件通信

#### props父传子组件

##### 通信

(1)在父组件的组件标签上自定义一个attribute

```html
<custom-element :custom="customData"></custom-element>
<script>
export default{
    data(){
        customData: {}
    }
}
</script>
```

(2)在子组件的js内写入props

```
export default {
  props: ['custom']
}
```

(3)子组件内用props定好的参数名就行

```
<h2>{{ custom }}</h2>

this.custom
```



##### 存在的问题

当子组件使用父组件传来的**对象**的属性可能存在报错

**原因**: **对象**是父组件先发请求拿到数据，再流到这个子组件的，如果直接 使用对象内的属性   对象名.属性名 ，会因为数据还没从父组件流过来而报错(此时对象为空或者说不存在)

**解决**: 用watch监听**对象**，当**对象**的值发生改变，把**传来的对象**赋值给**新的对象**(子组件的data里定义的对象)



##### 数据渲染最大长度的控制

```html
<!-- 父组件Home.vue -->

<Product :list="boutiqueList" :maxLength="maxLength"></Product>

<script>
export default{
    data(){
        return{
            maxLength: 8
        }
    }
}
</script>
```

```html
<!-- 子组件Product.vue -->
<!-- 用v-show = "index < maxLength"做条件渲染 -->
<li
  class="fixed-box"
  v-for="(item, index) in list"
  :key="item.id"
  v-show="index < maxLength"
>
<script>
export default{
props:['maxLength']
}
</script>
```

这样做的好处：不用额外再处理数组

### $refs父改子组件

```html
<!-- 子组件custom-temp -->
<script>
export default{
    data(){
        num: 0
    }
}
</script>
```



```html
<!-- 父组件改子组件数据 -->

<custom-temp ref="Main"></custom-temp>

<script>
export default{
    methods: {
        changeNum(){
            this.$refs.Main.num = 1
        }
    }
}    
</script>
```



### vue-router

#### 路由配置

```js
const routes = [
  // 重定向
  {
    path: '/', // 用户进我的根目录
    redirect: '/home' // 我给他重定向到home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home // import的Home
  },
  {
    path: '/goods',
    component: () => import('@/views/Goods.vue')
    // 也可以这样引入
  }
]

```

#### 路由跳转

```js
this.$router.push('/') //路由跳转
```

#### 当前页面路径

```js
this.$route.path
```

#### 在当前页面再次点击该页面路由时会有报错(官方bug)

```js
// router.js
// 在vuerouter注册之前写入以下代码
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch((err) => {})
}
```



### this.$route.query

地址栏携带的参数在这里



### 导航守卫( 路由拦截 )

#### 全局导航守卫

```js
// router/index.js
// 引入vuex, 要用之前封装的弹窗
import store from '@/store/index.js'


//...
const router = //...

router.beforeEach((to, from, next) => {
  // 全局导航守卫(路由拦截)
  // to是去哪里，from是从哪来，next是执行跳转不写不跳转
  // 如果是去个人中心页
  if (to.fullPath === '/user') {
    let token = localStorage.getItem('x-auth-token')
    // 判断是否已登录
    if (token) {
      // 如果已登录就跳转
      next()
    } else {
      // 否则就弹窗提示, 且不跳转
      store.dispatch('ToastState/asyncChangeToastState', {
        msg: '请先登录',
        classType: 'warning'
      })
      return
    }
  }
  // 不是去个人中心页的跳转
  next()
})

```



### 局部导航守卫

```js
// 组件内的局部导航守卫
import store from '@/store/index.js'
export default {
  beforeRouteEnter(to, from, next) {
    let token = localStorage.getItem('x-auth-token')
    // 这里就不需要判断进的哪个路由了，因为只有进User的路由才会触发这个钩子
    if (token) {
      // 有token就执行next()前往User页面
      next()
    } else {
      // 否则弹窗提示
      store.dispatch('ToastState/asyncChangeToastState', {
        msg: '请先登录',
        classType: 'warning'
      })
    }
  }
}
```

**注意**: 

这里不能通过辅助函数mapAction去获取asyncChangeToastState，然后在beforeRouteEnter里通过this.asyncChangeToastState来调用，因为beforeRouteEnter钩子执行前，User组件实例还没有被创建，所以拿不到this；

但是next()里面可以通过以下方法拿到User组件实例

```
next((vm) => {
  vm.methods里的方法名
})
```

### 子路由

子路由里用404错误页，不可以把错误页写在子路由数组的第一个，不然进来就是错误页面



### vuex

用来做隔代组件之间的通信

#### 用module模块组管理

1. store里创建模块组文件夹 CustomModule(名字自定义)

2. 文件夹内创建index.js,写入

```js
export default {
  namespaced: true,
  state: {
    // 需要用到的属性
    customProperty: false
  },
  mutations: {
    // 每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)，如下面的字符串的事件类型 'customFn'
    customFn(state, payload) {
      // 第一个参数state，是上面的state
      // 第二个参数payload，是传入的额外参数
      state.customProperty = payload
    }
  },
  actions: {}
}

```

3. store的index.js内引入模块

```js
// store/index.js
import CustomModule from './CustomModule'
```

4. 注册模块

```js
export default new Vuex.Store({
  modules: {
    CustomModule
  }
})
```

5. 使用， 

state、mutations引入的方法都是类似的

```js
// 使用辅助函数引入
import { mapState, mapMutation } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState('CustomModule', ['customProperty']) 
    // mapState去找根文件store下的CustomModule，然后再找CustomModule里的customProperty
  },
  methods: {
    ...mapMutation('CustomModule',['customFn'])
  }
}
```

使用

```js
this.函数名 // 有参传参
this.属性名
```



#### 封装一个自己的弹窗

```html
<!-- Toast.vue -->
<template>
  <div class="toast">
    <i class="icon iconfont" :class="classType"></i>
    <span>{{ msg }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Toast',
  computed: {
    ...mapState('ToastState', ['msg', 'classType'])
  }
}
</script>

<style scoped lang="less">
.toast {
  //置顶居中
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%);

  background: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  box-shadow: 0 0 10px #fff; // 阴影
  i {
    margin-right: 10px;
  }

  .icon-jingshi {
    color: orange;
  }
  .icon-chucuo {
    color: red;
  }
  .icon-zhengque {
    color: green;
  }
}
</style>


```

```js
// vuex 的 toast-state / index.js
export default {
  namespaced: true,
  state: {
    // 是否显示弹窗
    showToast: false,
    // 弹窗文字
    msg: '',
    // 弹窗icon
    classType: ''
  },
  mutations: {
    changeToastState(state, payload) {
      state.showToast = payload.showToast
      state.msg = payload.msg
      state.classType = payload.classType
    }
  },
  actions: {
    asyncChangeToastState(state, payload) {
      // Action 提交的是 mutation，而不是直接变更状态，走一波异步
      // 这里调mutations里的changeToastState，更改state
      // 外面参数传进来，再传给changeToastState
      state.commit('changeToastState', {
        showToast: true, // 开关必执行，不用通过传参
        msg: payload.msg, // 弹窗文字
        classType:
          payload.classType === 'error'
            ? 'icon-chucuo'
            : payload.classType === 'warning'
            ? 'icon-jingshi'
            : 'icon-zhengque' // icon和颜色
      })

      setTimeout(() => {
        state.commit('changeToastState', {
          showToast: false, // 开关必执行，不用通过传参
          msg: payload.msg,
          classType:
            payload.classType === 'error'
              ? 'icon-chucuo'
              : payload.classType === 'warning'
              ? 'icon-jingshi'
              : 'icon-zhengque'
        })
      }, 1500)
    }
  }
}

```



## 业务流程

### 扫码登录流程

#### 流程

用户扫二维码（请求登录第三方应用），

第三方应用(前端码被扫了，后端通知)通知微信开放平台，

微信开放平台请求用户确认(手机弹窗等用户点确认)，

用户确认通知微信开放平台，

微信开放平台给第三方应用授权临时票据（code），

第三方应用拿着code、appid、appscret向微信开放平台换access_token，

微信开放平台返回access_token



#### 逻辑

1. **扫码后会重定向，重新加载页面，url附带code**

2. **使用code发起登录请求**
3. **因为重新加载页面了，所以在created发起请求**
4. **以防请求在code获取到之前发生，使用nextTick()**

- 在Vue生命周期的`created()`钩子函数进行的DOM操作一定要放在`Vue.nextTick()`的回调函数中

在`created()`钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进`Vue.nextTick()`的回调函数中。与之对应的就是`mounted()`钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。



## 环境变量配置

开发环境和生产环境的服务器域名可能不一样

所以需要配置开发环境和生产环境的服务器域名

根目录下建

.env.dev 开发环境文件

```
NODE_ENV = production
VUE_APP_BASE_URL = 开发环境下后端地址
VUE_APP_STATE_URL = 开发环境下后端地址
```

.env.prod

```
NODE_ENV = production
VUE_APP_BASE_URL = 生产环境下后端地址
VUE_APP_STATE_URL = 生产环境下后端地址
```

vue.config.js的跨域代理的target里配置

```js
// process.env加载配置来自上述文件内VUE_APP_BASE_URL字段
target: process.env.VUE_APP_BASE_URL 

```

配置启动指令

```js
// "scripts" 字段
"scripts": {
    "serve": "vue-cli-service serve --mode dev",
     
    "servepro": "vue-cli-service serve --mode prod" 
}
// key值是启动项目指令
// dev是 .env.dev文件的后缀
// prod是 .env.prod文件的后缀
```

