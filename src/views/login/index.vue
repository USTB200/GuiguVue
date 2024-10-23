<!-- 左右两栏布局，
el-col是24份的，在此左右分为了12份。我们在右边放置我们的结构。:xs="0"是为了响应式。el-form下的element-plus元素都用el-form-item包裹起来。 -->
<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <!-- Form 组件提供了表单验证的功能，只需为 rules 属性传入约定的验证规则，
                     并将 form-Item 的 prop 属性设置为需要验证的特殊键值即可 -->
                    <!-- 添加用户名属性 -->
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <!-- 添加密码属性-->
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
import { ElNotification } from 'element-plus';
import {getTime} from '@/utils/time'
let useStore = useUserStore();
let $router = useRouter();
let loading = ref(false);
//获取表单元素
let loginForms = ref()
//收集账号与密码数据
let loginForm = reactive({ username: 'admin', password: '111111' })
//登录按钮的回调
const login = async () => {
    //保证全部表单项校验通过再发请求
    //会返回一个promise（失败or成功fulfilled）
    //await是接受的promise成功的结构（变异步为同步，报错了后续无法执行）
    //作用：前端控制发请求时机，减少无用的请求
    await loginForms.value.validate()
    //按钮加载效果
    loading.value = true
    //点击登录按钮以后干什么
    //通知仓库发起请求
    //请求成功->路由跳转
    //请求失败->弹出登陆失败信息
    try {
        //try catch 也可以书写.then语法
        await useStore.userLogin(loginForm)
        //编程式导航跳转到展示数据的首页（成功跳转）
        $router.push('/')
        //登录成功的提示信息
        ElNotification({
            type: 'success',
            message: '登录成功！',
            title:`航哥你好，${getTime()}好`,
        })
        //登录成功,加载效果也消失
        loading.value = false
    } catch (error) {
        console.log('error')
        //登陆失败加载效果消失
        loading.value = false
        //登录失败的提示信息
        ElNotification({
            type: 'error',
            message: (error as Error).message,
        })
    }
}
//自定义校验规则函数
const validatorUserName = (_rule: any, value: any, callback: any) => {
    //rule：校验规则对象
    //value:表单元素文本内容
    //callback:符合条件，callback放行通过，不符合：注入错误提示信息
    if (value.length >= 5) {
        callback()
    } else {
        callback(new Error('账号长度至少5位'))
    }
}

const validatorPassword = (_rule: any, value: any, callback: any) => {
    if (value.length >= 6) {
        callback()
    } else {
        callback(new Error('密码长度至少6位'))
    }
}
//定义表单校验需要的规则对象
const rules = {
    username: [
        // //规则对象属性:
        // {
        //     required: true, // required,代表这个字段务必要校验的
        //     min: 5, //min:文本长度至少多少位
        //     max: 10, // max:文本长度最多多少位
        //     message: '长度应为6-10位', // message:错误的提示信息
        //     trigger: 'change', //trigger:触发校验表单的时机 change->文本发生变化触发校验, blur:失去焦点的时候触发校验规则
        // },
        // 自定义校验规则
        { trigger: 'change', validator: validatorUserName },
    ],
    password: [
        // {
        //     required: true,
        //     min: 6,
        //     max: 10,
        //     message: '长度应为6-15位',
        //     trigger: 'change',
        // },
        // 自定义校验规则
        { trigger: 'change', validator: validatorPassword },
    ],
}
</script>

<style lang="scss" scoped>
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            color: white;
            font-size: 20px;
            margin: 20px 0px;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>
