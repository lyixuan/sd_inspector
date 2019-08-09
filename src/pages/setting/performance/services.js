import request from '@/utils/request';
// 获取绩效包列表
export async function performanceList(params) {
  return request('/incomeKpiPackage/pageList', { method: 'post', data: params });
}

// 获取绩效包信息
export async function getKpiPackage(params) {
  return request('/incomeKpiPackage/getKpiPackage', { method: 'get', params });
}

// 创建绩效包
export async function createKpiPackage(params) {
  return request('/incomeKpiPackage/createKpiPackage', { method: 'post', data: params });
}

// 修改绩效包
export async function updateKpiPackage(params) {
  return request('/incomeKpiPackage/updateKpiPackage', { method: 'post', data: params });
}
