import request from '@/utils/request';

// 查询申诉列表
export async function getAppealList(params) {
  return request('/appeal/queryAppealDataPage', {method: 'post',data: params});
}

// 查询审核列表 - 导出结果
export async function appealExportExcel(params) {
  return request('/appeal/exportExcel', { method: 'post', data: params,responseType:'blob',getResponse: true });
}

// 查询审核列表 - 撤销
export async function appealCancelQuality(params) {
  return request('/appeal/cancelAppeal', { params });
}
