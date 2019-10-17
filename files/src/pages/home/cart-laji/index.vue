<template>
    <div class="cart">
        <div class="header-top">
            <div class="topicon"></div>
            <div class="toptext">购物车</div>
        </div>
        <div class="goodslist">
            <div class="goods">
                <div class="check">
                    <div class="circle"></div>
                </div>
                <div class="content">
                    <div class="g-img">
                        <img>
                    </div>
                    <div class="del">删除</div>
                    <div class="tit">
                        <div class="title">雪兰黛2018春季新款高跟鞋尖头细跟性感鞋子女韩版透气纱网女单鞋 </div>
                        <div class="size"></div>
                        <div class="price">¥280</div>
                    </div>
                    <div class="count"></div>
                </div>
            </div>
        </div>
        <div class="cart-docount">
            <div class="choose">全选</div>
            <div class="total">合计：</div>
        </div>
        <button class="button">去结算</button>
    </div>
</template>

<script>
    export default {
        name: "cart",
        mounted(){
            document.title=this.$route.meta.title
        }
    }
</script>

<style scoped>
.cart{width:100%;background:#ffffff;min-height: 13.34rem; }
.header-top{width:100%;height:1.02rem;background: #ffffff; border-bottom:1px solid #efefef; display: flex;}
.topicon{width:0.8rem;height:0.8rem;margin-top:2%;}
.toptext{width:6rem;height:1rem;color:#323232;font-size:0.32rem;text-align: center;line-height:1rem;}

    .cart-docount{width:5.25rem;height:1rem;border-top:1px solid #EFEFEF;position: absolute;left:0;bottom:1.2rem; display: flex;}
    .button{width:2.25rem;height:1rem;background:#bfbfbf;font-size:0.32rem;color:#fff;position:absolute;right:0;bottom:1.2rem;}

    .goodslist{width:100%;}
    .goods{width:100%;height:2.4rem;display: flex;border-bottom: 1px solid #efefef;}
    .check{width:10%;height:100%;position: relative;}
    .circle{width:0.32rem;height:0.32rem;border-radius: 50%; position: absolute;top:43%;left:15%;background:#000000;}
.content{width:90%;height:100%;position: relative;}
    .g-img{width:1.2rem;height:1.2rem;}
    .g-img>img{width:100%;height:100%;}
    .del{font-size:0.24rem;color:#b5b5b5;width:1.2rem;height:auto;}
    .tit{width:70%;}
    .title{overflow: hidden;height:0.6rem;font-size:0.24rem;color:#323232; position: absolute;top:10%;left:25%;}
    .price{width:30%;height:auto;position: absolute;top:65%;color:#cc0004;left:25%;}
    .size{ position: absolute;top:38%;left:25%;}
</style>
