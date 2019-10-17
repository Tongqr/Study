<template>
    <div class="page">
        <HeaderComponent title="修改收货地址" right-text="删除" @rightClick="delAddress"></HeaderComponent>
        <div class='main'>
            <ul>
                <li>收货人</li>
                <li><input type="text" placeholder="收货人姓名" v-model="name"/></li>
            </ul>
            <ul>
                <li>联系方式</li>
                <li><input type="text" placeholder="联系人手机号"  v-model="cellphone"/></li>
            </ul>
            <ul>
                <li >所在地区</li>
                <li @click="showAddressPicker()">
                    <input type="text" placeholder="请选择收货地址" class='area' readonly :value="showArea"/>
                </li>
            </ul>
            <ul>
                <li>详细地址</li>
                <li><input type="text" placeholder="街道详细地址" v-model="address"/></li>
            </ul>
            <ul>
                <li>设置为默认地址</li>
                <li><input type="checkbox" checked v-model="isdefault"/></li>
            </ul>
            <button type="button" class='submit-save'@click="submitData()">修改</button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapActions,mapState} from 'vuex'
    import HeaderComponent from '../../../components/header'
    import {safeUser} from '../../../assets/js/utils'
    import { provinceList, cityList, areaList } from '../../../assets/data/cube-data/area.js';
    import {CascadePicker,Toast,Dialog} from 'cube-ui'
    Vue.use(CascadePicker)
    Vue.use(Dialog);
    Vue.use(Toast)
    const addressData = provinceList;
    addressData.forEach(province => {
        province.children = cityList[province.value]
        province.children.forEach(city => {
            city.children = areaList[city.value]
        })
    });
    export default {
        data(){
            return{
                showArea:"" ,//为了显示不提交数据库
                province:"",
                city:"",
                area:"",
                name:"",
                cellphone:"",
                address:"",
                isdefault:""
            }
        },
        computed:{
            ...mapState({
                uid:state=>state.user.uid
            })
        },

        components:{
            HeaderComponent
        },
        methods:{
            ...mapActions({
                modAddress:"userAddress/modAddress",
                getAddressInfo:"userAddress/getAddressInfo",
                asyncDelAddress:"userAddress/delAddress"
            }),
            submitData(){
                if(this.name.match(/^\s*$/)){
                    this.$createToast({
                        txt:"请输入收货人姓名",
                        type:"txt"
                    }).show();
                    return;
                }
                if(this.cellphone.match(/^\s*$/)){
                    this.$createToast({
                        txt:"请输入联系人手机号",
                        type:"txt"
                    }).show();
                    return;
                }
                if(this.showArea.match(/^\s*$/)){
                    this.$createToast({
                        txt:"请选择所在地区",
                        type:"txt"
                    }).show();
                    return;
                }
                if(this.address.match(/^\s*$/)){
                    this.$createToast({
                        txt:"请输入详细地址",
                        type:"txt"
                    }).show();
                    return;
                }
                this.modAddress({aid:this.aid,uid:this.uid,name:this.name,cellphone:this.cellphone,province:this.province,city:this.city,area:this.area,address:this.address,isdefault:this.isdefault?'1':'0',success:(res)=>{
                    if(res.code==200){
                        this.$router.go(-1)
                    }else{
                        this.$createToast({
                            txt:res.data,
                            type:"txt"
                        }).show();
                        return;
                    }
                }})

            },
            showAddressPicker() {
                this.addressPicker.show()
            },
            selectHandle(selectedVal, selectedIndex, selectedText){
                this.showArea=selectedText[0]+" "+selectedText[1]+" "+selectedText[2];
                this.province=selectedText[0];
                this.city=selectedText[1];
                this.area=selectedText[2];
            },
            //删除
            delAddress(){
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
                        this.asyncDelAddress({uid:this.uid,aid:this.aid,success:(res)=>{
                            if(res.code=200){
                                this.$router.go(-1)
                            }
                        }})
                    }
                }).show()
            }
        },
        created(){
            safeUser(this);
            this.aid=this.$route.query.aid;
            this.getAddressInfo({uid:this.uid,aid:this.aid,success:(data)=>{
                this.name=data.name;
                this.cellphone=data.cellphone;
                this.showArea=data.province+" "+data.city+" "+data.area;
                this.province=data.province;
                this.city=data.city;
                this.area=data.area;
                this.address=data.address
                this.isdefault=data.isdefault=='1'?true:false

            }})
        },
        mounted() {
            this.addressPicker = this.$createCascadePicker({
                title: '选择所在地区',
                data: addressData,
                onSelect: this.selectHandle
            })
        }
    }
</script>

<style scoped>
    .sub-header{width:100%;height:1rem;background-color:#FFFFFF;display: flex;display:-webkit-flex;align-items: center;-webkit-align-items: center;border-bottom: 1px solid #EFEFEF;position: fixed;z-index: 10;left:0;top:0;}
    .sub-header .back{width:0.8rem;height:0.8rem;background-image:url("../../../assets/images/home/goods/back.png");background-size:100%;background-repeat: no-repeat;background-position: center;}
    .sub-header .title{width:79%;height:auto;font-size:0.32rem;text-align: center;}
    .sub-header .right-btn{width:auto;height:auto;font-size:0.32rem;}

    .page{width:100%;height:100vh;overflow:hidden;background-color:#FFFFFF;}
    .main{width:100%;margin-top:1rem;}
    .main ul{width:100%;height:1.02rem;border-bottom: #EFEFEF 1px solid;display: flex;display:-webkit-flex;align-items: center;-webkit-align-items: center;}
    .main ul li{font-size:0.32rem;margin-left:0.3rem;}
    .main ul li:nth-child(2){width:62%;height:100%;}
    .main ul li input[type='text']{width:100%;height:100%;font-size:0.32rem;}
    .main ul li .area{font-size:0.28rem!important;}
    .main ul li input[type='checkbox']{width:0.4rem;height:0.4rem;margin-top:0.3rem;}
    .main .submit-save{width:85%;height:0.8rem;background-color:#FCB40A;border-radius: 4px;margin:0 auto;display:block;border:0 none;outline:none;font-size:0.32rem;color:#FFFFFF;margin-top:0.4rem;}
</style>
