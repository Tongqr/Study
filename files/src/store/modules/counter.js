let modules={
    //命名空间
    namespaced:true,
    //数据源
    state:{
        total:0,
        users:[
            {name:"张三",age:30},
            {name:"李四",age:20},
            {name:"王五",age:18}
        ]
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
    },
    //有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数。vuex的计算属性
    getters:{
        getUsers(state){
            let users=state.users.filter((item)=>{
                return item.age>18
            });
            return users;
        }
    }
};
export default modules
