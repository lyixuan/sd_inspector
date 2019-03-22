import request from '@/utils/request';

// 查询质检列表
export async function getQualityList(params) {
  return request('/quality/queryQualityDataPage', { method: 'post', data: params });
}
// 查询质检列表 - 导出结果
export async function qualityExportExcel(params) {
  return request('/quality/exportExcel', { method: 'post', data: params,responseType:'blob',getResponse: true });
}

// 查询质检列表 - 撤销
export async function qualityCancelQuality(params) {
  return request('/quality/cancelQuality', { params });
}


////根据邮箱获取组织信息
export async function getOrgMapByMail(params) {
  return request('/orgMap/getOrgMapByMail', { params });
}

