import config from '../../assets/js/conf/config.js';
import {request} from '../../assets/js/libs/request.js';
//轮播图
export function getSwiperData(){
    return request(config.baseApi+"/home/index/slide?token="+config.token);
}

//导航
export function getNavData(){
    return request(config.baseApi+"/home/index/nav?token="+config.token);
}

//首页产品
export function getGoodsData(){
    return request(config.baseApi+"/home/index/goodsLevel?token="+config.token);
}

//首页推荐产品
export function getRecoGoodsData(){
    return request(config.baseApi+"/home/index/recom?token="+config.token);
}
