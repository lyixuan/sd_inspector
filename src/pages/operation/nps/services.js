import request from '@/utils/request';
export async function getUserInfo(params) {
  return request('/deskperfpcapi/user/info', { method: 'get', params });
}
// 查询组织架构
export async function getOrgMapList(params) {
  return request('/orgMap/getOrgMapList', { params });
}
// 家族-学院列表
export async function getIncomeCollegeList(params) {
  return request('/deskperfpcapi/incomeFamily/getCollegeList', { method: 'get', params });
}

//管理层工作台
// 创收学院对比列表
export async function compareCollegeList(data) {
  return request('/adminWorkbench/incomeCollege/compareCollegeList', {
    method: 'POST',
    data: data,
  });
}

// 获取当前绩效周期
export async function getCurrentDateRange(params) {
  return request('/deskperfpcapi/incomeKpiCommon/getCurrentDateRange', { method: 'get', params });
}
//NPS自主评价分析及云图的数据接口
export async function getNpsAutonomousEvaluation(data) {
  return request('/nps/getNpsAutonomousEvaluation', { method: 'POST', data: data });
}
//点击分页调用的接口
export async function getNpsStarOpinion(data) {
  return request('/nps/getNpsStarOpinion', { method: 'POST', data: data });
}
//查询组织架构的接口
export async function getOrgMapTree(params) {
  return request('/orgMap/getAllShortNameOrgList', { method: 'get', params });
}
//获取学院性质的接口
export async function getFamilyType(params) {
  return request('/orgMap/getFamilyType', { method: 'get', params });
}

// 获取nps
export async function getNpsData(data) {
  return request('/income/nps', { method: 'POST', data });
}

// 获取nps
export async function getNPSPaiData(data) {
  return request('/income/getCycleList', { method: 'POST', data });
}
