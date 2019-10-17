<template>
    <!--<div>  <button type="button" @click="$router.go(-1)">返回</button> <input type="text"></div>-->

    <div class="reg">
        <div class="header-top">
            <div class="topicon"></div>
            <div class="toptext">注册</div>
        </div>
        <form class="content">
            <div class="code">
                <input type="text" class="codetext" placeholder="验证码">
                <div class="code-img"></div>
            </div>
            <div class="phone">
                <input type="text" class="phoneread" placeholder="请输入手机号">
                <div class="getcode">获取短信验证码</div>
            </div>
            <div class="codephone">
                <input type="text" placeholder="请输入短信验证码">
            </div>
            <div class="password">
                <input type="text" placeholder="密码">
            </div>
        </form>

        <div class="btn-area">
            <div class="button">注册</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reg",
         mounted(){
            document.title=this.$route.meta.title
        }
    }
</script>

<style scoped>
    .reg{background:#fff;}
    .header-top{width:100%;height:1.02rem;background: #ffffff;display: flex;border-bottom:1px solid #efefef;}
    .topicon{width:0.8rem;height:0.8rem;margin-top:2%;}
    .toptext{width:6rem;height:1rem;color:#323232;font-size:0.32rem;text-align: center; line-height:1rem;}
    .code,.phone,.codephone,.password{width:90%;height:0.84rem;border:1px solid #efefef;background:#fff;margin:0 auto;font-size:0.28rem;margin-bottom:0.28rem;padding-left:0.2rem;}
    .codetext{width:80%;height:100%;font-size:0.32rem;line-height:0.84rem; }
    .code-img{}
    .btn-area{background:#ffffff;padding-top:5%;}
    .button{width:70%;height:0.8rem;margin:0 auto;background:#e51b19;color:#fff;border-radius: 3px;font-size:0.32rem;line-height:0.8rem;text-align: center;}
</style>
