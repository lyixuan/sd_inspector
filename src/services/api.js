import request from '@/utils/request';

export async function getUserAuthList() {
    return request('/api/test', {
        data: {
            ID: 12345
        }
    });
}

export async function loginOut() {
    return request('/proxy/token/logout', {
        method: 'post',
    });
}