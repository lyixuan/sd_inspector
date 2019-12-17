import request from '@/utils/request';

//学分对比柱状图
export async function queryAppealDataPage(data) {
  return request('/credit/queryAppealDataPage', { method: 'POST', data: data });
}
// 学分对比组织架构列表接口
export async function getOrgList(params) {
  return request('/credit/getOrgList', { method: 'get', params });
}
//获取学院性质的接口
export async function getCurrentFamilyType(params) {
  return request('/orgMap/getCurrentFamilyType', { method: 'get', params });
}

