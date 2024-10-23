import SvgIcon from './SvgIcon/index.vue';
//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App, Component } from 'vue';
const components: { [name: string]: Component } = { SvgIcon };
export default {
    //必须叫做install方法
    //会接收我们的app
    install(app: App) {
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key]);
        })
        //将element-plus提供全部图标注册为全局组件 
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    },
    
}