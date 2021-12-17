import { request } from 'umi';
//地址列表
export function getAreaList(data: any) {
    return request('/admin/area/list', {
        method: "GET",
        params: data
    });
}