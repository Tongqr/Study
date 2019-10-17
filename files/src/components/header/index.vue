<template>
    <div class='sub-header'>
        <div class='back' @click="$router.go(-1)"></div>
        <div class='title'>{{title}}</div>
        <div class="right-btn" v-if="rightText?true:false" @click="rightClick()">{{rightText}}</div>
    </div>
</template>

<script>
    export default {
        props:{
            title:{
                type:String,
                default:""
            },
            rightText:{
                type:String,
                default:""
            }
        },
        methods:{
            rightClick(){
                this.$emit("rightClick")
            }
        }
    }
</script>

<style scoped>
    .sub-header{width:100%;height:1rem;background-color:#FFFFFF;display: flex;display:-webkit-flex;align-items: center;-webkit-align-items: center;border-bottom: 1px solid #EFEFEF;position: fixed;z-index: 10;left:0;top:0;}
    .sub-header .back{width:0.8rem;height:0.8rem;background-image:url("../../assets/images/home/goods/back.png");background-size:100%;background-repeat: no-repeat;background-position: center;}
    .sub-header .title{width:79%;height:auto;font-size:0.32rem;text-align: center;}
    .sub-header .right-btn{width:auto;height:auto;font-size:0.32rem;}
</style>
