import request from '@/utils/request';

// 查询组织架构
export async function getOrgInfo(params) {
  return request('/detail/getOrgList', { params });
}
// 当前考期时间范围接口
export async function getExamDateRange(params) {
  return request('/general/getExamDateRange', { params });
}
// 获取组织柱状图数据
export async function examProvinceOrg(params) {
  return request('/exam/province/org', { method: 'post', data: params });
}
