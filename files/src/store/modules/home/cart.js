import Vue from 'vue'
let modules={
    namespaced:true,
    state:{
        cartData:localStorage['cartData']?JSON.parse(localStorage['cartData']):[]
    },
    mutations:{
        //添加商品
        addCart(state,payload){
            let isSame=false;
            if(state.cartData.length>0){
                for(let key in state.cartData){
                    if(state.cartData[key].gid==payload.cartData.gid && JSON.stringify(state.cartData[key].attrs)==JSON.stringify(payload.cartData.attrs)){
                        isSame=true;
                        state.cartData[key].amount=parseInt(state.cartData[key].amount)+parseInt(payload.cartData.amount)
                        break;
                    }
                }
            }
            if(!isSame){
                state.cartData.push(payload.cartData);
            }

            // console.log(JSON.stringify(state.cartData))
            localStorage['cartData']=JSON.stringify(state.cartData);
        },
        //选择商品
        checkedItem(state,payload){
            state.cartData[payload.index].checked=!state.cartData[payload.index].checked;
            Vue.set(state.cartData,payload.index,state.cartData[payload.index])
            localStorage['cartData']=JSON.stringify(state.cartData);
        },
        //全选反选
        storeSetAllItem(state,payload){
            if(state.cartData.length>0){
                for(let key in state.cartData){
                    state.cartData[key].checked=payload.isAllItem
                }
            }
        },
        //删除商品
        delGoods(state,payload){
            state.cartData.splice(payload.index,1)
            localStorage['cartData']=JSON.stringify(state.cartData);
        },
        //更改数量
        changeAmount(state,payload){
            // console.log(payload);
            state.cartData[payload.index].amount=payload.amount
            state.cartData[payload.index].amount=state.cartData[payload.index].amount.replace(/[^\d]/g,'');
            // Vue.set(state.cartData,payload.index,  state.cartData[payload.index])
            state.cartData[payload.index].amount= state.cartData[payload.index].amount==''|| state.cartData[payload.index].amount==0?1: state.cartData[payload.index].amount
            localStorage['cartData']=JSON.stringify(state.cartData);
        },

        incAmount(state,payload){
            state.cartData[payload.index].amount=parseInt(state.cartData[payload.index].amount)+1
            Vue.set(state.cartData,payload.index,  state.cartData[payload.index])
            localStorage['cartData']=JSON.stringify(state.cartData);
        },

        decAmount(state,payload){
            state.cartData[payload.index].amount=parseInt(state.cartData[payload.index].amount)>1?parseInt(state.cartData[payload.index].amount)-1:1
            Vue.set(state.cartData,payload.index,  state.cartData[payload.index])
            localStorage['cartData']=JSON.stringify(state.cartData);
        },
    },

    getters:{
        total(state){
            let total=0;
            if(state.cartData.length>0){
                for(let key in state.cartData){
                    if( state.cartData[key].checked){
                        total+=parseFloat(state.cartData[key].price)*parseInt(state.cartData[key].amount)
                    }

                }
            }
            return parseFloat(total.toFixed(2))
        },

        freight(state){
            let freights=[],freight=0
            if(state.cartData.length>0){
                for(let key in state.cartData){
                    if(state.cartData[key].checked){
                        freights.push(state.cartData[key].freight)
                    }
                }
                if(freights.length>0){
                    freight=Math.max.apply(null,freights)
                }
            }
            return freight;
        },
        //购物车里是否有商品或是选中的商品
        existCartGoods(state){
            let isItem=false;
            if(state.cartData.length>0){
                for(let key in state.cartData){
                    if(state.cartData[key].checked){
                        isItem=true
                    }
                }
            }
            return isItem;
        }
    }

}

export default modules