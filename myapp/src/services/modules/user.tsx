import { ILoginForm } from '@/interfaces';
import { request } from 'umi';

// 登陆接口
export function login(data: ILoginForm) {
    return request('/login?grant_type=admin', {
        method: "Post",
        data
    });
}
export function userList(data) {
    return request('/sys/user/page', {
        method: "GET",
        params: data
    });
}
export function roleList(data) {
    return request('/sys/role/page', {
        method: "GET",
        params: data
    });
}