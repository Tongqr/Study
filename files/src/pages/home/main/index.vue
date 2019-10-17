<template>
    <div>
        <router-view></router-view>
        <div class="bottom-nav">
            <ul :class="{nav:true, home:true, active:homeActive}" @click="goPage('/index')">
                <li></li>
                <li>首页</li>
            </ul>
            <ul :class="{nav:true, cart:true, active:cartActive}" @click="goPage('/cart')">
                <li></li>
                <li>购物车</li>
                <li class="spot"></li>
            </ul>
            <ul :class="{nav:true, my:true, active:myActive}" @click="goPage('/my')">
                <li></li>
                <li>我的</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
            return {
                homeActive:true,
                cartActive:false,
                myActive:false
            }
        },
        created(){
            // console.log(this.$route);
            this.changeStyle(this.$route.path);
        },
        methods:{
            goPage(url){
                this.$router.replace(url);
                this.changeStyle(url);
            },
            changeStyle(url){
                switch(url){
                    case "/index":
                        this.homeActive=true;
                        this.cartActive=false;
                        this.myActive=false;
                        break;
                    case "/cart":
                        this.homeActive=false;
                        this.cartActive=true;
                        this.myActive=false;
                        break;
                    case "/my":
                        this.homeActive=false;
                        this.cartActive=false;
                        this.myActive=true;
                        break;
                    default:
                        this.homeActive=true;
                        this.cartActive=false;
                        this.myActive=false;
                }
            }
        },
        //清除keep-alive缓存
        activated(){
            document.title=this.$route.meta.title;
            this.changeStyle(this.$route.path);
        }
    }
</script>

<style scoped>
    .bottom-nav{width:100%;height:1.2rem;background-color:#FFFFFF;border-top:1px solid #CCCCCC;position: fixed;left:0;bottom:0;display:flex;justify-content: space-between;align-items: center;padding-left:0.7rem;padding-right:0.7rem;box-sizing: border-box;}
    .bottom-nav .nav{width:0.9rem;position: relative;}
    .bottom-nav .nav li:nth-child(1){width:0.6rem;height:0.6rem;margin:0 auto;}
    .bottom-nav .nav.active li:nth-child(2){color:#FF0000;}
    .bottom-nav .nav li:nth-child(2){width:100%;text-align:center;font-size:0.28rem;}
    .bottom-nav .nav.home li:nth-child(1){background-image:url("../../../assets/images/common/home1.png");background-size:100%;background-position: center;}
    .bottom-nav .nav.home.active li:nth-child(1){background-image:url("../../../assets/images/common/home2.png");background-size:100%;background-position: center;}

    .bottom-nav .nav.cart li:nth-child(1){background-image:url("../../../assets/images/common/cart1.png");background-size:100%;background-position: center;}
    .bottom-nav .nav.cart.active li:nth-child(1){background-image:url("../../../assets/images/common/cart2.png");background-size:100%;background-position: center;}

    .bottom-nav .nav.my li:nth-child(1){background-image:url("../../../assets/images/common/my1.png");background-size:100%;background-position: center;}
    .bottom-nav .nav.my.active li:nth-child(1){background-image:url("../../../assets/images/common/my2.png");background-size:100%;background-position: center;}

    .bottom-nav .nav .spot{width:0.2rem;height:0.2rem;background-color:#FF0000;border-radius: 100%;position: absolute;right:0;top:0;}
</style>
