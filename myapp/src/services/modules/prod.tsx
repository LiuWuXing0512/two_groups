import { Iprod, Iaddprod,Dprod,Eprod} from '@/interfaces';
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

// 删除
export function DeleteProd(data:Dprod){
    return request(`/prod/prodTag/${data}`,{
        method:'DELETE',
    })
}

// 回显数据
export function getProdEdit(params:Dprod){
    return request(`prod/prodTag/info/${params}`,{
        meth:'GET',
    })
}

// 编辑
export function EditProd(data:Eprod){
    return request('/prod/prodTag',{
        method:'PUT',
        data
    })
}