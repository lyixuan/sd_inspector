import request from '@/utils/request';

// 违规内容展示
export async function getFindTreeList(data) {
    return request('/qualityNotebook/findTreeList', { method: 'post', data });
}
// 违规内容展示
export async function getDateRange(params) {
    return request('/qualityNotebook/getDateRange', { method: 'get', params });
}

