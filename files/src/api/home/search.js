import config from '../../assets/js/conf/config.js';
import {request} from '../../assets/js/libs/request.js';

//热门搜索
export function getHotKwordsData() {
    return request(config.baseApi+"/home/public/hotwords?token="+config.token);
}

//获取搜索的商品参数
export function getAttrsData(kwords) {
    return request(config.baseApi+"/home/goods/param?kwords="+kwords+"&token="+config.token);
}

//搜索商品
let kwords="",page=1,cid="",price1="",price2="",param="",otype="";
export function getSearchGoodsData(data) {
    if(data instanceof Object){
        kwords=data.kwords!=undefined?data.kwords:kwords;
        page=data.page?data.page:page
        cid=data.cid!=undefined?data.cid:cid;
        price1=data.price1!=undefined?data.price1:price1;
        price2=data.price2!=undefined?data.price2:price2;
        param=data.param!=undefined?JSON.stringify(data.param):param;
        otype=data.otype!=undefined?data.otype:otype;

        let url=config.baseApi+"/home/goods/search?kwords="+kwords+"&param="+param+"&page="+page+"&price1="+price1+"&price2="+price2+"&otype="+otype+"&cid="+cid+"&token="+config.token;
        console.log(url)
        return request(url)
    }
}