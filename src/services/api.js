import request from '@/utils/request';


export async function getUserAuthList(data) {
    return request(`/token/login`, {
        method: 'POST',
        data,
    });
}

// 获取考期列表
export async function getExamList() {
    return request('/detail/getExamList');
}
