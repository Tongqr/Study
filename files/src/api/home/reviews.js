import config from '../../assets/js/conf/config'
import {request} from '../../assets/js/libs/request'

//获取评价信息
export function getReviewsData(gid,page=1) {
    return request(config.baseApi+"/home/reviews/index?gid="+gid+"&page="+page+"&token="+config.token);
}