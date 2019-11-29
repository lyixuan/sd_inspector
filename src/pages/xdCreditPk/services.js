import request from '@/utils/request';
// 配置信息
export async function kpiLevelList(params) {
  return request('/deskperfpcapi/scorePk/kpiLevel/list', { method: 'get', params })
}
// 学分对比—小组排行
export async function groupList(params) {
  return request('/deskperfpcapi/scorePk/group/list', { method: 'POST', data: params })
}
// 左侧学分pk对象的数据
// export async function groupPkList(params) {
//   return request('/deskperfpcapi/scorePk/group/pk', { method: 'POST', data: params })
// }
//家族学分对比
export async function getFamilyScorePk(data) {
  return request('/deskperfpcapi/family/score/pk', { method: 'POST', data });
}
//家族学分对比右侧集团学分排名
export async function getFamilyRankList(params) {
  return request('/deskperfpcapi/family/score/familyRankList', { method: 'get', params });
}
// 学分小组PK----和班主任工作小组PK公用一个接口
export async function groupPkList(params) {
  return request('/deskperfpcapi/scorePk/group/pk', { method: 'POST', data: params });
}
