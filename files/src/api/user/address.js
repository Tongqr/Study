import config from '../../assets/js/conf/config.js';
import {request} from '../../assets/js/libs/request.js';

//添加收货地址
export function addAddressData(data){
    return request(config.baseApi+"/user/address/add?token="+config.token,"post",data)
}
//获取收货地址列表
export function getAddressListData(uid) {
    return request(config.baseApi+"/user/address/index?uid="+uid+"&token="+config.token)
}
//获取收货地址详情
export function getAddressInfoData(uid,aid){
    return request(config.baseApi+"/user/address/info?uid="+uid+"&aid="+aid+"&token="+config.token);
}
//修改收货地址
export function modAddressData(data){
    return request(config.baseApi+"/user/address/mod?token="+config.token,"post",data)
}
//删除收货地址
export function delAddressData(uid,aid){
    return request(config.baseApi+"/user/address/del?uid="+uid+"&aid="+aid+"&token="+config.token);
}