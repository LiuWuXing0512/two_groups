import { request } from 'umi'
import { ISpec,IDel } from '@/interfaces';
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