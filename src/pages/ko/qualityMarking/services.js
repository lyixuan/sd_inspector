import request from '@/utils/request';

// 获取学院列表
export async function getCollegeList(params) {
  return request('/orgMap/getCollegeList', { method: 'get', params });
}
// 获取学院列表
export async function getConsultTypeTree(params) {
  return request('/workbench/getConsultTypeTree', { method: 'get', params });
}
// 获取学院列表
export async function getReasonTypeTree(params) {
  return request('/workbench/getReasonTypeTree', { method: 'get', params });
}
// table 列表数据
export async function getTableList(data) {
  return request('/workbench/queryPage', { method: 'post', data });
}
// 导出数据
export async function exportData(data) {
  return request('/workbench/export', { method: 'post', data, responseType:'blob',getResponse: true });
}
