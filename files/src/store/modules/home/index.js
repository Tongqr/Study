import {getSwiperData,getNavData,getGoodsData,getRecoGoodsData} from '../../../api/home/index.js';
let modules={
    namespaced:true,
    state:{
        slides:[],
        navs:[],
        recoGoods:[],
        goods:[]
    },
    mutations:{
        //获取轮播图
        getSwiper(state,payload){
            getSwiperData().then(res=>{
                if(res.code==200){
                    state.slides=res.data;
                    if(payload && payload.success){
                        payload.success();
                    }
                }
            })
        },
        //获取导航
        getNav(state,payload){
            getNavData().then(res=>{
                if(res.code==200){
                    state.navs=res.data;
                    if(payload && payload.success){
                        payload.success();
                    }
                }
            })
        },
        //首页产品
        getGoods(state,payload){
            getGoodsData().then(res=>{
                if(res.code==200){
                    state.goods=res.data;
                    if(payload && payload.success){
                        payload.success();
                    }
                }
            })
        },
        //首页推荐
        getRecoGoods(state,payload){
            getRecoGoodsData().then(res=>{
                if(res.code==200){
                    state.recoGoods=res.data;
                    if(payload && payload.success){
                        payload.success();
                    }
                }
            })
        }
    },
    actions:{
        getSwiper(conText,payload){
            conText.commit("getSwiper",payload);
        },
        getNav(conText,payload){
            conText.commit("getNav",payload);
        },
        getGoods(conText,payload){
            conText.commit("getGoods",payload);
        },
        getRecoGoods(conText,payload){
            conText.commit("getRecoGoods",payload);
        }
    }
};
export default modules;
