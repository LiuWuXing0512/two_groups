import { request } from 'umi';

// 获取导航菜单
export function getSystemNav(){
    return request('/sys/menu/nav', {
        method: "GET"
    });
}

// 获取编辑内容
export function getmodal(){
    return request('/sys/menu/nav', {
        method: "GET"
    });
}
