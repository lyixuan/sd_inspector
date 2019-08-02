import request from '@/utils/request';

// 查询列表
export async function getList(params) {
  return request('/shinecollege/videos/list', { params });
}
// 查询质检列表 - 导出结果
export async function qualityExportExcel(params) {
  return request('/quality/exportExcel', { method: 'post', data: params, responseType: 'blob', getResponse: true });
}

// 查询质检列表 - 撤销
export async function qualityCancelQuality(params) {
  return request('/quality/cancelQuality', { params });
}
//  添加质检接口
export async function addQuality(data) {
  return request('/quality/addQuality', { method: 'post', data });
}
// 质检详情页面
export async function getQualityDetail(params) {
  return request('/quality/getQualityInfo', { params });
}





