import request from '@/utils/request';

// 查询质检列表
export async function updateQuality(params) {
    return request('/quality/updateQuality', { method: 'post', data: params });
}