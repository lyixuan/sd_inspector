import request from '@/utils/request';
// 获取原因分类列表
export async function getReasonTypeTree(params) {
  return request('/workbench/getReasonTypeTree', { method: 'get', params });
}