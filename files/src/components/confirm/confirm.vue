<template>
    <div class="my-confirm-mask" v-if="isClose" @click="isClose=false">
        <div class="my-confirm">
            <div class="text">{{text}}</div>
            <div class="handle">
                <div @click.stop="setConfirm('confirm')">确认</div>
                <div @click.stop="setConfirm('cannel')">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "confirm",
        data(){
            return {
                text:"",
                callback:null,
                isClose:true
            }
        },
        methods:{
            setConfirm(val){
                if(this.callback){
                    this.callback(val);
                    this.isClose=false;
                }
            }
        }
    }
</script>

<style scoped>
    .my-confirm-mask{
        width: 100%;
        height:100%;
        position: fixed;
        z-index:99;
        left:0;
        top:0;
        background-color: rgba(0,0,0,0.6);
    }
    .my-confirm{width:400px;height:200px;background-color:#FFFFFF;position: absolute;left:50%;top:50%;transform: translate(-50%,-50%);font-size:16px;border-radius: 3px;}
    .my-confirm .text{width:auto;height:auto;margin-top:50px;text-align:center;}
    .my-confirm .handle{width:auto;display: flex;justify-content: space-between;margin-top:50px;box-sizing: border-box;padding-left:20%;padding-right:20%;}
    .my-confirm .handle div{cursor: pointer;}
</style>
