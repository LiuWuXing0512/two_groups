import { Iprod, Iaddprod, IProdData } from '@/interfaces';
import { request } from 'umi';

// 不验证传的参数的话，默认any

// 请求数据
export function getProd(params: Iprod) {
    return request('/prod/prodTag/page', {
        method: 'GET',
        params
    })
}

// 新增
export function addProd(data: Iaddprod) {
    return request('/prod/prodTag', {
        method: 'POST',
        data:{
            id:0,
            ...data
        }
    })
}

//产品管理数据
export function getProdList(params: IProdData) {
    return request('/prod/prod/page', {
        method: 'GET',
        params
    })
}
