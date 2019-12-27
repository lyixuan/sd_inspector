import request from '@/utils/request';
// 配置信息
// 家族-学院列表
export async function getIncomeCollegeList(params) {
  return request('/orgMap/findCollegeShortNameList', { method: 'get', params });
}
// 续报分析 - 原产品包榜单
export async function getOriginPackageList(data) {
  return request('/resubmit/getOriginPackageList', { method: 'POST', data });
}
// 续报分析 - 续报热销榜单
export async function getPackageList(data) {
  return request('/resubmit/getPackageList', { method: 'POST', data });
}

// 续报分析 - 学院分析
export async function getCollegeAnalyze(data) {
  return request('/resubmit/getCollegeAnalyze', { method: 'POST', data });
}

// 续报分析 - 家族分析
export async function getFamilyAnalyze(data) {
  return request('/resubmit/getFamilyAnalyze', { method: 'POST', data });
}

// 续报分析 - 续费学员生命周期分布
export async function getCycleList(data) {
  return request('/resubmit/getCycleList', { method: 'POST', data });
}

// 续报分析 - 转班路径
export async function getPathList(data) {
  return request('/resubmit/getPathList', { method: 'POST', data });
}