import request from '@/utils/request';
// 配置信息
// 家族-学院列表
export async function getIncomeCollegeList(params) {
  return request('/orgMap/findCollegeShortNameList', { method: 'get', params });
}
// // 学分—日期
// export async function getKpiDateRange(params) {
//   return request('/deskperfpcapi/credit/dimension/kpiDateRange', { method: 'get', params });
// }


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

// 创收学院对比列表
export async function compareCollegeList(data) {
  return request('/adminWorkbench/incomeCollege/compareCollegeList',{method:'POST',data: data})
}


// 班主任分层 - 本期创收 - 综合对比
export async function getContrastIncomeKpiPkList(data) {
  return request('/deskperfpcapi/workbenchIncomeKpi/incomeKpiPkItem', {method: 'POST', data });
}
// 班主任分层 - 本期创收 - 查询对比小组
export async function getIncomeKpiPkList(params) {
  return request('/deskperfpcapi/workbenchIncomeKpi/getIncomeKpiPkList', { method: 'get', params });
}