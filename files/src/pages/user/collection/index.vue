<template>
    <div class="goodsrecond">
        <HeaderComponent title="我的收藏"></HeaderComponent>
        <div class="recond-area">
            <div class="goods-list" v-for="(item,index) in collectionList" :key="index">
                <div class="list-img"><img :src="item.image"></div>
                <div class="list-title">{{item.title}}</div>
                <div class="list-price">￥{{item.price}}</div>
                <div class="buy-area">
                    <div class="buy" @click="$router.push('/goods/details/item?uid='+uid+'&gid='+item.gid)">购买</div>
                    <div class="del" @click="delCollection()">删除</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
    import PullUp from '../../../assets/js/libs/uprefresh.js'
    import HeaderComponent from '../../../components/header'
    import {mapActions,mapState,mapMutations} from 'vuex'
    import Swiper from "../../../components/swiper/swiper.js"
    import {safeUser} from '../../../assets/js/utils'
    import TweenMax from '../../../assets/js/libs/TweenMax.js'
    import {Toast,Dialog} from 'cube-ui'
    Vue.use(Toast)
    Vue.use(Dialog)
    export default {
        name: '',
        components:{
            HeaderComponent
        },
        computed:{
            ...mapState({
                uid:state=>state.user.uid,
                collectionList:state=>state.collection.collectionList,
                cpageInfo:state=>state.collection.cpageInfo
            })
        },
        created(){
            safeUser(this);
            this.pullUp=new PullUp();
//            this.uid=this.$route.query.uid
            this.collectionInfo({uid:this.uid,success:()=>{
//                this.getColletionPage({uid:this.uid,cpageInfo:this.cpageInfo,success:()=>{
//
//                }})
                this.pullUp.init({"curPage":1,"maxPage":this.cpageInfo.pagenum,"offsetBottom":100},(curPage)=>{
                    console.log(curPage);
                    this.getColletionPage({uid:this.uid,page:this.cpageInfo})
                })
            }})
        },
        methods:{
            ...mapActions({
                collectionInfo:"collection/collectionInfo",
                getColletionPage:"collection/getColletionPage",
                asyncDelCollection:"collection/delCollection"
            }),
            delCollection(index){
                this.$createDialog({
                    type: 'confirm',
                    content: '确认要删除吗？',
                    confirmBtn: {
                        text: '确定',
                        active: true,
                        disabled: false,
                        href: 'javascript:;'
                    },
                    cancelBtn: {
                        text: '取消',
                        active: false,
                        disabled: false,
                        href: 'javascript:;'
                    },
                    onConfirm: () => {
                        this.asyncDelCollection({uid:this.uid,fid:this.fid,success:(res)=>{
                            console.log(res)
//                            alert('33')
                            if(res.code=200){
                                this.$createToast({
                                    txt:res.data,
                                    type:"txt"
                                }).show();
                                return;
                            }
                        }})
                    }
                }).show()
            }
        }
    }
</script>


<style scoped>
    .goodsrecond{width:100%;}
    .recondtitle{width:100%;height:1rem;display: flex;}
    .line{width:35%;height:1px;background:#d4d4d4;margin-top:6%;}
    .recond-text{width:28%;height:0.44rem;margin-top:3.5%;text-align:center;font-size:0.32rem;}
    .recond-area{width:100%;display: flex;flex-wrap: wrap;margin-top:1.2rem;}
    .goods-list{width:48%;background:#fff;margin-bottom:0.24rem;margin-left:0.04rem;}
    .recond-area>div:nth-child(2n-1){margin-right:0.16rem;}
    .list-img{width:100%;height:3.4rem;text-align: center;}
    .list-img>img{width:100%;height:100%;}
    .list-title{width:97%;height:0.6rem;line-height:0.3rem;text-overflow:ellipsis;font-size:0.28rem; overflow: hidden;}
    .list-price{font-size:0.28rem;color:#d32a4e;width:50%;height:0.4rem;margin-top:5%;margin-left:0.09rem;}

    .buy-area{width:100%; display: flex;justify-content: space-between}
    .buy-area .buy,.buy-area .del{width:1.04rem;height:0.48rem;border:1px solid #f93036;margin-top:0.10rem;line-height:0.48rem;text-align: center;color: #f93036;font-size:0.24rem;margin-left:0.16rem;margin-bottom:0.1rem;border-radius: 3px;}
    .buy-area .del{margin-left:0;margin-right:0.16rem;}

</style>