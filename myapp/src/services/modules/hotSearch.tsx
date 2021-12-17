import { request } from 'umi';

export function getHotSearch(){
    return request('/proxyApi/admin/hotSearch',{
        method: 'GET',
    })
}

// /proxyApi/admin/hotSearch