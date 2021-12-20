import { IIndexImgPage } from '@/interfaces';
import { request } from 'umi';
// 请求
export function getIndexImg(params:IIndexImgPage){
    return request('/admin/indexImg/page',{
        method: 'GET',
        params
    })
}