<template>
    <div class="classify">
        <div class="header-top">
            <div class="topicon" @click="goBack()"></div>
            <div class="nav-wrap">
                <input type="text" placeholder="请输入宝贝名称">
            </div>
        </div>
        <div class="main">
            <div class="mainleft" ref="scroll-classify">
                <ul>
                    <li ref="items" :class="{'classift-item':true ,active:item.active}" v-for="(item,index) in classifys" :key="index" @click="goPage('/goods/classify/item?cid='+item.cid,index)">{{item.title}}</li>

                </ul>
            </div>
            <div class="rightleft">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';
    import IScroll from '../../../assets/js/libs/iscroll.js'
    export default {
        name: 'classify',
//        computed:{
//            ...mapState({
//                classifys:state=>state.goods.classifys
//            })
//        },

        computed:{
            ...mapState({
                classifys:state=>state.goods.classifys
            })
        },
        mounted(){
            document.title=this.$route.meta.title;
            this.$refs['scroll-classify'].addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
            this.myScroll= new IScroll(this.$refs['scroll-classify'], {
                scrollX : false,
                scrollY : true,
                preventDefault : false
            });
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            },
            ...mapActions({
                getClassify:"goods/getClassify",
                selectClassify:"goods/selectClassify"
            }),
            goPage(url,index){
                this.$router.replace(url);
                this.selectClassify({index:index});
                this.scrollPosition(index)
            },

            //动画效果
            scrollPosition(index){
                let itemHeight=this.$refs['items'][0].offsetHeight*index;
                let halfHeight=this.$refs['scroll-classify'].offsetHeight/3;
                let bottomHeight=this.$refs['scroll-classify'].scrollHeight-itemHeight
                if(itemHeight>halfHeight && bottomHeight>this.$refs['scroll-classify'].offsetHeight){
                    this.myScroll.scrollTo(0, -itemHeight
                        , 1000, IScroll.utils.ease.elastic);
                }

            }
        },
//        created(){
////            this.cid=this.$route.query.cid ? this.$route.query.cid:"";
//            this.cid=this.$route.query.cid?this.$route.query.cid:'';
//
//
//            this.getClassify({success:()=>{
////                this.myScroll.refresh();  需要获取dom
//                this.$nextTick(()=>{
//                    this.myScroll.refresh()
//                })
////                console.log(this.classifys)
//                if(this.classifys.length>0){
//                    let index="";
//                    for(let i=0;i<this.classifys.length;i++){
//                        if(this.classifys[i].cid=this.cid){
//                            index=i;
//                            break;
//                        }
//                    }
////                    console.log(index)
//                    if(index!==''){
//                        this.selectClassify({index:index});
//                    }
//                }
//
//            }});
////            console.log(this.classifys) //为空 初始化数据执行顺序 ajax异步
//        }
        created(){
            this.cid=this.$route.query.cid?this.$route.query.cid:'';
            this.getClassify({success:()=>{
                this.$nextTick(()=>{
                    this.myScroll.refresh();
                });
                if(this.classifys.length>0){
                    let index="";
                    for(let i=0;i<this.classifys.length;i++){
                        if(this.classifys[i].cid==this.cid){
                            index=i;
                            break;
                        }
                    }
                    if(index!==''){
                        this.selectClassify({index:index});
                    }
                }
            }});
        }
    }
</script>


<style scoped>
    body{background:#fff;}
    .header-top{width:100%;height:1.02rem;background: #ffffff; border-bottom:1px solid #efefef;
        display: flex;}
    .topicon{width:0.8rem;height:0.8rem;margin-top:2%;}
    .nav-wrap{width:6rem;height:1rem;color:#323232;font-size:0.32rem;
        text-align: center;
        line-height:1rem;}
    .nav-wrap>input{height:65%;width:90%;border:1px solid #b2b2b2;outline:none;border-radius:3px;font-size:0.28rem;padding-left:5%;line-height:0.65rem;}
    .main{width:100%;height:10.64rem;background:#fff;
        display: flex}
    .mainleft{width:23%;height:100%;overflow:hidden;position: relative;z-index: 1}
    .mainleft>ul{width:100%;}
    .mainleft>ul li{width:100%;height:0.82rem;border-bottom:1px solid #EFEFEF;text-align: center;line-height: 0.82rem;}
    .classift-item.active{color: red;}

    .rightleft{width:74%;height:100%;background:#EFEFEF;padding-left:3%;}
    .goods{width:95%;margin-top:0.28rem;}
    .goods-title{font-size:0.28rem;}
    .content{background:#fff;width:100%;height:auto;padding-bottom:0.32rem;margin-top:0.2rem;}
    .content>ul{
        display: flex;width:100%;flex-wrap: wrap}
    .content li{width:33%;height:1.6rem;margin-top:0.2rem;
        text-align: center;}
    .content li .img{width:70%;height:1.2rem;margin:0 auto;}
</style>