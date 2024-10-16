// 登录接口ts类型
export interface loginForm {
    username: string,
    password: string
}
interface dataType{
    message: string | undefined
    token:string
}
// 接口返回数据
export interface loginResponseData {
    code: number,
    data: dataType
}
interface userInfo{
    userId:number,
}
interface user{
    checkUser:userInfo
}
// 服务器返回用户信息
export interface userInfoReponseData {
    data:user
}