import { request } from 'umi';
import { ISpec, ICon, IDelt, IConfigitem } from '@/interfaces';
export function getConfig(params: ISpec) {
  return request('/sys/config/page', {
    method: 'GET',
    params,
  });
}

export function getConfigDel(data: IDelt) {
  return request('/sys/config', {
    method: 'delete',
    data,
  });
}

export function getConfigAdd(data: IConfigitem) {
  return request('/sys/config', {
    method: 'post',
    data,
  });
}
export function getConfigId(id) {
  return request(`/sys/config/info/${id}`, {
    method: 'get',
  });
}


export function getConfigTj(data:IConfigitem) {
  return request(`/sys/config`, {
    method: 'put',
    data
  });
}

