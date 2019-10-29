import request from '@/utils/request';
//管理层工作台
// 创收学院对比列表
export async function compareCollegeList(data) {
  return request('/adminWorkbench/incomeCollege/compareCollegeList',{method:'POST',data: data})
}

// 获取当前绩效周期
export async function getCurrentDateRange(params) {
  return request('/deskperfpcapi/incomeKpiCommon/getCurrentDateRange',{method:'get', params})
}

// 获取热销榜单列表
export async function getHotList() {
  return request('/orgMap/getAllCollegeList',{method:'get'})
}

// 热销产品包列表
export async function packageRankList(data) {
  return request('/adminWorkbench/hotSellPackage/packageRankList',{method:'POST',data: data})
}

// 获取学分接口
export async function countCreditAvgScore(data) {
  return request('/adminWorkbench/importantPoint/countCreditAvgScore',{method:'POST',data: data})
}

// 获取除了学分外的其他接口
export async function countByDate(data) {
  return request('/adminWorkbench/importantPoint/countByDate',{method:'POST',data: data})
}
//NPS自主评价分析及云图的数据接口
export async function getNpsAutonomousEvaluation(data) {
  return request('/nps/getNpsAutonomousEvaluation',{method:'POST',data: data})
}
//点击分页调用的接口
export async function getNpsStarOpinion(data) {
  return request('/nps/getNpsStarOpinion',{method:'POST',data: data})
}
//查询组织架构的接口
export async function getOrgMapTree(params) {
  return request('/orgMap/getOrgMapTree', { method: 'get', params });
}
//IM负面数据对比
export async function getImReverseSideData(params) {
  return request('/im/getImReverseSideData', { method: 'get', params });
}
//学分对比柱状图
export async function queryAppealDataPage(data) {
  return request('/credit/queryAppealDataPage',{method:'POST',data:data})
}
//获取学院性质的接口
export async function getFamilyType(params) {
  return request('/orgMap/getFamilyType',{method:'get',params})
}

