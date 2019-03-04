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
// 获取考期列表
export async function getExamList() {
    return request('/detail/getExamList');
}
