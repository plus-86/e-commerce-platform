## 一、安装蓝湖插件

1.去蓝湖下一个**ps插件安装**

2.打开ps，里面有个扩展，**打开蓝湖扩展**

3.登录蓝湖账号，上传图片到项目

4.去蓝湖打开项目，双击图片就可以拿到图片尺寸，甚至css代码

## 二、搭一个基本结构

app.vue的router-view就是路由里path为 '/' 的组件(或者说页面)

1.先去index.html把html、body元素的默认样式清零

```css
{
	margin: 0;
	padding: 0;
}
```



2.根据设计图的布局，在app.vue里引入三个组件Topbar、Header、Footer，记得先在components里注册

```html
<template>
  <div id="app">
    <Topbar></Topbar>
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>
```



3.如果有蓝图的话，样式尺寸可以去蓝湖拿

## 三、axios的请求拦截器的封装

先装个axios吧

```
cnpm install axios
```

普通函数的缺点

1. 请求头没地方写
2. 接口不方便管理。将来要是修改了域名就得到处去改
3. 容易出现回调地狱。就是请求以后再得再发送请求的话就得把请求写到then里面，这样就形成了回调地狱



1.在src建一个request文件夹，然后建一个request.js

```js
// 2.引入axios
import axios from 'axios'
// 3.创建axios实例instance，给一个baseURL，和请求超时
const instance = axios.create({
	baseURL: "http://"
	timeout: 5000
})
// 4.写请求拦截器
// 它是在发出请求前执行的，可以在这里面添加请求头什么的
instance.intercepotors.request.use( config => {
    consolo.log(config)
    return config // 一定要return这个config，否则请求不会发出
},err => {
    return Promise.reject(err) // 先固定写
})
// 5.写响应拦截器
// 他是请求到数据以后执行的，可以在这里面对数据做一些过滤什么的
instance.intercepotors.response.use(res => {
    return res // 这个就是请求到的数据
}, err => {
    return Promise.reject(err)
})
// 6.导出 
export default instance
```

7. request里建一个api.js统一管理api链接

```js
// 8.引入封装好的axios 
import instance from './request'

// 9.导出请求
// 这里要写成函数，否则每次调用这个文件的话，会把所有的请求都执行一遍
export const productRecommend = () => {
    instance.get('product/recommend')
}
```



```js
// 10.在需要做请求的组件按需引入，调用就行了
import { productRecommend } from '@/request/request'

export default {
    created() {
        productRecommend().then(res => {
            console.log(res)
        })
    }
}
```



11.如果请求里面要加一层请求还是会出现回调地狱，这里可以用async+await做异步请求，就不会有回调地狱了，如下：

```js
export default {
    async created() {
        let res1 = await request1()
        console.log(res1)
		let res2 = await request2()
        console.log(res2)
    }
}
```



## 四、写TopBar

1. 下面这个可以用 .left+.right 快捷写法

```html
<div class="left"></div>
<div class="right"></div>
```

2. ul有默认边距别忘了去掉

3. li有默认的无需序号别了去掉



4. 网页的版心样式可以建一个公共样式写进去，放在src/assets/css/GlobalStyle.css

```css
.center{
    width: 1200px;
    margin: 0 auto;
}
```

然后在main.js里引用过来就可以全局使用了

```js
import '@/assets/css/GlobalStyle.css'
```



5. less的语法，是那种嵌套式的，比较容易理解

```less
.TopBar {
  font-size: 14px;
  color: #fff;
  height: 40px;
  background: #242b39;
  .center {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    .right {
      ul {
        display: flex;
        margin: 0;
        padding: 0;
        cursor: pointer;
        li {
          list-style: none;
          margin-left: 20px;
          .iconfont {
            font-size: 14px;
            margin-right: 10px;
          }
          &.login-btn { /* 因为这个login-btn是li同一层级的，所以这里的意思是 li元素且有login-btn类名, 才能选中它 */
            width: 124px;
            height: 40px;
            background: #0a328e;
          }
        }
      }
    }
    .left {
      cursor: default;
    }
  }
}
```



## 五、写Header

1.

先看整体布局

Header分三个部分：左边图，中间导航，右边搜索框，用弹性布局就行



左右对齐，中间留缝隙，justify-content: space-between



2.

中间的导航是 ul+li，用弹性布局



ul+li的默认样式记得去掉



同样是左右对齐，中间留缝隙，justify-content: space-between



3.

右边搜索框里，左边是一个input右边是一个div按钮，弹性布局一下就行



input的placeholder的字样缩进属性是text-indent: 1em

还有一个默认的聚焦内边框样式去掉outline: none



里面有个放大镜 用iconfont就行了



4.给中间导航写路由

不一样的写法，这个就不用再在头上import了

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
    component: Home
  },
  {
    path: '/goods',
    component: () => import('@/views/Goods.vue')
  },
  {
    path: '/user',
    component: () => import('@/views/User.vue')
  },
  {
    path: '/order',
    component: () => import('@/views/Order.vue')
  },
  {
    path: '/welfare',
    component: () => import('@/views/Welfare.vue')
  }
]

```



5.创建页面，添加跳转逻辑，写样式绑定样式

这里用$router.push()跳转比router-link标签方便后面添加其他逻辑



通过$route.path拿到当前页面路径，然后用:class绑定点击后的样式





```html
<li :class="$route.path === '/home' ? 'active' : ''" @click="$router.push('/home')">首页</li>
<li :class="$route.path === '/goods' ? 'active' : ''" @click="$router.push('/goods')">全部商品</li>
<li :class="$route.path === '/user' ? 'active' : ''" @click="$router.push('/user')">个人中心</li>
<li :class="$route.path === '/order' ? 'active' : ''" @click="$router.push('/order')">我的订单</li>
<li :class="$route.path === '/welfare' ? 'active' : ''" @click="$router.push('/welfare')">专属福利</li>
```



```css
/* 悬浮和点击的样式 */
li:hover,
.active {
  font-weight: bold;
  color: #0a328e;
}
```



6.在当前页面再次点击该页面的路由时会有报错(官方bug)，在vuerouter注册之前写入以下代码

```js
// router.js
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch((err) => {})
}
```



7.因为前面有个颜色一直用到，所以可以做一个抽取主题色

1. 先把全局的css文件改成less文件
2. 在文件内声明一个@base-color: #fff
3. main.js里的引用css文件改成less格式
4. 到需要引用颜色的组件，在style标签内引入格式如下

```less
@import "~@assets/css/GlobalStyle.less"
```

前面一定要加这个 ~ 波浪号否则语法报错

5. 再到需要用到颜色的地方使用@base-color就可以了

```less
* {
	color: @base-color
}
```



## 六、登录模态窗口样式及登录逻辑

### **1、创建一个login组件**

### **2、因为是在任何页面都能显示，所以引入到app.vue**

### **3、写样式**

1. 遮罩层，固定在所有页面上

2. 背景颜色引用一张图

3. 里面的盒子绝对定位，然后水平垂直剧中

```less
.login-madol {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed; /* 遮罩层，固定在所有页面上 */
  .login-box {
    width: 555px;
    height: 423px;
    background: url('~@/assets/img/login-box.png'); /* 背景颜色引用一张图 */
    position: absolute; /* 绝对定位，然后水平垂直剧中*/ 
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
```

4. 为了让用户点击灰色的地方也可以关闭login，如果把点击事件加到最外面的login-modal上的话，因为事件冒泡，我点击login-box的时候login-madol也会被点击到，就相当于我点login里面白色的地方也会把 login关掉

```html
<div class="login-madol">
  <div class="login-box"></div>
</div>
```

所以，在里面加一个同层级的兄弟元素就可以了

父级login-madol已经position: fixed了，所以加个宽高颜色，这个mask就遮在login-madol上了，再在mask上加点击事件就可以避免冒泡事件发生了

ps:解决问题思路，能避免则避免。必要创造一个问题，去面对这个问题，而后再去解决这个问题，很麻烦。

```html
<div class="login-madol">
  <div class="mask"></div>
  <div class="login-box"></div>
</div>
```

```less
/* 父级login-madol已经position: fixed了，所以加个宽高颜色，这个mask就遮在login-madol上了 */
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
```



### **4、vuex状态管理**

这里用module模块组进行管理

1. store里创建LoginModule文件夹，在文件夹内创建index.js,写入

```js
export default {
  namespaced: true,
  state: {
    whetherToShowLoginModule: false
  },
  mutations: {
    // 每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)，如下面的 字符串的事件类型 'changeLoginModuleState'
    changeLoginModuleState(state, loginState) {
      // 回调函数会接受 state(就是上面的state) 作为第一个参数
      // mutation的荷载payload，就是传入的额外参数
      state.whetherToShowLoginModule = loginState
    }
  },
  actions: {}
}

```



2. store的index.js内引入模块

```js
// store/index.js
import LoginModule from './LoginModule'
```



3. 注册模块

```js
export default new Vuex.Store({
  modules: {
    LoginModule
  }
})

```



4. 使用，state、mutations使用的方法都是类似的

```js
import { mapState } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState('LoginModule', ['whetherToShowLoginModule']) // mapState去找根文件下的LoginModule，然后再找LoginModule里的whetherToShowLoginModule
  },
  components: {
    TopBar,
    Header,
    Footer,
    Login
  }
}
```

mutation有参传参

```html
<div class="mask" @click="changeLoginModuleState(false)"></div>
```



### **5、登录盒子里面的样式**

1. 分为手机登录和微信登录，各自建一个div 用v-show来显示，data里面初始化一个showForm: true



2. 头顶的切换标签给它绑定相应的样式,以及点击事件

```html
<li :class="showForm === true ? 'active' : ''" @click="showForm = true">
```

注意：这里的@click点击事件不用在methods里面另外写了，直接把showForm拿过来赋值就行!



3. 手机登录的样式，获取验证码和登录按钮可以复用 input-group也可以复用

```html
<div class="form" v-show="showForm">
  <div class="input-gourp">
    <input type="text" placeholder="请输入手机号" />
  </div>
  <div class="input-gourp">
    <input type="text" placeholder="请输入短信验证码" />
    <div class="btn get-qrcode">获取验证码</div>
  </div>
  <div class="btn">登录</div>
</div>
```

```less
.form {
  .btn {
    /* 这个登录按钮样式可以给，获取验证码按钮复用，只定了一个高度*/
    background: @base-color;
    color: #fff;
    height: 50px;
    line-height: 50px;
    border-radius: 3px;
    cursor: pointer;
  }
  .input-gourp {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    input {
      flex: 1px; /* 填满 */
      height: 44px;
      text-indent: 1em;
      outline: none; /* input的默认内边框样式去掉 */
    }
    .get-qrcode {
      padding: 0 10px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
```



**6、滑块验证**

1. 引入依赖

```
npm install --save vue-monoplasty-slide-verify
```

2. 注册

```js
// main.js

import Vue from 'vue';
import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify);
```

3. html

```html
<slide-verify
  :l="42"
  :r="20"
  :w="362"
  :h="140"
  @success="onSuccess"
  @fail="onFail"
  @refresh="onRefresh"
  class="slide-box"
  ref="slideBlock"
  :slider-text="msg"
></slide-verify>
```

4. css

```css
/* 深度选择器，原理就是通过父元素找到我们需要改变的子元素(子元素名字在依赖里面找)，然后改变它的样式即可.*/
/deep/.slide-box {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  canvas {
    /* 拼图画布 */
    position: absolute;
    left: 0;
    top: -120px;
    display: none;
    width: 100%;
    box-sizing: border-box;
  }
  .slide-verify-block {
    /* 拼图块大小 */ 
    width: 85px;
    height: 136px;
  }
  .slide-verify-slider {
    border: 0; /* 滑块边框有默认样式，去掉 */ 
  }
  .slide-verify-refresh-icon {
    /* 刷新图片的按钮 */ 
    top: -120px;
    display: none;
  }
  &:hover {
    /* 鼠标悬浮到滑块上 */ 
    canvas {
      display: block;
    }
    .slide-verify-refresh-icon {
      display: block;
    }
  }
}
```

5. 验证条件

当msg为'再试一次'或'向右滑动'，提醒用户完成拼图



**7、获取验证码**

1. 获取验证码按钮（本地的需要做的事情）

条件是: 验证手机号（input里一个双向绑定，根据输入的手机号判断），拼图验证（根据文字滑块文字判断）

验证通过后: 获取验证码**按钮进入CD**，然后发送获取验证码请求到后台

```js
// data..

// 倒计时初始化
initCount: 30,
maxCount: 30, // 最大读秒数提上来，到时候要改的话不用去方法里找
// 是否显示倒计时
showCount: false,
// 计时器
timer: null

```



```js
// methods..
// 获取验证码验证
getSMSCode() {
  // 正则表达式，手机号验证
  let reg =
    /^(13[0-9]|14[01456789]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (!reg.test(this.phoneNumber)) {
    alert('请输入正确的手机号')
    return
  }
  // 拼图验证
  if (this.msg === '再试一次' || this.msg === '向右滑动') {
    alert('请完成拼图验证')
    return
  }
  // 读秒
  this.showCount = true // 显示读秒
  this.countDown() // 开始读秒
  // 发送获取验证码请求到后台
  // todo...
},
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
},
```

2. 获取验证码按钮（发送请求）

装一个qs用来转格式(服务端要用qs转化过的数据)

cnpm i qs 安装

```js
import qs from 'qs'
```

```js
// api.js
// 获取验证码
export const getSMSCode = (param) => instance.post('/sendSMS', qs.stringify(param))
```



```js
// Login.vue
import { getSMSCode } from '@/request/api'

// methods的getSMSCode方法里
let SMSCodeResponse = await getSMSCode({ phone: this.phoneNumber })
console.log(SMSCodeResponse，) 
```

这里会对返回的数据进行处理，如果业务请求失败，即返回code不为0，则弹窗。在将来的登录逻辑内，同样会有这个code，再在方法里写if else代码会冗余。所以把方法抽取出来放到请求拦截器里面



```js
// request.js

instance.interceptors.response.use(
  (res) => {
    console.log(res)
    let res_data = res.data
    // code为0时，业务逻辑为成功，把这个弹窗工具抽取出来
    if (res_data != 0) {
      // 不为0,弹窗，return一个false给用到的页面做统一处理
      alert(res_data.message)
      return false
    }
    return res_data
  },
  (err) => {
    return new Promise.reject(err)
  }
)
```

```js
// Login.vue

// methods的getSMSCode方法里
// 发送获取验证码请求到后台
let SMSCodeResponse = await getSMSCode({ phone: this.phoneNumber })
if (!SMSCodeResponse) return // 如果返回的是false就return掉，不进行读秒操作

// 读秒
this.showCount = true // 显示读秒
this.countDown() // 开始读秒
```



3. 把验证手机号的方法封到一个utils里

```js
// src/utils/index.js

export const verifyPhoneNumber = (value) => {
  let reg =
    /^(13[0-9]|14[01456789]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  return reg.test(value)
}

```

```js
// Login.vue

import { verifyPhoneNumber } from '@/utils/index'

// getSMSCode方法里
// 手机号验证,封到utils里了
if (!verifyPhoneNumber(this.phoneNumber)) {
  alert('请输入正确的手机号')
  return
}
```



4. 为什么请求后面不写catch了

拦截器里面会抛出err，相当于catch了，所以不用写了

```js
// request.js

instance.interceptors.response.use(
  (res) => {
    console.log(res)
    let res_data = res.data
    // code为0时，业务逻辑为成功，把这个弹窗工具抽取出来
    if (res_data != 0) {
      // 不为0弹窗，return一个false给用到的页面做统一处理
      alert(res_data.message)
      return false
    }
    return res_data
  },
    // 请求失败走这里 
    // 这个抛出的错误就相当于组件中发送请求后的catch方法
  (err) => {
    return new Promise.reject(err)
  }
)
```



5. 抽取带return的函数

抽离两个验证，把原本return空值的改成return布尔值，用返回的布尔值用作条件来判断方法内是不是要继续往下走

```js
// 抽取手机验证和滑块验证
varify() {
  // 手机号验证,封到utils里了
  if (!verifyPhoneNumber(this.phoneNumber)) {
    alert('请输入正确的手机号')
    return false
  }
  // 拼图验证
  if (this.msg === '再试一次' || this.msg === '向右滑动') {
    alert('请完成拼图验证')
    return false
  }
  return true
}
```

使用

```js
// getSMSCode、toLogin方法内，滑块和手机验证改成如下
if (!this.varify()) return
```



**8、登录**

条件是：手机号验证，滑块验证，验证码验证，发送手机号和验证码到后端验证

后端返回登录成功后：弹窗提示登录成功、关闭登录窗口、保存token到本地、切换登录状态

后端返回登录失败：则return

1. 验证码input框来个双向绑定
2. 登录按钮方法

```js
// 登录验证
async toLogin() {
  // 手机号和滑块验证
  if (!this.varify()) return

  // 验证码验证

  // 判断用户输入的验证码是否为空
  if (!this.SMSCode.trim()) {
    alert('请输入验证码')
    return
  }

  // 登录
  // 发送验证码和手机号到后端进行验证，后端返回结果，判断是否可以登录
  let loginResponse = await submitLogin({
    verifyCode: this.SMSCode,
    phone: this.phoneNumber
  })
  // 如果业务逻辑失败，则return
  if (!loginResponse) return

  // 登录成功后

  // 提示登录成功
  alert('登录成功')
  // 关闭登录窗口
  this.changeLoginModuleState(false)
  // 保存token
  localStorage.setItem('x-auth-token', loginResponse['x-auth-token'])
  // 切换登录状态
  // todo...
}
```

注意：这里有个小坑，引用的submitLogin方法在它的request里的写法如果是没有大括号的，那么是直接返回数据的，如果有大括号必须加return返回数据。

这个箭头函数指向的是instance返回的数据

```js
// 登录
export const submitLogin = (param) =>
  instance.post('/phoneRegin', qs.stringify(param))
```

这个箭头函数指向的是函数体

```js
// 登录
export const submitLogin = (param) =>
  {
  return instance.post('/phoneRegin', qs.stringify(param))
  }
```





3. 登录后切换状态

TopBar组件的登录和购物车按钮的显示，Login组件的登录成功后登录状态的切换，都涉及到同一个值得状态，所以把状态管理写到vuex里



在login-module里添加

```js
state: {
  // 用token判断是否已登录
  hasLogin: localStorage.getItem('x-auth-token') ? true : false
},
```

```js
mutations: {
  // 切换登录状态
  changeLoginState(state, loginState) {
    state.hasLogin = loginState
  }
},
```



TopBar引用

```js
computed: {
  ...mapState('LoginModule', ['hasLogin'])
}
```

```html
<!-- v-show 显示-->
<li
  class="btn"
  @click="changeLoginModuleState(true)"
  v-show="!hasLogin"
>
  登录
</li>
<li class="btn cart" v-show="hasLogin">
  <i class="icon iconfont icon-gouwuche"></i>
  <span class="cart-text">购物车</span>
  <span class="number">0</span>
</li>
```



Login引用

```js
methods:{
    ...mapMutations('LoginModule', [
  'changeLoginState'
])
}
```

```js
// 登录方法toLogin里
// 登录成功后切换登录状态

this.changeLoginState(true)
```



切换状态后的购物车按钮样式

由于跟登录按钮的有通用的样式，所以在通用样式的基础上再给购物车额外添加一个class



## 七、弹窗提示组件

### **1、写样式**

1. common里新建一个组件toast，随便写点样式

2. app.vue里引用，先显示出来

3. iconfont里引用图标

4. 写css调样式

   ```html
   <template>
     <div class="toast">
       <i class="icon iconfont icon-chucuo"></i>
       <span>请先登录</span>
     </div>
   </template>
   
   <script>
   export default {
     name: 'Toast'
   }
   </script>
   
   <style scoped lang="less">
   .toast {
     /*置顶居中*/
     position: fixed;
     top: 0;
     left: 50%;
     transform: translate(-50%);
       
     background: #fff;
     border-radius: 5px;
     padding: 10px 20px;
     box-shadow: 0 0 10px #fff;/*阴影*/ 
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

5. 给组件一个淡入淡出的动画效果

套一个transition给一个name

通过vuex和v-show管理显示与隐藏的状态

```html
<transition name="fade">
  <Toast v-show="showToast"></Toast>
</transition>
```

淡入淡出的css

```css
.fade-enter {
  opacity: 0; /** 插入的新元素最开始是透明的 **/
}
.fade-enter-active {
  transition: opacity 0.5s; /**然后用动画过渡慢慢显示出来**/
}
.fade-leave {
  opacity: 1; /**离开的元素开始是不透明的**/
}
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.5s; /**然后离开的时候慢慢变透明**/
}
```



### **2、写方法**

因为是多个组件关联同一个数据，所以用vuex管理

```js
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
      state.showToast = payload.state
      state.msg = payload.msg
      state.classType = payload.classType
    }
  },
  actions: {}
}

```



TopBar组件给"游客"一个点击事件

```html
<li @click="hdclick">
  <i class="icon iconfont icon-youke"></i> 用户名：游客
</li>
```

引入方法后调用

```js
hdclick() {
  this.changeToastState({
    state: true, // 点击后显示弹窗
    msg: '请先登录',// 弹窗文字
    classType: 'icon-chucuo' // 弹窗icon
  })
  // 1.5秒后再调用依次，关闭弹窗，内容一样
  setTimeout(() => {
    this.changeToastState({
      state: false,
      msg: '请先登录',
      classType: 'icon-chucuo'
    })
  }, 1500)
}
```



弹窗组件的icon样式写活，绑定一个class；文字也写活

```html
<div class="toast">
  <i class="icon iconfont" :class="classType"></i>
  <span>{{ msg }}</span>
</div>
```



把绑定的数据从vuex引过来

```js
import { mapState } from 'vuex'

export default {
  name: 'Toast',
  computed: {
    ...mapState('ToastState', ['msg', 'classType'])
  }
}
```



### **3、封装弹窗方法**

封装思路

(1)调用者需要什么功能，要传哪些参数

(2)然后去写组件/函数内部的逻辑

(3)尽可能简单



1. vuex的toast-state模块

```js
actions: {
  asyncChangeToastState(state, payload) {
    // Action 提交的是 mutation，而不是直接变更状态，走一波异步
    // 这里调mutations里的changeToastState，更改state
    // 外面参数传进来，再传给changeToastState
    state.commit('changeToastState', {
      showToast: true, // 开关必执行，不用通过传参
      msg: payload.msg, // 弹窗文字
      classType: payload.classType // icon和颜色
    })

    setTimeout(() => {
      state.commit('changeToastState', {
        showToast: false, // 开关必执行，不用通过传参
        msg: payload.msg,
        classType: payload.classType
      })
    }, 1500)
  }
}
```

2. TopBar调用

```js
import { mapActions } from 'vuex'

export default {
  name: 'TopBar',
  methods: {
    ...mapActions('ToastState', ['asyncChangeToastState']),
    hdclick() {
      this.changeToastState({
        msg: '请先登录',
        classType: 'icon-chucuo'
      })
    }
  }
}
```



### **4、把alert弹窗替换成自己写的toast弹窗**

1.组件里的alert

组件里引用的话辅助函数mapActions套进去就行了

2.js里的alert

```js
// request.js


// 引入vuex
import store from '@/store/index.js'

// 响应拦截器方法里
// 这里用自定义组件替换alert
// dispatch('路径',传参)
store.dispatch('ToastState/asyncChangeToastState', {
  msg: res_data.message,
  classType: 'icon-chucuo'
})
```



发现classType里面直接写标签的类名不太好记，把它改成传warning、success、error，之后在vuex模块里进行判断

三元判断，从左到右

```js
classType:
  payload.classType === 'error'
    ? 'icon-chucuo'
    : payload.classType === 'warning'
    ? 'icon-jingshi'
    : 'icon-zhengque'
```



## 八、扫码登录

### **1、获取二维码**

1. public/index.html引入

```html
<script src="https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
```

2. 二维码标签给个id

```html
<div id="weixin" class="qrcode" v-show="!showForm"></div>
```

3. 获取微信二维码方法

```js
weixinClick() {
  // 切换到微信登录和盒子
  this.showForm = false

  // 申请二维码
  let _this = this
  new WxLogin({
    id: 'weixin',
    appid: 'wx67cfaf9e3ad31a0d', // 这个appid是人家给的，写死
    scope: 'snsapi_login',
    // 扫码成功后重定向的接口
    redirect_uri: 'https://sc.wolfcode.cn/cms/wechatUsers/shop/PC',
    // state填写编码后的url
    state: encodeURIComponent(
      window.btoa('http://127.0.0.1:8080' + _this.$route.path)
    ),
    // 调用样式文件
    href: ''
  })
}
```

4. 微信登录切换标签绑定方法

```html
<li :class="showForm === false ? 'active' : ''" @click="weixinClick">
  微信扫码登录
</li>
```



### **2、调整二维码样式**

1. utils建一个wxLoginStyle来调二维码样式，里面有js和css
2. data-url.js

```js
// data-url.js

var fs = require('fs')

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file)
  // convert binary data to base64 encoded string
  return 'data: text/css;base64,' + new Buffer.from(bitmap).toString('base64')
}

console.log(base64_encode('./wxlogin.css'))

```

3. wxlogin.css

```css

.impowerBox .title, .impowerBox .info{
    display: none;
}
.impowerBox .qrcode{
    margin-top: 0;
}

/* 这些类名到网页的element里找 */
```

4. 用node.js运行data-url.js文件

```
node data-url.js
```

5. 把经过base64转码的css样式粘贴到href

```js
weixinClick() {
  // 切换到微信登录和盒子
  this.showForm = false

  // 申请二维码
  let _this = this
  new WxLogin({
    id: 'weixin',
    appid: 'wx67cfaf9e3ad31a0d', // 这个appid是人家给的，写死
    scope: 'snsapi_login',
    // 扫码成功后重定向的接口
    redirect_uri: 'https://sc.wolfcode.cn/cms/wechatUsers/shop/PC',
    // state填写编码后的url
    state: encodeURIComponent(
      window.btoa('http://127.0.0.1:8080' + _this.$route.path)
    ),
    // 调用样式文件
    href: 'data:text/css;base64,DQouaW1wb3dlckJveCAudGl0bGUsIC5pbXBvd2VyQm94IC5pbmZvew0KICAgIGRpc3BsYXk6IG5vbmU7DQp9DQouaW1wb3dlckJveCAucXJjb2Rlew0KICAgIG1hcmdpbi10b3A6IDA7DQp9DQo=' 
  })
}
```

注意: 这个经过base64转码的css有坑：cmd输出的data: 后面是带一个空格的，这里要把空格拿掉



### 3、扫码登录流程

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

5. **请求响应后对返回的code 0 、 400 、 407进行处理**

code === 0     // 微信扫码登录成功

code === 400      // code失效

​     // 1 提示用户重新扫二维码

​     // 2 把登录框打开，打开微信扫码，重新申请二维码

code === 407     // 当前扫码的微信号还没有绑定手机号

​     // 1 提示让用户用手机号登录

​     // 2 打开手机登录窗口

​     // 3 保存uuid到本地

​     // 4.Login登录按钮判断本地uuid，然后调用手机绑定微信号的接口

```js
// TopBar.vue

  created() {
    // 以防请求在code获取到之前发生，使用nextTick()
    this.$nextTick().then(async () => {
      let loginCode = this.$route.query.code
      // 有code发起请求
      if (loginCode) {
        let wechatLoginResponse = await wechatLogin({ code: loginCode })
        console.log(wechatLoginResponse)

        // 对返回的code0、400、407的处理
        if (wechatLoginResponse.code === 0) {
          // 微信扫码登录成功
        } else if (wechatLoginResponse.code === 400) {
          // code失效
          // 1 提示用户重新扫二维码
          this.asyncChangeToastState({
            msg: 'code失效，请重新扫码',
            classType: 'error'
          })
          // 2 把登录框打开，打开微信扫码，重新申请二维码
          this.changeLoginModuleState(true)
          this.switchLoginMode(false)
          // 申请二维码
          let _this = this
          new WxLogin({
            id: 'weixin',
            appid: 'wx67cfaf9e3ad31a0d', // 这个appid是人家给的，写死
            scope: 'snsapi_login',
            // 扫码成功后重定向的接口
            redirect_uri: 'https://sc.wolfcode.cn/cms/wechatUsers/shop/PC',
            // state填写编码后的url
            state: encodeURIComponent(
              window.btoa('http://127.0.0.1:8080' + _this.$route.path)
            ),
            // 调用样式文件
            href: 'data:text/css;base64,DQouaW1wb3dlckJveCAudGl0bGUsIC5pbXBvd2VyQm94IC5pbmZvew0KICAgIGRpc3BsYXk6IG5vbmU7DQp9DQouaW1wb3dlckJveCAucXJjb2Rlew0KICAgIG1hcmdpbi10b3A6IDA7DQp9DQo='
          })
        } else if (wechatLoginResponse.code === 407) {
          // 当前扫码的微信号还没有绑定手机号
          // 1 提示让用户用手机号登录
          this.asyncChangeToastState({
            msg: '请使用手机号绑定登录微信',
            classType: 'warning'
          })
          // 2 打开手机登录窗口
          this.changeLoginModuleState(true)

          // 3 保存uuid到本地
          localStorage.setItem('uuid', wechatLoginResponse.uuid)
          // 4.Login登录按钮判断本地uuid，然后调用手机绑定微信号的接口
        }
      }
    })
  },
```

5. **code 400 和  407 也是业务成功，所以拦截器的条件改一下**

```js
// code为0、400、407时，业务逻辑为成功
if (res_data.code != 0 && res_data.code != 400 && res_data.code != 407) 
```

6. **修改Login组件的 登录 按钮逻辑**



```js
// Login.vue登录方法内

// 登录
let uuid = localStorage.getItem('uuid')
let loginResponse = null

// 判断是普通登录还是绑定登录
if (uuid) {
  // 调用绑定登录的接口
  loginResponse = await wechatBindingLogin({
    verifyCode: this.SMSCode.trim(),
    phone: this.phoneNumber.trim(),
    uuid
  })
} else {
  // 调用普通登录的接口
  loginResponse = await submitLogin({
    verifyCode: this.SMSCode.trim(),
    phone: this.phoneNumber.trim()
  })
}
```

登录成功后

```js
// Login.vue登录方法内

// 登录成功后

// 清除uuid和地址栏上的code
if (uuid) {
  // 清除本地uuid
  localStorage.removeItem('uuid')
  // 刷新当前页面
  this.$router.push(this.$route.path)
}
```

7.**code === 0的情况补上**

```js
// 微信扫码登录成功
// TopBar.vue/created(){...}

// 提示登录成功
this.asyncChangeToastState({
  msg: '登录成功',
  classType: 'success'
})

// 保存token
localStorage.setItem(
  'x-auth-token',
  wechatLoginResponse['x-auth-token']
)

// 切换登录状态
this.changeLoginState(true)

// 清除地址栏上的code
// 刷新当前页面
this.$router.push(this.$route.path)
```

8. **监听路由切换更新用户登录状态**



```js
// TopBar.vue

watch: {
  '$route.path': {
    handler(newVal, oldVal) {
      // 切换路由的时候做一个登录状态监听
      let mytoken = localStorage.getItem('x-auth-token')
      // 这里不用写if-else，token有或者没有直接拿来做布尔值的判断，交给changeLoginState就行
      this.changeLoginState(Boolean(mytoken))
    }
  }
}
```

9. **组件重载更新用户登录状态**

(1)重载TopBar组件

(2)到App.vue给TopBar的key绑定一个值TopBarValue

```html
<TopBar :key="TopBarValue"></TopBar>
```

(3)**通过改变key的值使得组件重载**

(4)用watch监听路由，路由改变就让TopBarValue改变，从而达到重载TopBar组件的目的

```js
data() {
  return {
    TopBarValue: 1
  }
},
watch: {
  '$route.path': {
    handler() {
      this.TopBarValue++
    }
  }
},
```

(5)到TopBar.vue的created

(6)有没有code的情况是   用户没扫码 ，用户已经登录

(7)再检查token，效果和 8. 的watch是一样的 

```js
{
	...
} else {
    //  此情况为 1用户没扫码 2用户已经登录
    let mytoken = localStorage.getItem('x-auth-token')
    // 这里不用写if-else，token有或者没有直接拿来做布尔值的判断，交给changeLoginState就行
    this.changeLoginState(Boolean(mytoken))
  }
```



10. 这里code出现比nextTick还晚，把nextTick改成setTimeOut



## 九、用户信息

### 1、请求携带token

```js
// 请求拦截器内

let token = localStorage.getItem('x-auth-token')
if (token) {
    // 把token放到请求头内
  config.headers['x-auth-token'] = token
}
```

### 2、获取用户信息

接口

```js
// api.js

// 获取登录用户信息
export const getUserInfo = () => instance.get('/shop/userProfiles')
```

请求

```js
// Login.vue 登录验证方法内
// 登录成功后发起获取用户信息请求
```

### 3、用户信息保存到Vuex中

获取到的用户信息有很多地方用到，所以保存到Vuex进行管理

1. 新建一个user-info，根据获取到的用户信息写入初始值
2. TopBar组件引入vuex，对数据进行绑定

因为请求之后必定要进行vuex的状态修改，又TopBar的扫码登录成功和Login的账号密码登录成功都要获取用户信息和修改vuex内初始的用户信息，所以把请求方法封装到vuex里

3. 封装获取用户信到vuex里

```js
import { getUserInfo } from '@/request/api'
export default {
  namespaced: true,
  state: {
    cartTotal: 0,
    userInfo: {
      nickName: '游客',
      coin: 0,
      headImg: 'icon iconfont icon-youke'
    }
  },
  mutations: {
    changeUserInfo(state, payload) {
      state.cartTotal = payload.cartTotal
      state.userInfo = payload.userInfo
    }
  },
  actions: {
    async asyncChangeUserInfo({ commit }) {
      let userInfoRes = await getUserInfo()
      console.log(userInfoRes)
      commit('changeUserInfo', userInfoRes.data)
    }
  }
}

```

4. 引用方法

(1)点击登录成功后Login.vue

(2)扫码登录成功后TopBar.vue

```js
// 登录成功，发送获取用户信息的请求
this.asyncChangeUserInfo()
```

5. 切换路由后监听到非登录状态， 初始化用户信息

```js
// TopBar.vue

if(地址栏有code){
    ...
} else {
    ...
    if (mytoken) {
      // 有token，则是登录状态，切换路由的时候实时更新用户信息
      this.asyncChangeUserInfo()
    } else {
      // 没token，不是登录状态，初始化用户信息
      this.initUserInfo()
    }
}
```



### 4、手动删除token后，扫码登录先弹登录成功，后弹code失效的bug

用户扫二维码点击确认后，申请二维码的new WxLogin会做一次**重定向**，然后给地址后面添加一串code，这个操作就是**重载组件**了，

所以TopBar.vue执行了created，此时地址栏上的code是有切有效的，所以进入

```js
if(loginCode){}
```

发起了登录请求，返回的业务状态码为0，继续走

```js
if (wechatLoginResponse.code === 0)
```

这里面有个方法

```js
this.$router.push(this.$route.path)
```

是要清除掉地址栏上的code（就是跳转）

此方法一执行，就改变了路由

app.vue上有个监听路由，一旦路由改变，就让TopBar重新加载

TopBar再次重新加载，created再次执行

执行到

```js
let loginCode = this.$route.query.code
if (loginCode) 
```

的时候，之前用过的code还在地址栏上，所以又进入到

```js
if (loginCode) 
```

再次发起登录请求，但地址栏上的code此时已经失效，所以返回的业务状态码为400，就走到了这个条件

```js
else if (wechatLoginResponse.code === 400)
```

然后弹出code,失效的弹窗

再次弹出微信扫码登录

依然用TopBar.vue里的watch监听路由变化，这样就避免了app.vue监听路由重载带来的bug

```js
watch: {
  '$route.path': {
    handler(newVal, oldVal) {
      // 判断是否登录
      let mytoken = localStorage.getItem('x-auth-token')
      // 这里不用写if-else，token有或者没有直接拿来做布尔值的判断，交给changeLoginState就行
      this.changeLoginState(Boolean(mytoken))
      if (mytoken) {
        // 有token，则是登录状态，切换路由的时候实时更新用户信息
        this.asyncChangeUserInfo()
      } else {
        // 没token，不是登录状态，初始化用户信息
        this.initUserInfo()
      }
    }
  }
},
```



## 十、首页样式

### 1、banner(广告横幅)

 CSS图片底部留白

**问题描述:**

div里放了个img，底部留白，用了padding:0，没去掉，记录一下。

**原因分析:**

img元素默认是inline元素，而inline元素的vertical-align属性的默认值为baseline，

也就是文字基线对齐，所以图片底部的留白就是baseline和bottom之间的距离。

**解决方案:**

1. 使用display: block;将img转换成block元素即可。

2. 重写默认的vertical-align: baseline;，建议设置为vertical-align: middle;

3. 设置图片的浮动或者定位属性，通过添加 float 或 position 属性来改变display属性，将图片隐式转换为块级元素。



### 2、Title组件(产品分类标签)

### 3、Product组件(产品列表)

1. 鼠标悬浮盒子上移的效果

(1)鼠标悬浮在外面的盒子上里面的盒子上移

(2)外面一个固定位置的盒子

(3)里面一个可移动的盒子

**这个可移动的盒子初始状态和悬浮状态都要有相对定位属性，否则过度动画无效**

**相对定位，是相对自己初始位置的定位**

```html
<template>
  <div class="Product">
    <li class="fixed-box" v-for="(item, index) in 8" :key="index">
      <div class="movable-box">
        <img
          src="http://sc.wolfcode.cn/upload/images/product_images/20200629/c73c4afe-43c6-4d87-9cdd-4db6828059a0.png"
          alt=""
        />
        <h3>帆布袋</h3>
        <section>
          <span>2500</span>
          <img class="chicken-leg" src="@/assets/icon/chicken-leg.svg" alt="" />
        </section>
        <div class="btn">立即兑换</div>
        <img
          v-show="true"
          class="top-left-corner"
          src="@/assets/icon/new-icon.png"
          alt=""
        />
        <img
          v-show="false"
          class="top-left-corner"
          src="@/assets/icon/hot-icon.png"
          alt=""
        />
      </div>
    </li>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
@import '~@/assets/css/global-style.less';
.Product {
  font-size: 18px;
  font-weight: 100;
  display: flex;
  // 换行
  flex-wrap: wrap;
  // 固定的盒子li
  .fixed-box {
    cursor: pointer;
    margin: 0 20px 20px 0;
    &:nth-of-type(4n) {
      // 第4的倍数个时，右侧外边距为0
      margin-right: 0;
    }
    // 可移动的盒子div，鼠标悬浮后向上移动
    .movable-box {
      background: #fff;
      // relative: 标签(或者说盒子)仍然占有初始的位置，相对初始位置进行位置的调整( 利用top、bottom、left、right这些属性调整相对位置)
      // 这里默认情况下(鼠标没有悬浮在盒子上)，也要给它一个position: relative;和top: 0;，否则:hover状态的时候不会有过渡动画的效果
      position: relative;
      top: 0;
      transition: 0.5s;
      padding-bottom: 32px;

      h3 {
        font-weight: 100;
      }
      section {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        span {
          color: #fd604d;
          font-weight: 700;
        }
        .chicken-leg {
          width: 20px;
          height: 20px;
        }
      }
      .btn {
        width: 100px;
        height: 36px;
        border: 1px solid @base-color;
        line-height: 36px;
        margin: 0 auto;
      }
      .top-left-corner {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    // 这个对应上面的 .movable-box
    &:hover {
      .movable-box {
        position: relative;
        top: -5px;
        // box-shadow对应的参数分别是 x轴偏移量、y轴偏移量、阴影模糊半径、阴影颜色
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
        .btn {
          background: @base-color;
          color: #fff;
        }
      }
    }
  }
}
</style>

```

### 4、Strategy组件(攻略列表)

(1)内联样式绑定填充背景图片

内联样式

```html
<!-- html -->
<li :style="{ background: 'url(' + item.background + ')' }"></li>
```

对象数据

```js
// js
data() {
  return {
    strategyList: [
      {
        h4: '签到得鸡腿',
        btn: '去签到',
        background: require('@/assets/img/strategy-sign-in.png')
      },
      ...
    ]
  }
}
```



### 5、父传子组件数据

(1)在父组件的组件标签上自定义一个attribute

```html
// Home.vue
<Title :title="boutique.name"></Title>

```

(2)在子组件的js内写入props

```js
export default {
  props: ['title']
}
```

(3)子组件内用props定好的参数名做绑定就行

```html
<h2>{{ title }}</h2>
```

### 6、数据渲染最大长度的控制

(1)父传子组件数据的时候，可以直接把请求到的数据用filter处理

(2)给子组件标签一个maxLength , 把它交给data的maxLength管理(绑定data的maxLength)；子组件内props引入maxLength，用v-show = "index < maxLength"做条件渲染

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

### 7、跳转详情页

(1)配置路由

(2)加接口，传id

```js
// api.js
//商品详情
export const productDetail = (id) => instance.get(`/products/${id}`)
```

(3)Product.vue组件加点击事件

```html
<li
  class="fixed-box"
  v-for="(item, index) in list"
  :key="item.id"
  v-show="index < maxLength"
  @click="toDetail(item.id)"
></li>
<script>
export default {
  props: ['list', 'maxLength'],
  methods: {
    toDetail(id) {
      this.$router.push(`/detail?id=${id}`)
    }
  }
}
</script>
```

(4)详情页发起请求

```html
<script>
import { productDetail } from '@/request/api.js'
export default {
  async created() {
    let id = this.$route.query.id
    let productRes = await productDetail(id)
    console.log(productRes)
  }
}
</script>
```

## 十一、详情页

**滚动条初始化**

```js
// Detail.vue
async created(){
    // 因为是单页面应用，所以切换页面的时候滚动条是不会初始化置顶的
	// 所以设置页面滚动高度为0
	document.documentElement.scrollTop = 0
}
```



**抽取图片基本路径**

```js
// main.js
Vue.prototype.imgBaseUrl = 'https://sc.wolfcode.cn'
```

```html
<!-- 其他组件引用 -->
<img :src="imgBaseUrl + url">
```



**富文本渲染**

将富文本绑定到v-html

```html
<div class="productDetail" v-show="showIssue" v-html="richText"></div>

```

修改富文本样式

```js
richText.replaceAll(被替换的内容, 新内容)
// replace只会替换一个
```



### 1、Main组件(图片和选择规格等)

(1)

```js
// 功能: 把从父组件传过来的 mainImgArr 的第一个数据的图片作为 初始封面
// 问题: 直接拿 mainImgArr[0].src 绑定到 第5行 img内 时会报错
// 原因: mainImgArr是父组件先发请求拿到数据，再流到这个子组件的，如果直接 在第5行 img内 使用 mainImgArr[0].src ，会因为数据还没从父组件流过来而报错(此时mainImgArr为空或者说不存在)
// 解决: 用watch监听mainImgArr数据是否已经从父组件流过来，若已经有mainImgArr，把初始图片赋值给该页面定义的coverImg，再拿coverImg 在第5行 img内 使用 ，就可以解决问题
```

(2)

```css
flex: 1
/* 横向填满盒子 */
```



(3)增加/减少/输入商品

增加/减少商品

**不用写两个函数分别控制加减**

```js
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


// ps 切换产品或规格的时候，input框内的数字需要初始化，这里直接在父组件detail里面拿到该子组件Main里的productAmount的值去做初始化(this.$refs.父组件里子组件的标签定上义的ref的属性名.productAmount) 
```





**加入购物车功能**

1. api添加请求接口

2. 处理相应code

3. 弹对应的窗

4. 用vuex建一个重载topbar的module

给app.vue的topbar标签绑定一个vuex的值topBarKeyValue

给main.vue的加入购物车的方法内引入一个更改topBarKeyValue

当topbar的key值被更改的时候，组件发生重载

重载后重新请求用户信息

更新了购物车的数量

### 2、Aside组件

(1)超出盒子的字样用省略号代替

```css
/* 超出盒子的字样用省略号代替 */
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```



(2)"你还可以兑换"栏的li点击跳转

直接给li点击绑定方法，是不起作用的，

因为**当前页地址已经是detail**，

所以只会更改detail地址后面的id参数，而**不会重载页面**

```html
<!--当前页http://localhost:8080/detail?id=126-->
<li @click="toDetail(item.id)"></li>
<script>
export default {
  methods: {
    toDetail(id) {
      this.$router.push(`/detail?id=${id}`)
    }
  }
}
</script>
```

解决: 监听到id改变后(地址栏上的id改变后)，重载组件即可

```js
watch: {
  '$route.query.id': {
    handler() {
      // 重载页面
      this.$router.go(0)
    }
  }
}
```

但是这种重载组件的用户体验不好

这个跳转本质上就是再做一遍请求，渲染新数据就可以了

只需要在子组件 this.$router.push 改变地址栏的id

父组件监听id地址栏id的改变，一旦发生改变(用户点击了"你还可以兑换"栏的商品), 就请求新的数据



这时候的 图片 和 产品尺码/类型 的标签是不会自己复位的，所以当detail组件监听到id发生改变时，需要复位标签

```html
<!-- 父组件改子组件数据 -->

<Main ref="Main" :mainData="mainData"></Main>

<script>
watch: {
  '$route.query.id': {
    handler() {
      // ...
      // 获取新的数据后，图片和产品tag复位
      this.$refs.Main.imgNum = 0
      this.$refs.Main.typeNum = 0
    }
  }
},
</script>
```



切换产品规格的时候地址栏的id也会发生改变，detail组件的监听同样会执行，即一旦切换规格，规格标签也会被初始化，产生bug



所以这里，把图片和产品的tag交由vuex管理

这样Main组件和Aside组件就可以共同管理图片和产品的渲染了

一旦用户点击了"你还可以兑换"里的产品，Aside通过vuex复位图片和产品的tag，上述bug就不会发生了



## 十二、全部商品页

**跨组件搜索**

1. header组件负责传参和跳转到goods组件

2. goods组件把header组件的keyword赋值给data的keyword然后在created发起请求即可；created也有可能来自用户自己点击到goods页，所以加一个判断条件

```js
created() {
  // 通过搜索栏进goods页的keyword传值 或者 直接进入goods页面
  this.keyword = this.$route.query.keyword || ''
  // 初次载入发起请求
  this.goodsSearch()
}
```

3. 

```js
watch: {
  // 问题: 如果当前页面是goods页, 那么搜索只会修改地址栏上的keyword而组件不发生重载, 因此导致goods页无法使用搜索
  // 解决: 只需监听keyword, 当keyword发生改变, 修改当前页data的keyword, 然后再请求一遍即可
  '$route.query.keyword': {
    handler(newVal, oldVal) {
      this.keyword = newVal
      this.goodsSearch()
    }
  }
}
```



## 十三、导航守卫( 路由拦截 )

### 全局导航守卫

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
// Good.vue
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

```js
next((vm) => {
  vm.methods里的方法名
})
```

## 十四、个人中心

子路由里用404错误页，不可以把错误页写在子路由数组的第一个，不然进来就是错误页面



## 十五、购物车

### 多选框组

需求： 

1. 进入购物车列表页，默认为全不选中状态

2. 点击表头的选择框可以 全选\取消全选

3. 表格内的选择框如果全部被选中，表头的选择框也变成选中状态；表格内的选择框没有全被选中，或者全都没选中，表头的选择框变成非选中状态

实现: 

1. 请求到的数组加一个hasSelected属性方便状态管理

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

2. 给表头选择框添加 全选\取消全选方法

```js
// 全选\取消全选
selectAll() {
  this.hasTotalSelected = !this.hasTotalSelected
  if (this.hasTotalSelected === false) {
    for (let i in this.productList) {
      this.productList[i].hasSelected = false
    }
  } else {
    for (let i in this.productList) {
      this.productList[i].hasSelected = true
    }
  }
}
```

3. 通过监听productList每一项的hasSelected，来控制表头选择框的状态

```js
watch: {
  productList: {
    handler(newVal, oldVal) {
      // 因为every收到的数组如果是空的，所以不管什么情况都会返回true,
      // 所以会遇到两种状况:
      // 1.当购物车列表为空进购物车页时会自动勾选 全选按钮,
      // 2.在全选物品状态下删掉购物车内所有物品时，全选按钮依然是勾选的
      // 这里return掉就可以了
      // 这里return掉后, 第2种情况会出问题: 当列表商品为全选状态时删掉购物车内所有物品, 此时购物车列表为空, 即数组长度为0, 所以走到下面的判断就会被return掉, 而此时 this.hasTotalSelected的值依然为true, 所以购物车内所有的物品时全选按钮依然时勾选的, 那么只需要在下面if里给this.hasTotalSelected = false即可
      if (newVal.length === 0) {
        this.hasTotalSelected = false
        return
      }
	  //当每一项hasSelected都选中时
      if (newVal.every((cVal) => cVal.hasSelected === true)) {
        // 勾选表头选择框
        this.hasTotalSelected = true
      } else {
        // 否则，取消勾选表头选择框
        this.hasTotalSelected = false
      }
    },
    // 深度监听
    deep: true
  }
},
```



### 统计商品积分

需求： 算出勾选状态下商品的积分

实现： 用计算属性，遍历数组，把选中状态下的商品做累加即可

```js
// 所有商品共计积分
amount() {
  let count = 0
  for (let i in this.productList) {
    // 选中的算总计
    if (this.productList[i].   === true) {
      let simpleItemAmount =
        this.productList[i].total * this.productList[i].coin
      count += simpleItemAmount
    }
  }
  return count
}
```



## 十六、滚动加载

需求:  滚动条触底加载数据

实现: 

1. 监听事件加载和卸载

这个滚动加载只有在当前组件才有效，所以进组件加载，离开组件要卸载

```js
mounted() {
  // 进入组件加载监听事件
  window.addEventListener('scroll', this.scrollLoading) // addEventListener('监听事件', 执行函数)
},
beforeDestroy() {
  // 离开组件后删除监听事件
  window.removeEventListener('scroll', this.scrollLoading)
},
```



2. 滚动加载函数

(1)算出滚动条到底部的距离 = 窗口高度 + 超出窗口的高度跟页面总高度作比较

当 窗口高度 + 超出窗口的高度 => 页面总高度 时 就是滚动条到底部了

```js
if(getClientHeight() + getScrollTop() >= getScrollHeight() - 20){

}
```



(2)图片加载完就不再执行加载, 给出一个 '没有更多了' 的字样

```js
if (this.showList.length >= this.list.length) {
  // 更改加载字样为 '没有更多了'
  this.hasReachedBottom = true
  // 不再执行下面的代码, 提升性能
  return
}
```



(3)每次滚动条触底会多次触发 触底加载, 需要加一个节流

节流: 利用一个变量，控制代码在一段时间内(setTimeOut)不会重复触发执行

```js
// data的isLoading: false

// 如果为false进入加载
if (this.isLoading === false) {
  // 把状态改为true, 500ms(setTimeOut)内该函数不会重复触发执行
  this.isLoading = true
  setTimeout(() => {
    this.page++ // 从第二页开始
    for (
      let i = (this.page - 1) * this.size;
      i < this.size * this.page;
      i++
    ) {
      // 针对最后一页，如果有才push到数组里
      this.list[i] ? this.showList.push(this.list[i]) : ''
    }
    // 500ms后当执行循环遍历, 遍历结束后isLoading状态改为false, 此时可以重新触发该函数
    this.isLoading = false
  }, 500)
}
```



## 十七、跨域配置

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



## 十八、环境变量

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

