import Vue from 'vue'
import {getClassifyData,getClassifyGoodsData,getDetailsData,getAttrsData} from '../../../api/home/goods.js';
let modules={
    namespaced:true,
    state:{
        classifys:[],
        goods:[],
        goodsDetails:{},
        attrs:[]
    },
    mutations:{
        //获取分类  左边菜单
        getClassify(state,payload){
            getClassifyData().then(res=>{
                // console.log(res)
                if(res.code==200){
                   for(let key in res.data){
                       res.data[key].active=false;
                       res.data[key].checked=false;//操作搜索筛选分类的样式
                   }
                   state.classifys=res.data
                   // console.log(state.classifys)
                   // console.log(JSON.stringify(res.data))
                    state.classifys=res.data;
                    if(payload && payload.success){
                        payload.success();
                    }
                }
            })
        },
        //选择分类 点击换色
        selectClassify(state,payload){
            // console.log(payload.index) //.index是个对象，所以直接传参数是undefined，要把参数变成对象
            if(state.classifys.length>0){
                for(let key in state.classifys){
                    if(state.classifys[key].active){
                        state.classifys[key].active=false
                    }
                }
            }
            state.classifys[payload.index].active=true;
        },
//获取分类内容 右侧商品
        getClassifyGoods(state,payload){
            getClassifyGoodsData(payload.cid).then(res=>{
                // console.log(res)
                if(res.code==200){
                    state.goods=res.data;
                    if(payload&&payload.success){
                        payload.success();
                    }
                }else{
                    state.goods=[]
                }
            })
        },
        //获取商品详情
        getDetails(state,payload){
            getDetailsData(payload.gid).then(res=>{
                // console.log(res)
                if(res.code==200){
                    state.goodsDetails=res.data
                    if(payload&&payload.success){
                        payload.success()
                    }
                }
            })

        },
        //商品属性
        getGoodsAttrs(state,payload){
            getAttrsData(payload.gid).then(res=>{
                if(res.code==200){
                    for(let key in res.data){
                        for(let key2 in res.data[key].values){
                            res.data[key].values[key2].active=false;
                        }
                    }
                    // console.log(res.data)
                    state.attrs=res.data
                }
            })
        },
        //选择商品属性
        selectAttrs(state,payload){
            // console.log(payload.index,payload.index2)
            if(state.attrs.length>0){
                for(let i=0;i<state.attrs[payload.index].values.length;i++){
                    if(state.attrs[payload.index].values[i].active){
                        state.attrs[payload.index].values[i].active=false;
                        break;
                    }

                }
                state.attrs[payload.index].values[payload.index2].active=true;
                Vue.set(state.attrs[payload.index].values,payload.index2,state.attrs[payload.index].values[payload.index2])
            }

        },

    },
    actions:{
        getClassify(conText,payload){
            conText.commit("getClassify",payload);
        },
        selectClassify(conText,payload){
            conText.commit("selectClassify",payload)
        },
        getClassifyGoods(conText,payload){
            conText.commit("getClassifyGoods",payload);
        },
        getDetails(conText,payload){
            conText.commit("getDetails",payload)
        },
        getGoodsAttrs(conText,payload){
            conText.commit("getGoodsAttrs",payload)
        },
        selectAttrs(conText,payload){
            conText.commit("selectAttrs",payload)
        }
    }
}

export default modules