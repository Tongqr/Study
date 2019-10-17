<template>
    <div class="usercenter-wrap">
        <div class="myheader">
            <div class="header-top">
                <div class="topicon"></div>
                <div class="toptext">会员中心</div>
            </div>
            <div class="nickname">
                <div class="topimg"></div>
                <div class="topnickname">昵称：</div>
                <div class="topscole">我的积分：0</div>
            </div>
        </div>
        <div class="allorder">
            <div class="all-order">全部订单</div>
            <a class="readorder">查看全部订单</a>
        </div>
        <div class="order-item">
            <a class="pay">
                <div>待支付</div>
            </a>
            <a class="take">
                <div>待收货</div>
            </a>
            <a class="comment">
                <div>待评价</div>
            </a>
        </div>
        <div class="my-space"></div>
        <div class="my-list">
            <ul class="selfintroduce">
                <li class="listtext">个人资料</li>
                <li></li>
            </ul>
            <ul class="address">
                <li class="listtext">地址管理</li>
                <li></li>
            </ul>
            <ul class="phone">
                <li class="listtext">绑定手机</li>
                <li></li>
            </ul>
            <ul class="password">
                <li class="listtext">修改密码</li>
                <li></li>
            </ul>
            <ul class="collections">
                <li class="listtext">我的收藏</li>
                <li></li>
            </ul>
        </div>
        <div class="btn-area">
            <div class="button">登录/注册</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my",
        mounted(){
            document.title=this.$route.meta.title
        }
    }
</script>

<style scoped>
.usercenter-wrap{width:100%;backgroud:#efefef;}
    .myheader{width:100%;}
.header-top{width:100%;height:1.02rem;background: #ffffff;
    display: flex;}
    .topicon{width:0.8rem;height:0.8rem;margin-top:2%;}
    .toptext{width:6rem;height:1rem;color:#323232;font-size:0.32rem;
        text-align: center;
        line-height:1rem;}
    .nickname{width:100%;height:2.8rem;background:#ff0000;
        position: relative;}
    .topimg{width:1.2rem;height:1.2rem;border-radius: 50%;
        position: absolute;left:5%;top:45%;background:#fff;}
    .topnickname,.topscole{width:auto;height:auto;position:absolute;left:2rem;top:55%;font-size:0.24rem;color:#fff;}
    .topscole{top:70%;}
    .allorder{width:100%;height:0.82rem;background: #fff;
        display: flex;justify-content: space-between;align-items: center;}
    .all-order{width:auto;height:auto;font-size:0.28rem;color:#323232;padding-left:3%;  }
    .readorder{width:auto;height:auto;font-size:0.24rem;padding-right: 3%;color:#323232;}

    .order-item{width:100%;height:1.4rem;background: #fff;display: flex;justify-content: space-between;color: #323232;border-top:1px solid #efefef;align-items: center;}
    .pay,.take,.comment{width:0.92rem;height:0.84rem;background-size:60%;
        position: relative;
        margin-left:10%;}
    .take{margin-left:0px;}
    .comment{margin-left:0px;margin-right:10%;}
.pay>div,.take>div,.comment>div{width:auto;height: auto;font-size:0.24rem;position:absolute;bottom:0px;left:3px;}

    .my-space{width:100%;  height:15px;}

    .my-list{width:100%;background: #fff;}
    .selfintroduce,.address,.phone,.password,.collections{width:100%;height:0.82rem;border-bottom: solid 1px #efefef;display: flex;justify-content: space-between;align-items: center;}
    .listtext{font-size:0.32rem;color:#323232;padding-left:0.75rem;}
    .btn-area{background:#ffffff;padding-top:5%;}
    .button{width:70%;height:0.8rem;margin:0 auto;background:#e51b19;color:#fff;border-radius: 3px;font-size:0.32rem;line-height:0.8rem;text-align: center;}
</style>
