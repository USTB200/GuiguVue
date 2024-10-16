import axios from "axios";
import { ElMessage } from "element-plus";
//创建axios实例,进行其他配置（基础路径和超时时间）
let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})
//**请求拦截器**
request.interceptors.request.use(config => {
    //携带公共参数
    config.headers.token='123';
    // config配置对象 headers属性请求头，常用于给服务器端添加公共参数
    // 返回配置对象
    return config;
});
//**响应拦截器**
request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    // 处理网络错误
    // 变量存储网络错误
    let msg = '';
    // 状态码
    let status = error.response.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";

    }
    // 提示错误信息
    ElMessage({
        type: 'error',
        message: msg
    })
    // 返回失败的promise（终结）
    return Promise.reject(error);
});
// 对外暴露 方便其他地方使用
export default request;