<template>
    <div class="profile">
        <HeaderComponent title="个人资料"></HeaderComponent>
        <form class="form1">
            <div class="head">
                <div class="text">头像</div>
                <div class="image"></div>
            </div>
            <div class="nickname">
                <div class="text">昵称</div>
                <div class="image"></div>
            </div>
            <div class="sex">
                <div class="text">性别</div>
                <div class="image"></div>
            </div>
        </form>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapActions,mapState} from 'vuex'
    import HeaderComponent from '../../../components/header'
    export default {
        name: 'profile',
        mounted(){
            document.title=this.$route.meta.title
        },
        components:{
            HeaderComponent
        },
    }
</script>


<style scoped>
    .header-top{width:100%;height:1.02rem;background: #ffffff; border-bottom:1px solid #efefef;
        display: flex;}
    .topicon{width:0.8rem;height:0.8rem;margin-top:2%;}
    .toptext{width:6rem;height:1rem;color:#323232;font-size:0.32rem;
        text-align: center;
        line-height:1rem;}
    .save{text-align: center;font-size:0.32rem;
        line-height:1rem;}
    .head,.nickname,.sex{width:100%;height:1.22rem;border-bottom:1px solid #efefef;background:#ffffff;position:relative;}
    .text{width:auto;height:auto;position: absolute;left:5%;top:40%;font-size:0.28rem;color: #323232;}
</style>