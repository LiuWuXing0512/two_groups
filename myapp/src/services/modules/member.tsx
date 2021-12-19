import { request } from 'umi';
import {IMemberData,IChangeStatus} from '@/interfaces/index'

export function getMemberList(params:IMemberData){
    return request('/admin/user/page',{
        method: 'GET',
        params
    })
}

export function getModal(userId:string){
    return request(`/admin/user/info/${userId}`,{
        method: 'GET',
    })
}

export function changeStatus(data:IChangeStatus){
    return request('/admin/user',{
        method: 'PUT',
        data
    })
}
