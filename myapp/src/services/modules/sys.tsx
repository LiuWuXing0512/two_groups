import { request } from 'umi';

// 获取导航菜单
export function getSystemNav(){
    return request('/sys/menu/nav', {
        method: "GET"
    });
}
<<<<<<< HEAD
=======

// 获取编辑内容
export function getmodal(){
    return request('/sys/menu/nav', {
        method: "GET"
    });
}
>>>>>>> 638a517327fcf773457214065a852d3a966b8564
