import config from '../../assets/js/conf/config'
import {request} from '../../assets/js/libs/request'

//加入收藏
export function addCollectData(uid,gid){
    return request(config.baseApi+"/goods/fav?uid="+uid+"&gid="+gid+"&token="+config.token)
}

//收藏详情
export function collectionInfoData(uid,page=1){
    return request(config.baseApi+"/user/fav/index?uid="+uid+"&page="+page+"&token="+config.token)
}

//删除收藏
export function delCollectionData(uid,fid){
    return request(config.baseApi+"/user/fav/del?uid="+uid+"&fid="+fid+"&token="+config.token ,"post",{uid:uid,fid:fid})
}