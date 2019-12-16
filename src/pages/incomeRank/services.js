import request from '@/utils/request';
// 配置信息
// 家族-学院列表
export async function getIncomeCollegeList(params) {
  return request('/orgMap/findCollegeShortNameList', { method: 'get', params });
}
// 学分—日期
export async function getKpiDateRange(params) {
  return request('/deskperfpcapi/credit/dimension/kpiDateRange', { method: 'get', params });
}


//家族创收对比
export async function getIncomeFamilyList(data) {
  return request('/deskperfpcapi/incomeFamily/getFamilyPk', { method: 'POST', data });
}
//家族创收对比的家族绩效列表
export async function getFamilyList(params) {
  return request('/deskperfpcapi/incomeFamily/getFamilyList', { method: 'get', params });
}
//家族创收对比-小组绩效列表
export async function getIncomeGroupList(params) {
  return request('/deskperfpcapi/incomeFamily/getGroupList', { method: 'get', params });
}
// 家族创收对比-小组创收对比
export async function getIncomeFamilyGroupPk(data) {
  return request('/deskperfpcapi/incomeFamily/getGroupPk', { method: 'POST', data });
}
