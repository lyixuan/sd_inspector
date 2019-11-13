import request from '@/utils/request';
// ===========================家族==========

// 本期创收明细-关键指标
export async function getCurrentIncomeTarget(params) {
  return request('/deskperfpcapi/incomeFamily/currentIncomeTarget', { method: 'get', data: params })
}
// 本期创收明细-小组创收明细
export async function getCurrentIncomeGroup(params) {
  return request('/deskperfpcapi/incomeFamily/currentIncomeGroup', { method: 'get', data: params })
}
// 本期创收明细-班主任创收明细
export async function getCurrentIncomeClass(params) {
  return request('/deskperfpcapi/incomeFamily/currentIncomeClass', { method: 'get', data: params })
}
// ====小树start====
// 工作台—绩效详情
export async function getFamilykpiInfo(params) {
  return request('/family/kpiInfo', { method: 'get', data: params })
}
//本期学分-明细
export async function scoreDetail(params) {
  return request('/deskperfpcapi/family/score/detail', { method: 'get', data: params })
}
// 本期学分—汇总
export async function scoreStatistics(params) {
  return request('/deskperfpcapi/family/score/statistics', { method: 'get', params });
}
// 本期学分—本学院学分排名
export async function collegeRankList(params) {
  return request('/deskperfpcapi/family/score/collegeRankList', { method: 'get', params });
}
// 本期学分—集团学分排名
export async function companyRankList(params) {
  return request('/deskperfpcapi/family/score/companyRankList', { method: 'get', params });
}
// 本期创收-学院排名
export async function incomeCollegeRankList(params) {
  return request('/deskperfpcapi/incomeFamily/collegeRankList', { method: 'get', params });
}
// 本期创收-集团排名
export async function incomeCompanyRankList(params) {
  return request('/deskperfpcapi/incomeFamily/companyRankList', { method: 'get', params });
}
// 本期绩效—排行榜
export async function achievementList(params) {
  return request('/deskperfpcapi/family/score/achievementList', { method: 'get', params });
}
// // 本期预估绩效 - 质检扣款金额统计
export async function qualityChargeCount(params) {
  return request('/classWorkbench/family/qualityChargeCount', { method: 'get', params });
}
// 工作台—绩效详情
export async function familyAchievement(params) {
  return request('/deskperfpcapi/family/score/achievement', { method: 'get', params });
}
// ====小树end====

// 本期申诉 - 申诉统计
export async function getFamilyRecord(params) {
  return request('/classWorkbench/family/countAppealRecord', { method: 'get', params })
}
// 本期质检 - 质检统计
export async function getFamilyQuality(params) {
  return request('/classWorkbench/family/countCurrentQuality', { method: 'get', params })
}
//=====文静start======
// 查询组织架构
// export async function getOrgMapList(params) {
//   return request('/orgMap/getOrgMapList', { params });
// }
//家族学分对比
export async function getFamilyScorePk(data) {
  return request('/deskperfpcapi/family/score/pk', { method: 'POST', data });
}
//家族学分对比右侧集团学分排名
export async function getFamilyRankList(params) {
  return request('/deskperfpcapi/family/score/familyRankList', { method: 'get', params });
}
//获取家族学分对比右侧下拉筛选的数据
export async function getCollegeList(params) {
  return request('/deskperfpcapi/organization/collegeList', { method: 'get', params });
}
//小组学分对比
// export async function getGroupPkList(params) {
//   return request('/deskperfpcapi/family/score/groupPk', { method: 'get', params });
// }
//小组学分对比设置对比项的我的小组数据
// export async function myFamilyGroupList(params) {
//   return request('/deskperfpcapi/organization/myFamilyGroupList', { method: 'get', params })
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
//家族创收对比的学院列表
// export async function getIncomeCollegeList(params) {
//   return request('/deskperfpcapi/incomeFamily/getCollegeList', { method: 'get', params });
// }
// 家族创收对比-小组创收对比
export async function getIncomeFamilyGroupPk(data) {
  return request('/deskperfpcapi/incomeFamily/getGroupPk', { method: 'POST', data })
}
export async function getUserInfo(params) {
  return request('/deskperfpcapi/user/info', { method: 'get', params });
}
// 学分小组PK----和班主任工作小组PK公用一个接口
export async function groupPkList(params) {
  return request('/deskperfpcapi/scorePk/group/pk', { method: 'POST', data: params })
}