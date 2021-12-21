import { request } from 'umi';
import {Iarea} from "@/interfaces"
//地址列表
export function getAreaList(data:Iarea) {
    return request('/admin/area/list', {
        method: "GET",
        params: data
    });
}