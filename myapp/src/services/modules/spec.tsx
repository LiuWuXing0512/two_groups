import { request } from 'umi'
import { ISpec } from '@/interfaces';
export function getSpec(params:ISpec){
    console.log(params,'specdata....');
    return request('/prod/spec/page',{
        method: 'GET',
        params
    })
}