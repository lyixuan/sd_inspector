import request from '@/utils/request';
// 查询组织架构
export async function performanceList(params) {
  console.log(params, 'params');
  return request('/incomeKpiPackage/pageList', { method: 'post', params });
}
