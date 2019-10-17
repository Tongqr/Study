import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:"hash", //1、hash哈希：有#号。2、history历史：没有#号
    base:process.env.BASE_URL, ////自动获取根目录路径
    routes:[
        {
            path:"/",
            name:"home",
            component:()=>import("./pages/home/main/index"),
            redirect:"/index",
            children:[
                {
                    path:"index",
                    name:"index",
                    component:()=>import("./pages/home/index/index"),
                    meta:{keepAlive:true,title:"首页"}
                },
                {
                    path:"cart",
                    name:"cart",
                    component:()=>import("./pages/home/cart/index"),
                    meta:{keepAlive:false,title:"购物车"}
                },
                {
                    path:"my",
                    name:"my",
                    component:()=>import("./pages/user/ucenter/index"),
                    meta:{title:"会员中心",keepAlive:false}
                }
            ]
        },
        {
            path:"/login",
            name:"login",
            component:()=>import("./pages/home/login/index"),
            meta:{keepAlive:true,title:"会员登录"}
        },
        {
            path:"/reg",
            name:"reg",
            component:()=>import("./pages/home/reg/index"),
            meta:{keepAlive:false,title:"会员注册"}
        },
        {
            path:"/goods/classify",
            name:"classify",
            component:()=>import("./pages/home/goods/classify"),
            meta:{keepAlive:false,title:"分类"},
            redirect:"/goods/classify/item",
            children:[
                {
                    path: "item",
                    name: "classify_item",
                    component: () => import("./pages/home/goods/classify_item"),
                    meta:{title:"商品分类",keepAlive:false}
                }
            ]

        },
        {
            path: "/goods/details",
            name: "goods_details",
            component: () => import("./pages/home/goods/details"),
            meta:{title:"商品详情",keepAlive:false},
            redirect:"/goods/details/item",
            children:[
                {
                    path:"item",
                    name:"item",
                    component:()=>import("./pages/home/goods/details_item")
                },
                {
                    path:"content",
                    name:"content",
                    component:()=>import("./pages/home/goods/details_content")
                },
                {
                    path:"review",
                    name:"review",
                    component:()=>import("./pages/home/goods/details_review")
                }
            ]
        },
        {
            path:"/profile",
            name:"profile",
            component:()=>import("./pages/user/profile/index"),
            meta:{keepAlive:false,title:"个人资料",auth:true}
        },
        {
            path:"/address",
            name:"address",
            component:()=>import("./pages/user/address/index"),
            meta:{keepAlive:false,title:"收货地址管理"}
        },
        {
            path:"/address/add",
            name:"addressAdd",
            component:()=>import("./pages/user/address/add")
        },
        {
            path:"/address/mod",
            name:"addressMod",
            component:()=>import("./pages/user/address/mod")
        },
        {
            path:"/goods/search",
            name:"goods-search",
            component:()=>import("./pages/home/goods/search")
        },
        {
            path:"/collection",
            name:"collection",
            component:()=>import("./pages/user/collection/index")
        }
    ]
})
