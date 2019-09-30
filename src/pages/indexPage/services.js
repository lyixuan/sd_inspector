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
export async function  isShowPermission(params) {
  return request('/deskperfpcapi/scorePk/permission', { method: 'get', params })
}

// 绩效详情
export async function getKpiInfo(params) {
  return request('/deskperfpcapi/workbenchIncomeKpi/getKpiInfo', { method: 'get', data: params })
}


// ===========================家族==========

// 绩效详情
// 本期创收明细-小组创收明细
export async function getCurrentIncomeGroup(params) {
  return request('/incomeFamily/currentIncomeGroup', { method: 'get', data: params })
}
// 本期创收明细-班主任创收明细
export async function getCurrentIncomeClass(params) {
  return request('/incomeFamily/currentIncomeClass', { method: 'get', data: params })
}