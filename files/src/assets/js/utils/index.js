import echo from '../libs/echo.js';

export function lazyImg(){
    echo.init({
        offset : 100,//可是区域多少像素可以被加载
        throttle : 0 //设置图片延迟加载的时间
    });
}

//单点登录验证
export function safeUser(_this) {
    _this.$store.dispatch("user/safeUser",{uid:_this.$store.state.user.uid,authToken:_this.$store.state.user.authToken,success:(res)=>{
//                console.log(res)
        if(res.code!==200) {
            _this.$router.push("/login")
            _this.$store.dispatch("user/storeOutLogin")
        }
    }})

}

//