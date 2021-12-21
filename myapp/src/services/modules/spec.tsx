import { request } from 'umi'
import { ISpec,IDel,Records } from '@/interfaces';
export function getSpec(params:ISpec){
    console.log(params,'specdata....');
    return request('/prod/spec/page',{
        method: 'GET',
        params
    })
}

export function getSpecDel(num:IDel){
    console.log(num,'specdata....');
    return request(`/prod/spec/${num}`,{
        method: 'delete',
    })
}

export function getAdd(data:Records){
    return request(`/prod/spec`,{
        method: 'post',
        data
    })
}