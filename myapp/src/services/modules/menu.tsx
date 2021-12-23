import { request } from 'umi';
import { ILoginForm } from "@/interfaces"

export function meunTable(data: ILoginForm) {
    return request('/sys/menu/table', {
        method: "GET",
        params: data
    });
}