import Vue from 'vue';
import Vuex from 'vuex';
import index from './modules/home/index.js'
import goods from './modules/home/goods.js'
import reviews from './modules/home/reviews.js'
import cart from './modules/home/cart.js'
import user from './modules/user/index.js'
import search from './modules/home/search.js'
import collection from './modules/user/collection.js'
import userAddress from './modules/user/address.js'
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        index,
        goods,
        reviews,
        cart,
        user,
        search,
        userAddress,
        collection
    }
})
