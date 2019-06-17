import request from '@/utils/request';

// 获取咨询类型数型结构
export async function getConsultTypeTree() {
  return request('/workbench/getConsultTypeTree');
}
// 获取原因分类数型结构
export async function getReasonTypeTree() {
  return request('/workbench/getReasonTypeTree');
}