<template>
    <div class="page">
        <HeaderComponent title="个人资料" right-text="保存" @rightClick="save()"></HeaderComponent>
        <div class='main'>
            <ul class='head'>
                <li>头像</li>
                <li><img :src="showHead?showHead:require('../../../assets/images/user/my/default-head.png')" alt=""/><input ref="headfile" type="file" @change="uploadHead($event)"/></li>
            </ul>
            <ul class='list'>
                <li>昵称</li>
                <li><input type="text" placeholder="请设置昵称" v-model="nickname "  /></li>
                <li class='arrow'></li>
            </ul>
            <ul class='list'>
                <li>性别</li>
                <li><input type="text" placeholder="请选择性别"  :value="gender==1?'男':gender==2?'女':''" readonly @click="selectGender()"/></li>
                <li class='arrow'></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapActions,mapState} from 'vuex'
    import HeaderComponent from '../../../components/header'
    import {safeUser} from '../../../assets/js/utils'
    import {ActionSheet,Toast} from 'cube-ui'
    Vue.use(ActionSheet)
    Vue.use(Toast)

    export default {
        data(){
            return{
                gender:"",
                showHead:"",
                head:"",
                nickname:""
            }
        },
        components:{
            HeaderComponent
        },
        computed:{
            ...mapState({
                uid:state=>state.user.uid,
//                authToken:state=>state.user.authToken
                userInfo:state=>state.user.userInfo
            })
        },
        methods:{
            ...mapActions({
//                safeUser:"user/safeUser",
//                storeOutLogin:"user/storeOutLogin"
                asyncUploadHead:"user/uploadHead",
                getUserInfo:"user/getUserInfo",
                updateUser:"user/updateUser"
            }),
            save(){
                if(this.nickname.match(/^\s*$/)){
                    this.$createToast({
                        txt:"请输入用户名",
                        type:"txt"
                    }).show();
                    return
                }
                if(this.gender.match(/^\s*$/)){
                    this.$createToast({
                        txt:"请选择性别",
                        type:"txt"
                    }).show();
                    return
                }
                this.updateUser({uid:this.uid,nickname:this.nickname,gender:this.gender,head:this.head,success:()=>{
                    this.$router.go(-1)
                }})
            },
            selectGender(){
                this.$createActionSheet({
                        title: '选择性别',
//                        active: 0,
                        data: [
                            {
                                content: '男'
                            },
                            {
                                content: '女'
                            },
                        ],
                        onSelect: (item, index) => {

                            this.gender=(index+1).toString();

                        },
                        onCancel: () => {
                            this.gender=""
                        }
                }).show()
            },
            //头像上传
            uploadHead(e){
                this.asyncUploadHead({headfile:e.target.files[0],success:(res)=>{
                    if(res.code==200){
                        this.showHead="http://vueshop.glbuys.com/userfiles/head/"+res.data.msbox;
                        this.head=res.data.msbox;
                    }else{
                        this.showHead=""
                    }
                }})
            }
        },
        created(){
            safeUser(this)
            this.getUserInfo({uid:this.uid,success:(data)=>{
                this.nickname=data.nickname;
                this.showHead=data.head;
                this.gender=data.gender;
            }})
//            this.safeUser({uid:this.uid,authToken:this.authToken,success:(res)=>{
////                console.log(res)
//                if(res.code!==200){
//                    this.$router.push("/login")
//                    this.storeOutLogin()
//                }
//            }})
        },
    }
</script>

<style scoped>
    .sub-header{width:100%;height:1rem;background-color:#FFFFFF;display: flex;display:-webkit-flex;align-items: center;-webkit-align-items: center;border-bottom: 1px solid #EFEFEF;position: fixed;z-index: 10;left:0;top:0;}
    .sub-header .back{width:0.8rem;height:0.8rem;background-image:url("../../../assets/images/home/goods/back.png");background-size:100%;background-repeat: no-repeat;background-position: center;}
    .sub-header .title{width:79%;height:auto;font-size:0.32rem;text-align: center;}
    .sub-header .right-btn{width:auto;height:auto;font-size:0.32rem;}

    .page{width:100%;height:100vh;background-color:#FFFFFF;overflow: hidden;}
    .main{width:100%;margin-top:1.02rem;}
    .main ul.head{width:100%;height:1.2rem;border-bottom: 1px solid #EFEFEF;display: flex;display:-webkit-flex;align-items: center;-webkit-align-items: center;justify-content: space-between;-webkit-justify-content: space-between;}
    .main ul.head li:nth-child(1){font-size:0.28rem;margin-left:5%;}
    .main ul.head li:nth-child(2){width:1rem;height:1rem;margin-right:10%;position: relative;z-index:1;}
    .main ul.head li:nth-child(2) img{width:100%;height:100%;border-radius: 100%;}
    .main ul.head li:nth-child(2) input{width:100%;height:100%;position: absolute;z-index:1;left:0;top:0;opacity: 0;}
    .main ul.list{width:100%;height:0.8rem;border-bottom: 1px solid #EFEFEF;display: flex;display:-webkit-flex;align-items: center;-webkit-align-items: center;justify-content: space-between;-webkit-justify-content: space-between;font-size:0.28rem;}
    .main ul.list li:nth-child(1){margin-left:5%;}
    .main ul.list li:nth-child(2){width:50%;height:100%;margin-left:20%;}
    .main ul.list li:nth-child(2) input{width:100%;height:100%;text-align: right;font-size:0.28rem;}
    .main ul.list li.arrow{width:0.4rem;height:0.4rem;background-image:url("../../../assets/images/common/right_arrow.png");background-size:100%;background-repeat: no-repeat;background-position: center;margin-right:3%;}
</style>
