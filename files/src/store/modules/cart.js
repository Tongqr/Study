let modules={
    namespaced:true,
    //数据源
    state:{
        total:0
    },
    //同步操作方法
    mutations:{
        incTotal(state,payload){
            // console.log(state,payload);
            state.total=payload.total;
        },
        decTotal(state,payload){
            state.total=payload.total;
        }
    },
    ////异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面。后台的数据ajax
    actions:{
        asyncIncTotal(conText,payload){
            // console.log(conText,payload);
            conText.commit("incTotal",payload);
        },
        asyncDecTotal(conText,payload){
            conText.commit("decTotal",payload);
        }
    }
};
export default modules
