import { request } from 'umi';

// 获取导航菜单
export function getSystemNav(){
    return request('/sys/menu/nav', {
        method: "GET"
    });
}
//地址列表
export function getAreaList(data:any) {
    let res = request('/proxyApi/admin/area/list', {
        method: "GET",
        data
    });
    console.log(res,"asdasdsadas");
    return res
}