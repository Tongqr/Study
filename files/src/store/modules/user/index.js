import {loginData,getUserInfoData,safeOutLogin,checkedVcodeData,existCellphoneData,regData,safeUserData,uploadHeadData,updateUserData} from '../../../api/user/index.js'
let modules={
    namespaced:true,
    state:{
        uid:localStorage["uid"]?localStorage["uid"]:"",
        nickname:localStorage["nickname"]?localStorage["nickname"]:"",
        authToken:localStorage["authToken"]?localStorage["authToken"]:"",
        isLogin:localStorage["isLogin"]?Boolean(localStorage["isLogin"]):false,
        userInfo:{}
    },
    mutations:{
        login(state,payload){
            loginData(payload.cellphone,payload.password).then(res=>{

                if(res.code==200){
                    state.uid=res.data.uid;
                    state.nickname=res.data.nickname;
                    state.authToken=res.data.auth_token;
                    state.isLogin=true;
                    localStorage["uid"]=res.data.uid;
                    localStorage["nickname"]=res.data.nickname;
                    localStorage["authToken"]=res.data.auth_token;
                    localStorage["isLogin"]=true;

                }
                if(payload&&payload.success){
                    payload.success(res)
                }
            })
        },
        //获取会员信息
        getUserInfo(state,payload){
            getUserInfoData(payload.uid).then(res=>{
                // console.log(res)
                if(res.code==200){
                    state.userInfo=res.data;
                    if(payload&&payload.success){
                        payload.success(res.data);
                    }
                }
            })
        },
        //退出会员
        storeOutLogin(state){
            safeOutLogin(state.uid).then(res=>{
                state.uid="";
                state.nickname="";
                state.authToken="";
                state.isLogin=false;
                state.userInfo={}
                localStorage.removeItem("uid")
                localStorage.removeItem("nickname")
                localStorage.removeItem("authToken")
                localStorage.removeItem("isLogin")
            })
        },
//注册会员
        regUser(state,payload){
            regData(payload).then(res=>{
                if(payload&&payload.success){
                    payload.success(res)
                }
            })
        },
        //单点登录
        safeUser(state,payload){
            safeUserData(payload.uid,payload.authToken).then(res=>{
                // console.log(res)
                if(payload&&payload.success){
                    payload.success(res)
                }
            })
        },
        //上传头像
        uploadHead(state,payload){
            uploadHeadData(payload.headfile).then(res=>{
                if(payload && payload.success){
                    payload.success(res);
                }
            })
        },
        //修改会员信息
        updateUser(state,payload){
            updateUserData(payload).then(res=>{
                // console.log(res)
                if(res.code==200){
                    // state.userInfo.nickname
                    if(payload&&payload.success){
                        payload.success()
                    }
                }
            })
        }
    },
    actions:{
        login(conText,payload){
            conText.commit("login",payload)
        },
        getUserInfo(conText,payload){
            conText.commit("getUserInfo",payload)
        },
        storeOutLogin(conText,payload){
            conText.commit("storeOutLogin",payload)
        },
        //检测验证码
        checkedVcode(conText,payload){
            return checkedVcodeData(payload.vcode)
        },
        //检测手机号是否存在
        existCellphone(conText,payload){
            return existCellphoneData(payload.cellphone)
        },
        regUser(conText,payload){
            conText.commit("regUser",payload)
        },
        safeUser(conText,payload){
            conText.commit("safeUser",payload)

        },
        uploadHead(conText,payload){
            conText.commit("uploadHead",payload)
        },
        updateUser(conText,payload){
            conText.commit("updateUser",payload)
        }
    }
}

export default modules