import { IRecordsItem } from '@/interfaces';
import { IPage } from '@/models/hotSearch';
import { request } from 'umi';
// 请求
export function getHotSearch(params:IPage){
    return request('/admin/hotSearch/page',{
        method: 'GET',
        params
    })
}
// 删除
export function hotSearchSum(arr:number[]){
    return request('/admin/hotSearch',{
        method: 'DELETE',
        data: arr
    })
}
// 修改
export function puthotSearchSum(data:IRecordsItem){
    console.log(data,'data...services');
    
    return request('/admin/hotSearch',{
        method: 'PUT',
        data
    })
}
// 新增
export function posthotSearchSum(data:IRecordsItem){
    console.log(data,'data...services');
    
    return request('/admin/hotSearch',{
        method: 'POST',
        data
    })
}
