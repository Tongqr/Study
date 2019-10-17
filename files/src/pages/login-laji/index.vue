<template>
    <!--<div>  <button type="button" @click="$router.go(-1)">返回</button> <input type="text"></div>-->
    <div class="login">
        <HeaderComponent title="会员登录"></HeaderComponent>
        <div class="login-main">
            <form>
                <div class="phone">
                    <input type="text" placeholder="手机号">
                </div>
                <div class="password">
                    <input type="text" placeholder="密码">
                </div>
            </form>
            <div class="btn-area">
                <div class="button">登录</div>
            </div>
            <div class="find">
                <div class="findleft">忘记密码</div>
                <div class="findright">快速注册</div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderComponent from '../../../components/header'
    export default {
        name: "login",
        components:{
            HeaderComponent
        },
        mounted(){
            document.title=this.$route.meta.title
        }
    }
</script>

<style scoped>
    .login{background:#fff;}
    .header-top{width:100%;height:1.02rem;background: #ffffff; border-bottom:1px solid #efefef;
        display: flex;}
    .topicon{width:0.8rem;height:0.8rem;margin-top:2%;}
    .toptext{width:6rem;height:1rem;color:#323232;font-size:0.32rem;
        text-align: center;
        line-height:1rem;}

    .login-main{width:100%;margin-top:0.5rem;}
    .phone,.password{width:90%;height:0.84rem;border:1px solid #efefef;background:#fff;margin:0 auto;font-size:0.28rem;margin-bottom:0.28rem;padding-left:0.2rem;}

    .btn-area{background:#ffffff;padding-top:5%;}
    .button{width:70%;height:0.8rem;margin:0 auto;background:#e51b19;color:#fff;border-radius: 3px;font-size:0.32rem;line-height:0.8rem;text-align: center;}
    .find{width:90%;height:0.8rem;
        display: flex;justify-content: space-between}
    .findleft,.findright{width:auto;height:auto;font-size:0.24rem;line-height: 0.8rem;padding-left:0.5rem;}
</style>
