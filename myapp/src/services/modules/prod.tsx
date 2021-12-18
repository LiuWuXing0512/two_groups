import { Iprod } from '@/interfaces';
import { request } from 'umi';

export function getProd(params:Iprod) {
    return request('prod/prodTag/page' , {
        method: 'GET',
        params
    })
}