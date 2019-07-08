import request from '@/utils/request';

// 获取咨询类型数型结构
export async function getConsultTypeTree() {
  return request('/workbench/getConsultTypeTree');
}
// 获取原因分类数型结构
export async function getReasonTypeTree() {
  return request('/workbench/getReasonTypeTree');
}
// 编辑
export async function edit(data) {
  return request('/workbench/edit', { method: 'post', data });
}
// 提交
export async function submit(data) {
  return request('/workbench/submit', { method: 'post', data });
}
// table 列表数据
export async function getIdList(data) {
  return request('/workbench/getIdList', { method: 'post', data });
}