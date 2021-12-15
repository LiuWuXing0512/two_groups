import { IPage } from '@/models/hotSearch';
import { request } from 'umi';

export function getHotSearch(params:IPage){
    return request('/admin/hotSearch/page',{
        method: 'GET',
        params
    })
}

// /proxyApi/admin/hotSearch