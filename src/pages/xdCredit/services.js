import request from '@/utils/request';

// 用户—获得具有权限的组织架构
export async function getUserOrgList(params) {
    return request('/deskperfpcapi/organization/userOrgList', { method: 'get', params });
}
// 学分—小组维度列表
export async function getDimensionList(data) {
  return request('/deskperfpcapi/credit/dimension/list', { method: 'post', data });
}
// 学分—维度详情
export async function getDimensionDetail(data) {
  return request('/deskperfpcapi/credit/dimension/detail', { method: 'post', data });
}
// 学分—权限
export async function getUserInfo(params) {
  return request('/deskperfpcapi/user/info', { method: 'get', params });
}
// 学分—日期
export async function getKpiDateRange(params) {
  return request('/deskperfpcapi/credit/dimension/kpiDateRange', { method: 'get', params });
}