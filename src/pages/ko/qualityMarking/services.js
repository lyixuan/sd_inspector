import request from '@/utils/request';

// 获取学院列表
export async function getCollegeList(params) {
  return request('/orgMap/getCollegeList', { method: 'get', params });
}
// 获取咨询类型
export async function getConsultTypeTree(params) {
  return request('/workbench/getConsultTypeTree', { method: 'get', params });
}
// 获取原因分类列表
export async function getReasonTypeTree(params) {
  return request('/workbench/getReasonTypeTree', { method: 'get', params });
}
//获取问题分类列表
export async function getFeedBackTypeList(params) {
  return request('/feedBack/getTypeList', { method: 'get', params });
}
// table 列表数据
export async function getTableList(data) {
  return request('/workbench/queryPage', { method: 'post', data });
}
// 导出数据
export async function exportData(data) {
  return request('/workbench/export', { method: 'post', data, responseType: 'blob', getResponse: true });
}
// 工作台 - 获取操作人列表
export async function getOperatorList(data) {
  return request('/workbench/getOperatorList', { method: 'post', data });
}
// 用户—获得具有权限的组织架构
export async function getUserOrgList(params) {
  return request('/deskperfpcapi/organization/userOrgList', { method: 'get', params });
}
