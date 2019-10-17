<template>
    <div>
        <div class='details-header'>
            <div class='back' @click="$router.go(-1)"></div>
            <div class='tab-wrap'>
                <div :class="{'tab-name':true, active:itemActive}" @click="goPage('/goods/details?gid='+gid)">商品</div>
                <div :class="{'tab-name':true, active:contentActive}" @click="goPage('/goods/details/content?gid='+gid)">详情</div>
                <div :class="{'tab-name':true, active:reviewActive}" @click="goPage('/goods/details/review?gid='+gid)">评价</div>
            </div>
            <div id="cart-icon" class='cart-icon' @click="$router.push('/cart')" >
                <div class='spot'></div>
            </div>
        </div>
        <div class="sub-page">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
          return{
              itemActive:true,
              contentActive:false,
              reviewActive:false,
              gid:this.$route.query.gid?this.$route.query.gid:""
          }
        },
        created(){
            //this.$route.path可以去除gid的URL
            this.changeStyle(this.$route.path)
        },
        methods:{
            goPage(url){
                this.$router.replace(url);
            },
            changeStyle(url){
//                console.log(url)
                switch(url){
                    case "/goods/details/item":
                        this.itemActive=true;
                        this.contentActive=false;
                        this.reviewActive=false;
                        break;
                    case "/goods/details/content":
                        this.itemActive=false;
                        this.contentActive=true;
                        this.reviewActive=false;
                        break;
                    case "/goods/details/review":
                        this.itemActive=false;
                        this.contentActive=false;
                        this.reviewActive=true;
                        break;
                    default:
                        this.itemActive=true;
                        this.contentActive=false;
                        this.reviewActive=false;
                }
            }

        },
        //刷新不会变
        beforeRouteUpdate(to,from,next){
//            console.log(to)
            this.changeStyle(to.path)
            next()
        }
    }
</script>

<style scoped>
    .details-header{width:100%;height:1rem;background-color:#FFFFFF;display:flex;display:-webkit-flex;align-items: center;-webkit-align-items: center;justify-content: space-between;-webkit-justify-content: space-between;position: fixed;z-index:10;left:0px;top:0px;}
    .details-header .back{width:0.8rem;height:0.8rem;background-image:url('../../../assets/images/home/goods/back.png');background-repeat: no-repeat;background-position: center;background-size:100%;}
    .details-header .tab-wrap{width:70%;height:100%;display:flex;display:-webkit-flex;justify-content: center;-webkit-justify-content: center;}
    .details-header .tab-wrap .tab-name{width:auto;height:96%;overflow:hidden;line-height:1rem;text-align:center;margin-left:9%;margin-right:9%;font-size:0.36rem;}
    .details-header .tab-wrap .tab-name.active{border-bottom: solid 2px #FDA208;}
    .details-header .cart-icon{width:0.8rem;height:0.8rem;background-image:url('../../../assets/images/home/goods/cart.png');background-repeat: no-repeat;background-position: center;background-size:100%;margin-right:0.2rem;position:relative;z-index:1;}
    .details-header .cart-icon .spot{width:0.2rem;height:0.2rem;background-color:#CC0004;border-radius: 100%;position:absolute;z-index:1;right:0px;top:0.15rem;}

    .sub-page{width:100%;}

</style>
