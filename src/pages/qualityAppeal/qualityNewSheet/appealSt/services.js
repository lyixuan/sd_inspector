import request from '@/utils/request';

// 质检审核
export async function checkQuality(params) {
    return request('/quality/checkQuality', { method: 'post', data: params });
}
