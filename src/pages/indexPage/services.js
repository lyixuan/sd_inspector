import request from '@/utils/request';

// 班主任分层 - 本期创收 - 综合对比
export async function getContrastIncomeKpiPkList(params) {
  return request('/deskperfpcapi/workbenchIncomeKpi/incomeKpiPkItem', { method: 'get', params });
}
// 班主任分层 - 本期创收 - 查询对比小组
export async function getIncomeKpiPkList(params) {
  return request('/deskperfpcapi/workbenchIncomeKpi/getIncomeKpiPkList', { method: 'get', params });
}
// 班主任分层 - 本期创收 - 个人信息
export async function getIncomeKpiPersonInfo(params) {
  return request('/deskperfpcapi/workbenchIncomeKpi/incomeKpiPersonInfo', { method: 'get', params });
}

// 班主任工作台 - 本期质检统计
export async function getCountCurrentQuality(params) {
  return request('/classWorkbench/countCurrentQuality', { method: 'get', params });
}
// 班主任工作台 - 我的申诉统计
export async function getCountAppealRecord(params) {
  return request('/classWorkbench/countAppealRecord', { method: 'get', params });
}


// 本期学分
// 人均在服学员列表
export async function kpiLevelList(params) {
  return request('/deskperfpcapi/scorePk/kpiLevel/list', { method: 'get', params })
}
//右侧对比小组的列表页
export async function groupList(params) {
  return request('/deskperfpcapi/scorePk/group/list', { method: 'POST', data: params })
}
// 左侧学分pk对象的数据
export async function groupPkList(params) {
  return request('/deskperfpcapi/scorePk/group/pk', { method: 'POST', data: params })
}
//判断是否显示本期学分的模块
export async function isShowPermission(params) {
  return request('/deskperfpcapi/scorePk/permission', { method: 'get', params })
}

// 绩效详情
export async function getKpiInfo(params) {
  return request('/deskperfpcapi/workbenchIncomeKpi/getKpiInfo', { method: 'get', data: params })
}


// ===========================家族==========

// 本期创收明细-关键指标
export async function getCurrentIncomeTarget(params) {
  return request('/incomeFamily/currentIncomeTarget', { method: 'get', data: params })
}
// 本期创收明细-小组创收明细
export async function getCurrentIncomeGroup(params) {
  return request('/incomeFamily/currentIncomeGroup', { method: 'get', data: params })
}
// 本期创收明细-班主任创收明细
export async function getCurrentIncomeClass(params) {
  return request('/incomeFamily/currentIncomeClass', { method: 'get', data: params })
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
  return request('/deskperfpcapi/family/score/statistics', { method: 'get', data: params });
}
// 本期学分—本学院学分排名
export async function collegeRankList(params) {
  return request('/family/score/collegeRankList', { method: 'get', params });
}
// 本期学分—集团学分排名
export async function companyRankList(params) {
  return request('/family/score/companyRankList', { method: 'get', params });
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
// ====小树end====
// 查询组织架构
export async function getOrgMapList(params) {
  return request('/orgMap/getOrgMapList', { params });
}
// 本期申诉 - 申诉统计
export async function getFamilyRecord(params) {
  return request('/classWorkbench/family/countAppealRecord', { method: 'get', data: params })
}
// 本期质检 - 质检统计
export async function getFamilyQuality(params) {
  return request('/classWorkbench/family/countCurrentQuality', { method: 'get', data: params })
}
//家族学分对比
export async function getFamilyScorePk(params) {
  return request('/deskperfpcapi/family/score/pk',  { method: 'get', params });
}
//家族学分对比右侧集团学分排名
export async function getFamilyRankList(params) {
  return request('/deskperfpcapi/family/score/familyRankList',  { method: 'get', params });
}
//获取家族学分对比右侧下拉筛选的数据
export async function getCollegeList(params) {
  return request('/deskperfpcapi/organization/collegeList',  { method: 'get', params });
}
//小组学分对比
export async function getGroupPkList(params) {
  return request('/deskperfpcapi/family/score/groupPk',  { method: 'get', params });
}
//家族创收对比
export async function getIncomeFamilyList(params) {
  return request('/deskperfpcapi/incomeFamily/getFamilyPk',  { method: 'get', params });
}
//家族创收对比的家族绩效列表
export async function getFamilyList(params) {
  return request('/deskperfpcapi/incomeFamily/getFamilyList',  { method: 'get', params });
}
