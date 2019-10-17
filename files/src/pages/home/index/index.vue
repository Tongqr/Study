
<template>
    <div class="index-main">
        <!--首页<br/><span @click="$router.push('/login')">会员登录</span><br/><span @click="$router.push('/reg')">会员注册</span>-->
        <div class="top-wrap">
            <div :class="{topmenu:true,red:isRed}">
                <div class="logo" @click="goPage('/goods/classify')"></div>
                <div class="search" @click="isShow=true">
                    <div class="search-icon"></div>
                    <div  class="search-text">
                        <input type="text" placeholder="输入喜欢的宝贝名称">
                    </div>
                </div>
                <div class="login" @click="goPage('/login')" v-if="!isLogin">登录</div>
                <div class="login"  v-else="isLogin" @click="goPage('/my')">我的</div>
            </div>
            <div class="banner">
                <div ref="swiper-container" class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item,index) in slides" :key="index"><img :src="item.image" :alt="item.title" ></div>
                    </div>
                    <div ref="wiper-pagination" class="swiper-pagination"></div>
                </div>

            </div>
        </div>
        <div class="menu-wrap">
            <div class="menu" v-for="(item,index) in navs" :key="index">
                <div class="menu-img"><a><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.image" @click="goPage('/goods/classify/item?cid='+item.cid)"></a></div>
                <div class="menu-text">{{item.title}}</div>
            </div>
        </div>
        <div class="classify-wrap">
            <template v-for="(item,index) in goods">
                <div class="goods-classify goods-women" :key="index" v-if="(index+1)%2==1">
                    <div :class="'classify-titlt-'+index">—— {{item.title}} ——</div>
                    <div class="goods-row1">
                        <div class="goodsLeft">
                            <div class="leftgoods" @click="goPage('/goods/details/item?gid='+(item.items && item.items[0].gid))">
                                <div class="leftgoods-title">{{item.items && item.items[0].title}}</div>
                                <div class="leftgoods-discount">精品打折</div>
                                <div class="leftprice">{{item.items && item.items[0].price}}</div>
                                <div class="leftgoods-img"><img :src="item.items && item.items[0].image"></div>
                            </div>
                        </div>
                        <div class="goodsRight">
                            <div class="rightgoods1" v-for="(item2,index2) in item.items.slice(1,3)" :key="index2" @click="goPage('/goods/details/item?gid='+item2.gid)">
                                <div class="right-title">{{item2.title}}</div>
                                <div class="right-discount">品质精挑</div>
                                <div class="right-img"><img :src="item2.image"></div>
                            </div>

                        </div>
                    </div>
                    <div class="goods-row2">
                        <div class="goodslist" v-for="(item2,index2) in item.items.slice(3)" :key="index2" @click="goPage('/goods/details/item?gid='+item2.gid)">
                            <div class="goods-title">{{item2.title}}</div>
                            <div class="goods-img"><img :src="item2.image"></div>
                            <div class="goods-curprice">￥{{item2.price}}</div>
                            <div class="goods-oldprice">￥{{item2.price*2}}</div>
                        </div>

                    </div>
                </div>
                <div class="goods-classify goods-men" v-else :key="index">
                    <div class="classify-titlt-1">—— 精品男装 ——</div>
                    <div class="goods-row1">
                        <div class="goodsLeft men"  v-for="(item2,index2) in item.items.slice(0,2)" :key="index2" @click="goPage('/goods/details/item?gid='+item2.gid)">
                            <div class="leftgoods">
                                <div class="leftgoods-title">{{item2.title}}</div>
                                <div class="leftgoods-discount">火爆开始</div>
                                <div class="leftprice">{{item2.price}}</div>
                                <div class="leftgoods-img"><img :src="item2.image"></div>
                            </div>
                        </div>
                        <!--<div class="goodsRight men">-->
                        <!--<div class="leftgoods">-->
                        <!--<div class="leftgoods-title">新款短袖男士夏季3d立体图案体恤猴子搞怪大猩猩个性t恤大码衣服</div>-->
                        <!--<div class="leftgoods-discount">火爆开始</div>-->
                        <!--<div class="leftprice">12.8</div>-->
                        <!--<div class="leftgoods-img"><img src="../../../assets/images/home/goods/goods.png"></div>-->
                        <!--</div>-->
                        <!--</div>-->
                    </div>
                    <div class="goods-row2">
                        <div class="goodslist" v-for="(item2,index2) in item.items.slice(2)" :key="index2" >
                            <div class="goods-title">{{item2.title}}</div>
                            <div class="goods-img"><img :src="item2.image"></div>
                            <div class="goods-curprice">￥{{item2.price}}</div>
                            <div class="goods-oldprice">￥{{item2.price*2}}</div>
                        </div>

                    </div>
                </div>
            </template>


        </div>
        <div class="goodsrecond">
            <div class="recondtitle">
                <div class="line"></div>
                <div class="recond-text">为您推荐</div>
                <div class="line"></div>
            </div>
            <div class="recond-area">
                <div class="goods-list" v-for="(item,index) in recoGoods" :key="index" @click="goPage('/goods/details/item?gid='+item.gid)">
                    <div class="list-img"><img :src="item.image"></div>
                    <div class="list-title">{{item.title}}</div>
                    <div class="list-price">￥{{item.price}}</div>
                </div>
            </div>
        </div>
        <SearchComponent :isShow="isShow" @onClose="isShow=false"></SearchComponent>
    </div>


</template>

<script>
    import {mapActions,mapState} from 'vuex';
    import Swiper from "../../../components/swiper/swiper.js"
    import {lazyImg} from '../../../assets/js/utils'
    import  SearchComponent from '../../../components/search'
    export default {
        name: "index",
        data(){
            return{
                isRed:false,
                isShow:false
            }
        },
        components:{
            SearchComponent
        },
        computed:{
            ...mapState({
                slides:state=>state.index.slides,
                navs:state=>state.index.navs,
                goods:state=>state.index.goods,
                recoGoods:state=>state.index.recoGoods,
                isLogin:state=>state.user.isLogin
            })
        },
        methods:{
            ...mapActions({
                getSwiper:"index/getSwiper",
                getNav:"index/getNav",
                getGoods:"index/getGoods",
                getRecoGoods:"index/getRecoGoods"
            }),
            goPage(url){
                this.$router.push(url);
            },
            setScrollTop(){
                let scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
                if(scrollTop>100){
                    this.isRed=true;
                }else{
                    this.isRed=false;
                }
//                console.log(scrollTop)
            },

        },
        created(){
//            this.getSwiper();
//            this.getNav();
//            this.getGoods();
//            this.getRecoGoods()

        },
        mounted(){
            document.title=this.$route.meta.title
            window.addEventListener("scroll",this.setScrollTop)
//             new Swiper(this.$refs['swiper-container'], {
//                autoplay: 3000,//可选选项，自动滑动
//                 pagination : this.$refs['swiper-pagination'],
//                 paginationClickable :true,
//                 autoplayDisableOnInteraction : false,
//            })
        },
        destroyed(){

        },
        deactivated(){
//            console.log("aaaa")
            window.removeEventListener("scroll",this.setScrollTop)
        },
        activated(){
            this.getSwiper({success:()=>{
                this.$nextTick(()=>{
                    new Swiper(this.$refs['swiper-container'], {
                        autoplay: 3000,//可选选项，自动滑动
                        pagination : this.$refs['swiper-pagination'],
                        paginationClickable :true,
                        autoplayDisableOnInteraction : false
                    })
                });
            }});
            this.getNav({success:()=>{
                this.$nextTick(()=>{
                    lazyImg();
                });
            }});
            this.getGoods({success:()=>{
                this.$nextTick(()=>{
                    lazyImg();
                });
            }});
            this.getRecoGoods({success:()=>{
                this.$nextTick(()=>{
                    lazyImg();
                });
            }});
        }
    }
</script>

<style scoped>
    @import "../../../components/swiper/swiper.css";
    .index-main{width:100%;background: #efefef;padding-bottom:1.2rem;}
    .top-wrap{width:100%;margin-bottom:0.1rem;}
    .topmenu{width:100%;height:1rem;background:linear-gradient(rgba(1, 1, 1, 0.2) 0%, rgba(255, 255, 255, 0) 100%);position:fixed;z-index:3; display: flex;}
    .topmenu.red{background:linear-gradient(rgb(235, 22, 37) 0%, rgba(255, 255, 255, 0) 100%);}
    .topmenu .logo{width:0.6rem;height:0.6rem;background:#ccc;margin:0.1rem 3% 0;}
    .topmenu .search{width:65%;height:0.52rem;background: rgba(255,255,255,0.6);border-radius: 7px;;margin-top:0.1rem; display: flex;}
    .topmenu .search .search-icon{width:0.68rem;height:0.52rem;background: #000;}
    .topmenu .search .search-text{width:80%;height:0.52rem;color:#fff;font-size: 0.28rem;
        line-height:0.52rem;}
    .search-text>input{width:100%;background: rgba(255,255,255,0);}
    .topmenu .login{width:18%;height:0.8rem;color:#fff;font-size:0.32rem;text-align:center;margin-top:0.2rem;}

    .top-wrap .banner{width:100%;height:3.64rem;background:blue;}
    .banner img{width:100%;height:100%;}
    .menu-wrap{width:100%;height:1.4rem;background:#fff;color:#323232;font-size: 0.28rem;display: flex;padding-top:0.2rem;
        text-align: center;}
    .menu-wrap .menu{width:1.4rem;height:1.2rem;margin-right:2%;}
    .menu-wrap .menu .menu-img{width:100%;height: 0.8rem;}
    .menu-wrap .menu .menu-img a{width:100%;height: 0.8rem;
        text-align: center;}
    .menu-wrap .menu .menu-img a img{width:0.8rem;height:0.8rem;}
    .menu-wrap .menu .menu-text{width:100%;margin-top:0.05rem;}

    .classify-wrap{width:100%;margin-top:0.3rem;}
    .classify-wrap .goods-classify{width:100%;background:#fff;}
    .classify-wrap .goods-classify .classify-titlt-0,.classify-titlt-1,.classify-titlt-2{width:100%;height:0.62rem;border-bottom: solid 1px #EFEFEF;font-size:0.28rem;color:#f73b61;text-align: center; line-height:0.62rem;}
    .goods-row1{width:100%;height:2.42rem;border-bottom:1px solid #efefef;display: flex;}
    .goods-row1 .goodsLeft{width:50%;position: relative;}
    .goods-row1 .goodsRight{width:50%;position: relative;}
    .goods-row1 .goodsLeft .leftgoods{width:100%;height:2.4rem;border-right:solid 1px #efefef;}
    .goods-row1 .goodsRight .rightgoods1,.goods-row1 .goodsRight .rightgoods2{width:100%;height:1.2rem;border-bottom: 1px solid #EFEFEF;
        position: relative;}
    .goods-row2{width:100%;
        display: flex;}
    .goods-row2 .goodslist{width:24.7%;height:3.02rem;border-bottom: 1px solid #EFEFEF; border-right:1px solid #EFEFEF;}
    .goods-row2 .goodslist.endgoodlist{width:25%;border-right:0px;}
    .leftgoods-title{width:100%;height:0.32rem; font-size:0.28rem;color: #323232;overflow: hidden;position: absolute;left:4%;top:8%;}
    .leftgoods-discount{width:43%;height:0.4rem;
        position: absolute;color:#cb385d;top:25%;left:4%;font-size:0.24rem;}
    .leftprice{width:0.8rem;height:0.4rem;
        position: absolute;left:45%;top:21%;background:#f21d4f;border-radius: 20%;color: #fff;
        text-align: center;}
    .leftgoods-img{width:100%;text-align: center;position: absolute;top:38%;}
    .leftgoods-img>img{width:150px;height:73px;}
    .goodsRight  .right-title{width:50%;height:0.32rem;color:#323232;font-size:0.28rem;
        position: absolute;left:4%;top:8%;
        overflow: hidden;}
    .goodsRight .right-discount{height:0.4rem;width:50%;font-size:0.24rem;position: absolute;left:4%;top:36%;}
    .goodsRight .right-img{width:32%;text-align: center;position: absolute; left:55%;top:0%;}
    .goodsRight .right-img>img{width:100%;height:1.16rem;}
    .goods-title{width:100%;height:0.6rem;text-align: center;overflow:hidden;font-size:0.2rem;color:#323232;}
    .goods-img{width: 100%;text-align: center}
    .goods-img>img{width:1.52rem;height:1.48rem;}
    .goods-curprice,.goods-oldprice{width:100%;height:0.4rem;color:#d32a4e;font-size:0.28rem;text-align: center}
    .goods-oldprice{color:#7b7f82;text-decoration: line-through;}

    .goodsLeft.men,.goodsRight.men{width:49.7%;border-right:1px solid #efefef;}
    .goodsLeft.men .leftgoods-title,.goodsRight.men .leftgoods-title{width:100%;height:0.56rem;color:#323232;font-size:0.28rem;text-align: center;line-height: 0.3rem;overflow: hidden;}
    .goodsLeft.men .leftgoods-discount,.goodsRight.men .leftgoods-discount{width:100%;height:0.28rem;font-size:0.24rem;text-align:center;color:#7b7f82;}
    .goodsLeft.men .leftprice,.goodsRight.men .leftprice{display: none;}
    .goodsLeft.men .leftgoods-img,.goodsRight.men .leftgoods-img{ width: 100% ;text-align: center;}
    .goodsLeft.men .leftgoods-img>img,.goodsRight.men .leftgoods-img{width:1.2rem;height:1.4rem;}


    .goodsrecond{width:100%;}
    .recondtitle{width:100%;height:1rem;display: flex;}
    .line{width:35%;height:1px;background:#d4d4d4;margin-top:6%;}
    .recond-text{width:28%;height:0.44rem;margin-top:3.5%;text-align:center;font-size:0.32rem;}
    .recond-area{width:100%;display: flex;flex-wrap: wrap;}
    .goods-list{width:48%;height:4.4rem;background:#fff;margin-bottom:0.24rem;margin-left:0.04rem;}
    .recond-area>div:nth-child(2n-1){margin-right:0.16rem;}
    .list-img{width:100%;
        text-align: center;}
    .list-img>img{width:2.8rem;height:2.8rem;}
    .list-title{width:97%;height:0.6rem;line-height:0.3rem;text-overflow:ellipsis;font-size:0.28rem; overflow: hidden;}
    .list-price{font-size:0.28rem;color:#d32a4e;width:50%;height:0.4rem;margin-top:5%;margin-left:0.09rem;}


</style>