import request from '@/utils/request';

/* global PROXY */
/*
* 用户登录接口
* params：{name，password}
* */

export async function getUserAuthList(data) {
    return request(`${PROXY}/token/login`, {
        method: 'POST',
        data,
    });
}
export async function loginOut() {
    return request(`${PROXY}/token/logout`, {
        method: 'POST',
    });
}