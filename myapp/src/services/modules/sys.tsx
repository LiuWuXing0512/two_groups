import { request } from 'umi';
import { ISysLogData } from '@/interfaces/index'

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

//获取系统日志
export function getSyslog(params:ISysLogData){
    return request('/sys/log/page', {
        method: "GET",
        params
    });
}
