import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import axios from 'axios'
import router from './router'
// 配置element-plus国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 获取应用实例对象
const app = createApp(App)
// 安装emement-plus插件
app.use(ElementPlus, {
    locale: zhCn
})
import 'virtual:svg-icons-register'
// 引入自定义插件对象 注册整个项目全局组件
import gloablComponent from './components/index';
app.use(gloablComponent);
// 测试代码 测试假接口
// 登录
// axios({
//     url: '/api/user/login',//请求地址
//     method: 'post',//请求方式
//     data: {
//         username: 'admin',
//         password: '111111'
//     }
// })
// 注册模版路由
app.use(router);
// 将应用挂载到挂载点上
app.mount('#app')

