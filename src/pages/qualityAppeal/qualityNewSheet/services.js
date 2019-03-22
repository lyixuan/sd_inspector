import request from '@/utils/request';

// 查询质检列表
export async function getQualityList(params) {
  return request('/quality/queryQualityDataPage', { method: 'post', data: params });
}
// 查询质检列表 - 导出结果
export async function qualityExportExcel(params) {
  return request('/quality/exportExcel', { method: 'post', data: params, responseType: 'blob', getResponse: true });
}

// 查询质检列表 - 撤销
export async function qualityCancelQuality(params) {
  return request('/quality/cancelQuality', { params });
}
// 分维树状数据
export async function queryDimensionTreeList(params) {
  return request('/dimension/queryDimensionTreeList', { params });
}



