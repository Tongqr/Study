let modules={
    namespaced:true,
    state:{
        nickname:localStorage['nickname']?localStorage['nickname']:"",
        isLogin:localStorage['isLogin']?Boolean(localStorage['isLogin']):false
    },
    mutations:{
        login(state,payload){
            localStorage['nickname']=payload.nickname;
            localStorage['isLogin']=payload.isLogin;
            state.nickname=payload.nickname;
            state.isLogin=payload.isLogin;
        },
        outLogin(state){
            localStorage.removeItem("nickname");
            localStorage.removeItem("isLogin");
            state.nickname="";
            state.isLogin=false;
        }
    }
};
export default modules
