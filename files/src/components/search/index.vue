<template>
    <div class='search-component' v-show="isShow">
        <div class='search-header'>
            <div class='close' @click="onClose"></div>
            <div class='search-wrap'>
                <div class='search-input-wrap'>
                    <input type="text" class='search' placeholder="请输入宝贝名称" value="" v-model="kwords"/>
                </div>
                <button type="button" class='search-btn' @click="goSearch('/goods/search?kwords='+kwords)"></button>
            </div>
        </div>
        <div class='search-main' v-if="historyKwords.length>0">
            <div class='search-title-wrap'>
                <div class='search-title'>最近搜索</div>
                <div class='bin' @click="delHistoryKwords()"></div>
            </div>
            <div class='search-keywords-wrap'>
                <div class='keywords' v-for="(item,index) in historyKwords" :key="index" @click="goSearch('/goods/search?kwords='+item,item)">{{item}}</div>
            </div>
        </div>
        <div class='search-main'>
            <div class='search-title-wrap'>
                <div class='search-title'>热门搜索</div>
            </div>
            <div class='search-keywords-wrap'>
                <div class='keywords' v-for="(item,index) in hotKwords" :key="index" @click="goSearch('/goods/search?kwords='+item.title,item.title)">{{item.title}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapMutations,mapState,mapActions} from 'vuex'
    import {Dialog}from 'cube-ui'
    Vue.use(Dialog)
    export default {
        name: "search-comp",
        data(){
            return{
                kwords:"",

            }
        },
        props:{
            isShow:{
                type:Boolean,
                default:false
            },
            isLocal:{
                type:Boolean,
                default:false
            }
        },
        computed:{
            ...mapState({
                historyKwords:state=>state.search.historyKwords,
                hotKwords:state=>state.search.hotKwords
            }),

        },
        created(){
            this.historyKwordsArr=this.historyKwords?this.historyKwords:[];
            this.getHotKwords()
        },
        methods:{
            ...mapMutations({
                addKwords:"search/addKwords",
                clearHistoryKwords:"search/clearHistoryKwords"
            }),
            ...mapActions({
                getHotKwords:"search/getHotKwords"
            }),
            onClose(){
                this.$emit("onClose")
            },
            goSearch(url,kwords){
                if(this.isLocal){
                    this.$router.replace(url)
                }else{
                    this.$router.push(url)
                }

                this.addHistoryKwords(kwords)
            },
            //添加关键词到历史记录
            addHistoryKwords(kwords){
                let tmpKwords=kwords || this.kwords || "";
                if(this.historyKwordsArr.length>0 && tmpKwords){
                    for(let i=0;i<this.historyKwordsArr.length;i++){
                        if(this.historyKwordsArr[i]==tmpKwords){
                           this.historyKwordsArr.splice(i--,1);
                           break;
                        }
                    }
                }
                if(tmpKwords){
                    this.historyKwordsArr.unshift(tmpKwords)
                }

//                console.log(this.historyKwordsArr)
                this.addKwords({historyKwords:this.historyKwordsArr})
            },
            //删除历史关键词
            delHistoryKwords(){
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
                        this.clearHistoryKwords();
                        this.historyKwordsArr=[]
                    }
                }).show()
            }
        },

    }
</script>

<style scoped>
    .search-component{width:100%;height:100%;position: fixed;z-index:99;left:0px;top:0px;background-color:#ffffff;}
    .search-component .search-header{width:100%;height:1rem;border-bottom:#EFEFEF solid 1px;display:flex;display:-webkit-flex;align-items: center;-webkit-align-items: center;}
    .search-component .search-header .close{width:0.5rem;height: 0.5rem;background-image:url("../../assets/images/common/search_x.png");background-size:100%;background-repeat: no-repeat;background-position: center;margin-left:0.2rem;margin-right:0.2rem;}
    .search-component .search-header .search-wrap{width:78%;height:0.64rem;border:#B2B2B2 solid 1px;border-radius: 0.1rem;display:flex;display:-webkit-flex;align-items: center;-webkit-align-items: center;}
    .search-component .search-header .search-wrap .search-input-wrap{width:85%;height:100%;border-right: #B2B2B2 solid 1px;}
    .search-component .search-header .search-wrap .search{width:80%;height:93%;margin-left:0.2rem;font-size:0.28rem;}
    .search-component .search-header .search-wrap .search-btn{width:0.5rem;height:0.5rem;background-image:url("../../assets/images/common/search_icon.png");background-size:100%;background-repeat: no-repeat;background-position: center;background-color:#ffffff;border:0px none;outline: none;margin-left:0.15rem;}

    .search-component .search-main{width:100%;margin-top:0.2rem;}
    .search-component .search-main .search-title-wrap{width:auto;display:flex;display:-webkit-flex;justify-content: space-between;-webkit-justify-content: space-between;padding-left:0.4rem;padding-right:0.4rem;}
    .search-component .search-main .search-title-wrap .search-title{width:auto;font-size:0.28rem;}
    .search-component .search-main .search-title-wrap .bin{width:0.4rem;height:0.4rem;background-image:url('../../assets/images/common/bin.png');background-size:100%;background-repeat: no-repeat;background-position: center;}
    .search-component .search-main .search-keywords-wrap{width:auto;display:flex;display:-webkit-flex;justify-content: flex-start;-webkit-justify-content: flex-start;padding-left:0.4rem;padding-right:0.4rem;margin-top:0.3rem;flex-wrap: wrap;-webkit-flex-wrap: wrap;}
    .search-component .search-main .search-keywords-wrap .keywords{width:26%;height:0.6rem;color:#717376;border:#EFEFEF solid 1px;border-radius: 0.64rem;font-size:0.28rem;text-align: center;overflow:hidden;line-height:0.6rem;margin-right:1.3%;margin-left:1.3%;margin-bottom:0.2rem;padding-left:0.1rem;padding-right:0.1rem;}

</style>
