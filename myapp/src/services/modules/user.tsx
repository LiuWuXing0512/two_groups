import { ILoginForm } from '@/interfaces';
import { request } from 'umi';
 
// 登陆接口
export function login(data: ILoginForm) {
    return request('/login?grant_type=admin', {
        method: "Post",
        data
    });
}
export function userList(data: ILoginForm) {
    return request('/sys/user/page', {
        method: "GET",
        params: data
    });
}
export function roleList(data: ILoginForm) {
    return request('/sys/role/page', {
        method: "GET",
        params: data
    });
}
export function addUser(data: ILoginForm) {
    return request('/sys/user', {
        method: "POST",
        data
    });
}
export function delUser(data: ILoginForm) {
    return request('/sys/user', {
        method: "DELETE",
        data
    });
}