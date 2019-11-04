import request from '@/utils/request';
export async function getUserInfo(params) {
  return request('/deskperfpcapi/user/info', { method: 'get', params });
}
// 查询组织架构
export async function getOrgMapList(params) {
  return request('/orgMap/getOrgMapList', { params });
}
// 人均在服学员列表
export async function kpiLevelList(params) {
  return request('/deskperfpcapi/scorePk/kpiLevel/list', { method: 'get', params })
}
// 学分对比—小组排行
export async function groupList(params) {
  return request('/test/deskperfpcapi/scorePk/group/list', { method: 'POST', data: params })
}
// 家族-学院列表
export async function getIncomeCollegeList(params) {
  return request('/deskperfpcapi/incomeFamily/getCollegeList', { method: 'get', params });
}




