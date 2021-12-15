import { request } from 'umi';
import {IMemberData} from '@/interfaces/index'

export function getMemberList(params:IMemberData){
    return request('/proxyApi/admin/user/page',{
        method: 'GET',
        params
    })
}
