import request from '@/utils/request';


export async function getUserAuthList(data) {
    return request(`/token/login`, {
        method: 'POST',
        data,
    });
}

