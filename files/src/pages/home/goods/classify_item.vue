<template>
    <div>
        <div v-show="goods.length>0" ref="goods-content" class="goods-content-main">
            <div>
                <div class='goods-wrap' v-for="(item,index) in goods" :key="index">
                    <div class='classify-name'>{{item.title}}</div>
                    <div class='goods-items-wrap'>
                        <ul v-for="(item2,index2) in item.goods" :key="index2" @click="$router.push('/goods/details/item?gid='+(item2.gid))">
                            <li><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item2.image" :alt="item2.title" /></li>
                            <li>{{item2.title}}</li>
                        </ul>
                    </div>
                </div>

                <div style="height:0.8rem;"></div>
            </div>
        </div>
        <div class="no-data" v-show="goods.length<=0">没有相关商品！</div>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex';
    import IScroll from '../../../assets/js/libs/iscroll.js';
    import {lazyImg} from '../../../assets/js/utils';
    export default {
        name: '',
        computed:{
            ...mapState ({
                goods:state=>state.goods.goods
            })
        },
        methods:{
            ...mapActions({
                getClassifyGoods:"goods/getClassifyGoods"
            })
        },
        created(){
//            this.cid=this.$route.query.cid?this.$route.query.cid:""
            this.cid=this.$route.query.cid?this.$route.query.cid:'';
            this.getClassifyGoods({cid:this.cid,success:()=>{
                this.$nextTick(()=>{
                    this.myScroll.refresh();
                    lazyImg();
                })

            }})
        },
        mounted(){
            this.$refs['goods-content'].addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
            this.myScroll= new IScroll(this.$refs['goods-content'], {
                scrollX : false,
                scrollY : true,
                preventDefault : false
            });
            this.myScroll.on("scroll",()=>{
                lazyImg();
            })
        },
        beforeRouteUpdate(to,from,next){
//            console.log(to);
            this.cid=to.query.cid;
            this.getClassifyGoods({cid:this.cid,success:()=>{
                this.$nextTick(()=>{
                    this.myScroll.refresh();
                    lazyImg();
                })

            }})
            next()
        }
    }
</script>


<style scoped>
    .goods-content-main{width:100%;height:100vh;overflow:hidden;position:relative;z-index:1;}
    .goods-wrap{width:100%;height:auto;}
    .goods-wrap .classify-name{font-size:0.28rem;width:100%;height:0.6rem;line-height:0.6rem;overflow:hidden;}
    .goods-wrap .goods-items-wrap{width:100%;height:auto;background-color:#FFFFFF;padding-top:0.2rem;overflow:hidden;}
    .goods-wrap .goods-items-wrap ul{width:32%;height:auto;float:left;margin-left:0.5%;margin-right:0.5%;margin-bottom: 0.2rem;}
    .goods-wrap .goods-items-wrap ul li:nth-child(1){width:1.5rem;height:1.5rem;overflow:hidden;margin:0 auto;text-align: center}
    .goods-wrap .goods-items-wrap ul li:nth-child(1) img{width:auto;height:auto;max-width:100%;max-height:100%;}
    .goods-wrap .goods-items-wrap ul li:nth-child(2){width:90%;height:0.8rem;font-size:0.24rem;overflow:hidden;text-align:center;margin:0 auto;white-space: nowrap;text-overflow: ellipsis;margin-top:0.2rem;}
</style>