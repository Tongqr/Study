<template>
    <div class="page">
        <HeaderComponent title="收货地址管理"  ></HeaderComponent>
        <div class='main'>
            <div class='list' @click="goPage('/address/mod?aid='+item.aid)" v-for="(item,index) in addressList" :key="index">
                <div class='name-wrap'>
                    <span>{{item.name}}</span><span>{{item.cellphone}}</span>
                </div>
                <div class='address'>
                    <span v-if="item.isdefault=='1'?true:false">[默认]</span>{{item.province}}{{item.city}}{{item.area}}{{item.address}}
                </div>
                <div class='right-arrow'></div>
            </div>
            <div style="width:100%;height:1.3rem;"></div>
        </div>
        <div class='add-btn' @click="goPage('/address/add')">+ 添加新地址</div>
    </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex'
    import HeaderComponent from '../../../components/header'
    import {safeUser} from '../../../assets/js/utils'
    export default {
        components:{
            HeaderComponent
        },
        methods:{
            ...mapActions({
                getAddressList:"userAddress/getAddressList"
            }),
            goPage(url){
                this.$router.push(url)
            }
        },
        computed:{
            ...mapState({
                uid:state=>state.user.uid,
                addressList:state=>state.userAddress.addressList
            })
        },
        created(){
            safeUser(this);
            this.getAddressList({uid:this.uid})
        }
    }
</script>

<style scoped>
    .sub-header{width:100%;height:1rem;background-color:#FFFFFF;display: flex;display:-webkit-flex;align-items: center;-webkit-align-items: center;border-bottom: 1px solid #EFEFEF;position: fixed;z-index: 10;left:0;top:0;}
    .sub-header .back{width:0.8rem;height:0.8rem;background-image:url("../../../assets/images/home/goods/back.png");background-size:100%;background-repeat: no-repeat;background-position: center;}
    .sub-header .title{width:79%;height:auto;font-size:0.32rem;text-align: center;}
    .sub-header .right-btn{width:auto;height:auto;font-size:0.32rem;}

    .page{width:100%;min-height:100vh;background-color:#FFFFFF;overflow: hidden;}
    .main{width:100%;margin-top:1.02rem;}
    .list{width:100%;height:1.2rem;border-bottom: #EFEFEF 1px solid;position: relative;z-index:1;}
    .list .name-wrap{width:auto;height:auto;position:absolute;left:3%;top:0.2rem;z-index:1;font-size:0.28rem;}
    .list .name-wrap span{padding-right:0.3rem;}
    .list .address{width:auto;height:auto;font-size:0.24rem;position: absolute;z-index:1;left:3%;top:0.7rem;}
    .list .address span{color:#FDB709}
    .list .right-arrow{width:0.3rem;height:0.3rem;background-image: url("../../../assets/images/common/right_arrow.png");background-size:100%;background-repeat:no-repeat;background-position: center;position:absolute;z-index:1;right:3%;top:0.45rem;}

    .add-btn{width:80%;height:0.8rem;background-color:#EB1625;position: fixed;z-index:2;bottom:0.4rem;left:50%;border-radius: 4px;transform: translateX(-50%);-webkit-transform: translateX(-50%);color:#FFFFFF;font-size:0.28rem;text-align:center;line-height:0.8rem;}
</style>
