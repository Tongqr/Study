<template>
    <button type="button" class="btn" @click="emitClick()"><slot></slot></button>
</template>

<script>
    export default {
        methods:{
            emitClick(){
                this.$emit("click");
            }
        }
    }
</script>

<style scoped>
    .btn{width:auto;height:auto;background-color:#0000FF;color:#FFFFFF;padding:5px 15px;font-size:16px;border-radius: 3px;border:0 none;outline:none;cursor: pointer;}
</style>
