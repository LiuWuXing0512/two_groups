import { request } from 'umi';

export function getHotSearch(params){
    return request('/proxyApi/admin/hotSearch',{
        method: 'GET',

    })
}

// /proxyApi/admin/hotSearch