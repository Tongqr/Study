<template>
    <div class="address">
        <div class="header-top">
            <div class="topicon"></div>
            <div class="toptext">收货地址管理</div>
        </div>

        <div class="address-main">
            <ul>
                <li class="leftmain">
                    <div class="name">水电费  152421257895</div>
                    <div class="address1">四川省成都市</div>
                </li>
                <li class="icon"></li>
            </ul>
        </div>

        <div class="add-main">
            <a class="btn">+ 添加新地址</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'address',
        mounted(){
            document.title=this.$route.meta.title
        }
    }
</script>


<style scoped>
    .address{background: #fff;}
    .header-top{width:100%;height:1.02rem;background: #ffffff; border-bottom:1px solid #efefef;
        display: flex;}
    .topicon{width:0.8rem;height:0.8rem;margin-top:2%;}
    .toptext{width:6rem;height:1rem;color:#323232;font-size:0.32rem;
        text-align: center;
        line-height:1rem;}

    .add-main{width:100%;height:1.22rem;position:fixed;bottom:0;border-top:#efefef solid 1px;background:#fff;
        display: flex;align-items: center;justify-content: center}
    .btn{width:90%;height:0.8rem;background:#eb1625;color:#fff;font-size: 0.28rem;
        text-align: center;line-height: 0.8rem;border-radius: 3px;}

    .address-main{width:100%;height:auto;padding-bottom:1.2rem;background:#fff;}
    .address-main>ul{width:100%;height:1rem;border-bottom:#efefef 1px solid;
        display: flex;justify-content: space-between;
        align-items: center;}
    .leftmain{width:4rem;}
    .name,.address1{width:4rem;height:0.4rem;margin-left:8%;font-size:0.24rem;}
    .address1{height:0.32rem;color:#999999;}
    .icon{width:0.32rem;height:0.32rem;background:url("");margin-right: 3%;}
</style>