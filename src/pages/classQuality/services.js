import request from '@/utils/request';

// 违规内容展示
export async function getFindTreeList(data) {
    return request('/qualityNotebook/findTreeList', { method: 'post', data });
}
// 质检记录时间
export async function getDateRange(params) {
    return request('/qualityNotebook/getDateRange', { method: 'get', params });
}
// 质检手册获取最近更新时间
export async function getLastModifyDate(params) {
    return request('/qualityNotebook/getLastModifyDate', { method: 'get', params });
}