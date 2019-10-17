import Vue from 'vue'
import {getHotKwordsData,getSearchGoodsData,getAttrsData} from "../../../api/home/search.js"
let modules={
    namespaced:true,
    state:{
        historyKwords:localStorage['historyKwords']?JSON.parse(localStorage['historyKwords']):[],
        hotKwords:[],
        goods:[],
        cid:"",
        goodsTotal:0,
        priceList:{
            isShow:true,
            data:[
                {price1:1,price2:50,checked:false},
                {price1:51,price2:99,checked:false},
                {price1:100,price2:300,checked:false},
                {price1:301,price2:1000,checked:false},
                {price1:1001,price2:4000,checked:false},
                {price1:4001,price2:10000,checked:false}
            ]
        },
        minPrice:"",
        maxPrice:"",
        attrs:[],
        params:[]
    },
    mutations:{
        //添加历史记录
      addKwords(state,payload){
          state.historyKwords=payload.historyKwords

          localStorage['historyKwords']=JSON.stringify(payload.historyKwords)
      },
        //删除历史记录
        clearHistoryKwords(state){
          state.historyKwords=[];
          localStorage.removeItem("historyKwords")
        },
        //获取热门关键词
        getHotKwords(state){
            getHotKwordsData().then(res=>{

                if(res.code==200){
                    state.hotKwords=res.data
                }
            })
        },
        //搜索商品
        getSearchGoods(state,payload){
            getSearchGoodsData(payload).then(res=>{
                // console.log(res)
                if(res.code==200){
                    state.goods=res.data;
                    state.goodsTotal=res.pageinfo.total;
                    if(payload&&payload.success){
                        payload.success(res.pageinfo)
                    }
                }else{
                    state.goods=[];
                    state.goodsTotal=0;
                }
            })

        },
        getSearchGoodsPage(state,payload){
            getSearchGoodsData(payload).then(res=>{
                // console.log(res)
                if(res.code==200){
                    state.goods.push(...res.data)

                }
            })
        },
        //选择价格
        selectPrice(state,payload){
            // console.log(payload.index)
            if(state.priceList.data.length>0){
                for(let i=0;i<state.priceList.data.length;i++){
                    if(state.priceList.data[i].checked){
                        state.priceList.data[i].checked= state.priceList.data[payload.index].checked;
                        break;
                    }
                }
            }
            state.priceList.data[payload.index].checked=! state.priceList.data[payload.index].checked
            Vue.set(state.priceList.data,payload.index,state.priceList.data[payload.index]);
            state.minPrice= state.priceList.data[payload.index].checked?state.priceList.data[payload.index].price1:"";
            state.maxPrice= state.priceList.data[payload.index].checked?state.priceList.data[payload.index].price2:"";
        },
        //设置最小价格
        setMinPrice(state,payload){
            state.minPrice=payload.minPrice
            state.minPrice=state.minPrice.replace(/[^\d | ^\.]/g,'')
            // console.log(state.minPrice)
        },
        //设置最大价格
        setMaxPrice(state,payload){
            state.maxPrice=payload.maxPrice;
            state.maxPrice=state.maxPrice.replace(/[^\d|^\.]/g,'');
            console.log(state.maxPrice)
        },
        //获取搜索的商品属性
        getAttrs(state,payload){
            getAttrsData(payload.kwords).then(res=>{
                // console.log(res)
                if(res.code==200){
                    for(let i=0;i<res.data.length;i++){
                        res.data[i].isShow=true;
                        for(let j=0;j<res.data[i].param.length;j++){
                            res.data[i].param[j].checked=false;
                        }
                    }
                    // console.log(res.data)
                    state.attrs=res.data;
                    if(payload&&payload.success){
                        payload.success()
                    }
                }else{
                    state.attrs=[]
                }
            })
        },
        //显示隐藏属性
        showAttr(state,payload){
            console.log(payload.index)
            state.attrs[payload.index].isShow=!state.attrs[payload.index].isShow;
            //效果没出来先打印这个state.attrs[payload.index].isShow看是否有错误，没有就Vue.set
            Vue.set(state.attrs,payload.index,state.attrs[payload.index])
        },
        //选择属性值
        selectParam(state,payload){
            state.attrs[payload.index].param[payload.index2].checked=! state.attrs[payload.index].param[payload.index2].checked
            Vue.set( state.attrs[payload.index].param[payload.index2],payload.index2,state.attrs[payload.index].param[payload.index2])
        },
        //添加属性值到数组
        pushParams(state,payload){
            state.params=[]
            if(state.attrs.length>0){
                for(let i=0;i<state.attrs.length;i++){
                    for(let j=0;j<state.attrs[i].param.length;j++)
                    {
                        if(state.attrs[i].param[j].checked){
                            state.params.push(state.attrs[i].param[j].pid)
                        }
                    }
                }
                // console.log(state.params)
            }else{
                state.params=[]
            }
        },
        //重置
        resetAttrs(state,payload){
            //重置价格
            console.log(state.priceList)
            if(state.priceList.data.length>0){
                for(let i=0;i<state.priceList.data.length;i++){
                    if( state.priceList.data[i].checked){
                        state.priceList.data[i].checked=false;
                        break;
                    }

                }
                state.minPrice=""
                state.maxPrice=""
            }
            //重置属性
            // console.log(state.attrs)
            if(state.attrs.length>0){
                for(let i=0;i<state.attrs.length;i++){
                    for(let j=0;j<state.attrs[i].param.length;j++){
                        if(state.attrs[i].param[j].checked){
                            state.attrs[i].param[j].checked=false;
                        }
                    }
                }
                state.params=[];
            }
        }
    },
    actions:{
        getHotKwords(conText,payload){
            conText.commit("getHotKwords",payload)
        },
        getSearchGoods(conText,payload){
            conText.commit("getSearchGoods",payload)
        },
        getSearchGoodsPage(conText,payload){
            conText.commit("getSearchGoodsPage",payload)
        },
        selectClassify(contText,payload){
            // console.log(contText,payload.index)
            if(contText.rootState.goods.classifys.length>0){
                for(let i=0;i<contText.rootState.goods.classifys.length;i++){
                    if(contText.rootState.goods.classifys[i].checked){
                        contText.rootState.goods.classifys[i].checked=contText.rootState.goods.classifys[payload.index].checked;
                        break;
                    }
                }
                contText.rootState.goods.classifys[payload.index].checked=! contText.rootState.goods.classifys[payload.index].checked
                Vue.set( contText.rootState.goods.classifys,payload.index,contText.rootState.goods.classifys[payload.index])
                contText.state.cid=contText.rootState.goods.classifys[payload.index].checked?contText.rootState.goods.classifys[payload.index].cid:"";
                // console.log(contText.state.cid)
            }

        },
        getAttrs(conText,payload){
            conText.commit("getAttrs",payload)
        },
        resetAttrs(conText,payload){
            //重置分类
            // console.log(conText)
            if(conText.rootState.goods.classifys.length>0){
                for(let i=0;i<conText.rootState.goods.classifys.length;i++){
                    if(conText.rootState.goods.classifys[i].checked){
                        conText.rootState.goods.classifys[i].checked=false;
                        break;
                    }
                }
                conText.state.cid=""
            }

            conText.commit("resetAttrs",payload)
        }
    }

}

export default modules