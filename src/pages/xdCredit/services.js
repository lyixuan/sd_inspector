import request from '@/utils/request';

// 用户—获得具有权限的组织架构
export async function getUserOrgList(params) {
  // return request('/deskperfpcapi/organization/userOrgList', { method: 'get', params });
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

// 详情 申诉-点击
export async function getAppealType(data) {
  return request('/classWorkbench/getAppealType', { method: 'post', data });
}
// IM不满意会话-原因列表
export async function reasonList(data) {
  return request('/deskperfpcapi/im/reasonList', { method: 'post', data });
}
// IM不满意会话-会话详情
export async function imDetailList(data) {
  return request('/deskperfpcapi/im/detailList', { method: 'post', data });
}



//学分对比柱状图----test
export async function queryAppealDataPage(data) {
  return request('/test/credit/queryAppealDataPage',{method:'POST',data:data})
}