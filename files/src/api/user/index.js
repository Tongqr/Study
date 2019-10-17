import config from '../../assets/js/conf/config.js';
import {request} from '../../assets/js/libs/request.js';

//会员登录
export function loginData(cellphone,password) {
    return request(config.baseApi+"/home/user/pwdlogin?token="+config.token,"post",{cellphone:cellphone,password:password});
}

//获取会员信息
export function getUserInfoData(uid) {
    return request(config.baseApi+"/user/myinfo/userinfo/uid/"+uid+"?token="+config.token)
}

//安全退出
export function safeOutLogin(uid) {
    return request(config.baseApi+"/home/user/safeout?token="+config.token,"post",{uid:uid})
}
//检测图片验证码
export function checkedVcodeData(vcode){
    return request(config.baseApi+"/home/user/checkvcode?token="+config.token,"post",{vcode:vcode});
}

//检测手机号是否存在
export function existCellphoneData(cellphone) {
    return request(config.baseApi+"/home/user/isreg?token="+config.token,"post",{username:cellphone});
}

//会员注册
export function regData(data) {
    if(data instanceof Object){
        return request(config.baseApi+"/home/user/reg?token="+config.token,"post",data);
    }
}

//单点登录认证
export function safeUserData(uid,authToken) {
    return request(config.baseApi+"/home/user/safe?token="+config.token,"post",{uid:uid,auth_token:authToken});
}

//头像上传  post上传已经封装好了  FormData
export function uploadHeadData(headfile){
    return request(config.baseApi+"/user/myinfo/formdatahead?token="+config.token,"file",{headfile})
}

//修改会员信息
export function updateUserData(data){
    return request(config.baseApi+"/user/myinfo/updateuser?token="+config.token,"post",data);
}